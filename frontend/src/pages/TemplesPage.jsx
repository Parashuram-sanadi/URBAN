import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api.js";

export default function TemplesPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get("API_ENDPOINTS.TEMPLES");
        setItems(res.data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div className="dashboard">Loading temples...</div>;

  const normalizedSearch = search.trim().toLowerCase();
  const filteredItems = normalizedSearch
    ? items.filter((item) => (item.name || "").toLowerCase().includes(normalizedSearch))
    : items;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-center">
          <h1>Temples</h1>
          <p>Explore spiritual destinations.</p>
        </div>
      </div>

      <div className="search-box" style={{ margin: "0 auto 24px", maxWidth: 420 }}>
        <input
          type="text"
          placeholder="Search temple name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredItems.length === 0 ? (
        <p style={{ textAlign: "center", color: "#6b7280" }}>No temples match your search.</p>
      ) : (
        <div className="city-grid">
          {filteredItems.map((t) => (
            <div key={t._id} className="city-card">
              {t.images?.[0] && (
                <img src={t.images[0]} alt={t.name} referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/600x300?text=No+Image"; }} style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 8 }} />
              )}
              <h3 style={{ marginTop: 8 }}>{t.name}</h3>
              <p>{t.deity}</p>
              <p style={{ minHeight: 40 }}>{t.description}</p>
              <button className="explore-btn active" onClick={() => navigate(`/feature/temples/${t._id}`)}>View Details</button>
              {t.location?.latitude && t.location?.longitude && (
                <button className="explore-btn" onClick={() => navigate(`/feature/temples/${t._id}?view=map`)}>View on Map</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


