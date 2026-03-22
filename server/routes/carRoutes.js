const express = require("express");
const router = express.Router();
const { createCar, getCars, deleteCar, updateCar } = require("../controllers/carController");
const { protect, admin } = require("../middleware/authMiddleware");
router.get("/", getCars);
router.post("/", protect, admin, createCar);
router.put("/:id", protect, admin, updateCar);
router.delete("/:id", protect, admin, deleteCar);
module.exports = router;
