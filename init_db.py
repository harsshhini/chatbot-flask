import sqlite3

# Connect to (or create) the database file
conn = sqlite3.connect('booking.db')
c = conn.cursor()

# Drop existing tables if they exist
c.execute("DROP TABLE IF EXISTS bookings")
c.execute("DROP TABLE IF EXISTS booking_slots")
c.execute("DROP TABLE IF EXISTS blocked_dates")

# Create booking_slots table
c.execute('''
    CREATE TABLE booking_slots (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL,
        time TEXT NOT NULL,
        max_capacity INTEGER DEFAULT 5,
        booked_count INTEGER DEFAULT 0
    )
''')

# Create blocked_dates table
c.execute('''
    CREATE TABLE blocked_dates (
        date TEXT PRIMARY KEY
    )
''')

# Create bookings table
c.execute('''
    CREATE TABLE bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        date TEXT NOT NULL,
        time TEXT NOT NULL,
        adults INTEGER,
        children INTEGER,
        total_amount INTEGER,
        language TEXT,
        booked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
''')

conn.commit()
conn.close()
print("✅ Fresh database initialized successfully with all tables.")
