from flask import Flask, render_template, request, jsonify, Response
from flask_mail import Mail, Message
from dotenv import load_dotenv
from io import BytesIO
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
import qrcode
import os
import traceback
import tempfile
import sqlite3
from datetime import datetime

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Configure Flask-Mail with correct environment keys
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = os.environ.get('MAIL_USERNAME')  # 👈 Should be 'MAIL_USERNAME' in .env
app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD')  # 👈 Should be 'MAIL_PASSWORD' in .env
app.config['MAIL_DEFAULT_SENDER'] = os.environ.get('MAIL_USERNAME')

mail = Mail(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/send_ticket', methods=['POST'])
def send_ticket():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    date = datetime.strptime(data.get('date'), '%Y-%m-%d').strftime('%Y-%m-%d')
    time = data.get('time')
    adults = data.get('adults')
    children = data.get('children')
    total = data.get('total')

    # 1. Generate QR Code (with booking info)
    qr_data = f"{name}|{email}|{date}|{time}|Adults:{adults}|Children:{children}|Total:{total}"
    qr = qrcode.make(qr_data)
    qr_buffer = BytesIO()
    qr.save(qr_buffer)
    qr_buffer.seek(0)

    # 2. Generate PDF
    pdf_buffer = BytesIO()
    c = canvas.Canvas(pdf_buffer, pagesize=A4)
    c.setFont("Helvetica", 14)
    c.drawString(100, 800, "🎟️ G.D. Naidu Museum - E-Ticket")
    c.drawString(100, 770, f"Name: {name}")
    c.drawString(100, 750, f"Email: {email}")
    c.drawString(100, 730, f"Date: {date}")
    c.drawString(100, 710, f"Entry Time: {time}")
    c.drawString(100, 690, f"Adults: {adults}")
    c.drawString(100, 670, f"Children: {children}")
    c.drawString(100, 650, f"Total Amount: ₹{total}")

    # Embed QR code into PDF
    qr_path = os.path.join(tempfile.gettempdir(), "qr_temp.png")
    with open(qr_path, 'wb') as f:
        f.write(qr_buffer.getvalue())
    c.drawImage(qr_path, 100, 500, width=150, height=150)

    c.save()
    pdf_buffer.seek(0)

    # 3. Compose and send the email
    msg = Message(subject="🎫 Your G.D. Naidu Museum E-Ticket",
                  recipients=[email],
                  sender=app.config['MAIL_USERNAME'])
    msg.body = f"""Hello {name},

Here is your e-ticket for the G.D. Naidu Museum.

Visit Date: {date}
Entry Time: {time}
Adults: {adults}
Children: {children}
Total Paid: ₹{total}

Please present the attached ticket with the QR code at the entrance.

Enjoy your visit!
"""

    # Attach PDF
    msg.attach("GD_Naidu_Ticket.pdf", "application/pdf", pdf_buffer.getvalue())
    # Insert booking into DB
    conn = sqlite3.connect('booking.db')
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO bookings (name, email, date, time, adults, children, total_amount, language)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, (name, email, date, time, adults, children, total, data.get('language', 'en')))
    conn.commit()
    conn.close()

    try:
        mail.send(msg)
        print("✅ Ticket with PDF sent!")

        # ✅ Delete QR temp file if exists
        if os.path.exists(qr_path):
            os.remove(qr_path)

        return jsonify({"status": "success"}), 200
    except Exception as e:
        print(f"❌ Error sending email: {e}")
        return jsonify({"status": "fail", "error": str(e)}), 500
@app.route('/export_bookings')
def export_bookings():
    conn = sqlite3.connect('booking.db')
    c = conn.cursor()
    c.execute("SELECT * FROM bookings")
    bookings = c.fetchall()
    conn.close()

    csv_data = "ID,Name,Email,Date,Time,Adults,Children,Total,Language,BookedAt\n"
    for row in bookings:
        csv_data += ",".join(str(item) for item in row) + "\n"

    return Response(
        csv_data,
        mimetype="text/csv",
        headers={"Content-disposition": "attachment; filename=bookings.csv"}
    )
@app.route('/dashboard')
def dashboard():
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    search = request.args.get('search')

    conn = sqlite3.connect('booking.db')
    conn.row_factory = sqlite3.Row
    query = "SELECT * FROM bookings WHERE 1=1"
    params = []

    if start_date:
        query += " AND date >= ?"
        params.append(start_date)
    if end_date:
        query += " AND date <= ?"
        params.append(end_date)
    if search:
        query += " AND (name LIKE ? OR email LIKE ?)"
        search_term = f"%{search}%"
        params.extend([search_term, search_term])

    query += " ORDER BY booked_at DESC"
    bookings = conn.execute(query, params).fetchall()
    conn.close()

    return render_template('dashboard.html', bookings=bookings)

if __name__ == '__main__':
    app.run(debug=True)
