import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (email === "admin@urbanguide.com" && password === "UrbanAdmin!2025") {
        localStorage.setItem("role", "admin");
        localStorage.setItem("adminAuth", "true");
        navigate("/admin-dashboard");
      } else {
        alert("Invalid admin credentials");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card" style={{ maxWidth: 420 }}>
        <h1 className="login-title">Admin Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input type="email" placeholder="admin@urbanguide.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="input-group">
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}






