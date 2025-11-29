import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api.js";

export default function FamousShopsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(API_ENDPOINTS.FAMOUS_SHOPS);
        setItems(res.data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div className="dashboard">Loading shops...</div>;

  const normalizedSearch = search.trim().toLowerCase();
  const filteredItems = normalizedSearch
    ? items.filter((item) => (item.name || "").toLowerCase().includes(normalizedSearch))
    : items;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-center">
          <h1>Essential Spots</h1>
          <p>Popular shopping destinations and markets.</p>
        </div>
      </div>

      <div className="search-box" style={{ margin: "0 auto 24px", maxWidth: 420 }}>
        <input
          type="text"
          placeholder="Search shop name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredItems.length === 0 ? (
        <p style={{ textAlign: "center", color: "#6b7280" }}>No shops match your search.</p>
      ) : (
        <div className="city-grid">
          {filteredItems.map((s) => (
            <div key={s._id} className="city-card">
              {s.images?.[0] && (
                <img
                  src={s.images[0]}
                  alt={s.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/600x300?text=No+Image";
                  }}
                  style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 8 }}
                />
              )}
              <h3 style={{ marginTop: 8 }}>{s.name}</h3>
              <p>{s.type || "mall"}</p>
              {s.timings && <p>Timings: {s.timings}</p>}
              <p style={{ minHeight: 40 }}>{s.description}</p>
              <button className="explore-btn active" onClick={() => navigate(`/feature/famous-shops/${s._id}`)}>View Details</button>
              {s.location?.latitude && s.location?.longitude && (
                <button className="explore-btn" onClick={() => navigate(`/feature/famous-shops/${s._id}?view=map`)}>View on Map</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

