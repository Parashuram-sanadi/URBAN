import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api.js";

export default function GovernmentOfficesPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(API_ENDPOINTS.GOV_OFFICES);
        setItems(res.data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div className="dashboard">Loading...</div>;

  const normalizedSearch = search.trim().toLowerCase();
  const filteredItems = normalizedSearch
    ? items.filter((item) => (item.name || "").toLowerCase().includes(normalizedSearch))
    : items;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-center">
          <h1>Government Offices</h1>
          <p>Administrative and civic service centers.</p>
        </div>
      </div>

      <div className="search-box" style={{ margin: "0 auto 24px", maxWidth: 420 }}>
        <input
          type="text"
          placeholder="Search office name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredItems.length === 0 ? (
        <p style={{ textAlign: "center", color: "#6b7280" }}>No offices match your search.</p>
      ) : (
        <div className="city-grid">
          {filteredItems.map((it) => (
            <div key={it._id} className="city-card">
              {it.images?.[0] && (
                <img
                  src={it.images[0]}
                  alt={it.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/600x300?text=No+Image";
                  }}
                  style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 8 }}
                />
              )}
              <h3 style={{ marginTop: 8 }}>{it.name}</h3>
              <p>{it.type}</p>
              <p style={{ minHeight: 40 }}>{it.description}</p>
              <button className="explore-btn active" onClick={() => navigate(`/feature/government-offices/${it._id}`)}>View Details</button>
              {it.location?.latitude && it.location?.longitude && (
                <button className="explore-btn" onClick={() => navigate(`/feature/government-offices/${it._id}?view=map`)}>View on Map</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


