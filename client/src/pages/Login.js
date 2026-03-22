import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "../api/axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/auth/login", { email, password });
      login(data);
      toast.success(`Welcome back, ${data.name}!`);
      navigate(data.role === "admin" ? "/admin" : from, { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div style={{ minHeight:"100vh", display:"grid", gridTemplateColumns:"1fr 1fr" }}>

      {/* LEFT — Car photo */}
      <div style={{ position:"relative", minHeight:"100vh", overflow:"hidden", background:"#0f172a" }}>
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80"
          alt="Car"
          style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", zIndex:0 }}
        />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,rgba(15,23,42,0.72) 0%,rgba(30,58,95,0.52) 100%)", zIndex:1 }} />
        <div style={{ position:"absolute", bottom:52, left:44, right:44, zIndex:2 }}>
          <p style={{ fontFamily:"'Syne',sans-serif", fontSize:"2rem", fontWeight:800, lineHeight:1.2, marginBottom:14, color:"#fff" }}>
            Drive your <span style={{ color:"#60a5fa" }}>dream car</span> — book in seconds.
          </p>
          <p style={{ color:"rgba(255,255,255,0.55)", fontSize:"0.9rem" }}>
            Join thousands of drivers across India
          </p>
        </div>
      </div>

      {/* RIGHT — Form */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", padding:"60px 52px", background:"#fff" }}>
        <div style={{ width:"100%", maxWidth:400 }}>
          <div className="auth-logo" onClick={() => navigate("/")}>🚗 <span>Drive</span>Premium</div>
          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-sub">Sign in to manage your bookings and explore our fleet.</p>

          {/* GOOGLE LOGIN BUTTON */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            style={{
              width:"100%",
              padding:"12px 20px",
              background:"#fff",
              color:"#374151",
              border:"1.5px solid #e2e8f0",
              borderRadius:10,
              fontSize:"0.92rem",
              fontWeight:600,
              cursor:"pointer",
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              gap:12,
              marginBottom:20,
              transition:"all 0.2s",
              boxShadow:"0 1px 4px rgba(0,0,0,0.06)",
              fontFamily:"'DM Sans',sans-serif"
            }}
            onMouseOver={e => e.currentTarget.style.borderColor="#2563eb"}
            onMouseOut={e => e.currentTarget.style.borderColor="#e2e8f0"}
          >
            {/* Google G Logo */}
            <svg width="20" height="20" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              <path fill="none" d="M0 0h48v48H0z"/>
            </svg>
            Continue with Google
          </button>

          {/* DIVIDER */}
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
            <div style={{ flex:1, height:1, background:"#e2e8f0" }} />
            <span style={{ fontSize:"0.8rem", color:"#94a3b8", fontWeight:500 }}>or sign in with email</span>
            <div style={{ flex:1, height:1, background:"#e2e8f0" }} />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn-primary btn-full" style={{ marginTop:8 }} disabled={loading}>
              {loading ? "Signing in..." : "Sign In →"}
            </button>
          </form>

          <div className="auth-footer-link">
            Don't have an account? <Link to="/register">Create one free</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
