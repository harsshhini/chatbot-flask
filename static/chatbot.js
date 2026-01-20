document.addEventListener("DOMContentLoaded", () => {
  const chatbox = document.getElementById("chatbox");

  function scrollToBottom() {
    chatbox.scrollTop = chatbox.scrollHeight;
  }

  let selectedLanguage = 'en';
  let selectedDate = '';
  let selectedTime = '';
  let adultCount = 0;
  let childCount = 0;
  let userName = '';

  const ADULT_PRICE = 60;
  const CHILD_PRICE = 40;

  const translations = {
    en: {
      welcome: "Hello! Welcome to the official booking assistant for G.D. Naidu Museum, Coimbatore. Would you like to:",
      bookTickets: "Book Tickets",
      selectDate: "Please select your visit date:",
      museumTimings: "Know Museum Timings",
      selectAdults: "How many tickets would you like to book for an adult?",
      selectChildren: "How many tickets would you like to book for a child?",
      confirmBooking: "Here’s your booking summary:",
      entryTime: "Now, please choose your entry time:",
      total: "Total",
      billingSummary: "BILLING SUMMARY",
      person: "PERSON",
      number: "NUMBER",
      price: "PRICE",
      proceedToPay: "Ready to pay ",
      success: "Payment confirmed!",
      enjoyVisit: "Enjoy your visit to the G.D. Naidu Museum on",
      enterName: "Please enter your full name",
      enterEmail: "Please enter your MAIL 📧",
      invalidEmail: "Please enter a valid email address.",
      museumHours: "The museum is open from 9:00 AM to 5:00 PM, Monday to Saturday.",
      paymentLink: "🔗 [Payment Link Placeholder]",
      paymentDone: "Payment Done",
      cancel: "Cancel",
      bookingCancelled: "Booking cancelled ❌"
    },
    ta: {
      welcome: "வணக்கம்! கோயம்புத்தூர் G.D. நாயுடு அருங்காட்சியகத்தின் அதிகாரப்பூர்வ டிக்கெட் உதவியாளர். நீங்கள் என்ன செய்ய விரும்புகிறீர்கள்:",
      bookTickets: "டிக்கெட்டுகள் பதிவு",
      selectDate: "தயவுசெய்து உங்கள் வருகை தேதியை தேர்ந்தெடுக்கவும்:",
      museumTimings: "அருங்காட்சியக நேரங்கள்",
      selectAdults: "வயது பெரியவர்களுக்கான டிக்கெட்டுகள் எத்தனை?",
      selectChildren: "குழந்தைகளுக்கான டிக்கெட்டுகள் எத்தனை?",
      confirmBooking: "உங்கள் முன்பதிவு சுருக்கம்:",
      entryTime: "தயவுசெய்து உங்கள் நுழைவு நேரத்தை தேர்ந்தெடுக்கவும்:",
      total: "மொத்தம்",
      billingSummary: "பில்லிங் சுருக்கம்",
      person: "நபர்",
      number: "எண்",
      price: "விலை",
      proceedToPay: "செலுத்த தயாரா?",
      success: "கட்டணம் உறுதிப்படுத்தப்பட்டது!",
      enjoyVisit: "நீங்கள் G.D. நாயுடு அருங்காட்சியகத்திற்கு வருகை தரும் நாள்",
      enterName: "தயவுசெய்து உங்கள் முழு பெயரை உள்ளிடவும்",
      enterEmail: "தயவுசெய்து உங்கள் மின்னஞ்சலை உள்ளிடவும் 📧",
      invalidEmail: "சரியான மின்னஞ்சல் முகவரியை உள்ளிடவும்.",
      museumHours: "அருங்காட்சியகம் திங்கள் முதல் சனி வரை காலை 9 முதல் மாலை 5 வரை திறந்திருக்கும்.",
      paymentLink: "🔗 [கட்டண இணைப்பு இடம்]",
      paymentDone: "கட்டணம் செய்யப்பட்டது",
      cancel: "ரத்து செய்க",
      bookingCancelled: "முன்பதிவு ரத்து செய்யப்பட்டது ❌"
    },
    hi: {
      welcome: "नमस्ते! जी. डी. नायडू संग्रहालय, कोयंबटूर के आधिकारिक टिकट सहायक में आपका स्वागत है। आप क्या करना चाहेंगे:",
      bookTickets: "टिकट बुक करें",
      selectDate: "कृपया अपनी यात्रा की तारीख चुनें:",
      museumTimings: "संग्रहालय समय",
      selectAdults: "आप वयस्कों के लिए कितने टिकट बुक करना चाहते हैं?",
      selectChildren: "आप बच्चों के लिए कितने टिकट बुक करना चाहते हैं?",
      confirmBooking: "यहाँ आपकी बुकिंग का सारांश है:",
      entryTime: "कृपया अपना प्रवेश समय चुनें:",
      total: "कुल",
      billingSummary: "बिल सारांश",
      person: "व्यक्ति",
      number: "संख्या",
      price: "कीमत",
      proceedToPay: "क्या आप भुगतान के लिए तैयार हैं?",
      success: "भुगतान की पुष्टि हो गई है!",
      enjoyVisit: "आपका G.D. नायडू संग्रहालय में स्वागत है",
      enterName: "कृपया अपना पूरा नाम दर्ज करें",
      enterEmail: "कृपया अपना ईमेल दर्ज करें 📧",
      invalidEmail: "कृपया एक वैध ईमेल दर्ज करें।",
      museumHours: "संग्रहालय सोमवार से शनिवार तक सुबह 9:00 से शाम 5:00 बजे तक खुला रहता है।",
      paymentLink: "🔗 [भुगतान लिंक स्थानधारी]",
      paymentDone: "भुगतान हो गया",
      cancel: "रद्द करें",
      bookingCancelled: "बुकिंग रद्द कर दी गई ❌"
    }
  };

  function t(key) {
    return translations[selectedLanguage][key] || key;
  }

  function addBotMessage(text, emoji = "🤖") {
    const msg = document.createElement("div");
    msg.className = "bot-msg fade-in";
    msg.innerHTML = `<p><span class="emoji">${emoji}</span> ${text}</p>`;
    chatbox.appendChild(msg);
    scrollToBottom();
  }

  function addUserMessage(text, emoji = "👤") {
    const msg = document.createElement("div");
    msg.className = "user-msg fade-in";
    msg.innerHTML = `<p><span class="emoji">${emoji}</span> ${text}</p>`;
    chatbox.appendChild(msg);
    scrollToBottom();
  }

  function addButtons(options) {
    document.querySelectorAll(".button-container").forEach(btn => btn.remove());
    const container = document.createElement("div");
    container.className = "button-container fade-in";
    options.forEach(opt => {
      const btn = document.createElement("button");
      btn.textContent = `${opt.emoji} ${opt.label}`;
      btn.onclick = () => {
        addUserMessage(opt.label, opt.emoji);
        container.remove();
        opt.action();
      };
      container.appendChild(btn);
    });
    chatbox.appendChild(container);
    scrollToBottom();
  }

  function askEmail() {
    addBotMessage(t("enterEmail"));
    const input = document.createElement("input");
    input.type = "email";
    input.placeholder = "example@email.com";
    input.className = "email-input";
    input.onkeypress = (e) => {
      if (e.key === "Enter") {
        const email = input.value;
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          addUserMessage(email);
          input.remove();
          confirmPayment(email);
        } else {
          alert(t("invalidEmail"));
        }
      }
    };
    chatbox.appendChild(input);
    input.focus();
    scrollToBottom();
  }

  function confirmPayment(email) {
    const total = (adultCount * ADULT_PRICE) + (childCount * CHILD_PRICE);
    addBotMessage(`${t("proceedToPay")} ₹${total}?`);
    addButtons([
      {
        label: t("paymentDone"),
        emoji: "✅",
        action: () => {
          addBotMessage(t("success"));

          fetch('/send_ticket', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: email,
              name: userName,
              date: selectedDate,
              language: selectedLanguage,  // <-- add this in send_ticket() body
              time: selectedTime,
              adults: adultCount,
              children: childCount,
              total: total
            })
          })
          .then(res => res.json())
          .then(data => {
            if (data.status === 'success') {
              addBotMessage(`${t("enjoyVisit")} ${selectedDate} at ${selectedTime}.<br>Your e-ticket has been sent to <a href="mailto:${email}">${email}</a>`);
            } else {
              addBotMessage(`⚠️ Failed to send email. Please try again later.`);
            }
          });
        }
      },
      {
        label: t("cancel"),
        emoji: "❌",
        action: () => addBotMessage(t("bookingCancelled"))
      }
    ]);
  }

  function showBookingSummary() {
    selectedTime = selectedTime || "11:00 AM";
    const total = (adultCount * ADULT_PRICE) + (childCount * CHILD_PRICE);
    const summary = `
        <div class="booking-summary-card">
          <p><span class="emoji">✅</span> ${t("confirmBooking")}</p>
          <div class="booking-details">
            <p>🏛️ <strong>Museum:</strong> G.D. Naidu Museum, Coimbatore</p>
            <p>📅 <strong>Date:</strong> ${selectedDate}</p>
            <p>👥 <strong>Tickets:</strong> ${adultCount} Adults, ${childCount} Children</p>
            <p>🕒 <strong>Entry Time:</strong> ${selectedTime}</p>
            <p>💵 <strong>${t("total")}:</strong> ₹${total}</p>
          </div>
          <div class="billing-table">
            <h4>${t("billingSummary")}</h4>
            <table>
              <thead>
                <tr><th>${t("person")}</th><th>${t("number")}</th><th>${t("price")}</th></tr>
              </thead>
              <tbody>
                <tr><td>ADULT</td><td>${adultCount}</td><td>₹${adultCount * ADULT_PRICE}</td></tr>
                <tr><td>CHILD</td><td>${childCount}</td><td>₹${childCount * CHILD_PRICE}</td></tr>
                <tr><td><strong>${t("total")}</strong></td><td><strong>${adultCount + childCount}</strong></td><td><strong>₹${total}</strong></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      `;

    addBotMessage(`<div class="fade-in">${summary}</div>`);


    setTimeout(() => {
      addBotMessage(t("enterName"));
      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = "Your Name";
      input.className = "name-input";
      input.onkeypress = (e) => {
        if (e.key === "Enter") {
          userName = input.value;
          addUserMessage(userName);
          input.remove();
          askEmail();
        }
      };
      chatbox.appendChild(input);
      input.focus();
      scrollToBottom();
    }, 1500);
  }

  function chooseTime() {
    addBotMessage(t("entryTime"));
    const times = ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM"];
    addButtons(times.map((time, i) => ({
      label: time, emoji: `${i + 1}️⃣`, action: () => {
        selectedTime = time;
        showBookingSummary();
      }
    })));
  }

  function askAdultTickets() {
    addBotMessage(t("selectAdults"));
    addButtons(Array.from({ length: 10 }, (_, i) => ({
      label: `${i}`, emoji: `${i}️⃣`, action: () => {
        adultCount = i;
        askChildTickets();
      }
    })));
  }

  function askChildTickets() {
    addBotMessage(t("selectChildren"));
    addButtons(Array.from({ length: 10 }, (_, i) => ({
      label: `${i}`, emoji: `${i}️⃣`, action: () => {
        childCount = i;
        chooseTime();
      }
    })));
  }

  function getTomorrowFormatted() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  }

