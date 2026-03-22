import React from "react";

const reviews = [
  {
    name: "Rahul Sharma",
    location: "Delhi, India",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face&q=80",
    text: "Booked the Creta for a Shimla trip — absolutely fantastic experience. Car was spotless, AC was cold, and the booking was confirmed within minutes. Will book again for sure!",
    rating: 5,
  },
  {
    name: "Priya Verma",
    location: "Mumbai, India",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face&q=80",
    text: "Got the Innova Crysta for a family trip to Goa. 7 people, all comfortable, smooth ride throughout. The admin team was very responsive. Highly recommend DrivePremium.",
    rating: 5,
  },
  {
    name: "Aman Singh",
    location: "Chandigarh, India",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face&q=80",
    text: "Took the Mahindra Thar for a Spiti Valley trip. 4x4 worked like a dream on mountain roads. Best rental experience I've ever had — affordable and transparent pricing.",
    rating: 5,
  },
];

const Reviews = () => (
  <section className="reviews-section">
    <div className="container">
      <div className="section-header">
        <div className="section-label">Testimonials</div>
        <h2 className="section-title">What Our Customers Say</h2>
        <p className="section-sub">Real experiences from real drivers across India</p>
      </div>
      <div className="reviews-grid">
        {reviews.map((r, i) => (
          <div className="review-card fade-up" key={i}>
            <div className="review-header">
              <img
                src={r.image}
                alt={r.name}
                onError={e => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(r.name)}&background=2563eb&color=fff&size=100&bold=true&font-size=0.4`;
                }}
              />
              <div>
                <div className="reviewer-name">{r.name}</div>
                <div className="reviewer-loc">{r.location}</div>
              </div>
            </div>
            <div className="stars">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
            <p className="review-text">"{r.text}"</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
export default Reviews;
