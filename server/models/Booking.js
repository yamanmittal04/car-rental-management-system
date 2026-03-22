const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  car: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Car" },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalPrice: { type: Number, required: true, min: 0, default: 0 },
  status: { type: String, enum: ["pending", "confirmed", "cancelled", "completed"], default: "pending" },
}, { timestamps: true });

bookingSchema.pre("save", function (next) {
  if (!this.startDate || !this.endDate) return next(new Error("Dates are required"));
  if (new Date(this.startDate) >= new Date(this.endDate)) return next(new Error("End date must be after start date"));
  next();
});

bookingSchema.index({ car: 1, startDate: 1, endDate: 1, status: 1 });
module.exports = mongoose.model("Booking", bookingSchema);
