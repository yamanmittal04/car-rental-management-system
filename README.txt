<div align="center">

<img src="https://img.shields.io/badge/MERN-Stack-brightgreen?style=for-the-badge&logo=mongodb" />
<img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react" />
<img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js" />
<img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb" />

# 🚗 DrivePremium — Online Car Rental Management System

**A full-stack MERN web application for managing car rentals online.**  
Built as a Final Year BCA Project | Post Graduate Government College, Sector-11, Chandigarh

</div>

---

## 📌 Project Overview

**DrivePremium** is a fully functional online car rental management system that allows users to browse available cars, make bookings, and manage their rentals — all through a clean, responsive web interface.

The system includes separate panels for **users** and **admins**, with features like Google OAuth login, JWT-based authentication, and a real-time booking management dashboard.

---

## ✨ Features

### 👤 User Panel
- Register / Login with Email & Password
- Login with **Google OAuth 2.0**
- Browse all available cars with details
- Book a car for specific dates
- View and manage personal bookings
- Cancel bookings

### 🛠️ Admin Panel
- Secure admin login
- Add, edit, and delete cars
- View all bookings across users
- Manage booking statuses (Approve / Reject / Complete)
- Dashboard with booking and car statistics

---

## 🛠️ Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | React.js, React Router, Axios     |
| Backend    | Node.js, Express.js               |
| Database   | MongoDB Atlas (Mongoose ODM)      |
| Auth       | JWT, Passport.js, Google OAuth    |
| Styling    | CSS3, Responsive Design           |
| Deployment | Render (Backend), Local (Frontend)|

---

## 📁 Project Structure
```
car-rental/
├── client/                  # React Frontend
│   ├── public/
│   └── src/
│       ├── components/      # Reusable UI components
│       ├── pages/           # Route-level pages
│       ├── context/         # Auth context (global state)
│       └── App.js
│
└── server/                  # Node/Express Backend
    ├── models/              # Mongoose schemas (User, Car, Booking)
    ├── routes/              # API route handlers
    ├── controllers/         # Business logic
    ├── middleware/          # Auth middleware (JWT verify)
    ├── config/              # Passport & DB config
    └── server.js            # Entry point
```

---

## ⚙️ Installation & Setup (Local)

### Prerequisites
- Node.js (v16+)
- MongoDB (local) or MongoDB Atlas account
- Git

### Step 1 — Clone the repository
```bash
git clone https://github.com/yamanmittal04/car-rental-management-system.git
cd car-rental-management-system
```

### Step 2 — Setup Backend
```bash
cd server
npm install
```

Create a `.env` file inside the `server/` folder:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
SESSION_SECRET=your_session_secret
```

Start the backend:
```bash
npm run dev
```

### Step 3 — Setup Frontend
```bash
cd ../client
npm install
npm start
```

### Step 4 — Open in browser
```
http://localhost:3000
```

---

## 🔗 API Endpoints

| Method | Endpoint                     | Description              |
|--------|------------------------------|--------------------------|
| POST   | `/api/auth/register`         | Register new user        |
| POST   | `/api/auth/login`            | Login with email/password|
| GET    | `/api/auth/google`           | Google OAuth login       |
| GET    | `/api/cars`                  | Get all cars             |
| POST   | `/api/cars`                  | Add new car (Admin)      |
| PUT    | `/api/cars/:id`              | Update car (Admin)       |
| DELETE | `/api/cars/:id`              | Delete car (Admin)       |
| GET    | `/api/bookings`              | Get all bookings (Admin) |
| POST   | `/api/bookings`              | Create new booking       |
| PUT    | `/api/bookings/:id`          | Update booking status    |
| DELETE | `/api/bookings/:id`          | Cancel booking           |

---

## 🖥️ Screenshots

> _Add screenshots of your application here_

| Home Page | Car Listing | Admin Dashboard |
|-----------|-------------|-----------------|
| ![Home]() | ![Cars]()   | ![Admin]()      |

---

## 🔐 Authentication Flow

1. User registers or logs in via email/password → JWT token issued
2. User can also login via **Google OAuth 2.0** (Passport.js)
3. Token stored in localStorage → sent with every protected API request
4. Admin routes protected by role-based middleware

---

## 👨‍💻 Developer

| Detail       | Info                                      |
|--------------|-------------------------------------------|
| Name         | Yaman Mittal                              |
| Roll No.     | 4011/23                                   |
| Course       | BCA (Final Year)                          |
| College      | Post Graduate Govt. College, Sector-11, Chandigarh |
| GitHub       | [@yamanmittal04](https://github.com/yamanmittal04) |

---

## 📄 License

This project was developed for educational purposes as part of the BCA Final Year curriculum.

---

<div align="center">
  Made with ❤️ for BCA Final Year Project 2026
</div>
