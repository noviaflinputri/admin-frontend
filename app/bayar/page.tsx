"use client";

import React, { useState } from "react";
import Link from "next/link";
import "./bayar.css";

interface DataBayar {
  id: number;
  nama: string;
  rute: string;
  tanggal: string;
  jam: string;
  harga: string;
  kategori: string;
  status: "Menunggu" | "Disetujui" | "Ditolak";
  buktiUrl: string;
}

// Menggunakan path /bukti.png dari folder public
const initialData: DataBayar[] = [
  {
    id: 1,
    nama: "Azzura Nasmia",
    rute: "Jakarta - Yogyakarta",
    tanggal: "10 September 2026",
    jam: "07.00",
    harga: "185.000",
    kategori: "Regular",
    status: "Menunggu",
    buktiUrl: "/bukti.png",
  },
  {
    id: 2,
    nama: "Joel Vian",
    rute: "Malang - Surabaya",
    tanggal: "10 Oktober 2026",
    jam: "07.00",
    harga: "190.000",
    kategori: "Regular",
    status: "Disetujui",
    buktiUrl: "/bukti.png",
  },
  {
    id: 3,
    nama: "David Wijaya",
    rute: "Semarang - Yogyakarta",
    tanggal: "10 September 2026",
    jam: "07.00",
    harga: "185.000",
    kategori: "Regular",
    status: "Ditolak",
    buktiUrl: "/bukti.png",
  },
];

