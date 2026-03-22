const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Car = require("./models/car");
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
    description: "India's best-selling hatchback. Peppy 1.2L petrol engine, sporty looks, and excellent fuel efficiency of 23 km/l make it perfect for city drives and weekend getaways."
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
    description: "India's most loved compact SUV. Spacious cabin, panoramic sunroof, powerful 1.5L diesel engine delivering 21 km/l. Ideal for highways and family trips."
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
    description: "5-star NCAP safety rated SUV. Bold design, turbocharged 1.2L petrol engine, connected car tech and smooth AMT gearbox for urban convenience."
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
    description: "The iconic off-road legend. Hardtop convertible, 4x4 with low-range transfer case, 2.2L mHawk diesel. Built for adventure, mountains, and rugged terrain."
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
    description: "Feature-loaded premium SUV with Bose sound system, 10.25 inch touchscreen, ADAS safety and 1.5L turbo petrol engine. Perfect blend of luxury and performance."
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
    description: "India's most trusted 7-seater MPV. Captain seats, 2.4L diesel with 150PS, rock-solid reliability and premium interiors for business and family travel."
  },
];

const importData = async () => {
  await Car.deleteMany();
  await Car.insertMany(cars);
  console.log("✅ 6 Indian cars added successfully!");
  process.exit();
};

importData();
