# 🚀 ApplyFlow

ApplyFlow is a powerful and clean **Job Application Tracker** built with the **MERN Stack** 🧱. It's designed to help job-seekers stay organized, track applications, and land that dream job 💼!

---

## ✨ Features

- 📝 Add and manage job applications
- 📊 Status tracking: Applied, Interview, Rejected, Offer
- 🔔 Reminders for follow-ups and interviews
- 🔐 User authentication (JWT)
- 📂 Organized dashboard for productivity
- 💻 Responsive UI using React + Tailwind CSS

---

## 🛠️ Tech Stack

**Frontend**  
⚛️ React.js + Tailwind CSS + Axios + React Router

**Backend**  
🖥️ Node.js + Express.js + MongoDB + Mongoose + JWT

**Deployment**  
🌐 Can be deployed on Render, Vercel, or any cloud platform

---

## 📦 Installation Guide

### 🔧 Prerequisites

- Node.js and npm installed
- MongoDB Atlas account (or local MongoDB)
- Git

---

## 🖥️  Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/ApplyFlow.git
cd ApplyFlow/client

# Install dependencies
npm install

# Start the React app
npm run dev

---

## Backend Setup
# Move to server folder
cd ../server

# Install dependencies
npm install

# Create a .env file
touch .env


Inside .env:

PORT=5009 or any port which is not busy
MONGODB_URI=mongodb://127.0.0.1:27017/applyflow or yourAtlasone
JWT_SECRET=a strong secret key
JWT_SECRET_EXPIRY=15d
NODE_ENV=development or developement
CORS_ORIGIN1=http://localhost:5173
CORS_ORIGIN2=productionfrontnedurl

# Run the server
npm run dev