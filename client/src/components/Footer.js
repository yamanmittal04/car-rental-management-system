import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand-name">🚗 <span>Drive</span>Premium</div>
            <p className="footer-desc">Premium car rental with a wide selection of vehicles. Drive your dream car today — affordable, reliable, and hassle-free.</p>
          </div>
          <div className="footer-col">
            <h5>Navigate</h5>
            <ul>
              <li onClick={() => navigate("/")}>Home</li>
              <li onClick={() => navigate("/cars")}>Browse Cars</li>
              <li onClick={() => navigate("/my-bookings")}>My Bookings</li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Company</h5>
            <ul>
              <li>About Us</li>
              <li>Help Center</li>
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Contact</h5>
            <ul>
              <li>Chandigarh, India</li>
              <li>+91 98765 43210</li>
              <li>hello@drivepremium.in</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 DrivePremium. All rights reserved.</span>
          <span>Made with ❤️ in India</span>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
