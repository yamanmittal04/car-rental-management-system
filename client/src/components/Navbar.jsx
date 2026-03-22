import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);
  const isActive = (path) => location.pathname === path ? "active-link" : "";
  const handleLogout = () => { logout(); navigate("/"); };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate("/")}>
        🚗 <span>Drive</span>Premium
      </div>
      <div className="nav-links">
        <Link className={isActive("/")} to="/">Home</Link>
        <Link className={isActive("/cars")} to="/cars">Browse Cars</Link>
        {user ? (
          <>
            {!user.isAdmin && (
  <Link className={isActive("/my-bookings")} to="/my-bookings">My Bookings</Link>
)}
            {user.isAdmin && <Link className={isActive("/admin")} to="/admin">Admin Panel</Link>}
            <button className="logout-btn btn-sm" style={{marginLeft:4}} onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login"><button className="btn-ghost btn-sm">Login</button></Link>
            <Link to="/register"><button className="login-btn btn-sm" style={{marginLeft:4}}>Register Free</button></Link>
          </>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
