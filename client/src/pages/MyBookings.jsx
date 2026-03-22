import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import toast from "react-hot-toast";
import Footer from "../components/Footer";

const fmt = d => new Date(d).toLocaleDateString("en-IN", { day:"2-digit", month:"short", year:"numeric" });

const statusClass = s => ({ pending:"badge-pending", confirmed:"badge-confirmed", cancelled:"badge-cancelled", completed:"badge-completed" }[s] || "");

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/bookings/my");
      setBookings(Array.isArray(res.data) ? res.data : []);
    } catch { setBookings([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const cancelBooking = async id => {
    if (!window.confirm("Cancel this booking?")) return;
    try {
      setCancelling(id);
      await axios.put(`/bookings/${id}/cancel`);
      setBookings(prev => prev.map(b => b._id === id ? { ...b, status:"cancelled" } : b));
      toast.success("Booking cancelled.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Cancel failed");
    } finally { setCancelling(null); }
  };

  return (
    <div>
      <div style={{ padding:"60px 0 0" }}>
        <div className="container">
          <div className="page-header">
            <h1 className="page-title">My Bookings</h1>
            <p className="page-sub">Track all your past and upcoming car rentals</p>
          </div>

          {loading && <div className="page-loader">Loading bookings...</div>}

          {!loading && bookings.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <div className="empty-title">No bookings yet</div>
              <div className="empty-sub">Find a car you love and make your first booking!</div>
              <button className="btn-primary" style={{marginTop:20}} onClick={() => window.location.href="/cars"}>
                Browse Cars →
              </button>
            </div>
          )}

          {!loading && bookings.length > 0 && (
            <div className="bookings-grid">
              {bookings.map(b => (
                <div className="booking-card fade-up" key={b._id}>
                  <div className="booking-card-head">
                    <div>
                      <div className="booking-car-name">{b.car?.name || "Car Removed"}</div>
                      <div className="booking-car-brand">{b.car?.brand || ""}</div>
                    </div>
                    <span className={`badge ${statusClass(b.status)}`}>{b.status}</span>
                  </div>

                  <div className="booking-meta">
                    📅 {fmt(b.startDate)} → {fmt(b.endDate)}
                  </div>

                  <div className="booking-price-val">₹{b.totalPrice}</div>

                  {b.status === "confirmed" && (
                    <div style={{ background:"rgba(34,197,94,0.08)", border:"1px solid rgba(34,197,94,0.2)", borderRadius:9, padding:"10px 14px", fontSize:"0.85rem", color:"var(--success)", marginBottom:8 }}>
                      ✅ Your booking has been confirmed by the admin!
                    </div>
                  )}

                  {b.status === "completed" && (
                    <div style={{ background:"rgba(56,189,248,0.08)", border:"1px solid rgba(56,189,248,0.2)", borderRadius:9, padding:"10px 14px", fontSize:"0.85rem", color:"var(--info)", marginBottom:8 }}>
                      🏁 This rental has been completed. Hope you enjoyed the ride!
                    </div>
                  )}

                  {(b.status === "pending" || b.status === "confirmed") && (
                    <div className="booking-actions">
                      <button className="btn-danger btn-sm" disabled={cancelling === b._id} onClick={() => cancelBooking(b._id)}>
                        {cancelling === b._id ? "Cancelling..." : "Cancel Booking"}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div style={{ marginTop:60 }}><Footer /></div>
    </div>
  );
};
export default MyBookings;
