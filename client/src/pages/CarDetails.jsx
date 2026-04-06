import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "../api/axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FALLBACK = "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=800&q=80";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const [car, setCar] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [bookedIntervals, setBookedIntervals] = useState([]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Load car details
  useEffect(() => {
    axios.get("/cars")
      .then(res => {
        const found = res.data.find(c => c._id === id);
        setCar(found || null);
      })
      .catch(() => toast.error("Failed to load car"));
  }, [id]);

  // Load booked date ranges for this car
  useEffect(() => {
    axios.get(`/bookings/booked-dates/${id}`)
      .then(res => {
        const intervals = res.data.map(b => ({
          start: new Date(b.startDate),
          end: new Date(b.endDate),
        }));
        setBookedIntervals(intervals);
      })
      .catch(() => {});
  }, [id]);

  // Calculate total price based on hours → days
  useEffect(() => {
    if (startDate && endDate && car) {
      const diffMs = endDate - startDate;
      const diffHours = diffMs / (1000 * 60 * 60);
      const days = Math.ceil(diffHours / 24);
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
    if (!startDate || !endDate) { toast.error("Please select both date and time"); return; }
    if (endDate <= startDate) { toast.error("Return time must be after pick-up time"); return; }

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
              <img
                src={car.image?.trim() || FALLBACK}
                alt={car.name}
                onError={e => { e.target.src = FALLBACK; }}
              />
            </div>
            <div className="details-specs" style={{ marginTop: 24 }}>
              {[
                { icon: "⛽", val: car.fuelType, key: "Fuel" },
                { icon: "🪑", val: `${car.seats} seats`, key: "Capacity" },
                { icon: "⚙️", val: car.transmission, key: "Gearbox" },
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
              <div className="booking-panel-title">📅 Select Your Dates & Time</div>

              <div className="date-row">
                {/* PICK-UP DATE & TIME */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Pick-up Date & Time</label>
                  <DatePicker
                    selected={startDate}
                    onChange={date => {
                      setStartDate(date);
                      if (endDate && date >= endDate) setEndDate(null);
                    }}
                    minDate={today}
                    excludeDateIntervals={bookedIntervals}
                    showTimeSelect
                    timeFormat="h:mm aa"
                    timeIntervals={60}
                    timeCaption="Time"
                    dateFormat="dd MMM yyyy, h:mm aa"
                    placeholderText="Select date & time"
                    className="date-picker-input"
                  />
                </div>

                {/* RETURN DATE & TIME */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Return Date & Time</label>
                  <DatePicker
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                    minDate={startDate ? new Date(startDate.getTime() + 3600000) : today}
                    excludeDateIntervals={bookedIntervals}
                    showTimeSelect
                    timeFormat="h:mm aa"
                    timeIntervals={60}
                    timeCaption="Time"
                    dateFormat="dd MMM yyyy, h:mm aa"
                    placeholderText="Select date & time"
                    className="date-picker-input"
                    disabled={!startDate}
                  />
                </div>
              </div>

              {/* Legend */}
              {bookedIntervals.length > 0 && (
                <div style={{
                  fontSize: "0.78rem",
                  color: "var(--muted)",
                  marginTop: 8,
                  display: "flex",
                  alignItems: "center",
                  gap: 6
                }}>
                  <span style={{
                    display: "inline-block",
                    width: 12,
                    height: 12,
                    borderRadius: 3,
                    background: "#fee2e2",
                    border: "1px solid #ef4444"
                  }}></span>
                  Highlighted dates are already booked
                </div>
              )}

              {/* Booking summary */}
              {startDate && endDate && totalPrice > 0 && (
                <div style={{
                  background: "#f0f4ff",
                  border: "1px solid #c7d2fe",
                  borderRadius: 10,
                  padding: "12px 16px",
                  marginTop: 12,
                  fontSize: "0.85rem",
                  color: "#3730a3"
                }}>
                  <div style={{ marginBottom: 4 }}>
                    🕐 <strong>Pick-up:</strong> {startDate.toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </div>
                  <div style={{ marginBottom: 4 }}>
                    🕐 <strong>Return:</strong> {endDate.toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </div>
                  <div style={{ borderTop: "1px solid #c7d2fe", marginTop: 8, paddingTop: 8 }}>
                    📅 <strong>Duration:</strong> {Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))} day(s)
                  </div>
                </div>
              )}

              {totalPrice > 0 && (
                <div className="total-row">
                  <span className="total-label">Total Estimate</span>
                  <span className="total-amount">₹{totalPrice}</span>
                </div>
              )}

              <button
                className="btn-primary btn-full"
                onClick={handleBook}
                disabled={loading}
              >
                {loading ? "Placing booking..." : user ? "Book Now →" : "Login to Book →"}
              </button>

              {!user && (
                <p style={{ textAlign: "center", fontSize: "0.8rem", color: "var(--muted)", marginTop: 12 }}>
                  You need an account to book.{" "}
                  <span
                    style={{ color: "var(--accent)", cursor: "pointer", fontWeight: 600 }}
                    onClick={() => navigate("/register")}
                  >
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