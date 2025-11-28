// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style.css";
import { API_ENDPOINTS } from "../config/api.js";

export default function Dashboard() {
  const [cities, setCities] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const user = localStorage.getItem("urbanGuideUser");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch(API_ENDPOINTS.CITIES, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
          alert("Session expired. Please log in again.");
          localStorage.removeItem("token");
          localStorage.removeItem("urbanGuideUser");
          navigate("/");
          return;
        }

        const data = await res.json();
        setCities(data);
      } catch (err) {
        console.error("Error fetching cities:", err);
        alert("Unable to load cities. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("urbanGuideUser");
    navigate("/");
  };

  const filteredCities = cities.filter((c) =>
    c.name?.toLowerCase().includes(filter.toLowerCase())
  );

  if (loading) {
    return <div className="dashboard">Loading cities...</div>;
  }

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-center">
          <h1>Welcome to Urban Guide</h1>
          <p>Hello, <strong>{user || "Guest"}</strong>!</p>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Search box */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search for your city..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {/* Cities grid */}
      <div className="city-grid">
        {filteredCities.length > 0 ? (
          filteredCities.map((city) => {
            const displayName = city.name;
            const isChikodi = city.name.toLowerCase() === "chikodi";
            return (
              <div className="city-card" key={city._id}>
                <h3>{displayName}</h3>

                {isChikodi ? (
                  <button
                    className="explore-btn active"
                    onClick={() => navigate("/urban-dashboard")}
                  >
                    Explore {displayName}
                  </button>
                ) : (
                  <button className="explore-btn disabled" disabled>
                    Explore {displayName} (Coming soon)
                  </button>
                )}
              </div>
            );
          })
        ) : (
          <p>No cities available at the moment.</p>
        )}
      </div>
    </div>
  );
}
