const mongoose = require("mongoose");

const carSchema = mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  pricePerDay: { type: Number, required: true },
  fuelType: { type: String, required: true },
  transmission: { type: String, required: true },
  seats: { type: Number, required: true },
  description: { type: String, default: "No description available", trim: true },
  image: { type: String, required: true },
  available: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.models.Car || mongoose.model("Car", carSchema);