function askDate() {
  addBotMessage(t("selectDate"));

  const input = document.createElement("input");
  input.type = "date";
  input.className = "date-input";
  input.style.margin = "10px 0";

  input.onchange = () => {
    const selected = input.value;
    if (selected) {
      const dateObj = new Date(selected);
      selectedDate = input.value;  // ✅ Send as YYYY-MM-DD
      const formattedDate = dateObj.toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      });
      addUserMessage(selectedDate);
      input.remove();
      askAdultTickets();
    }
  };

  chatbox.appendChild(input);
  input.focus();

  // 🔥 Automatically open the calendar popup (modern browsers only)
  if (typeof input.showPicker === "function") {
    input.showPicker();
  }

  scrollToBottom();
}

  function startChat() {
    addBotMessage("🌐 Please choose your language:");
    addButtons([
      { label: "English", emoji: "🇬🇧", action: () => { selectedLanguage = 'en'; askStart(); } },
      { label: "தமிழ்", emoji: "🇮🇳", action: () => { selectedLanguage = 'ta'; askStart(); } },
      { label: "हिंदी", emoji: "🇮🇳", action: () => { selectedLanguage = 'hi'; askStart(); } }
    ]);
  }

  function askStart() {
    addBotMessage(t("welcome"));
    addButtons([
      { label: t("bookTickets"), emoji: "🎟️", action: askDate },
      { label: t("museumTimings"), emoji: "⏰", action: () => addBotMessage(t("museumHours")) }
    ]);
  }

  startChat();
});
