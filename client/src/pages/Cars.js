import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import Footer from "../components/Footer";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/cars")
      .then(res => setCars(Array.isArray(res.data) ? res.data.filter(c => c.available) : []))
      .catch(() => setCars([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = cars.filter(c =>
    `${c.name} ${c.brand} ${c.fuelType}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div style={{ background:"var(--surface)", borderBottom:"1px solid var(--border)", padding:"48px 0 40px" }}>
        <div className="container">
          <div className="section-label">Fleet</div>
          <h1 style={{ fontSize:"2.2rem", fontWeight:800, letterSpacing:"-1px", marginBottom:16 }}>Browse All Cars</h1>
          <input
            placeholder="Search by name, brand or fuel type..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ maxWidth:460, background:"var(--card)" }}
          />
        </div>
      </div>

      <div style={{ padding:"48px 0 80px" }}>
        <div className="container">
          {loading && <div className="page-loader">Loading fleet...</div>}

          {!loading && filtered.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <div className="empty-title">No cars found</div>
              <div className="empty-sub">Try a different search term.</div>
            </div>
          )}

          {!loading && filtered.length > 0 && (
            <div className="car-grid">
              {filtered.map((car, i) => (
                <div
                  className="car-card fade-up"
                  key={car._id || i}
                  onClick={() => navigate(`/cars/${car._id}`)}
                  style={{ cursor:"pointer" }}
                >
                  {/* Car Image */}
                  <div className="car-img-wrap">
                    <img
                      src={car.image}
                      alt={car.name}
                      onError={e => {
                        e.target.src = "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80";
                      }}
                    />
                    <div className="car-avail-badge">
                      <span className="dot-green" />Available
                    </div>
                  </div>

                  {/* Car Body */}
                  <div className="car-body">
                    <div className="car-name">{car.name}</div>
                    <div className="car-brand">{car.brand}</div>

                    {/* Short Description */}
                    {car.description && (
                      <p style={{
                        fontSize: "0.82rem",
                        color: "var(--muted)",
                        lineHeight: 1.6,
                        margin: "10px 0 12px",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }}>
                        {car.description}
                      </p>
                    )}

                    {/* Specs */}
                    <div className="car-specs">
                      <span className="spec-item">⛽ {car.fuelType}</span>
                      <span className="spec-item">⚙️ {car.transmission}</span>
                      <span className="spec-item">🪑 {car.seats} seats</span>
                    </div>

                    {/* Footer */}
                    <div className="car-footer">
                      <div className="car-price">
                        ₹{car.pricePerDay}<span>/day</span>
                      </div>
                      <button
                        className="btn-primary btn-sm"
                        onClick={e => { e.stopPropagation(); navigate(`/cars/${car._id}`); }}
                      >
                        Book Now →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Cars;
