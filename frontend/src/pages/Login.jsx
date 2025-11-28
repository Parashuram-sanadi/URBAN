import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../config/api.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in both fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(API_ENDPOINTS.LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("urbanGuideUser", data.email);
        if (data.role) localStorage.setItem("role", data.role);
        navigate("/dashboard");
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login Error:", err);
      alert("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-icon">🔗</div>
        <h1 className="login-title">Urban Guide</h1>
        <h2 className="login-subtitle">The City Explorer</h2>
        <p className="login-note">by Tech Buds of KLECET</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <span className="input-icon">📧</span>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <span className="input-icon">🔒</span>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "➜ Login to Urban Guide"}
          </button>
        </form>

        <button
          type="button"
          className="admin-login-btn"
          onClick={() => navigate("/admin-login")}
        >
          Login as Admin
        </button>

        {/* 👇 Added Create Account Link Here */}
        <p className="login-footer">
          Don&apos;t have an account?{" "}
          <span
            style={{ color: "#0066cc", cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Create one
          </span>
        </p>

        <p className="login-footer">
          Secure access to city exploration features
        </p>
      </div>
    </div>
  );
}
