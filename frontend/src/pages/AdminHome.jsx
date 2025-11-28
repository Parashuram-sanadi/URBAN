import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FEATURES = [
  { title: "Map", slug: "map", icon: "🗺️" },
  { title: "Car Rentals", slug: "car-rentals", icon: "🚗" },
  { title: "Educational Institutions", slug: "education", icon: "🎓" },
  { title: "Hospitals", slug: "hospitals", icon: "🏥" },
  { title: "Government Offices", slug: "government-offices", icon: "🏛️" },
  { title: "Banking Details", slug: "banking", icon: "🏦" },
  { title: "Hotels & Restaurants", slug: "hotels-restaurants", icon: "🍽️" },
  { title: "Regional Spots", slug: "utilities", icon: "🛕" },
  { title: "ATM Spots", slug: "atm-spots", icon: "🏧" },
  { title: "Traveling Agencies", slug: "travel-agencies", icon: "✈️" },
  { title: "Essential Spots", slug: "famous-shops", icon: "🛍️" },
];

export default function AdminHome() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      alert("Admin access required.");
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-center">
          <h1>Admin Control Center</h1>
          <p>Manage content for each Urban Guide feature.</p>
        </div>
      </div>
      <div className="city-grid">
        {FEATURES.map((f) => (
          <div key={f.slug} className="city-card">
            <div className="card-icon">{f.icon}</div>
            <div className="card-title">{f.title}</div>
            <button className="explore-btn active" onClick={() => navigate(
              f.slug === "hospitals" ? "/admin/hospitals" :
              f.slug === "government-offices" ? "/admin/government-offices" :
              f.slug === "temples" ? "/admin/temples" :
              `/admin/${f.slug}`
            )}>
              Manage
            </button>
          </div>
        ))}
      </div>
      <footer>
        <button className="footer-btn" onClick={() => navigate("/urban-dashboard")}>← Back</button>
      </footer>
    </div>
  );
}


