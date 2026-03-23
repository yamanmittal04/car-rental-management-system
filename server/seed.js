const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const Car = require("./models/car");
const User = require("./models/user");
const Booking = require("./models/Booking");
dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const cars = [
  {
    name: "Swift",
    brand: "Maruti Suzuki",
    pricePerDay: 1200,
    fuelType: "Petrol",
    transmission: "Manual",
    seats: 5,
    available: true,
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/159087/swift-exterior-right-front-three-quarter-3.jpeg?isig=0&q=80",
    description: "India's best-selling hatchback for over a decade. The Maruti Swift features a punchy 1.2L DualJet petrol engine delivering 89 bhp with 22.56 km/l fuel efficiency. Perfect for city commutes with its compact dimensions, responsive steering and sporty design. Comes with SmartPlay Pro+ infotainment, dual airbags and ABS as standard."
  },
  {
    name: "Creta",
    brand: "Hyundai",
    pricePerDay: 2200,
    fuelType: "Diesel",
    transmission: "Automatic",
    seats: 5,
    available: true,
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/106815/creta-exterior-right-front-three-quarter-76.jpeg?isig=0&q=80",
    description: "India's most loved compact SUV since its launch. The Hyundai Creta 2024 comes with a 1.5L CRDi diesel engine producing 116 bhp with 21.4 km/l mileage. Features a panoramic sunroof, 10.25 inch touchscreen, BOSE sound system, Level 2 ADAS, ventilated seats and connected car technology. Ideal for both highway and city drives."
  },
  {
    name: "Nexon",
    brand: "Tata Motors",
    pricePerDay: 1800,
    fuelType: "Petrol",
    transmission: "Automatic",
    seats: 5,
    available: true,
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/141867/nexon-exterior-right-front-three-quarter-4.jpeg?isig=0&q=80",
    description: "India's first 5-star Global NCAP safety rated SUV. The Tata Nexon 2024 is powered by a 1.2L turbocharged petrol engine producing 120 bhp with 17.01 km/l efficiency. Comes with 10.25 inch floating touchscreen, air purifier, wireless charging, connected car tech iRA, and 360 degree camera for parking ease."
  },
  {
    name: "Thar",
    brand: "Mahindra",
    pricePerDay: 3200,
    fuelType: "Diesel",
    transmission: "Manual",
    seats: 4,
    available: true,
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/40087/thar-exterior-right-front-three-quarter-10.jpeg?isig=0&q=80",
    description: "The iconic off-road legend reborn. Mahindra Thar 2024 features a 2.2L mHawk diesel engine producing 130 bhp with shift-on-fly 4WD system. Comes with a convertible hardtop roof, 9 inch touchscreen, Apple CarPlay, waterproof interior, high ground clearance of 226mm and locking rear differential. Perfect for mountains and adventure trips."
  },
  {
    name: "Seltos",
    brand: "Kia",
    pricePerDay: 2500,
    fuelType: "Petrol",
    transmission: "Automatic",
    seats: 5,
    available: true,
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/115777/seltos-exterior-right-front-three-quarter-5.jpeg?isig=0&q=80",
    description: "The premium SUV that redefined the segment in India. Kia Seltos 2024 is powered by a 1.5L turbo GDi petrol engine producing 160 bhp. Features a dual panoramic curved display of 12.3 inches, BOSE premium sound system, Level 2 ADAS with 19 safety features, heads up display, 360 camera and ventilated front seats with memory function."
  },
  {
    name: "Innova Crysta",
    brand: "Toyota",
    pricePerDay: 4000,
    fuelType: "Diesel",
    transmission: "Manual",
    seats: 7,
    available: true,
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/51435/innova-crysta-exterior-right-front-three-quarter-2.jpeg?isig=0&q=80",
    description: "India's most trusted 7-seater MPV for family and corporate travel. Toyota Innova Crysta 2024 features a 2.4L GD diesel engine producing 150 bhp. Comes with captain seats in second row, auto AC with rear vents, 9 inch touchscreen with wireless Apple CarPlay, ambient lighting, push button start and Toyota Safety Sense for complete peace of mind."
  },
  {
    name: "Fortuner",
    brand: "Toyota",
    pricePerDay: 5500,
    fuelType: "Diesel",
    transmission: "Automatic",
    seats: 7,
    available: true,
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/44709/fortuner-exterior-right-front-three-quarter-3.jpeg?isig=0&q=80",
    description: "India's most aspirational SUV and a status symbol on Indian roads. Toyota Fortuner 2024 features a 2.8L GD diesel engine producing 204 bhp with 4WD capability. Comes with 8 inch touchscreen, dual zone climate control, power adjustable front seats, panoramic view monitor, trailer sway control and Toyota Safety Sense with pre collision system."
  },
  {
    name: "Grand Vitara",
    brand: "Maruti Suzuki",
    pricePerDay: 2800,
    fuelType: "Petrol",
    transmission: "Automatic",
    seats: 5,
    available: true,
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/134297/grand-vitara-exterior-right-front-three-quarter-4.jpeg?isig=0&q=80",
    description: "Maruti Suzuki's premium hybrid SUV offering exceptional fuel efficiency. Grand Vitara 2024 comes with a 1.5L strong hybrid system producing 116 bhp with an incredible 27.97 km/l fuel efficiency. Features a 9 inch Suzuki Connect infotainment, head up display, 360 view camera, ventilated seats, wireless charger and AllGrip AWD option for versatile driving."
  },
];

