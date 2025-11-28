// frontend/src/pages/ExploreCities.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api.js";

export default function ExploreCities() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await axios.get(API_ENDPOINTS.CITIES, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCities(res.data);
      } catch (err) {
        console.error("Error fetching cities:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCities();
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-medium">
        Loading cities...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Explore Urban Cities
      </h2>

      {cities.length === 0 ? (
        <p className="text-center text-gray-600">
          No cities found. Please check back later.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cities.map((city) => (
            <div
              key={city._id}
              className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold mb-2">{city.name}</h3>
              <p className="text-gray-700">
                <strong>Reputation:</strong> {city.reputation}
              </p>
              <p className="text-gray-600 mt-2">{city.reviews}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
