"use client";

import { useState } from "react";
import "./profil.css";

type Activity = {
  id: number;
  title: string;
  date: string;
};

const activityLogs: Activity[] = [
  {
    id: 1,
    title: "Menyetujui pembayaran TRV-2026-8819",
    date: "09 Sep 2026, 15:10",
  },
  {
    id: 2,
    title: "Menyetujui pembayaran TRV-2026-8818",
    date: "09 Sep 2026, 17:42",
  },
  {
    id: 3,
    title: "Menyetujui pembayaran TRV-2026-8818",
    date: "09 Sep 2026, 17:42",
  },
  {
    id: 4,
    title: "Menambahkan promo BALISPESIAL",
    date: "08 Sep 2026, 10:00",
  },
];

export default function ProfilPage() {
  const [logs] = useState<Activity[]>(activityLogs);

  return (
    <main className="profil-page">
      {/* =========================
          HEADER BIRU ATAS
      ========================= */}
      <header className="profil-header">
        {/* TOMBOL KEMBALI */}
        <button
          className="back-button"
          onClick={() => {
            window.location.href = "/bayar";
          }}
        >
          ← Kembali Ke Admin
        </button>

        {/* AVATAR PROFIL */}
        <div className="profile-avatar-wrapper">
          <div className="profile-avatar">
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="12" fill="#80B3FF" />
              <circle cx="12" cy="8" r="4" fill="#0878BD" />
              <path
                d="M4 20C4 16 7.58172 14 12 14C16.4183 14 20 16 20 20"
                fill="#0878BD"
              />
            </svg>
          </div>
        </div>

        {/* NAMA & EMAIL */}
        <h1 className="profile-name">Admin Utama</h1>
        <span className="profile-email">admin@travelapp.id</span>

        {/* BADGES STATUS */}
        <div className="profile-badges">
          <span className="badge badge-role">Super Admin</span>
          <span className="badge badge-status">Aktif</span>
        </div>
      </header>

      {/* =========================
          BARIS STATISTIK (BIRU MUDA FULL WIDTH)
      ========================= */}
      <section className="stats-bar">
        <div className="stats-container">
          <div className="stat-card">
            <strong>40</strong>
            <span>Total Pesanan</span>
          </div>

          <div className="stat-card">
            <strong>12</strong>
            <span>Menunggu ACC</span>
          </div>

          <div className="stat-card">
            <strong>28</strong>
            <span>Disetujui</span>
          </div>
        </div>
      </section>

      {/* =========================
          KONTEN UTAMA PROFIL
      ========================= */}
      <div className="profil-container">
        {/* KARTU INFORMASI ADMIN */}
        <section className="profil-card">
          <h2 className="card-title">Informasi Admin</h2>

          <div className="info-grid">
            <div className="info-item">
              <label>Nama Admin</label>
              <p>Admin Utama</p>
            </div>

            <div className="info-item">
              <label>Email Admin</label>
              <p>admin@travelapp.id</p>
            </div>

            <div className="info-item">
              <label>Nomor HP</label>
              <p>0812-0000-0001</p>
            </div>

            <div className="info-item">
              <label>Role</label>
              <p>Super Admin</p>
            </div>
          </div>
        </section>

        {/* KARTU AKTIVITAS TERAKHIR */}
        <section className="profil-card">
          <h2 className="card-title">Aktifitas Terakhir</h2>

          <div className="activity-list">
            {logs.map((log) => (
              <div className="activity-item" key={log.id}>
                <p className="activity-text">{log.title}</p>
                <span className="activity-date">{log.date}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}