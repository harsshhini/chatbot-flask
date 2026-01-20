# 🏛️ Museum Ticket Booking Chatbot — Gedee Museum (Coimbatore)

A multilingual, intelligent chatbot-based museum ticketing system that allows users to book, manage, and check museum tickets seamlessly through an interactive chat interface.

# ✨ Features

🎯 Ticket Booking via Chat

Choose date, time, number of visitors, and ticket category

Confirm booking within the chat interface

🌐 Multilingual Support

Supports English, Tamil, Hindi for broader accessibility

💳 Payment Integration (Planned)

Gateway support for smooth online payments

(QR code generation included)

📩 Email Ticket Delivery

User receives ticket details directly in email inbox after booking

📱 Modern Chat UI

Inspired by Tars & Reservix chatbots

Minimal-width message bubbles

Quick reply buttons

Auto-scroll & Enter-to-send functionality

🗂️ Chat Flow Management

Booking flow logic similar to event ticketing systems

Backend built with Flask for chatbot message handling

Ticket validation & database support 

🧱 Tech Stack
Frontend (Chat UI)

HTML, CSS, JavaScript

Responsive, message-style UI components

Quick-reply button interactions

Backend

Python Flask for chatbot API & ticket logic

Integration endpoints for payments (future)

Email sending over SMTP or transactional mail API

Database (Options)

SQLite (dev)

PostgreSQL / MySQL (prod)

Email Service

SMTP + Flask-Mail / SendGrid / Mailgun (configurable)
