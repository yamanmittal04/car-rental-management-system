require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("./config/passport");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const carRoutes = require("./routes/carRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();
connectDB();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Session required for passport
app.use(session({
  secret: process.env.SESSION_SECRET || "secret123",
  resave: false,
  saveUninitialized: false,
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/", (req, res) => res.send("Car Rental API Running..."));

app.use((req, res) => res.status(404).json({ message: `Route not found: ${req.originalUrl}` }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || "Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
