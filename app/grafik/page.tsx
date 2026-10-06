"use client";

import React, { useState } from "react";
import "./grafik.css";

type MonthKey = "oktober" | "september" | "agustus" | "juli" | "juni" | "mei";

interface MonthData {
  title: string;
  isCurrentMonth: boolean;
  totalPesananHeader: number;
  menungguACCHeader: number;
  disetujuiHeader: number;
  pendapatanDikonfirmasiHeader: string;
  metrics: {
    val1: string;
    desc1: string;
    val2: string;
    desc2: string;
    val3?: string;
    desc3?: string;
    val4?: string;
    desc4?: string;
  };
  lineChartTitle: string;
  lineChart: {
    points: string;
    polygon: string;
    dots: { cx: number; cy: number }[];
    labels: string[];
    yAxis: string[];
  };
  barChartTitle: string;
  barChart: { label: string; height: string; val: string }[];
  yAxisBar: string[];
}

const monthlyDatabase: Record<MonthKey, MonthData> = {
  oktober: {
    title: "Oktober 2026 (Bulan Berjalan)",
    isCurrentMonth: true,
    totalPesananHeader: 40,
    menungguACCHeader: 12,
    disetujuiHeader: 28,
    pendapatanDikonfirmasiHeader: "Rp8.550.000",
    metrics: {
      val1: "Rp. 8.550.000",
      desc1: "Total Pendapatan Terkonfirmasi",
      val2: "Rp. 3.600.000",
      desc2: "Total Pendapatan Tertunda",
      val3: "28",
      desc3: "Total Pesanan Dikonfirmasi",
      val4: "12",
      desc4: "Total Pesanan Belum Dikonfirmasi",
    },
    lineChartTitle: "Grafik Pendapatan Apr - Okt 2026",
    lineChart: {
      points: "0,110 83,90 166,75 250,40 333,50 416,48 500,20",
      polygon: "0,110 83,90 166,75 250,40 333,50 416,48 500,20 500,140 0,140",
      dots: [
        { cx: 0, cy: 110 },
        { cx: 83, cy: 90 },
        { cx: 166, cy: 75 },
        { cx: 250, cy: 40 },
        { cx: 333, cy: 50 },
        { cx: 416, cy: 48 },
        { cx: 500, cy: 20 },
      ],
      labels: ["Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt"],
      yAxis: ["Rp 100.0Jt", "Rp 75.0Jt", "Rp 50.0Jt", "Rp 25.0Jt", "Rp 0Rb"],
    },
    barChartTitle: "Jumlah Order per Bulan",
    barChart: [
      { label: "Apr", height: "45%", val: "180" },
      { label: "Mei", height: "60%", val: "240" },
      { label: "Jun", height: "85%", val: "340" },
      { label: "Jul", height: "80%", val: "320" },
      { label: "Ags", height: "78%", val: "310" },
      { label: "Sep", height: "88%", val: "350" },
      { label: "Okt", height: "100%", val: "400" },
    ],
    yAxisBar: ["360", "270", "180", "90", "0"],
  },
  september: {
    title: "September 2026 (Terlewat)",
    isCurrentMonth: false,
    totalPesananHeader: 250,
    menungguACCHeader: 0,
    disetujuiHeader: 250,
    pendapatanDikonfirmasiHeader: "Rp98.000.000",
    metrics: {
      val1: "Rp. 98.000.000",
      desc1: "Total Pendapatan Bulan September",
      val2: "250",
      desc2: "Total Pesanan",
    },
    lineChartTitle: "Grafik Pendapatan Mar - Sep 2026",
    lineChart: {
      points: "0,115 83,95 166,80 250,45 333,52 416,50 500,25",
      polygon: "0,115 83,95 166,80 250,45 333,52 416,50 500,25 500,140 0,140",
      dots: [
        { cx: 0, cy: 115 },
        { cx: 83, cy: 95 },
        { cx: 166, cy: 80 },
        { cx: 250, cy: 45 },
        { cx: 333, cy: 52 },
        { cx: 416, cy: 50 },
        { cx: 500, cy: 25 },
      ],
      labels: ["Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep"],
      yAxis: ["Rp 100.0Jt", "Rp 75.0Jt", "Rp 50.0Jt", "Rp 25.0Jt", "Rp 0Rb"],
    },
    barChartTitle: "Jumlah Order per Bulan",
    barChart: [
      { label: "Mar", height: "35%", val: "130" },
      { label: "Apr", height: "55%", val: "200" },
      { label: "Mei", height: "65%", val: "240" },
      { label: "Jun", height: "85%", val: "320" },
      { label: "Jul", height: "80%", val: "310" },
      { label: "Ags", height: "78%", val: "300" },
      { label: "Sep", height: "88%", val: "330" },
    ],
    yAxisBar: ["360", "270", "180", "90", "0"],
  },
  agustus: {
    title: "Agustus 2026 (Terlewat)",
    isCurrentMonth: false,
    totalPesananHeader: 230,
    menungguACCHeader: 0,
    disetujuiHeader: 230,
    pendapatanDikonfirmasiHeader: "Rp89.500.000",
    metrics: {
      val1: "Rp. 89.500.000",
      desc1: "Total Pendapatan Bulan Agustus",
      val2: "230",
      desc2: "Total Pesanan",
    },
    lineChartTitle: "Grafik Pendapatan Feb - Ags 2026",
    lineChart: {
      points: "0,120 83,100 166,85 250,50 333,55 500,40",
      polygon: "0,120 83,100 166,85 250,50 333,55 500,40 500,140 0,140",
      dots: [
        { cx: 0, cy: 120 },
        { cx: 83, cy: 100 },
        { cx: 166, cy: 85 },
        { cx: 250, cy: 50 },
        { cx: 333, cy: 55 },
        { cx: 500, cy: 40 },
      ],
      labels: ["Feb", "Mar", "Apr", "Mei", "Jun", "Ags"],
      yAxis: ["Rp 100.0Jt", "Rp 75.0Jt", "Rp 50.0Jt", "Rp 25.0Jt", "Rp 0Rb"],
    },
    barChartTitle: "Jumlah Order per Bulan",
    barChart: [
      { label: "Feb", height: "30%", val: "110" },
      { label: "Mar", height: "35%", val: "130" },
      { label: "Apr", height: "55%", val: "200" },
      { label: "Mei", height: "65%", val: "240" },
      { label: "Jun", height: "85%", val: "320" },
      { label: "Ags", height: "78%", val: "300" },
    ],
    yAxisBar: ["360", "270", "180", "90", "0"],
  },
  juli: {
    title: "Juli 2026 (Terlewat)",
    isCurrentMonth: false,
    totalPesananHeader: 240,
    menungguACCHeader: 0,
    disetujuiHeader: 240,
    pendapatanDikonfirmasiHeader: "Rp92.000.000",
    metrics: {
      val1: "Rp. 92.000.000",
      desc1: "Total Pendapatan Bulan Juli",
      val2: "240",
      desc2: "Total Pesanan",
    },
    lineChartTitle: "Grafik Pendapatan Jan - Jul 2026",
    lineChart: {
      points: "0,125 100,105 200,90 300,55 500,38",
      polygon: "0,125 100,105 200,90 300,55 500,38 500,140 0,140",
      dots: [
        { cx: 0, cy: 125 },
        { cx: 100, cy: 105 },
        { cx: 200, cy: 90 },
        { cx: 300, cy: 55 },
        { cx: 500, cy: 38 },
      ],
      labels: ["Jan", "Feb", "Mar", "Apr", "Jul"],
      yAxis: ["Rp 100.0Jt", "Rp 75.0Jt", "Rp 50.0Jt", "Rp 25.0Jt", "Rp 0Rb"],
    },
    barChartTitle: "Jumlah Order per Bulan",
    barChart: [
      { label: "Jan", height: "25%", val: "90" },
      { label: "Feb", height: "30%", val: "110" },
      { label: "Mar", height: "35%", val: "130" },
      { label: "Apr", height: "55%", val: "200" },
      { label: "Jul", height: "80%", val: "310" },
    ],
    yAxisBar: ["360", "270", "180", "90", "0"],
  },
  juni: {
    title: "Juni 2026 (Terlewat)",
    isCurrentMonth: false,
    totalPesananHeader: 260,
    menungguACCHeader: 0,
    disetujuiHeader: 260,
    pendapatanDikonfirmasiHeader: "Rp95.400.000",
    metrics: {
      val1: "Rp. 95.400.000",
      desc1: "Total Pendapatan Bulan Juni",
      val2: "260",
      desc2: "Total Pesanan",
    },
    lineChartTitle: "Grafik Pendapatan Jan - Jun 2026",
    lineChart: {
      points: "0,130 125,110 250,95 375,60 500,32",
      polygon: "0,130 125,110 250,95 375,60 500,32 500,140 0,140",
      dots: [
        { cx: 0, cy: 130 },
        { cx: 125, cy: 110 },
        { cx: 250, cy: 95 },
        { cx: 375, cy: 60 },
        { cx: 500, cy: 32 },
      ],
      labels: ["Jan", "Feb", "Mar", "Apr", "Jun"],
      yAxis: ["Rp 100.0Jt", "Rp 75.0Jt", "Rp 50.0Jt", "Rp 25.0Jt", "Rp 0Rb"],
    },
    barChartTitle: "Jumlah Order per Bulan",
    barChart: [
      { label: "Jan", height: "25%", val: "90" },
      { label: "Feb", height: "30%", val: "110" },
      { label: "Mar", height: "35%", val: "130" },
      { label: "Apr", height: "55%", val: "200" },
      { label: "Jun", height: "85%", val: "320" },
    ],
    yAxisBar: ["360", "270", "180", "90", "0"],
  },
  mei: {
    title: "Mei 2026 (Terlewat)",
    isCurrentMonth: false,
    totalPesananHeader: 190,
    menungguACCHeader: 0,
    disetujuiHeader: 190,
    pendapatanDikonfirmasiHeader: "Rp72.000.000",
    metrics: {
      val1: "Rp. 72.000.000",
      desc1: "Total Pendapatan Bulan Mei",
      val2: "190",
      desc2: "Total Pesanan",
    },
    lineChartTitle: "Grafik Pendapatan Jan - Mei 2026",
    lineChart: {
      points: "0,135 166,115 333,100 500,60",
      polygon: "0,135 166,115 333,100 500,60 500,140 0,140",
      dots: [
        { cx: 0, cy: 135 },
        { cx: 166, cy: 115 },
        { cx: 333, cy: 100 },
        { cx: 500, cy: 60 },
      ],
      labels: ["Jan", "Feb", "Mar", "Mei"],
      yAxis: ["Rp 100.0Jt", "Rp 75.0Jt", "Rp 50.0Jt", "Rp 25.0Jt", "Rp 0Rb"],
    },
    barChartTitle: "Jumlah Order per Bulan",
    barChart: [
      { label: "Jan", height: "25%", val: "90" },
      { label: "Feb", height: "30%", val: "110" },
      { label: "Mar", height: "35%", val: "130" },
      { label: "Mei", height: "65%", val: "240" },
    ],
    yAxisBar: ["360", "270", "180", "90", "0"],
  },
};

