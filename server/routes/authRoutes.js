const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { registerUser, loginUser } = require("../controllers/authController");

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

// Normal auth
router.post("/register", registerUser);
router.post("/login", loginUser);

// Google OAuth — Step 1: redirect to Google
router.get("/google", passport.authenticate("google", {
  scope: ["profile", "email"]
}));

// Google OAuth — Step 2: Google redirects back here
router.get("/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:3000/login?error=google_failed", session: false }),
  (req, res) => {
    const user = req.user;
    const token = generateToken(user._id);

    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isAdmin: user.role === "admin",
      token,
    };

    // Redirect to frontend with token in URL
    const encoded = encodeURIComponent(JSON.stringify(userData));
    res.redirect(`http://localhost:3000/auth/google/success?data=${encoded}`);
  }
);

module.exports = router;
