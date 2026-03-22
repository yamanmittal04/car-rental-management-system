const express = require("express");
const router = express.Router();

const {
  createBooking,
  getMyBookings,
  cancelBooking,
  adminCancelBooking,
  getAllBookings,
  confirmBooking,
  completeBooking,
} = require("../controllers/bookingController");

const { protect, admin } = require("../middleware/authMiddleware");

router.post("/", protect, createBooking);
router.get("/my", protect, getMyBookings);
router.put("/:id/cancel", protect, cancelBooking);
router.get("/dashboard", protect, admin, (req, res) => res.json({ message: "dashboard" }));
router.put("/:id/confirm", protect, admin, confirmBooking);
router.put("/:id/complete", protect, admin, completeBooking);
router.put("/:id/admin-cancel", protect, admin, adminCancelBooking);
router.get("/", protect, admin, getAllBookings);

module.exports = router;
