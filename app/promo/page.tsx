"use client";

import { useState } from "react";
import "./promo.css";

type Promo = {
  id: number;
  title: string;
  code: string;
  description: string;
  discount: string;
  period: string;
  minimum: string;
  active: boolean;
};

const initialPromos: Promo[] = [
  {
    id: 1,
    title: "Promo Akhir Pekan",
    code: "WEEKEND20",
    description:
      "Diskon 20% untuk semua rute perjalanan reguler Jawa-Bali minggu ini!",
    discount: "20% OFF",
    period: "s/d 14 Sep 2026",
    minimum: "Min. Rp100.000",
    active: true,
  },
  {
    id: 2,
    title: "Diskon Pengguna Baru",
    code: "NEWUSER10",
    description:
      "Potongan 10% untuk member baru di pemesanan pertama.",
    discount: "10% OFF",
    period: "s/d 30 Sep 2026",
    minimum: "Min. Rp50.000",
    active: false,
  },
];

export default function PromoPage() {
  const [promos, setPromos] = useState<Promo[]>(initialPromos);
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState("");
  const [period, setPeriod] = useState("");
  const [minimum, setMinimum] = useState("");

  const handleAddPromo = () => {
    if (
      !title ||
      !code ||
      !description ||
      !discount ||
      !period ||
      !minimum
    ) {
      alert("Semua data promo harus diisi.");
      return;
    }

    const newPromo: Promo = {
      id: Date.now(),
      title,
      code: code.toUpperCase(),
      description,
      discount,
      period,
      minimum,
      active: true,
    };

    setPromos((prev) => [...prev, newPromo]);

    setTitle("");
    setCode("");
    setDescription("");
    setDiscount("");
    setPeriod("");
    setMinimum("");

    setShowForm(false);
  };

  const togglePromo = (id: number) => {
    setPromos((prev) =>
      prev.map((promo) =>
        promo.id === id
          ? {
              ...promo,
              active: !promo.active,
            }
          : promo
      )
    );
  };

  const deletePromo = (id: number) => {
    const confirmDelete = window.confirm(
      "Apakah kamu yakin ingin menghapus promo ini?"
    );

    if (!confirmDelete) return;

    setPromos((prev) =>
      prev.filter((promo) => promo.id !== id)
    );
  };

  return (
    <main className="admin-page">
      {/* HEADER (SAMA SEPERTI /BAYAR) */}
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

        {/* AVATAR PROFIL BISA DIKLIK KEMBALI KE /PROFIL */}
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

      {/* NAVIGASI */}
      <nav className="main-nav">
        <button
          onClick={() => {
            window.location.href = "/bayar";
          }}
        >
          Bayar
        </button>
        <button
          onClick={() => {
            window.location.href = "/penumpang";
          }}
        >
          Penumpang
        </button>
        <button className="active">Promo</button>
        <button
          onClick={() => {
            window.location.href = "/grafik";
          }}
        >
          Grafik
        </button>
      </nav>

      {/* JUDUL PROMO & TOMBOL TAMBAH */}
      <section className="promo-header-section">
        <h2>Daftar Promo & Notifikasi</h2>

        <button
          className="add-promo-button"
          onClick={() => setShowForm(true)}
        >
          + Promo
        </button>
      </section>

      {/* DAFTAR PROMO */}
      <section className="promo-list">
        {promos.length === 0 ? (
          <div className="empty-promo">
            <h3>Belum ada promo</h3>
            <p>Tambahkan promo baru dengan tombol + Promo.</p>
          </div>
        ) : (
          promos.map((promo) => (
            <article className="promo-card" key={promo.id}>
              <div className="promo-card-top">
                <div className="promo-title-wrapper">
                  <div className="promo-icon">🎟️</div>

                  <div>
                    <h3>{promo.title}</h3>
                    <span className="promo-code">{promo.code}</span>
                  </div>
                </div>

                <span
                  className={`promo-status ${
                    promo.active ? "status-active" : "status-inactive"
                  }`}
                >
                  {promo.active ? "Aktif" : "Nonaktif"}
                </span>
              </div>

              <p className="promo-description">{promo.description}</p>

              <div className="promo-info">
                <span>{promo.discount}</span>
                <span>{promo.period}</span>
                <span>{promo.minimum}</span>
              </div>

              <div className="promo-actions">
                <button
                  className="promo-action-button"
                  onClick={() => togglePromo(promo.id)}
                >
                  {promo.active ? "Nonaktifkan" : "Aktifkan"}
                </button>

                <button
                  className="promo-action-button"
                  onClick={() => deletePromo(promo.id)}
                >
                  Hapus
                </button>
              </div>
            </article>
          ))
        )}
      </section>

      {/* MODAL TAMBAH PROMO */}
      {showForm && (
        <div className="promo-modal-overlay">
          <div className="promo-modal">
            <div className="promo-modal-header">
              <h2>Tambah Promo</h2>
              <button
                className="close-modal"
                onClick={() => setShowForm(false)}
              >
                ×
              </button>
            </div>

            <div className="form-group">
              <label>Nama Promo</label>
              <input
                type="text"
                placeholder="Contoh: Promo Akhir Pekan"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Kode Promo</label>
              <input
                type="text"
                placeholder="Contoh: WEEKEND20"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Deskripsi</label>
              <textarea
                placeholder="Masukkan deskripsi promo"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Diskon</label>
                <input
                  type="text"
                  placeholder="20% OFF"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Periode</label>
                <input
                  type="text"
                  placeholder="s/d 30 Sep 2026"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Minimum Pembelian</label>
              <input
                type="text"
                placeholder="Min. Rp50.000"
                value={minimum}
                onChange={(e) => setMinimum(e.target.value)}
              />
            </div>

            <div className="modal-actions">
              <button
                className="cancel-button"
                onClick={() => setShowForm(false)}
              >
                Batal
              </button>

              <button className="save-button" onClick={handleAddPromo}>
                Tambah Promo
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}