export default function BayarPage() {
  const [filter, setFilter] = useState<string>("Semua");
  const [listBayar, setListBayar] = useState<DataBayar[]>(initialData);
  const [selectedBukti, setSelectedBukti] = useState<string | null>(null);
  const [detailItem, setDetailItem] = useState<DataBayar | null>(null);

  // State Modal Konfirmasi ACC / Tolak
  const [confirmModal, setConfirmModal] = useState<{
    show: boolean;
    id: number | null;
    nama: string;
    actionType: "ACC" | "Tolak" | null;
  }>({
    show: false,
    id: null,
    nama: "",
    actionType: null,
  });

  const filteredData = listBayar.filter((item) => {
    if (filter === "Semua") return true;
    return item.status === filter;
  });

  const openConfirmModal = (
    id: number,
    nama: string,
    actionType: "ACC" | "Tolak"
  ) => {
    setConfirmModal({
      show: true,
      id,
      nama,
      actionType,
    });
  };

  const handleExecuteAction = () => {
    if (!confirmModal.id || !confirmModal.actionType) return;

    const newStatus =
      confirmModal.actionType === "ACC" ? "Disetujui" : "Ditolak";

    setListBayar((prevData) =>
      prevData.map((item) =>
        item.id === confirmModal.id ? { ...item, status: newStatus } : item
      )
    );

    setConfirmModal({ show: false, id: null, nama: "", actionType: null });
  };

  return (
    <div className="admin-page">
      {/* HEADER UTAMA */}
      <header className="admin-header">
        <div className="brand">
          <div className="brand-logo">
            <img src="/logo.png" alt="Marlibu Logo" />
          </div>
          <div className="brand-text">
            <h1>Panel Admin</h1>
            <span>Manajemen Pembayaran dan Penumpang</span>
          </div>
        </div>

        {/* LINK PROFIL ADMIN */}
        <Link href="/profil" className="admin-avatar-link">
          <div className="admin-avatar">👤</div>
        </Link>

        {/* STATISTIK */}
        <div className="stats-section">
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

        {/* TOTAL PENDAPATAN */}
        <div className="income-section">
          <div className="income-card">
            <span>
              Total Pendapatan Terkonfirmasi : <strong>Rp8.550.000</strong>
            </span>
          </div>
        </div>
      </header>

      {/* NAVIGASI UTAMA */}
      <nav className="main-nav">
        <Link href="/grafik" className="nav-item">
          Grafik
        </Link>
        <Link href="/bayar" className="nav-item active">
          Bayar
        </Link>
        <Link href="/penumpang" className="nav-item">
          Penumpang
        </Link>
        <Link href="/promo" className="nav-item">
          Promo
        </Link>
      </nav>

      {/* FILTER BUTTONS */}
      <div className="filter-container">
        {["Semua", "Menunggu", "Disetujui", "Ditolak"].map((tab) => (
          <button
            key={tab}
            className={`filter-btn ${filter === tab ? "active" : ""}`}
            onClick={() => setFilter(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* LIST CARD PEMBAYARAN */}
      <div className="passenger-list-container">
        {filteredData.map((item) => (
          <div className="passenger-card" key={item.id}>
            <div className="passenger-header">
              <span
                className={`status-badge ${
                  item.status === "Ditolak"
                    ? "status-ditolak"
                    : item.status === "Disetujui"
                    ? "status-disetujui"
                    : "status-menunggu"
                }`}
              >
                {item.status}
              </span>
            </div>

            <h2 className="passenger-name">{item.nama}</h2>

            <div className="bayar-info-list">
              <div className="bayar-info-item">
                <span className="icon">🚘</span>
                <span>{item.rute}</span>
              </div>
              <div className="bayar-info-item">
                <span className="icon">📅</span>
                <span>
                  {item.tanggal} &nbsp; {item.jam}
                </span>
              </div>
              <div className="bayar-info-item">
                <span className="icon">💳</span>
                <span className="price-tag">Rp{item.harga}</span>
                <span className="category-tag">{item.kategori}</span>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            {item.status === "Menunggu" ? (
              <div className="bayar-actions">
                <button
                  className="action-btn"
                  onClick={() => setSelectedBukti(item.buktiUrl)}
                >
                  Lihat Bukti
                </button>

                <button
                  className="action-btn"
                  onClick={() => openConfirmModal(item.id, item.nama, "ACC")}
                >
                  ACC
                </button>
                <button
                  className="action-btn"
                  onClick={() => openConfirmModal(item.id, item.nama, "Tolak")}
                >
                  Tolak
                </button>
              </div>
            ) : (
              <div className="bayar-actions-detail">
                <button
                  className="detail-btn"
                  onClick={() => setDetailItem(item)}
                >
                  Lihat Detail
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* MODAL KONFIRMASI ACC / TOLAK */}
      {confirmModal.show && (
        <div
          className="modal-overlay"
          onClick={() =>
            setConfirmModal({
              show: false,
              id: null,
              nama: "",
              actionType: null,
            })
          }
        >
          <div
            className="confirm-card-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="confirm-header">
              <h3>
                {confirmModal.actionType === "ACC"
                  ? "Konfirmasi Persetujuan"
                  : "Konfirmasi Penolakan"}
              </h3>
            </div>
            <div className="confirm-body">
              <p>
                Apakah Anda yakin ingin{" "}
                <strong>
                  {confirmModal.actionType === "ACC"
                    ? "menyetujui"
                    : "menolak"}
                </strong>{" "}
                pembayaran untuk <strong>{confirmModal.nama}</strong>?
              </p>
            </div>
            <div className="confirm-footer">
              <button
                className="modal-btn cancel-btn"
                onClick={() =>
                  setConfirmModal({
                    show: false,
                    id: null,
                    nama: "",
                    actionType: null,
                  })
                }
              >
                Batal
              </button>
              <button
                className={`modal-btn ${
                  confirmModal.actionType === "ACC" ? "acc-btn" : "reject-btn"
                }`}
                onClick={handleExecuteAction}
              >
                {confirmModal.actionType === "ACC" ? "Ya, ACC" : "Ya, Tolak"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL BUKTI PEMBAYARAN */}
      {selectedBukti && (
        <div className="modal-overlay" onClick={() => setSelectedBukti(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Bukti Pembayaran</h3>
              <button
                className="close-btn"
                onClick={() => setSelectedBukti(null)}
              >
                ✕
              </button>
            </div>
            <div
              className="modal-body"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "10px",
              }}
            >
              <img
                src={selectedBukti}
                alt="Bukti Pembayaran"
                style={{
                  maxWidth: "100%",
                  maxHeight: "420px",
                  borderRadius: "8px",
                  objectFit: "contain",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* MODAL DETAIL PEMBAYARAN (TAMPILAN GRID 2 KOLOM KOTAK) */}
      {detailItem && (
        <div className="modal-overlay" onClick={() => setDetailItem(null)}>
          <div
            className="modal-content detail-modal-wide"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Detail Pembayaran</h3>
              <button
                className="close-btn"
                onClick={() => setDetailItem(null)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="detail-grid-container">
                {/* KOLOM KIRI: TEKS INFORMASI */}
                <div className="detail-info-side">
                  <p>
                    <strong>Nama:</strong> {detailItem.nama}
                  </p>
                  <p>
                    <strong>Rute:</strong> {detailItem.rute}
                  </p>
                  <p>
                    <strong>Jadwal:</strong> {detailItem.tanggal} ({detailItem.jam})
                  </p>
                  <p>
                    <strong>Total:</strong> Rp{detailItem.harga}
                  </p>
                  <p>
                    <strong>Kategori:</strong> {detailItem.kategori}
                  </p>
                  <p>
                    <strong>Status:</strong> {detailItem.status}
                  </p>
                </div>

                {/* KOLOM KANAN: GAMBAR BUKTI */}
                <div className="detail-bukti-side">
                  <p>
                    <strong>Bukti Transfer:</strong>
                  </p>
                  <img
                    src={detailItem.buktiUrl}
                    alt="Bukti Pembayaran"
                    className="detail-bukti-img"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}