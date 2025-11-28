import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Simple placeholder admin CRUD UI. Replace with provided designs later.
export default function AdminFeature() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      alert("Admin access required.");
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const addItem = (e) => {
    e.preventDefault();
    if (!form.name) return;
    setItems((prev) => [...prev, { id: Date.now(), ...form }]);
    setForm({ name: "", description: "" });
  };

  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-center">
          <h1>Manage: {slug}</h1>
          <p>Add, edit and remove entries for this feature.</p>
        </div>
      </div>

      <div className="p-6 max-w-3xl mx-auto">
        <form onSubmit={addItem} className="space-y-3">
          <input
            className="w-full p-2 border rounded"
            placeholder="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          <textarea
            className="w-full p-2 border rounded"
            placeholder="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
          <button className="explore-btn active" type="submit">Add</button>
        </form>

        <div className="city-grid" style={{ marginTop: 24 }}>
          {items.map((i) => (
            <div key={i.id} className="city-card">
              <h3>{i.name}</h3>
              <p>{i.description}</p>
              <button className="explore-btn" onClick={() => removeItem(i.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>

      <footer>
        <button className="footer-btn" onClick={() => navigate("/admin")}>← Admin Home</button>
        <button className="footer-btn" onClick={() => navigate(`/feature/${slug}`)}>View Public Page</button>
      </footer>
    </div>
  );
}