// UTAMA: Komponen harus diexport default seperti ini
export default function GrafikPage() {
  const [selectedMonth, setSelectedMonth] = useState<MonthKey>("oktober");
  const [filterType, setFilterType] = useState<"bulanan" | "mingguan">("bulanan");

  const currentData = monthlyDatabase[selectedMonth];

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
          <div className="stat-card-header">
            <strong>{currentData.totalPesananHeader}</strong>
            <span>Total Pesanan</span>
          </div>

          <div className="stat-card-header">
            <strong>{currentData.menungguACCHeader}</strong>
            <span>Menunggu ACC</span>
          </div>

          <div className="stat-card-header">
            <strong>{currentData.disetujuiHeader}</strong>
            <span>Disetujui</span>
          </div>
        </section>

        {/* PENDAPATAN */}
        <section className="income-section">
          <div className="income-card">
            Total Pendapatan Terkonfirmasi :<strong> {currentData.pendapatanDikonfirmasiHeader}</strong>
          </div>
        </section>
      </header>

      {/* BAR SELEKSI PERIODE BULAN */}
      <div className="month-selector-bar">
        <span>Periode Data Laporan:</span>
        <select
          className="month-dropdown-select"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value as MonthKey)}
        >
          <option value="oktober">Oktober 2026 (Bulan Berjalan)</option>
          <option value="september">September 2026</option>
          <option value="agustus">Agustus 2026</option>
          <option value="juli">Juli 2026</option>
          <option value="juni">Juni 2026</option>
          <option value="mei">Mei 2026</option>
        </select>
      </div>

      {/* NAVIGASI UTAMA */}
      <nav className="main-nav">
        <button className="active">Grafik</button>
        <button onClick={() => (window.location.href = "/bayar")}>Bayar</button>
        <button onClick={() => (window.location.href = "/penumpang")}>Penumpang</button>
        <button onClick={() => (window.location.href = "/promo")}>Promo</button>
      </nav>

      {/* ISI DASHBOARD CONTENT */}
      <section className="content-body">
        {/* KARTU METRIK UTAMA */}
        <div className="cards-grid">
          <div className="stat-card-metric">
            <div className="val">{currentData.metrics.val1}</div>
            <div className="desc">{currentData.metrics.desc1}</div>
          </div>
          <div className="stat-card-metric">
            <div className="val">{currentData.metrics.val2}</div>
            <div className="desc">{currentData.metrics.desc2}</div>
          </div>

          {currentData.isCurrentMonth && currentData.metrics.val3 && (
            <>
              <div className="stat-card-metric">
                <div className="val">{currentData.metrics.val3}</div>
                <div className="desc">{currentData.metrics.desc3}</div>
              </div>
              <div className="stat-card-metric">
                <div className="val">{currentData.metrics.val4}</div>
                <div className="desc">{currentData.metrics.desc4}</div>
              </div>
            </>
          )}
        </div>

        {/* FILTER TAB BULANAN / MINGGUAN */}
        <div className="filter-buttons-row">
          <button
            className={`filter-btn-orange ${filterType !== "bulanan" ? "inactive" : ""}`}
            onClick={() => setFilterType("bulanan")}
          >
            Bulanan
          </button>
          <button
            className={`filter-btn-orange ${filterType !== "mingguan" ? "inactive" : ""}`}
            onClick={() => setFilterType("mingguan")}
          >
            Mingguan
          </button>
        </div>

        {/* GRAFIK 1: LINE CHART PENDAPATAN */}
        <div className="chart-box">
          <div className="chart-title-text">{currentData.lineChartTitle}</div>

          <div className="line-graph-flex">
            <div className="y-labels">
              {currentData.lineChart.yAxis.map((val, idx) => (
                <span key={idx}>{val}</span>
              ))}
            </div>

            <div className="svg-container">
              <svg viewBox="0 0 500 140" className="svg-chart" preserveAspectRatio="none">
                <line x1="0" y1="10" x2="500" y2="10" className="grid-line" />
                <line x1="0" y1="42" x2="500" y2="42" className="grid-line" />
                <line x1="0" y1="75" x2="500" y2="75" className="grid-line" />
                <line x1="0" y1="108" x2="500" y2="108" className="grid-line" />
                <line x1="0" y1="140" x2="500" y2="140" className="grid-line" />

                <defs>
                  <linearGradient id="orangeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ff7a00" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#ff7a00" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                <polygon points={currentData.lineChart.polygon} fill="url(#orangeGrad)" />

                <polyline
                  fill="none"
                  stroke="#ff7a00"
                  strokeWidth="3.5"
                  points={currentData.lineChart.points}
                />

                {currentData.lineChart.dots.map((dot, idx) => (
                  <circle key={idx} cx={dot.cx} cy={dot.cy} r="4" fill="#ff7a00" />
                ))}
              </svg>

              <div className="x-labels">
                {currentData.lineChart.labels.map((lbl, idx) => (
                  <span key={idx}>{lbl}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* GRAFIK 2: BAR CHART VOLUME ORDER */}
        <div className="chart-box">
          <div className="chart-title-text">{currentData.barChartTitle}</div>
          <div className="chart-subtitle-text">Mar - Sep 2026</div>

          <div className="bar-graph-flex">
            <div className="y-labels">
              {currentData.yAxisBar.map((val, idx) => (
                <span key={idx}>{val}</span>
              ))}
            </div>

            <div className="bar-container-area">
              <div className="bars-wrapper">
                {currentData.barChart.map((item, idx) => (
                  <div className="bar-col" key={idx}>
                    <div className="teal-bar" style={{ height: item.height }}></div>
                  </div>
                ))}
              </div>

              <div className="x-labels">
                {currentData.barChart.map((item, idx) => (
                  <span key={idx}>{item.label}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* STATUS BUS BOOKING SAAT INI */}
        <div className="booking-status-card">
          <div className="booking-status-title">Status Bus Booking Saat Ini</div>

          <div className="status-row">
            <span className="status-label">Disetujui</span>
            <div className="status-bar-bg">
              <div className="status-bar-fill" style={{ width: "80%", backgroundColor: "#0070c0" }}></div>
            </div>
            <span className="status-count">3</span>
          </div>

          <div className="status-row">
            <span className="status-label">Menunggu</span>
            <div className="status-bar-bg">
              <div className="status-bar-fill" style={{ width: "50%", backgroundColor: "#ff7a00" }}></div>
            </div>
            <span className="status-count">2</span>
          </div>

          <div className="status-row">
            <span className="status-label">Ditolak</span>
            <div className="status-bar-bg">
              <div className="status-bar-fill" style={{ width: "25%", backgroundColor: "#ef4444" }}></div>
            </div>
            <span className="status-count">1</span>
          </div>
        </div>
      </section>
    </main>
  );
}