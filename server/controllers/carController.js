const Car = require("../models/car");
const Booking = require("../models/Booking");
const mongoose = require("mongoose");

exports.createCar = async (req, res) => {
  try {
    const { name, brand, pricePerDay, fuelType, transmission, seats, image, description } = req.body;
    if (!image) return res.status(400).json({ message: "Image is required" });
    const car = await Car.create({ name, brand, pricePerDay, fuelType, transmission, seats, image, description, available: true });
    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCars = async (req, res) => {
  try {
    const cars = await Car.find().sort({ createdAt: -1 });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid car ID" });
    const car = await Car.findById(id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    car.name = req.body.name || car.name;
    car.brand = req.body.brand || car.brand;
    car.pricePerDay = req.body.pricePerDay || car.pricePerDay;
    car.fuelType = req.body.fuelType || car.fuelType;
    car.transmission = req.body.transmission || car.transmission;
    car.seats = req.body.seats || car.seats;
    if (req.body.description !== undefined) car.description = req.body.description;
    if (req.body.image && req.body.image.trim() !== "") car.image = req.body.image;
    if (req.body.available !== undefined) car.available = req.body.available;
    await car.save();
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid car ID" });
    const car = await Car.findById(id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    const bookingExists = await Booking.exists({ car: id, status: { $in: ["pending", "confirmed"] } });
    if (bookingExists) return res.status(400).json({ message: "Cannot delete car with active bookings" });
    await car.deleteOne();
    res.json({ message: "Car deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
