import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api.js";

const SERVICE_NAME = "KSRTC Bus Service";

const emptyForm = {
  name: SERVICE_NAME,
  destinationPlace: "",
  leavingTime: "",
};

export default function TravelAgenciesAdmin() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      alert("Admin access required.");
      navigate("/dashboard");
      return;
    }
    load();
  }, [navigate]);

  const load = async () => {
    try {
      const res = await axios.get(API_ENDPOINTS.TRAVEL_AGENCIES);
      setItems(res.data);
    } catch (e) {
      console.error("Failed to load travel agencies:", e);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toPayload = () => ({
    name: form.name?.trim() || SERVICE_NAME,
    description: form.destinationPlace ? `KSRTC bus service towards ${form.destinationPlace}` : "",
    images: [],
    location: {},
    contact: {},
    routes: "",
    destinationPlace: form.destinationPlace,
    leavingTime: form.leavingTime,
  });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.destinationPlace.trim()) {
      alert("Destination is required");
      return;
    }
    if (!form.leavingTime.trim()) {
      alert("Leaving timing is required");
      return;
    }
    const payload = toPayload();
    try {
      if (editingId) {
        await axios.put(`${API_ENDPOINTS.TRAVEL_AGENCIES}/${editingId}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Travel agency updated successfully!");
      } else {
        await axios.post(API_ENDPOINTS.TRAVEL_AGENCIES, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Travel agency created successfully!");
      }
      setForm(emptyForm);
      setEditingId(null);
      await load();
    } catch (err) {
      console.error("Travel agency operation failed:", err);
      alert(err?.response?.data?.error || err?.response?.data?.message || err.message);
    }
  };

  const edit = (item) => {
    setEditingId(item._id);
    setForm({
      name: item.name || SERVICE_NAME,
      destinationPlace: item.destinationPlace || "",
      leavingTime: item.leavingTime || "",
    });
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this travel agency?")) return;
    try {
      await axios.delete(`${API_ENDPOINTS.TRAVEL_AGENCIES}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await load();
    } catch (e) {
      console.error("Failed to delete:", e);
      alert("Failed to delete. Please try again.");
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-center">
          <h1>KSRTC Schedules</h1>
          <p>Maintain destination wise departure timings.</p>
        </div>
      </div>

      <form onSubmit={submit} className="admin-form hospital-admin-form">
        <section>
          <h3>Schedule Details</h3>
          <div className="grid2">
            <div className="full">
              <label>Destination Place</label>
              <input className="in" name="destinationPlace" value={form.destinationPlace} onChange={handleChange} placeholder="e.g. Belagavi" />
            </div>
            <div className="full">
              <label>KSRTC Departure Timings</label>
              <textarea
                className="in"
                name="leavingTime"
                value={form.leavingTime}
                onChange={handleChange}
                placeholder={"06:30 AM\n08:00 AM\n10:30 AM"}
                rows={5}
                style={{ resize: "vertical" }}
              />
              <small style={{ display: "block", marginTop: 4, color: "#6b7280" }}>
                Use a new line for each timing.
              </small>
            </div>
          </div>
        </section>

        <button type="submit" className="explore-btn active hospital-submit-btn">
          {editingId ? "Update Schedule" : "Add Schedule"}
        </button>
      </form>

      <div className="city-grid" style={{ marginTop: 24 }}>
        {items.map((item) => (
          <div key={item._id} className="city-card">
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontWeight: 700, fontSize: 18 }}>{item.destinationPlace || "Destination pending"}</div>
              {item.leavingTime && (
                <pre style={{ marginTop: 8, color: "#374151", background: "#f3f4f6", padding: 12, borderRadius: 8, whiteSpace: "pre-wrap" }}>
                  {item.leavingTime}
                </pre>
              )}
            </div>
            <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
              <button className="explore-btn active" onClick={() => edit(item)}>Edit</button>
              <button className="explore-btn" onClick={() => remove(item._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <footer>
        <button className="footer-btn" onClick={() => navigate("/admin")}>← Admin Home</button>
        <button className="footer-btn" onClick={() => navigate("/feature/travel-agencies")}>View Public Page</button>
      </footer>
    </div>
  );
}
