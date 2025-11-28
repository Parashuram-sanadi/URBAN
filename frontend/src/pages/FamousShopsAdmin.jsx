import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api.js";

const emptyForm = {
  name: "",
  type: "mall", // "mall" or "petrolPump"
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
  contact: { phone: "", email: "", website: "" },
  timings: "",
  shopsAnchors: "", // For malls
};

export default function FamousShopsAdmin() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [formType, setFormType] = useState("mall"); // "mall" or "petrolPump"
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

  useEffect(() => {
    setForm((prev) => ({ ...prev, type: formType }));
  }, [formType]);

  const load = async () => {
    try {
      const res = await axios.get("API_ENDPOINTS.FAMOUS_SHOPS");
      setItems(res.data);
    } catch (e) {
      console.error("Failed to load famous shops:", e);
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
    type: form.type,
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
    contact: {
      phone: form.contact.phone,
      email: form.contact.email,
      website: form.contact.website,
    },
    timings: form.timings,
    shopsAnchors: form.shopsAnchors,
  });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      alert(`${formType === "mall" ? "Mall" : "Petrol Pump"} name is required`);
      return;
    }
    const payload = toPayload();
    try {
      if (editingId) {
        await axios.put(`API_ENDPOINTS.FAMOUS_SHOPS/${editingId}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert(`${formType === "mall" ? "Mall" : "Petrol Pump"} updated successfully!`);
      } else {
        await axios.post("API_ENDPOINTS.FAMOUS_SHOPS", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert(`${formType === "mall" ? "Mall" : "Petrol Pump"} created successfully!`);
      }
      setForm(emptyForm);
      setEditingId(null);
      setFormType("mall");
      await load();
    } catch (err) {
      console.error("Famous shop operation failed:", err);
      alert(err?.response?.data?.error || err?.response?.data?.message || err.message);
    }
  };

  const edit = (item) => {
    setEditingId(item._id);
    setFormType(item.type || "mall");
    setForm({
      name: item.name || "",
      type: item.type || "mall",
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
      contact: {
        phone: item.contact?.phone || "",
        email: item.contact?.email || "",
        website: item.contact?.website || "",
      },
      timings: item.timings || "",
      shopsAnchors: item.shopsAnchors || "",
    });
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      await axios.delete(`API_ENDPOINTS.FAMOUS_SHOPS/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await load();
    } catch (e) {
      console.error("Failed to delete:", e);
      alert("Failed to delete. Please try again.");
    }
  };

  const filteredItems = items.filter((item) => item.type === formType || (!item.type && formType === "mall"));

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-center">
          <h1>Famous Shops Admin</h1>
          <p>Add and manage malls and petrol pumps. Paste image URLs (comma-separated).</p>
        </div>
      </div>

      <div className="admin-section">
        {/* Radio buttons for switching between Malls and Petrol Pumps */}
        <div className="radio-group" style={{ marginBottom: "20px", display: "flex", gap: "20px", justifyContent: "center" }}>
          <label className="radio-label">
            <input
              type="radio"
              name="formType"
              value="mall"
              checked={formType === "mall"}
              onChange={(e) => {
                setFormType(e.target.value);
                if (!editingId) {
                  setForm(emptyForm);
                }
              }}
            />
            <span>🛍️ Malls</span>
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="formType"
              value="petrolPump"
              checked={formType === "petrolPump"}
              onChange={(e) => {
                setFormType(e.target.value);
                if (!editingId) {
                  setForm(emptyForm);
                }
              }}
            />
            <span>⛽ Petrol Pumps</span>
          </label>
        </div>

        <form onSubmit={submit} className="admin-form hospital-admin-form">
          <section>
            <h3>Basic Details</h3>
            <div className="grid2">
              <div className="full">
                <label>Name</label>
                <input className="in" name="name" value={form.name} onChange={handleChange} placeholder={formType === "mall" ? "Mall Name" : "Petrol Pump Name"} />
              </div>
              <div className="full">
                <label>Description</label>
                <textarea className="in" name="description" value={form.description} onChange={handleChange} placeholder="Short description" rows={3} />
              </div>
              <div className="full">
                <label>Image URLs (comma-separated or one per line)</label>
                <textarea className="in" name="images" value={form.images} onChange={handleChange} placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg" rows={4} />
              </div>
              {formType === "mall" && (
                <div className="full">
                  <label>Shops / Anchors</label>
                  <input className="in" name="shopsAnchors" value={form.shopsAnchors} onChange={handleChange} placeholder="e.g. Big Bazaar, Food Court" />
                </div>
              )}
              <div className="full">
                <label>Timings</label>
                <input className="in" name="timings" value={form.timings} onChange={handleChange} placeholder={formType === "mall" ? "e.g. 10:00 AM - 10:00 PM" : "e.g. 24 Hours"} />
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

          <section>
            <h3>Contact Details</h3>
            <div className="grid2">
              <input className="in" placeholder="Phone Number" name="phone" value={form.contact.phone} onChange={(e) => handleChange(e, "contact")} />
              <input className="in" placeholder="Email Address" name="email" value={form.contact.email} onChange={(e) => handleChange(e, "contact")} />
              <input className="in" placeholder="Website Link" name="website" value={form.contact.website} onChange={(e) => handleChange(e, "contact")} />
            </div>
          </section>

          <button type="submit" className="explore-btn active hospital-submit-btn">
            {editingId ? `Update ${formType === "mall" ? "Mall" : "Petrol Pump"}` : `Add ${formType === "mall" ? "Mall" : "Petrol Pump"}`}
          </button>
          {editingId && (
            <button
              type="button"
              className="explore-btn"
              style={{ marginLeft: "12px" }}
              onClick={() => {
                setForm(emptyForm);
                setEditingId(null);
                setFormType("mall");
              }}
            >
              Cancel Edit
            </button>
          )}
        </form>

        <div className="city-grid" style={{ marginTop: 24 }}>
          <h2 style={{ width: "100%", marginBottom: "16px" }}>{formType === "mall" ? "Saved Malls" : "Saved Petrol Pumps"}</h2>
          {filteredItems.length === 0 ? (
            <p style={{ textAlign: "center", color: "#666", width: "100%" }}>No {formType === "mall" ? "malls" : "petrol pumps"} added yet.</p>
          ) : (
            filteredItems.map((item) => (
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
                <p>{item.type || "mall"}</p>
                {item.timings && <p>Timings: {item.timings}</p>}
                <p style={{ minHeight: 40 }}>{item.description}</p>
                <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
                  <button className="explore-btn active" onClick={() => edit(item)}>Edit</button>
                  <button className="explore-btn" onClick={() => remove(item._id)}>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <footer>
        <button className="footer-btn" onClick={() => navigate("/admin")}>← Admin Home</button>
        <button className="footer-btn" onClick={() => navigate("/feature/famous-shops")}>View Public Page</button>
      </footer>
    </div>
  );
}

