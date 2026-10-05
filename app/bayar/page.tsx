"use client";

import { useState } from "react";

const payments = [
  {
    name: "Azurra Nasmia",
    route: "Jakarta - Yogyakarta",
    date: "10 September 2026",
    time: "07.00",
    price: "Rp185.000",
    status: "Menunggu",
  },
  {
    name: "Joel Vian",
    route: "Malang - Surabaya",
    date: "10 Oktober 2026",
    time: "07.00",
    price: "Rp190.000",
    status: "Disetujui",
  },
  {
    name: "David Wijaya",
    route: "Semarang - Yogyakarta",
    date: "10 September 2026",
    time: "07.00",
    price: "Rp185.000",
    status: "Ditolak",
  },
];

export default function Home() {
  const [filter, setFilter] = useState("Semua");

  const filteredPayments =
    filter === "Semua"
      ? payments
      : payments.filter((payment) => payment.status === filter);

  return (
    <main className="admin-page">
      {/* HEADER */}
      <header className="admin-header">
        <div className="brand">
          <div className="brand-logo">
            {/* Nanti masukkan logo kamu di public/logo.png */}
            <img src="/logo.png" alt="Logo" />
          </div>

          <div className="brand-text">
            <h1>Panel Admin</h1>
            <span>Manajemen Pembayaran dan Penumpang</span>
          </div>
        </div>

        <div className="admin-avatar">👤</div>
      </header>

      {/* STATISTIK */}
      <section className="stats-section">
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
      </section>

      {/* PENDAPATAN */}
      <section className="income-section">
        <div className="income-card">
          Total Pendapatan Terkonfirmasi :<strong> Rp8.550.000</strong>
        </div>
      </section>

      {/* NAVIGASI */}
      <nav className="main-nav">
        <button className="active">Bayar</button>
        <button>Penumpang</button>
        <button>Promo</button>
        <button>Grafik</button>
      </nav>

      {/* FILTER */}
      <section className="filter-section">
        {["Semua", "Menunggu", "Disetujui", "Ditolak"].map((item) => (
          <button
            key={item}
            className={`filter ${filter === item ? "active" : ""}`}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </section>

      {/* DATA PEMBAYARAN */}
      <section className="payment-list">
        {filteredPayments.map((payment) => (
          <article className="payment-card" key={payment.name}>
            <div className="payment-top">
              <h2>{payment.name}</h2>

              <span className="status">{payment.status}</span>
            </div>

            <div className="payment-info">
              <p>🚗 {payment.route}</p>
              <p>📅 {payment.date}</p>
              <p>🕐 {payment.time}</p>
              <p>💰 {payment.price}</p>
            </div>

            <span className="ticket-type">Regular</span>

            {payment.status === "Menunggu" ? (
              <div className="payment-actions">
                <button>Lihat Bukti</button>
                <button>ACC</button>
                <button>Tolak</button>
              </div>
            ) : (
              <button className="detail-button">Lihat Detail</button>
            )}
          </article>
        ))}
      </section>
    </main>
  );
}