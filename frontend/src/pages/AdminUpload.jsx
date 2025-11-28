// frontend/src/pages/AdminUpload.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api.js";

export default function AdminUpload() {
  const [cities, setCities] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    reputation: "",
    reviews: "",
  });
  const [editingCity, setEditingCity] = useState(null);

  const token = localStorage.getItem("token");

  // Fetch all cities (for editing/deleting)
  const fetchCities = async () => {
    try {
      const res = await axios.get(API_ENDPOINTS.CITIES, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCities(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or update city
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCity) {
        await axios.put(
          `${API_ENDPOINTS.CITIES}/${editingCity._id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("City updated successfully!");
      } else {
        await axios.post(API_ENDPOINTS.CITIES, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("City added successfully!");
      }

      setFormData({ name: "", reputation: "", reviews: "" });
      setEditingCity(null);
      fetchCities();
    } catch (err) {
      console.error(err);
      alert("Error saving city");
    }
  };

  // Edit city
  const handleEdit = (city) => {
    setEditingCity(city);
    setFormData({
      name: city.name,
      reputation: city.reputation,
      reviews: city.reviews,
    });
  };

  // Delete city
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this city?")) return;
    try {
      await axios.delete(`${API_ENDPOINTS.CITIES}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("City deleted successfully!");
      fetchCities();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        {editingCity ? "Edit City" : "Add New City"}
      </h2>

      {/* Add/Edit Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="City Name"
          className="w-full p-2 border rounded"
        />
        <input
          name="reputation"
          value={formData.reputation}
          onChange={handleChange}
          placeholder="Reputation Score"
          className="w-full p-2 border rounded"
        />
        <textarea
          name="reviews"
          value={formData.reviews}
          onChange={handleChange}
          placeholder="Reviews"
          className="w-full p-2 border rounded"
        ></textarea>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingCity ? "Update City" : "Add City"}
        </button>
      </form>

      {/* City List */}
      <h3 className="text-lg font-semibold mt-8 mb-2">Existing Cities</h3>
      <ul className="space-y-2">
        {cities.map((city) => (
          <li
            key={city._id}
            className="p-3 bg-gray-50 border rounded flex justify-between items-center"
          >
            <div>
              <strong>{city.name}</strong> – Reputation: {city.reputation}
              <p className="text-sm text-gray-600">{city.reviews}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(city)}
                className="bg-yellow-400 text-black px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(city._id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
