"use client";

import { useState } from "react";
import "./penumpang.css";

type Passenger = {
  id: number;
  name: string;
  route: string;
  date: string;
  paymentMethod: string;
  price: string;
  category: string;
  status: "Menunggu" | "Disetujui" | "Ditolak";
  phone?: string;
  email?: string;
  seatNumber?: string;
};

const initialPassengers: Passenger[] = [
  {
    id: 1,
    name: "Budi Santoso",
    route: "Jakarta → Yogyakarta",
    date: "10 September 2026",
    paymentMethod: "Qris",
    price: "Rp 420.000",
    category: "Reguler",
    status: "Menunggu",
    phone: "0812-3456-7890",
    email: "budi.santoso@example.com",
    seatNumber: "12A",
  },
  {
    id: 2,
    name: "Dewi Kartika",
    route: "Jakarta → Semarang",
    date: "9 September 2026",
    paymentMethod: "Qris",
    price: "Rp 215.000",
    category: "Reguler",
    status: "Disetujui",
    phone: "0857-1122-3344",
    email: "dewi.kartika@example.com",
    seatNumber: "05B",
  },
];

export default function PenumpangPage() {
  const [passengers] = useState<Passenger[]>(initialPassengers);
  const [selectedPassenger, setSelectedPassenger] = useState<Passenger | null>(null);

  return (
    <main className="admin-page">
      {/* HEADER UTAMA */}
      <header className="admin-header">
        <div className="brand">
          <div className="brand-logo">
            <img src="/logo.png" alt="Logo" />
          </div>

          <div className="brand-text">
            <h1>Panel Admin</h1>
            <span>Manajemen Pembayaran dan Penumpang</span>
          </div>
        </div>

        {/* AVATAR PROFIL */}
        <button
          className="admin-avatar"
          onClick={() => {
            window.location.href = "/profil";
          }}
          title="Lihat Profil Admin"
          style={{ cursor: "pointer", border: "none" }}
        >
          👤
        </button>

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
      </header>

      {/* NAVIGASI UTAMA */}
      <nav className="main-nav">
        <button onClick={() => (window.location.href = "/grafik")}>Grafik</button>
        <button onClick={() => (window.location.href = "/bayar")}>Bayar</button>
        <button className="active">Penumpang</button>
        <button onClick={() => (window.location.href = "/promo")}>Promo</button>
      </nav>

      {/* DAFTAR PENUMPANG */}
      <section className="passenger-list-container">
        {passengers.map((passenger) => (
          <article className="passenger-card" key={passenger.id}>
            <div className="passenger-header">
              <span
                className={`status-badge status-${passenger.status.toLowerCase()}`}
              >
                {passenger.status}
              </span>
            </div>

            <h2 className="passenger-name">{passenger.name}</h2>
            <p className="passenger-route">{passenger.route}</p>

            <p className="passenger-meta">
              {passenger.date} . <strong>{passenger.paymentMethod}</strong>
            </p>

            <p className="passenger-price">
              {passenger.price} <span className="category">. {passenger.category}</span>
            </p>

            <button
              className="detail-button"
              onClick={() => setSelectedPassenger(passenger)}
            >
              Lihat Detail
            </button>
          </article>
        ))}
      </section>

      {/* MODAL DETAIL PENUMPANG */}
      {selectedPassenger && (
        <div className="modal-overlay" onClick={() => setSelectedPassenger(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Detail Penumpang</h3>
              <button
                className="close-button"
                onClick={() => setSelectedPassenger(null)}
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              <div className="detail-row">
                <span>Nama Penumpang:</span>
                <strong>{selectedPassenger.name}</strong>
              </div>
              <div className="detail-row">
                <span>Nomor Telepon:</span>
                <strong>{selectedPassenger.phone || "-"}</strong>
              </div>
              <div className="detail-row">
                <span>Email:</span>
                <strong>{selectedPassenger.email || "-"}</strong>
              </div>
              <div className="detail-row">
                <span>Rute Perjalanan:</span>
                <strong>{selectedPassenger.route}</strong>
              </div>
              <div className="detail-row">
                <span>Nomor Kursi:</span>
                <strong>{selectedPassenger.seatNumber || "-"}</strong>
              </div>
              <div className="detail-row">
                <span>Tanggal Keberangkatan:</span>
                <strong>{selectedPassenger.date}</strong>
              </div>
              <div className="detail-row">
                <span>Metode Pembayaran:</span>
                <strong>{selectedPassenger.paymentMethod}</strong>
              </div>
              <div className="detail-row">
                <span>Total Bayar:</span>
                <strong>
                  {selectedPassenger.price} ({selectedPassenger.category})
                </strong>
              </div>
              <div className="detail-row">
                <span>Status Pesanan:</span>
                <span
                  className={`status-badge status-${selectedPassenger.status.toLowerCase()}`}
                >
                  {selectedPassenger.status}
                </span>
              </div>
            </div>

            <div className="modal-actions">
              <button
                className="close-modal-btn"
                onClick={() => setSelectedPassenger(null)}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}