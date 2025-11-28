import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api.js";

export default function TravelAgencyDetail() {
  const { id } = useParams();
  const [agency, setAgency] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(`${API_ENDPOINTS.TRAVEL_AGENCIES}/${id}`);
        setAgency(res.data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <div className="dashboard">Loading...</div>;
  if (!agency) return <div className="dashboard">Not found</div>;

  const formattedTimings =
    (agency.leavingTime || "")
      .split(/[\n,|]/)
      .map((val) => val.trim())
      .filter(Boolean)
      .join(", ") || "Timings not available";

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-center">
          <h1>{agency.destinationPlace || "KSRTC Route"}</h1>
          <p>KSRTC Departure Timings</p>
        </div>
      </div>

      <div className="travel-detail-card">
        <div className="travel-detail-row">
          <span className="travel-detail-label">Destination Place</span>
          <span className="travel-detail-value">{agency.destinationPlace || "Not specified"}</span>
        </div>
        <div className="travel-detail-row">
          <span className="travel-detail-label">Departure Timings</span>
          <p className="travel-detail-timings">{formattedTimings}</p>
        </div>
      </div>

      <footer>
        <button className="footer-btn" onClick={() => navigate("/feature/travel-agencies")}>
          ← Back to Travel Agencies
        </button>
      </footer>
    </div>
  );
}

