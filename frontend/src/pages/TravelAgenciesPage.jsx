import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api.js";

export default function TravelAgenciesPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get("API_ENDPOINTS.TRAVEL_AGENCIES");
        setItems(res.data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div className="dashboard">Loading travel agencies...</div>;

  const normalizedSearch = search.trim().toLowerCase();
  const filteredItems = normalizedSearch
    ? items.filter((t) => (t.destinationPlace || t.name || "").toLowerCase().includes(normalizedSearch))
    : items;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-center">
          <h1>Government Bus Services</h1>
          <p>Browse destinations and check KSRTC departure timings.</p>
        </div>
      </div>

      <div className="search-box" style={{ margin: "0 auto 24px", maxWidth: 420 }}>
        <input
          type="text"
          placeholder="Search destination..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredItems.length === 0 ? (
        <p style={{ textAlign: "center", color: "#6b7280" }}>No destinations match your search.</p>
      ) : (
        <div className="city-grid">
          {filteredItems.map((t) => (
            <div key={t._id} className="city-card" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              <div style={{ fontWeight: 700, fontSize: 18 }}>{t.destinationPlace || "Destination pending"}</div>
              <button className="explore-btn active" style={{ marginTop: 16 }} onClick={() => navigate(`/feature/travel-agencies/${t._id}`)}>
                Know Timing
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

