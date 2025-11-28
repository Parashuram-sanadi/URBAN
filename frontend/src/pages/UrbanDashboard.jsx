import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  { icon: "🗺️", title: "Map", slug: "map", desc: "Explore and locate destinations." },
  { icon: "🎓", title: "Educational Institutions", slug: "education", desc: "Schools and colleges." },
  { icon: "🏥", title: "Hospitals", slug: "hospitals", desc: "Medical facilities and emergency services." },
  { icon: "🏛️", title: "Government Offices", slug: "government-offices", desc: "Administrative and civic services." },
  { icon: "🏦", title: "Banking Details", slug: "banking", desc: "Financial institutions and services." },
  { icon: "🍽️", title: "Hotels & Restaurants", slug: "hotels-restaurants", desc: "Dining and accommodation." },
  { icon: "🛕", title: "Religious Spots", slug: "utilities", desc: "Temples and cultural highlights." },
  { icon: "🏧", title: "ATM Spots", slug: "atm-spots", desc: "Locate nearby ATMs." },
  { icon: "🚌", title: "Government Bus Services", slug: "travel-agencies", desc: "KSRTC schedules and routes." },
  { icon: "🛍️", title: "Essential Spots", slug: "famous-shops", desc: "Explore popular shopping destinations." },
];

export default function UrbanDashboard() {
  const navigate = useNavigate();
  const [showLoginInfo, setShowLoginInfo] = useState(false);
  const dropdownRef = useRef(null);
  const user = localStorage.getItem("urbanGuideUser");
  const displayUser = user || "Guest";

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowLoginInfo(false);
      }
    }

    if (showLoginInfo) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLoginInfo]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("urbanGuideUser");
    setShowLoginInfo(false);
    navigate("/");
  };

  return (
    <div className="urban-dashboard">
      <header className="dashboard-header">
        <div>
          <h1>Urban Guide</h1>
          <h2>The City Explorer</h2>
          <p>Hello, <strong>{displayUser}</strong>!</p>
        </div>
        <div className="login-info-wrapper" ref={dropdownRef}>
          <button
            type="button"
            className="login-info-btn"
            onClick={() => setShowLoginInfo((prev) => !prev)}
          >
            Login Info
          </button>
          {showLoginInfo && (
            <div className="login-info-dropdown">
              <div className="login-info-email">
                <span className="login-info-label">Signed in as</span>
                <span className="login-info-value">{displayUser}</span>
              </div>
              <button type="button" className="dropdown-logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="city-grid">
        {categories.map((cat) => (
          <div key={cat.title} className="city-card">
            <div className="card-icon">{cat.icon}</div>
            <div className="card-title">{cat.title}</div>
            <div className="card-desc">{cat.desc}</div>
            <button
              className="explore-btn active"
              onClick={() => navigate(`/feature/${cat.slug}`)}
            >
              EXPLORE ALL
            </button>
          </div>
        ))}
      </main>

      <footer>
        <button onClick={() => navigate("/dashboard")} className="footer-btn">
          ← Back to Cities
        </button>
        <button className="footer-btn" onClick={() => navigate("/report-updates")}>Share Reviews</button>
      </footer>
    </div>
  );
}
