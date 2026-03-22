const Booking = require("../models/Booking");
const Car = require("../models/car");

exports.createBooking = async (req, res) => {
  try {
    const { car, startDate, endDate } = req.body;
    if (!car || !startDate || !endDate || !req.user) return res.status(400).json({ message: "All fields are required" });
    const carDoc = await Car.findById(car);
    if (!carDoc || !carDoc.available) return res.status(404).json({ message: "Car not available" });
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start >= end) return res.status(400).json({ message: "Invalid date range" });
    const conflict = await Booking.findOne({ car, status: { $in: ["pending", "confirmed"] }, startDate: { $lte: end }, endDate: { $gte: start } });
    if (conflict) return res.status(400).json({ message: "Car already booked for selected dates" });
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const totalPrice = days * carDoc.pricePerDay;
    const booking = await Booking.create({ user: req.user._id, car, startDate: start, endDate: end, totalPrice, status: "pending" });
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate("car", "name brand pricePerDay image");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (booking.user.toString() !== req.user._id.toString()) return res.status(401).json({ message: "Not authorized" });
    if (["completed", "cancelled"].includes(booking.status)) return res.status(400).json({ message: "Cannot cancel this booking" });
    booking.status = "cancelled";
    await booking.save();
    res.json({ message: "Booking cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("user", "name email").populate("car", "name brand pricePerDay");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.confirmBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking || booking.status !== "pending") return res.status(400).json({ message: "Invalid booking state" });
    booking.status = "confirmed";
    await booking.save();
    res.json({ message: "Booking confirmed", booking });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.completeBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking || booking.status !== "confirmed") return res.status(400).json({ message: "Invalid booking state" });
    booking.status = "completed";
    await booking.save();
    res.json({ message: "Booking completed", booking });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.adminCancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (["completed", "cancelled"].includes(booking.status)) return res.status(400).json({ message: "Cannot cancel this booking" });
    booking.status = "cancelled";
    await booking.save();
    res.json({ message: "Booking cancelled by admin", booking });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
