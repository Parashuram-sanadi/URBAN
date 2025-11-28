import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../config/api.js";

export default function Register() {
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
      const res = await fetch(API_ENDPOINTS.REGISTER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registration successful!");
        localStorage.setItem("token", data.token);
        localStorage.setItem("urbanGuideUser", data.email);
        if (data.role) localStorage.setItem("role", data.role);
        navigate("/dashboard");
      } else {
        alert(data.message || "Registration failed.");
      }
    } catch (err) {
      console.error("Registration Error:", err);
      alert("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-icon">🆕</div>
        <h1 className="login-title">Urban Guide</h1>
        <h2 className="login-subtitle">Create Your Account</h2>

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
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        <p className="login-footer">
          Already have an account?{" "}
          <span
            style={{ color: "#0066cc", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