const testUsers = [
  { name: "Rahul Sharma", email: "rahul.sharma@gmail.com", password: "password123", role: "customer" },
  { name: "Priya Verma", email: "priya.verma@gmail.com", password: "password123", role: "customer" },
  { name: "Aman Singh", email: "aman.singh@gmail.com", password: "password123", role: "customer" },
  { name: "Neha Gupta", email: "neha.gupta@gmail.com", password: "password123", role: "customer" },
  { name: "Vikram Patel", email: "vikram.patel@gmail.com", password: "password123", role: "customer" },
];

const importData = async () => {
  try {
    // Clear existing data except admin users
    await Car.deleteMany();
    await Booking.deleteMany();
    
    // Keep existing users, just delete test users
    await User.deleteMany({ role: "customer", email: { $in: testUsers.map(u => u.email) } });

    console.log("✅ Old data cleared");

    // Insert cars
    const createdCars = await Car.insertMany(cars);
    console.log("✅ 8 Indian cars added");

    // Create test users
    const createdUsers = [];
    for (const userData of testUsers) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      const user = await User.create({ ...userData, password: hashedPassword });
      createdUsers.push(user);
    }
    console.log("✅ 5 test users created");

    // Create 20 bookings with different statuses
    const bookings = [
      // Rahul's bookings
      { user: createdUsers[0]._id, car: createdCars[0]._id, startDate: new Date("2026-03-01"), endDate: new Date("2026-03-03"), totalPrice: 2400, status: "completed" },
      { user: createdUsers[0]._id, car: createdCars[1]._id, startDate: new Date("2026-03-10"), endDate: new Date("2026-03-12"), totalPrice: 4400, status: "confirmed" },
      { user: createdUsers[0]._id, car: createdCars[6]._id, startDate: new Date("2026-04-01"), endDate: new Date("2026-04-03"), totalPrice: 11000, status: "pending" },

      // Priya's bookings
      { user: createdUsers[1]._id, car: createdCars[5]._id, startDate: new Date("2026-02-15"), endDate: new Date("2026-02-18"), totalPrice: 12000, status: "completed" },
      { user: createdUsers[1]._id, car: createdCars[2]._id, startDate: new Date("2026-03-20"), endDate: new Date("2026-03-22"), totalPrice: 3600, status: "confirmed" },
      { user: createdUsers[1]._id, car: createdCars[4]._id, startDate: new Date("2026-04-05"), endDate: new Date("2026-04-07"), totalPrice: 5000, status: "pending" },
      { user: createdUsers[1]._id, car: createdCars[7]._id, startDate: new Date("2026-03-05"), endDate: new Date("2026-03-07"), totalPrice: 5600, status: "cancelled" },

      // Aman's bookings
      { user: createdUsers[2]._id, car: createdCars[3]._id, startDate: new Date("2026-02-20"), endDate: new Date("2026-02-23"), totalPrice: 9600, status: "completed" },
      { user: createdUsers[2]._id, car: createdCars[1]._id, startDate: new Date("2026-03-15"), endDate: new Date("2026-03-17"), totalPrice: 4400, status: "confirmed" },
      { user: createdUsers[2]._id, car: createdCars[0]._id, startDate: new Date("2026-04-10"), endDate: new Date("2026-04-12"), totalPrice: 2400, status: "pending" },
      { user: createdUsers[2]._id, car: createdCars[5]._id, startDate: new Date("2026-03-01"), endDate: new Date("2026-03-02"), totalPrice: 4000, status: "cancelled" },

      // Neha's bookings
      { user: createdUsers[3]._id, car: createdCars[4]._id, startDate: new Date("2026-02-10"), endDate: new Date("2026-02-12"), totalPrice: 5000, status: "completed" },
      { user: createdUsers[3]._id, car: createdCars[7]._id, startDate: new Date("2026-03-18"), endDate: new Date("2026-03-20"), totalPrice: 5600, status: "confirmed" },
      { user: createdUsers[3]._id, car: createdCars[2]._id, startDate: new Date("2026-04-15"), endDate: new Date("2026-04-17"), totalPrice: 3600, status: "pending" },
      { user: createdUsers[3]._id, car: createdCars[6]._id, startDate: new Date("2026-03-08"), endDate: new Date("2026-03-10"), totalPrice: 11000, status: "cancelled" },

      // Vikram's bookings
      { user: createdUsers[4]._id, car: createdCars[6]._id, startDate: new Date("2026-02-25"), endDate: new Date("2026-02-27"), totalPrice: 11000, status: "completed" },
      { user: createdUsers[4]._id, car: createdCars[3]._id, startDate: new Date("2026-03-22"), endDate: new Date("2026-03-24"), totalPrice: 6400, status: "confirmed" },
      { user: createdUsers[4]._id, car: createdCars[1]._id, startDate: new Date("2026-04-20"), endDate: new Date("2026-04-22"), totalPrice: 4400, status: "pending" },
      { user: createdUsers[4]._id, car: createdCars[0]._id, startDate: new Date("2026-03-12"), endDate: new Date("2026-03-13"), totalPrice: 1200, status: "cancelled" },
      { user: createdUsers[4]._id, car: createdCars[5]._id, startDate: new Date("2026-04-25"), endDate: new Date("2026-04-27"), totalPrice: 8000, status: "pending" },
    ];

    await Booking.insertMany(bookings);
    console.log("✅ 20 bookings created");

    console.log("\n🎉 All data seeded successfully!");
    console.log("📊 Summary:");
    console.log("   - 8 Indian cars");
    console.log("   - 5 test users");
    console.log("   - 20 bookings (5 completed, 5 confirmed, 5 pending, 5 cancelled)");
    console.log("\n🔑 Test user login: rahul.sharma@gmail.com / password123");
    
    process.exit();
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

importData();
