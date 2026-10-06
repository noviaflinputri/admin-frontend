"use client";

import { useState } from "react";
import "./login.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      window.location.href = "/grafik";
    } else {
      alert("Masukkan email dan password.");
    }
  };

  return (
    <main className="login-page">
      <div className="login-card">
        {/* LOGO SAJA */}
        <div className="login-header">
          <img src="/logo.png" alt="Marlibu Logo" className="login-logo" />
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Email Admin</label>
            <input
              type="email"
              placeholder="admin@travelapp.id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button">
            Masuk
          </button>
        </form>
      </div>
    </main>
  );
}