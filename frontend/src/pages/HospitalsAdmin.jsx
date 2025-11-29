import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api.js";

const emptyForm = {
  name: "",
  type: "",
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
  contact: { phone: "", emergencyNumber: "", email: "", website: "" },
  facilities: {
    departments: "", // comma-separated
    numBeds: "",
    specializations: "", // comma-separated
    doctorCount: "",
    nurseCount: "",
  },
};

export default function HospitalsAdmin() {
  const navigate = useNavigate();
  const [hospitals, setHospitals] = useState([]);
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
    const res = await axios.get(API_ENDPOINTS.HOSPITALS);
    setHospitals(res.data);
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
      ...form.location,
      latitude: form.location.latitude ? Number(form.location.latitude) : undefined,
      longitude: form.location.longitude ? Number(form.location.longitude) : undefined,
    },
    contact: { ...form.contact },
    facilities: {
      departments: form.facilities.departments
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      numBeds: form.facilities.numBeds ? Number(form.facilities.numBeds) : undefined,
      specializations: form.facilities.specializations
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      doctorCount: form.facilities.doctorCount ? Number(form.facilities.doctorCount) : undefined,
      nurseCount: form.facilities.nurseCount ? Number(form.facilities.nurseCount) : undefined,
    },
  });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      alert("Hospital name is required");
      return;
    }
    const payload = toPayload();
    try {
      if (editingId) {
        await axios.put(`${API_ENDPOINTS.HOSPITALS}/${editingId}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Hospital updated successfully!");
      } else {
        await axios.post(API_ENDPOINTS.HOSPITALS, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Hospital created successfully!");
      }
      setForm(emptyForm);
      setEditingId(null);
      await load();
    } catch (err) {
      console.error("Hospital operation failed:", err);
      alert(err?.response?.data?.error || err?.response?.data?.message || err.message);
    }
  };

  const edit = (h) => {
    setEditingId(h._id);
    setForm({
      name: h.name || "",
      type: h.type || "",
      description: h.description || "",
      images: (h.images || []).join(", "),
      location: {
        address: h.location?.address || "",
        city: h.location?.city || "",
        state: h.location?.state || "",
        country: h.location?.country || "",
        pincode: h.location?.pincode || "",
        latitude: h.location?.latitude ?? "",
        longitude: h.location?.longitude ?? "",
      },
      contact: {
        phone: h.contact?.phone || "",
        emergencyNumber: h.contact?.emergencyNumber || "",
        email: h.contact?.email || "",
        website: h.contact?.website || "",
      },
      facilities: {
        departments: (h.facilities?.departments || []).join(", "),
        numBeds: h.facilities?.numBeds ?? "",
        specializations: (h.facilities?.specializations || []).join(", "),
        doctorCount: h.facilities?.doctorCount ?? "",
        nurseCount: h.facilities?.nurseCount ?? "",
      },
    });
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this hospital?")) return;
    await axios.delete(`${API_ENDPOINTS.HOSPITALS}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    await load();
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-center">
          <h1>Hospitals Admin</h1>
          <p>Add and manage hospital details. Paste image URLs (comma-separated).</p>
        </div>
      </div>

      <form onSubmit={submit} className="admin-form hospital-admin-form">
        <section>
          <h3>Basic Details</h3>
          <div className="grid2">
            <div>
              <label>Hospital Name</label>
              <input className="in" name="name" value={form.name} onChange={handleChange} placeholder="Hospital Name" />
            </div>
            <div>
              <label>Hospital Type</label>
              <input className="in" name="type" value={form.type} onChange={handleChange} placeholder="Hospital Type" />
            </div>
            <div className="full">
              <label>Short Description</label>
              <textarea className="in" name="description" value={form.description} onChange={handleChange} placeholder="Short description" rows={3} />
            </div>
            <div className="full">
              <label>Image URLs (comma-separated or one per line)</label>
              <textarea className="in" name="images" value={form.images} onChange={handleChange} placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg" rows={4} />
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
            <input className="in" placeholder="Emergency Number" name="emergencyNumber" value={form.contact.emergencyNumber} onChange={(e) => handleChange(e, "contact")} />
            <input className="in" placeholder="Email Address" name="email" value={form.contact.email} onChange={(e) => handleChange(e, "contact")} />
            <input className="in" placeholder="Website Link" name="website" value={form.contact.website} onChange={(e) => handleChange(e, "contact")} />
          </div>
        </section>

        <section>
          <h3>Facilities & Staff</h3>
          <div className="grid2">
            <input className="in" placeholder="Departments (comma-separated)" name="departments" value={form.facilities.departments} onChange={(e) => handleChange(e, "facilities")} />
            <input className="in" placeholder="Specializations (comma-separated)" name="specializations" value={form.facilities.specializations} onChange={(e) => handleChange(e, "facilities")} />
            <input className="in" placeholder="Number of Beds" name="numBeds" value={form.facilities.numBeds} onChange={(e) => handleChange(e, "facilities")} />
            <input className="in" placeholder="Doctor Count" name="doctorCount" value={form.facilities.doctorCount} onChange={(e) => handleChange(e, "facilities")} />
            <input className="in" placeholder="Nurse Count" name="nurseCount" value={form.facilities.nurseCount} onChange={(e) => handleChange(e, "facilities")} />
          </div>
        </section>

        <button type="submit" className="explore-btn active hospital-submit-btn">{editingId ? "Update Hospital" : "Add Hospital"}</button>
      </form>

      <div className="city-grid" style={{ marginTop: 24 }}>
        {hospitals.map((h) => (
          <div key={h._id} className="city-card">
            <div className="card-title">{h.name}</div>
            <div className="card-desc">{h.type}</div>
            <button className="explore-btn" onClick={() => edit(h)}>Edit</button>
            <button className="explore-btn" onClick={() => remove(h._id)}>Delete</button>
          </div>
        ))}
      </div>

      <footer>
        <button className="footer-btn" onClick={() => navigate("/admin")}>← Admin Home</button>
      </footer>
    </div>
  );
}


