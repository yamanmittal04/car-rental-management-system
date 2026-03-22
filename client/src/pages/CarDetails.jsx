import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "../api/axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

const FALLBACK = "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=800&q=80";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const [car, setCar] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    axios.get("/cars")
      .then(res => {
        const found = res.data.find(c => c._id === id);
        setCar(found || null);
      })
      .catch(() => toast.error("Failed to load car"));
  }, [id]);

  useEffect(() => {
    if (startDate && endDate && car) {
      const days = Math.ceil((new Date(endDate) - new Date(startDate)) / 86400000);
      setTotalPrice(days > 0 ? days * car.pricePerDay : 0);
    } else {
      setTotalPrice(0);
    }
  }, [startDate, endDate, car]);

  const handleBook = async () => {
    if (!user) {
      toast("Please log in to book a car", { icon: "🔒" });
      navigate("/login", { state: { from: location } });
      return;
    }
    if (!startDate || !endDate) { toast.error("Please select both dates"); return; }
    if (new Date(endDate) <= new Date(startDate)) { toast.error("End date must be after start date"); return; }

    try {
      setLoading(true);
      await axios.post("/bookings", { car: car._id, startDate, endDate });
      toast.success("Booking placed! Awaiting admin confirmation.");
      navigate("/my-bookings");
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  if (!car) return <div className="page-loader">Loading car details...</div>;

  return (
    <div className="details-page">
      <div className="container">
        <div className="breadcrumb" onClick={() => navigate("/cars")}>
          ← Back to all cars
        </div>

        <div className="details-grid">
          {/* LEFT — IMAGE */}
          <div>
            <div className="details-img-wrap">
              <img src={car.image?.trim() || FALLBACK} alt={car.name} onError={e => { e.target.src = FALLBACK; }} />
            </div>
            <div className="details-specs" style={{ marginTop:24 }}>
              {[
                { icon:"⛽", val:car.fuelType, key:"Fuel" },
                { icon:"🪑", val:`${car.seats} seats`, key:"Capacity" },
                { icon:"⚙️", val:car.transmission, key:"Gearbox" },
              ].map(s => (
                <div className="spec-box" key={s.key}>
                  <div className="spec-box-icon">{s.icon}</div>
                  <div className="spec-box-val">{s.val}</div>
                  <div className="spec-box-key">{s.key}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — INFO + BOOKING */}
          <div className="details-info">
            <div className="details-make">{car.brand}</div>
            <h1 className="details-name">{car.name}</h1>
            <p className="details-desc">{car.description || "No description available."}</p>

            <div className="price-row">
              <span className="price-big">₹{car.pricePerDay}</span>
              <span className="price-per">per day</span>
            </div>

            <div className="booking-panel">
              <div className="booking-panel-title">📅 Select Your Dates</div>

              <div className="date-row">
                <div className="form-group" style={{marginBottom:0}}>
                  <label>Pick-up Date</label>
                  <input type="date" value={startDate} min={today} onChange={e => setStartDate(e.target.value)} />
                </div>
                <div className="form-group" style={{marginBottom:0}}>
                  <label>Return Date</label>
                  <input type="date" value={endDate} min={startDate || today} onChange={e => setEndDate(e.target.value)} />
                </div>
              </div>

              {totalPrice > 0 && (
                <div className="total-row">
                  <span className="total-label">Total Estimate</span>
                  <span className="total-amount">₹{totalPrice}</span>
                </div>
              )}

              <button className="btn-primary btn-full" onClick={handleBook} disabled={loading}>
                {loading ? "Placing booking..." : user ? "Book Now →" : "Login to Book →"}
              </button>

              {!user && (
                <p style={{ textAlign:"center", fontSize:"0.8rem", color:"var(--muted)", marginTop:12 }}>
                  You need an account to book.{" "}
                  <span style={{ color:"var(--accent)", cursor:"pointer", fontWeight:600 }} onClick={() => navigate("/register")}>
                    Register free →
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CarDetails;
