import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api.js";

const emptyForm = {
  name: "",
  description: "",
  images: "", // comma-separated URLs
  location: {
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    latitude: "",
    longitude: "",
  },
  website: "",
};

export default function ATMSpotsAdmin() {
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
      const res = await axios.get(API_ENDPOINTS.ATM_SPOTS);
      setItems(res.data);
    } catch (e) {
      console.error("Failed to load ATM spots:", e);
    }
  };

  const handleChange = (e, path) => {
    const { name, value } = e.target;
    if (path) {
      setForm((prev) => ({ ...prev, [path]: { ...prev[path], [name]: value } }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const toPayload = () => ({
    name: form.name,
    description: form.description,
    images: form.images
      .split(/[\n,]+/)
      .map((s) => s.trim())
      .filter(Boolean),
    location: {
      address: form.location.address,
      city: form.location.city,
      state: form.location.state,
      country: form.location.country,
      pincode: form.location.pincode,
      latitude: form.location.latitude ? Number(form.location.latitude) : undefined,
      longitude: form.location.longitude ? Number(form.location.longitude) : undefined,
    },
    website: form.website,
  });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      alert("ATM name is required");
      return;
    }
    const payload = toPayload();
    try {
      if (editingId) {
        await axios.put(`${API_ENDPOINTS.ATM_SPOTS}/${editingId}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("ATM spot updated successfully!");
      } else {
        await axios.post(API_ENDPOINTS.ATM_SPOTS, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("ATM spot created successfully!");
      }
      setForm(emptyForm);
      setEditingId(null);
      await load();
    } catch (err) {
      console.error("ATM spot operation failed:", err);
      alert(err?.response?.data?.error || err?.response?.data?.message || err.message);
    }
  };

  const edit = (item) => {
    setEditingId(item._id);
    setForm({
      name: item.name || "",
      description: item.description || "",
      images: (item.images || []).join(", "),
      location: {
        address: item.location?.address || "",
        city: item.location?.city || "",
        state: item.location?.state || "",
        country: item.location?.country || "",
        pincode: item.location?.pincode || "",
        latitude: item.location?.latitude ?? "",
        longitude: item.location?.longitude ?? "",
      },
      website: item.website || "",
    });
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this ATM spot?")) return;
    try {
      await axios.delete(`${API_ENDPOINTS.ATM_SPOTS}/${id}`, {
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
          <h1>ATM Spots Admin</h1>
          <p>Add and manage ATM spot details. Paste image URLs (comma-separated).</p>
        </div>
      </div>

      <form onSubmit={submit} className="admin-form hospital-admin-form">
        <section>
          <h3>Basic Details</h3>
          <div className="grid2">
            <div className="full">
              <label>ATM Name</label>
              <input className="in" name="name" value={form.name} onChange={handleChange} placeholder="ATM Name" />
            </div>
            <div className="full">
              <label>Description</label>
              <textarea className="in" name="description" value={form.description} onChange={handleChange} placeholder="Short description" rows={3} />
            </div>
            <div className="full">
              <label>Image URLs (comma-separated or one per line)</label>
              <textarea className="in" name="images" value={form.images} onChange={handleChange} placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg" rows={4} />
            </div>
            <div className="full">
              <label>Website</label>
              <input className="in" name="website" value={form.website} onChange={handleChange} placeholder="Website URL (optional)" />
            </div>
          </div>
        </section>

        <section>
          <h3>Location Details</h3>
          <div className="grid3">
            <input className="in" placeholder="Address" name="address" value={form.location.address} onChange={(e) => handleChange(e, "location")} />
            <input className="in" placeholder="City" name="city" value={form.location.city} onChange={(e) => handleChange(e, "location")} />
            <input className="in" placeholder="State" name="state" value={form.location.state} onChange={(e) => handleChange(e, "location")} />
            <input className="in" placeholder="Country" name="country" value={form.location.country} onChange={(e) => handleChange(e, "location")} />
            <input className="in" placeholder="Pincode" name="pincode" value={form.location.pincode} onChange={(e) => handleChange(e, "location")} />
            <input className="in" placeholder="Latitude" name="latitude" value={form.location.latitude} onChange={(e) => handleChange(e, "location")} />
            <input className="in" placeholder="Longitude" name="longitude" value={form.location.longitude} onChange={(e) => handleChange(e, "location")} />
          </div>
        </section>

        <button type="submit" className="explore-btn active hospital-submit-btn">
          {editingId ? "Update ATM Spot" : "Add ATM Spot"}
        </button>
        {editingId && (
          <button
            type="button"
            className="explore-btn"
            style={{ marginLeft: "12px" }}
            onClick={() => {
              setForm(emptyForm);
              setEditingId(null);
            }}
          >
            Cancel Edit
          </button>
        )}
      </form>

      <div className="city-grid" style={{ marginTop: 24 }}>
        {items.map((item) => (
          <div key={item._id} className="city-card">
            {item.images?.[0] && (
              <img
                src={item.images[0]}
                alt={item.name}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/600x300?text=No+Image";
                }}
                style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 8 }}
              />
            )}
            <h3 style={{ marginTop: 8 }}>{item.name}</h3>
            <p style={{ minHeight: 40 }}>{item.description}</p>
            <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
              <button className="explore-btn active" onClick={() => edit(item)}>Edit</button>
              <button className="explore-btn" onClick={() => remove(item._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <footer>
        <button className="footer-btn" onClick={() => navigate("/admin")}>← Admin Home</button>
        <button className="footer-btn" onClick={() => navigate("/feature/atm-spots")}>View Public Page</button>
      </footer>
    </div>
  );
}
