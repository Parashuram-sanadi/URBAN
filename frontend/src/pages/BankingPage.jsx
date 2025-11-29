import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api.js";

export default function BankingPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(API_ENDPOINTS.BANKING);
        setItems(res.data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div className="dashboard">Loading banks...</div>;

  const normalizedSearch = search.trim().toLowerCase();
  const filteredItems = normalizedSearch
    ? items.filter((item) => (item.name || "").toLowerCase().includes(normalizedSearch))
    : items;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-center">
          <h1>Banking Details</h1>
          <p>Banks, branches, and financial services.</p>
        </div>
      </div>

      <div className="search-box" style={{ margin: "0 auto 24px", maxWidth: 420 }}>
        <input
          type="text"
          placeholder="Search bank name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredItems.length === 0 ? (
        <p style={{ textAlign: "center", color: "#6b7280" }}>No banks match your search.</p>
      ) : (
        <div className="city-grid">
          {filteredItems.map((b) => (
            <div key={b._id} className="city-card">
              {b.images?.[0] && (
                <img
                  src={b.images[0]}
                  alt={b.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/600x300?text=No+Image";
                  }}
                  style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 8 }}
                />
              )}
              <h3 style={{ marginTop: 8 }}>{b.name}</h3>
              {b.timing && <p>Timing: {b.timing}</p>}
              <p style={{ minHeight: 40 }}>{b.description}</p>
              <button className="explore-btn active" onClick={() => navigate(`/feature/banking/${b._id}`)}>View Details</button>
              {b.location?.latitude && b.location?.longitude && (
                <button className="explore-btn" onClick={() => navigate(`/feature/banking/${b._id}?view=map`)}>View on Map</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

