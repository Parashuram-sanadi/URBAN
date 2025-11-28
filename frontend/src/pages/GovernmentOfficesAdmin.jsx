import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const empty = {
  name: "",
  type: "Police Station",
  description: "",
  openingTime: "",
  imageUrl: "",
  location: { address: "", city: "", state: "", country: "", pincode: "", latitude: "", longitude: "" },
  contact: { phone: "", emergencyNumber: "", email: "", website: "" },
  staff: { officerCount: "", staffCount: "", cells: "" },
};

export default function GovernmentOfficesAdmin() {
  const [form, setForm] = useState(empty);
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("adminAuth") !== "true") navigate("/admin-login");
    load();
  }, [navigate]);

  const load = async () => {
    const res = await axios.get("API_ENDPOINTS.GOV_OFFICES");
    setItems(res.data);
  };

  const set = (path, name) => (e) =>
    setForm((prev) => (path ? { ...prev, [path]: { ...prev[path], [name]: e.target.value } } : { ...prev, [name]: e.target.value }));

  const payload = () => ({
    name: form.name,
    type: form.type,
    description: form.description,
    openingTime: form.openingTime,
    images: form.imageUrl ? [form.imageUrl] : [],
    location: {
      ...form.location,
      latitude: form.location.latitude ? Number(form.location.latitude) : undefined,
      longitude: form.location.longitude ? Number(form.location.longitude) : undefined,
    },
    contact: { ...form.contact },
    staff: {
      officerCount: form.staff.officerCount ? Number(form.staff.officerCount) : undefined,
      staffCount: form.staff.staffCount ? Number(form.staff.staffCount) : undefined,
      cells: form.staff.cells,
    },
  });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      alert("Office name is required");
      return;
    }
    const body = payload();
    try {
      if (editingId) {
        await axios.put(`API_ENDPOINTS.GOV_OFFICES/${editingId}`, body);
        alert("Government office updated successfully!");
      } else {
        await axios.post("API_ENDPOINTS.GOV_OFFICES", body);
        alert("Government office created successfully!");
      }
      setForm(empty);
      setEditingId(null);
      await load();
    } catch (err) {
      console.error("Government office operation failed:", err);
      alert(err?.response?.data?.error || err?.response?.data?.message || err.message);
    }
  };

  const edit = (it) => {
    setEditingId(it._id);
    setForm({
      name: it.name || "",
      type: it.type || "Police Station",
      description: it.description || "",
      openingTime: it.openingTime || "",
      imageUrl: it.images?.[0] || "",
      location: {
        address: it.location?.address || "",
        city: it.location?.city || "",
        state: it.location?.state || "",
        country: it.location?.country || "",
        pincode: it.location?.pincode || "",
        latitude: it.location?.latitude ?? "",
        longitude: it.location?.longitude ?? "",
      },
      contact: {
        phone: it.contact?.phone || "",
        emergencyNumber: it.contact?.emergencyNumber || "",
        email: it.contact?.email || "",
        website: it.contact?.website || "",
      },
      staff: {
        officerCount: it.staff?.officerCount ?? "",
        staffCount: it.staff?.staffCount ?? "",
        cells: it.staff?.cells || "",
      },
    });
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this office?")) return;
    await axios.delete(`API_ENDPOINTS.GOV_OFFICES/${id}`);
    await load();
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-center">
          <h1>Government Office</h1>
        </div>
      </div>

      <form onSubmit={submit} className="admin-form">
        <section>
          <h3>Basic Details</h3>
          <div className="grid2">
            <div>
              <label>Office Name</label>
              <input className="in" value={form.name} onChange={set(null, "name")} placeholder="Office Name" />
            </div>
            <div>
              <label>Office Type</label>
              <input className="in" value={form.type} onChange={set(null, "type")} placeholder="Police Station" />
            </div>
            <div className="full">
              <label>Short Description</label>
              <textarea className="in" value={form.description} onChange={set(null, "description")} />
            </div>
            <div>
              <label>Opening Time</label>
              <input className="in" value={form.openingTime} onChange={set(null, "openingTime")} placeholder="e.g. 09:00 AM" />
            </div>
            <div className="full">
              <label>Image URL</label>
              <input className="in" value={form.imageUrl} onChange={set(null, "imageUrl")} placeholder="https://example.com/image.jpg" />
            </div>
          </div>
        </section>

        <section>
          <h3>Location Details</h3>
          <div className="grid3">
            <input className="in" placeholder="Address" value={form.location.address} onChange={set("location", "address")} />
            <input className="in" placeholder="City" value={form.location.city} onChange={set("location", "city")} />
            <input className="in" placeholder="State" value={form.location.state} onChange={set("location", "state")} />
            <input className="in" placeholder="Country" value={form.location.country} onChange={set("location", "country")} />
            <input className="in" placeholder="Pincode" value={form.location.pincode} onChange={set("location", "pincode")} />
            <input className="in" placeholder="Latitude" value={form.location.latitude} onChange={set("location", "latitude")} />
            <input className="in" placeholder="Longitude" value={form.location.longitude} onChange={set("location", "longitude")} />
          </div>
        </section>

        <section>
          <h3>Contact Details</h3>
          <div className="grid2">
            <input className="in" placeholder="Phone Number" value={form.contact.phone} onChange={set("contact", "phone")} />
            <input className="in" placeholder="Emergency Number" value={form.contact.emergencyNumber} onChange={set("contact", "emergencyNumber")} />
            <input className="in" placeholder="Email Address" value={form.contact.email} onChange={set("contact", "email")} />
            <input className="in" placeholder="Website Link" value={form.contact.website} onChange={set("contact", "website")} />
          </div>
        </section>

        <section>
          <h3>Staff Information</h3>
          <div className="grid3">
            <input className="in" placeholder="Officer Count" value={form.staff.officerCount} onChange={set("staff", "officerCount")} />
            <input className="in" placeholder="Staff Count" value={form.staff.staffCount} onChange={set("staff", "staffCount")} />
            <input className="in" placeholder="Cells" value={form.staff.cells} onChange={set("staff", "cells")} />
          </div>
        </section>

        <button className="explore-btn active" type="submit">{editingId ? "Update" : "Submit"}</button>
      </form>

      <div className="city-grid" style={{ marginTop: 24 }}>
        {items.map((it) => (
          <div key={it._id} className="city-card">
            <div className="card-title">{it.name}</div>
            <div className="card-desc">{it.type}</div>
            <button className="explore-btn" onClick={() => edit(it)}>Edit</button>
            <button className="explore-btn" onClick={() => remove(it._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}






