import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import toast from "react-hot-toast";

const fmt = d => new Date(d).toLocaleDateString("en-IN", { day:"2-digit", month:"short", year:"numeric" });
const FALLBACK = "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=800&q=80";

/* ── BOOKING TAB ── */
const BookingsTab = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [acting, setActing] = useState(null);
  const [filter, setFilter] = useState("all");

  const load = async () => {
    try { setLoading(true); const r = await axios.get("/bookings"); setBookings(Array.isArray(r.data) ? r.data : []); }
    catch { toast.error("Failed to load bookings"); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const act = async (id, action, newStatus) => {
    try {
      setActing(id + action);
      await axios.put(`/bookings/${id}/${action}`);
      setBookings(prev => prev.map(b => b._id === id ? { ...b, status: newStatus } : b));
      toast.success(`Booking ${newStatus}!`);
    } catch (err) { toast.error(err.response?.data?.message || "Action failed"); }
    finally { setActing(null); }
  };

  const shown = filter === "all" ? bookings : bookings.filter(b => b.status === filter);
  const total = bookings.length;
  const pending = bookings.filter(b => b.status === "pending").length;
  const confirmed = bookings.filter(b => b.status === "confirmed").length;
  const revenue = bookings.filter(b => b.status === "completed").reduce((s,b) => s + (b.totalPrice||0), 0);

  return (
    <div>
      {/* STATS */}
      <div className="stats-row">
        {[
          { icon:"📋", val:total, label:"Total Bookings", bg:"rgba(232,255,71,0.08)" },
          { icon:"⏳", val:pending, label:"Pending", bg:"rgba(245,158,11,0.08)" },
          { icon:"✅", val:confirmed, label:"Confirmed", bg:"rgba(34,197,94,0.08)" },
          { icon:"₹", val:`₹${revenue.toLocaleString("en-IN")}`, label:"Revenue (Completed)", bg:"rgba(56,189,248,0.08)" },
        ].map(s => (
          <div className="stat-card fade-up" key={s.label}>
            <div className="stat-icon" style={{ background:s.bg }}>{s.icon}</div>
            <div className="stat-val">{s.val}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* FILTER */}
      <div style={{ display:"flex", gap:8, marginBottom:20, flexWrap:"wrap" }}>
        {["all","pending","confirmed","completed","cancelled"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ background: filter===f ? "var(--accent)" : "var(--card)", color: filter===f ? "#0a0a0f" : "var(--muted)", border:"1px solid var(--border)", padding:"7px 16px", borderRadius:8, fontSize:"0.82rem", fontWeight:600, textTransform:"capitalize" }}>
            {f}
          </button>
        ))}
      </div>

      {loading && <div className="page-loader">Loading bookings...</div>}

      {!loading && shown.length === 0 && (
        <div className="empty-state"><div className="empty-icon">📋</div><div className="empty-title">No bookings found</div></div>
      )}

      {!loading && shown.length > 0 && (
        <div className="table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Car</th>
                <th>Dates</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {shown.map(b => (
                <tr key={b._id}>
                  <td>
                    <div style={{ fontWeight:600 }}>{b.user?.name || "—"}</div>
                    <div style={{ fontSize:"0.78rem", color:"var(--muted)" }}>{b.user?.email}</div>
                  </td>
                  <td>
                    <div style={{ fontWeight:600 }}>{b.car?.name || "Removed"}</div>
                    <div style={{ fontSize:"0.78rem", color:"var(--muted)" }}>{b.car?.brand}</div>
                  </td>
                  <td style={{ fontSize:"0.83rem", color:"var(--muted)" }}>
                    {fmt(b.startDate)} → {fmt(b.endDate)}
                  </td>
                  <td style={{ fontFamily:"'Syne',sans-serif", fontWeight:700 }}>₹{b.totalPrice}</td>
                  <td>
                    <span className={`badge badge-${b.status}`}>{b.status}</span>
                  </td>
                  <td>
                    <div className="td-actions">
                      {b.status === "pending" && (
                        <>
                          <button className="btn-success btn-sm" disabled={acting === b._id+"confirm"} onClick={() => act(b._id,"confirm","confirmed")}>
                            {acting === b._id+"confirm" ? "..." : "✅ Confirm"}
                          </button>
                          <button className="btn-danger btn-sm" disabled={acting === b._id+"admin-cancel"} onClick={() => act(b._id,"admin-cancel","cancelled")}>
                            {acting === b._id+"admin-cancel" ? "..." : "✕ Cancel"}
                          </button>
                        </>
                      )}
                      {b.status === "confirmed" && (
                        <>
                          <button className="btn-info btn-sm" disabled={acting === b._id+"complete"} onClick={() => act(b._id,"complete","completed")}>
                            {acting === b._id+"complete" ? "..." : "🏁 Complete"}
                          </button>
                          <button className="btn-danger btn-sm" disabled={acting === b._id+"admin-cancel"} onClick={() => act(b._id,"admin-cancel","cancelled")}>
                            ✕ Cancel
                          </button>
                        </>
                      )}
                      {(b.status === "completed" || b.status === "cancelled") && (
                        <span style={{ fontSize:"0.78rem", color:"var(--muted)" }}>—</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

/* ── CARS TAB ── */
const CarsTab = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [acting, setActing] = useState(null);
  const [editId, setEditId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({ name:"", brand:"", pricePerDay:"", fuelType:"", transmission:"", seats:"", description:"", image:"", imageFile:null });
  

  const load = async () => {
    try { setLoading(true); const r = await axios.get("/cars"); setCars(Array.isArray(r.data) ? r.data : []); }
    catch { toast.error("Failed to load cars"); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const reset = () => { setForm({ name:"", brand:"", pricePerDay:"", fuelType:"", transmission:"", seats:"", description:"", image:"", imageFile:null }); setEditId(null); };

  const startEdit = car => {
    setForm({ name:car.name, brand:car.brand, pricePerDay:car.pricePerDay, fuelType:car.fuelType, transmission:car.transmission, seats:car.seats, description:car.description||"", image:car.image, imageFile:null });
    setEditId(car._id);
    window.scrollTo({ top:0, behavior:"smooth" });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      let imageUrl = form.image;
      if (form.imageFile) {
        setUploading(true);
        const fd = new FormData(); fd.append("image", form.imageFile);
        const r = await axios.post("/upload", fd, { headers:{ "Content-Type":"multipart/form-data" } });
        imageUrl = r.data.url;
        setUploading(false);
      }
      if (!imageUrl) { toast.error("Image is required"); return; }
      const payload = { name:form.name, brand:form.brand, pricePerDay:Number(form.pricePerDay), fuelType:form.fuelType, transmission:form.transmission, seats:Number(form.seats), description:form.description, image:imageUrl };
      if (editId) { await axios.put(`/cars/${editId}`, payload); toast.success("Car updated!"); }
      else { await axios.post("/cars", payload); toast.success("Car added!"); }
      load(); reset();
    } catch (err) { toast.error("Save failed"); setUploading(false); }
  };

  const deleteCar = async id => {
    if (!window.confirm("Delete this car?")) return;
    try { setActing(id); await axios.delete(`/cars/${id}`); setCars(p => p.filter(c => c._id !== id)); toast.success("Car deleted"); }
    catch (err) { toast.error(err.response?.data?.message || "Delete failed"); }
    finally { setActing(null); }
  };

  const toggle = async car => {
    try {
      setActing(car._id);
      await axios.put(`/cars/${car._id}`, { available: !car.available });
      setCars(p => p.map(c => c._id === car._id ? { ...c, available:!c.available } : c));
      toast.success(`Car marked ${!car.available ? "active" : "inactive"}`);
    } catch { toast.error("Update failed"); }
    finally { setActing(null); }
  };

  return (
    <div>
      {/* ADD / EDIT FORM */}
      <div className="admin-form-card">
        <div className="admin-form-title">{editId ? "✏️ Edit Car" : "➕ Add New Car"}</div>
        <form onSubmit={handleSubmit}>
          <div className="form-row-3" style={{ marginBottom:14 }}>
            <div className="form-group" style={{marginBottom:0}}>
              <label>Car Name</label>
              <input placeholder="Swift" value={form.name} onChange={e => setForm({...form,name:e.target.value})} required />
            </div>
            <div className="form-group" style={{marginBottom:0}}>
              <label>Brand</label>
              <input placeholder="Maruti" value={form.brand} onChange={e => setForm({...form,brand:e.target.value})} required />
            </div>
            <div className="form-group" style={{marginBottom:0}}>
              <label>Price / Day (₹)</label>
              <input type="number" placeholder="1200" value={form.pricePerDay} onChange={e => setForm({...form,pricePerDay:e.target.value})} required />
            </div>
          </div>
          <div className="form-row-3" style={{ marginBottom:14 }}>
            <div className="form-group" style={{marginBottom:0}}>
              <label>Fuel Type</label>
              <select value={form.fuelType} onChange={e => setForm({...form,fuelType:e.target.value})} required>
                <option value="">Select...</option>
                <option>Petrol</option><option>Diesel</option><option>Electric</option><option>Hybrid</option>
              </select>
            </div>
            <div className="form-group" style={{marginBottom:0}}>
              <label>Transmission</label>
              <select value={form.transmission} onChange={e => setForm({...form,transmission:e.target.value})} required>
                <option value="">Select...</option>
                <option>Manual</option><option>Automatic</option>
              </select>
            </div>
            <div className="form-group" style={{marginBottom:0}}>
              <label>Seats</label>
              <input type="number" placeholder="5" value={form.seats} onChange={e => setForm({...form,seats:e.target.value})} required />
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea placeholder="Describe the car..." value={form.description} onChange={e => setForm({...form,description:e.target.value})} />
          </div>
          <div className="form-row-2">
            <div className="form-group" style={{marginBottom:0}}>
              <label>Upload Image</label>
              <input type="file" accept="image/*" onChange={e => setForm({...form,imageFile:e.target.files[0]})} style={{padding:"8px"}} />
            </div>
            <div className="form-group" style={{marginBottom:0}}>
              <label>Or Image URL</label>
              <input placeholder="https://..." value={form.image} onChange={e => setForm({...form,image:e.target.value})} />
            </div>
          </div>
          {uploading && <p style={{ color:"var(--muted)", fontSize:"0.85rem", marginTop:8 }}>⏳ Uploading image...</p>}
          <div style={{ display:"flex", gap:10, marginTop:18 }}>
            <button type="submit" className="btn-primary" disabled={uploading}>
              {editId ? "Update Car" : "Add Car"}
            </button>
            {editId && <button type="button" className="btn-outline" onClick={reset}>Cancel</button>}
          </div>
        </form>
      </div>

      {/* CAR LIST */}
      {loading ? <div className="page-loader">Loading...</div> : (
        <div className="admin-cars-grid">
          {cars.map(car => (
            <div className="admin-car-card fade-up" key={car._id}>
              <div className="admin-car-img">
                <img src={car.image?.trim() || FALLBACK} alt={car.name} onError={e => { e.target.src = FALLBACK; }} />
              </div>
              <div className="admin-car-body">
                <div className="admin-car-name">{car.name}</div>
                <div className="admin-car-brand">{car.brand}</div>
                <div className="admin-car-price">₹{car.pricePerDay}/day</div>
                <div className="avail-row">
                  <span className={car.available ? "dot-on" : "dot-off"} />
                  {car.available ? "Active" : "Inactive"}
                </div>
                <div className="admin-car-actions">
                  <button className="btn-sm btn-outline" onClick={() => startEdit(car)}>Edit</button>
                  <button
                    className="btn-sm"
                    style={{ background: car.available ? "rgba(245,158,11,0.15)" : "rgba(34,197,94,0.15)", color: car.available ? "var(--warning)" : "var(--success)", border: car.available ? "1px solid rgba(245,158,11,0.25)" : "1px solid rgba(34,197,94,0.25)" }}
                    disabled={acting === car._id}
                    onClick={() => toggle(car)}
                  >
                    {car.available ? "Deactivate" : "Activate"}
                  </button>
                  <button className="btn-sm btn-danger" disabled={acting === car._id} onClick={() => deleteCar(car._id)}>
                    {acting === car._id ? "..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ── MAIN ADMIN PAGE ── */
const AdminDashboard = () => {
  const [tab, setTab] = useState("bookings");

  return (
    <div className="admin-page">
      <div className="container">
        <div style={{ marginBottom:32 }}>
          <h1 style={{ fontSize:"2rem", fontWeight:800, marginBottom:6 }}>Admin Panel</h1>
          <p style={{ color:"var(--muted)", fontSize:"0.9rem" }}>Manage bookings and car inventory from one place</p>
        </div>

        <div className="admin-tabs">
          <button className={`admin-tab${tab==="bookings"?" active":""}`} onClick={() => setTab("bookings")}>
            📋 Bookings
          </button>
          <button className={`admin-tab${tab==="cars"?" active":""}`} onClick={() => setTab("cars")}>
            🚗 Car Management
          </button>
        </div>

        {tab === "bookings" && <BookingsTab />}
        {tab === "cars" && <CarsTab />}
      </div>
    </div>
  );
};
export default AdminDashboard;
