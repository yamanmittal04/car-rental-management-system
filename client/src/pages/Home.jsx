import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import Reviews from "../components/Reviews";
import Footer from "../components/Footer";

const INDIAN_CARS = [
  {
    name: "Maruti Swift",
    brand: "Maruti Suzuki",
    pricePerDay: 1200,
    fuelType: "Petrol",
    transmission: "Manual",
    seats: 5,
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/159087/swift-exterior-right-front-three-quarter-3.jpeg?isig=0&q=80",
    description: "India's best-selling hatchback. Peppy 1.2L petrol engine, sporty looks, and excellent fuel efficiency of 23 km/l make it perfect for city drives and weekend getaways.",
  },
  {
    name: "Hyundai Creta",
    brand: "Hyundai",
    pricePerDay: 2200,
    fuelType: "Diesel",
    transmission: "Automatic",
    seats: 5,
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/106815/creta-exterior-right-front-three-quarter-76.jpeg?isig=0&q=80",
    description: "India's most loved compact SUV. Spacious cabin, panoramic sunroof, powerful 1.5L diesel engine delivering 21 km/l. Ideal for highways and family trips.",
  },
  {
    name: "Tata Nexon",
    brand: "Tata Motors",
    pricePerDay: 1800,
    fuelType: "Petrol",
    transmission: "Automatic",
    seats: 5,
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/141867/nexon-exterior-right-front-three-quarter-4.jpeg?isig=0&q=80",
    description: "5-star NCAP safety rated SUV. Bold design, turbocharged 1.2L petrol engine, connected car tech and a smooth AMT gearbox for urban convenience.",
  },
  {
    name: "Mahindra Thar",
    brand: "Mahindra",
    pricePerDay: 3200,
    fuelType: "Diesel",
    transmission: "Manual",
    seats: 4,
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/40087/thar-exterior-right-front-three-quarter-10.jpeg?isig=0&q=80",
    description: "The iconic off-road legend. Hardtop convertible, 4x4 with low-range transfer case, 2.2L mHawk diesel. Built for adventure, mountains, and rugged terrain.",
  },
  {
    name: "Kia Seltos",
    brand: "Kia",
    pricePerDay: 2500,
    fuelType: "Petrol",
    transmission: "Automatic",
    seats: 5,
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/115777/seltos-exterior-right-front-three-quarter-5.jpeg?isig=0&q=80",
    description: "Feature-loaded premium SUV with Bose sound system, 10.25\" touchscreen, ADAS safety suite and a refined 1.5L turbo petrol engine. Perfect blend of luxury and performance.",
  },
  {
    name: "Toyota Innova Crysta",
    brand: "Toyota",
    pricePerDay: 4000,
    fuelType: "Diesel",
    transmission: "Manual",
    seats: 7,
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/51435/innova-crysta-exterior-right-front-three-quarter-2.jpeg?isig=0&q=80",
    description: "India's most trusted 7-seater MPV. Captain seats, 2.4L diesel engine with 150PS power, rock-solid reliability and premium interiors for business and family travel.",
  },
];

const Home = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/cars")
      .then(res => {
        const data = Array.isArray(res.data) ? res.data.filter(c => c.available) : [];
        if (data.length === 0) {
          setCars(INDIAN_CARS.map((c, i) => ({ ...c, _id: "demo_" + i, available: true })));
        } else {
          setCars(data);
        }
      })
      .catch(() => setCars(INDIAN_CARS.map((c, i) => ({ ...c, _id: "demo_" + i, available: true }))))
      .finally(() => setLoading(false));
  }, []);

  const handleCardClick = (car) => {
    if (car._id.startsWith("demo_")) {
      alert("Please add cars through the Admin Panel to enable booking.");
      return;
    }
    navigate(`/cars/${car._id}`);
  };

  return (
    <div>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg-img" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-eyebrow">⚡ Premium Fleet Available Now</div>
          <h1>Drive Your<br /><em>Dream Car</em><br />Today</h1>
          <p className="hero-sub">India's finest cars at unbeatable daily rates. Luxury, economy, SUVs — instant booking, no hidden fees.</p>
          <div className="hero-actions">
            <button className="hero-btn-primary" onClick={() => navigate("/cars")}>Browse All Cars →</button>
            <button className="hero-btn-outline" onClick={() => navigate("/register")}>Create Free Account</button>
          </div>
          <div className="hero-stats">
            <div><div className="hero-stat-num">50+</div><div className="hero-stat-label">Cars Available</div></div>
            <div><div className="hero-stat-num">2k+</div><div className="hero-stat-label">Happy Customers</div></div>
            <div><div className="hero-stat-num">24/7</div><div className="hero-stat-label">Support</div></div>
          </div>
        </div>
      </section>

      {/* CARS */}
      <section className="cars-section">
        <div className="container">
          <div className="section-header">
            <div className="section-label">Our Fleet</div>
            <h2 className="section-title">Popular Cars</h2>
            <p className="section-sub">Handpicked Indian favourites — from city hatchbacks to rugged SUVs</p>
          </div>

          {loading && <div className="page-loader">Loading fleet...</div>}

          {!loading && (
            <div className="car-grid">
              {cars.map((car, i) => (
                <div className="car-card fade-up" key={car._id || i} onClick={() => handleCardClick(car)}>
                  <div className="car-img-wrap">
                    <img
                      src={car.image}
                      alt={car.name}
                      onError={e => { e.target.src = "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80"; }}
                    />
                    <div className="car-avail-badge"><span className="dot-green" />Available</div>
                  </div>
                  <div className="car-body">
                    <div className="car-name">{car.name}</div>
                    <div className="car-brand">{car.brand}</div>
                    <div className="car-specs">
                      <span className="spec-item">⛽ {car.fuelType}</span>
                      <span className="spec-item">⚙️ {car.transmission}</span>
                      <span className="spec-item">🪑 {car.seats} seats</span>
                    </div>
                    <div className="car-footer">
                      <div className="car-price">₹{car.pricePerDay}<span>/day</span></div>
                      <button className="btn-primary btn-sm" onClick={e => { e.stopPropagation(); handleCardClick(car); }}>
                        View Details →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section">
        <div className="container">
          <div className="section-header">
            <div className="section-label">Process</div>
            <h2 className="section-title">How It Works</h2>
            <p className="section-sub">Book your perfect ride in three simple steps</p>
          </div>
          <div className="how-grid">
            {[
              { n:"01", icon:"🚗", title:"Choose Your Car", desc:"Browse our premium Indian fleet and pick the perfect vehicle for your journey — hatchback, sedan, or SUV." },
              { n:"02", icon:"📋", title:"Book & Register", desc:"Create a free account, select your pickup and return dates, and confirm your booking instantly online." },
              { n:"03", icon:"✅", title:"Hit the Road", desc:"Admin confirms your booking and you're good to go. Get behind the wheel and enjoy the drive!" },
            ].map(s => (
              <div className="how-card" key={s.n}>
                <div className="how-num">{s.n}</div>
                <div className="how-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Reviews />
      <Footer />
    </div>
  );
};
export default Home;
