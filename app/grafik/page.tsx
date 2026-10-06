"use client";

import React, { useMemo, useState } from "react";
import "./grafik.css";

type MonthKey =
  | "mei"
  | "juni"
  | "juli"
  | "agustus"
  | "september"
  | "oktober";

type FilterType = "bulanan" | "mingguan";

interface MonthData {
  title: string;
  isCurrentMonth: boolean;

  totalPesanan: number;
  menungguACC: number;
  disetujui: number;
  pendapatanTerkonfirmasi: number;

  pendapatanTertunda: number;
  pesananBelumDikonfirmasi: number;

  weeklyRevenue: number[];
  weeklyOrders: number[];

  weeklyDates: string;
}

/* =========================================================
   DATA LAPORAN
========================================================= */

const monthNames: Record<MonthKey, string> = {
  mei: "Mei",
  juni: "Juni",
  juli: "Juli",
  agustus: "Agustus",
  september: "September",
  oktober: "Oktober",
};

const monthlyDatabase: Record<MonthKey, MonthData> = {
  mei: {
    title: "Mei 2026",
    isCurrentMonth: false,

    totalPesanan: 142,
    menungguACC: 0,
    disetujui: 142,
    pendapatanTerkonfirmasi: 15600000,

    pendapatanTertunda: 0,
    pesananBelumDikonfirmasi: 0,

    weeklyRevenue: [
      3650000,
      3920000,
      4010000,
      4020000,
    ],

    weeklyOrders: [32, 35, 36, 39],

    weeklyDates: "18 - 21 Mei 2026",
  },

  juni: {
    title: "Juni 2026",
    isCurrentMonth: false,

    totalPesanan: 154,
    menungguACC: 0,
    disetujui: 154,
    pendapatanTerkonfirmasi: 16800000,

    pendapatanTertunda: 0,
    pesananBelumDikonfirmasi: 0,

    weeklyRevenue: [
      3920000,
      4210000,
      4320000,
      4350000,
    ],

    weeklyOrders: [35, 38, 40, 41],

    weeklyDates: "22 - 25 Juni 2026",
  },

  juli: {
    title: "Juli 2026",
    isCurrentMonth: false,

    totalPesanan: 173,
    menungguACC: 0,
    disetujui: 173,
    pendapatanTerkonfirmasi: 19100000,

    pendapatanTertunda: 0,
    pesananBelumDikonfirmasi: 0,

    weeklyRevenue: [
      4480000,
      4720000,
      4910000,
      4990000,
    ],

    weeklyOrders: [40, 43, 45, 45],

    weeklyDates: "20 - 23 Juli 2026",
  },

  agustus: {
    title: "Agustus 2026",
    isCurrentMonth: false,

    totalPesanan: 156,
    menungguACC: 0,
    disetujui: 156,
    pendapatanTerkonfirmasi: 17200000,

    pendapatanTertunda: 0,
    pesananBelumDikonfirmasi: 0,

    weeklyRevenue: [
      4050000,
      4280000,
      4370000,
      4500000,
    ],

    weeklyOrders: [36, 39, 40, 41],

    weeklyDates: "24 - 27 Agustus 2026",
  },

  september: {
    title: "September 2026",
    isCurrentMonth: false,

    totalPesanan: 168,
    menungguACC: 0,
    disetujui: 168,
    pendapatanTerkonfirmasi: 18400000,

    pendapatanTertunda: 0,
    pesananBelumDikonfirmasi: 0,

    weeklyRevenue: [
      4320000,
      4560000,
      4680000,
      4840000,
    ],

    weeklyOrders: [39, 42, 43, 44],

    weeklyDates: "21 - 24 September 2026",
  },

  oktober: {
    title: "Oktober 2026 (Bulan Berjalan)",
    isCurrentMonth: true,

    totalPesanan: 40,
    menungguACC: 12,
    disetujui: 28,
    pendapatanTerkonfirmasi: 8550000,

    pendapatanTertunda: 3600000,
    pesananBelumDikonfirmasi: 12,

    weeklyRevenue: [
      1050000,
      1200000,
      950000,
      1350000,
      1150000,
      1250000,
      1600000,
    ],

    weeklyOrders: [5, 6, 4, 7, 5, 6, 7],

    weeklyDates: "5 - 11 Oktober 2026",
  },
};

/* =========================================================
   DATA GRAFIK BULANAN
========================================================= */

const monthlyChartData = [
  {
    label: "Mei",
    month: "mei" as MonthKey,
    revenue: 15600000,
    orders: 142,
  },
  {
    label: "Jun",
    month: "juni" as MonthKey,
    revenue: 16800000,
    orders: 154,
  },
  {
    label: "Jul",
    month: "juli" as MonthKey,
    revenue: 19100000,
    orders: 173,
  },
  {
    label: "Ags",
    month: "agustus" as MonthKey,
    revenue: 17200000,
    orders: 156,
  },
  {
    label: "Sep",
    month: "september" as MonthKey,
    revenue: 18400000,
    orders: 168,
  },
  {
    label: "Okt",
    month: "oktober" as MonthKey,
    revenue: 8550000,
    orders: 40,
  },
];

/* =========================================================
   HELPER
========================================================= */

function formatRupiah(value: number): string {
  return (
    "Rp " +
    new Intl.NumberFormat("id-ID", {
      maximumFractionDigits: 0,
    }).format(Math.round(value))
  );
}

function formatShortRupiah(value: number): string {
  if (value >= 1000000) {
    return `Rp ${(value / 1000000).toFixed(1)}Jt`;
  }

  if (value >= 1000) {
    return `Rp ${(value / 1000).toFixed(0)}Rb`;
  }

  return `Rp ${value}`;
}

function createLinePoints(
  values: number[],
  maxValue: number
): string {
  const width = 500;
  const chartTop = 10;
  const chartBottom = 130;
  const chartHeight = chartBottom - chartTop;

  if (values.length === 1) {
    return `0,${chartBottom - 50}`;
  }

  return values
    .map((value, index) => {
      const x =
        (index / (values.length - 1)) * width;

      const y =
        chartBottom -
        (value / maxValue) * chartHeight;

      return `${x},${y}`;
    })
    .join(" ");
}

/* =========================================================
   LABEL GRAFIK MINGGUAN
========================================================= */

function getWeeklyLabels(
  isCurrentMonth: boolean
): string[] {
  if (isCurrentMonth) {
    return [
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
      "Minggu",
    ];
  }

  return [
    "Minggu ke 1",
    "Minggu ke 2",
    "Minggu ke 3",
    "Minggu ke 4",
  ];
}

/* =========================================================
   KOMPONEN UTAMA
========================================================= */

export default function GrafikPage() {
  const [selectedMonth, setSelectedMonth] =
    useState<MonthKey>("oktober");

  const [filterType, setFilterType] =
    useState<FilterType>("bulanan");

  const currentData =
    monthlyDatabase[selectedMonth];

  const weeklyLabels = getWeeklyLabels(
    currentData.isCurrentMonth
  );

  const visibleMonthlyData = useMemo(() => {
    const selectedIndex =
      monthlyChartData.findIndex(
        (item) => item.month === selectedMonth
      );

    if (selectedIndex === -1) {
      return monthlyChartData;
    }

    return monthlyChartData.slice(
      0,
      selectedIndex + 1
    );
  }, [selectedMonth]);

  const monthlyRevenueValues =
    visibleMonthlyData.map(
      (item) => item.revenue
    );

  const monthlyOrderValues =
    visibleMonthlyData.map(
      (item) => item.orders
    );

  const monthlyMaxRevenue = Math.max(
    ...monthlyRevenueValues,
    20000000
  );

  const monthlyMaxOrders = Math.max(
    ...monthlyOrderValues,
    180
  );

  const monthlyLinePoints =
    createLinePoints(
      monthlyRevenueValues,
      monthlyMaxRevenue
    );

  const monthlyPolygon =
    `${monthlyLinePoints} 500,140 0,140`;

  const weeklyMaxRevenue = Math.max(
    ...currentData.weeklyRevenue,
    5000000
  );

  const weeklyMaxOrders = Math.max(
    ...currentData.weeklyOrders,
    50
  );

  const weeklyLinePoints =
    createLinePoints(
      currentData.weeklyRevenue,
      weeklyMaxRevenue
    );

  const weeklyPolygon =
    `${weeklyLinePoints} 500,140 0,140`;

  const monthlyRevenueAxis = [
    monthlyMaxRevenue,
    monthlyMaxRevenue * 0.75,
    monthlyMaxRevenue * 0.5,
    monthlyMaxRevenue * 0.25,
    0,
  ];

  const monthlyOrderAxis = [
    monthlyMaxOrders,
    monthlyMaxOrders * 0.75,
    monthlyMaxOrders * 0.5,
    monthlyMaxOrders * 0.25,
    0,
  ];

  const weeklyRevenueAxis = [
    weeklyMaxRevenue,
    weeklyMaxRevenue * 0.75,
    weeklyMaxRevenue * 0.5,
    weeklyMaxRevenue * 0.25,
    0,
  ];

  const statusApproved =
    currentData.isCurrentMonth
      ? currentData.disetujui
      : currentData.totalPesanan;

  const statusWaiting =
    currentData.isCurrentMonth
      ? currentData.menungguACC
      : 0;

  const statusRejected =
    currentData.isCurrentMonth ? 1 : 0;

  const totalStatus =
    statusApproved +
    statusWaiting +
    statusRejected;

  const approvedPercentage =
    totalStatus > 0
      ? (statusApproved / totalStatus) * 100
      : 0;

  const waitingPercentage =
    totalStatus > 0
      ? (statusWaiting / totalStatus) * 100
      : 0;

  const rejectedPercentage =
    totalStatus > 0
      ? (statusRejected / totalStatus) * 100
      : 0;

  const goTo = (path: string) => {
    window.location.href = path;
  };

  return (
    <main className="admin-page">

      <header className="admin-header">

        <div className="brand">

          <div className="brand-logo">
            <img
              src="/logo.png"
              alt="Logo"
            />
          </div>

          <div className="brand-text">
            <h1>Panel Admin</h1>

            <span>
              Manajemen Pembayaran dan Penumpang
            </span>
          </div>

        </div>

        <button
          className="admin-avatar"
          type="button"
          title="Profil Admin"
          onClick={() => goTo("/profil")}
        >
          👤
        </button>

        <section className="stats-section">

          <div className="stat-card">
            <strong>
              {currentData.totalPesanan}
            </strong>

            <span>
              Total Pesanan
            </span>
          </div>

          <div className="stat-card">
            <strong>
              {currentData.menungguACC}
            </strong>

            <span>
              Menunggu ACC
            </span>
          </div>

          <div className="stat-card">
            <strong>
              {currentData.disetujui}
            </strong>

            <span>
              Disetujui
            </span>
          </div>

        </section>

        <section className="income-section">

          <div className="income-card">

            <span>
              Total Pendapatan Terkonfirmasi:
            </span>

            <strong>
              {formatRupiah(
                currentData.pendapatanTerkonfirmasi
              )}
            </strong>

          </div>

        </section>

      </header>

      <div className="month-selector-bar">

        <span>
          Periode Data Laporan:
        </span>

        <select
          className="month-dropdown-select"
          value={selectedMonth}
          onChange={(event) =>
            setSelectedMonth(
              event.target.value as MonthKey
            )
          }
        >

          <option value="oktober">
            Oktober 2026 (Bulan Berjalan)
          </option>

          <option value="september">
            September 2026
          </option>

          <option value="agustus">
            Agustus 2026
          </option>

          <option value="juli">
            Juli 2026
          </option>

          <option value="juni">
            Juni 2026
          </option>

          <option value="mei">
            Mei 2026
          </option>

        </select>

      </div>

      <nav className="main-nav">

        <button
          className="active"
          type="button"
          onClick={() => goTo("/grafik")}
        >
          Grafik
        </button>

        <button
          type="button"
          onClick={() => goTo("/bayar")}
        >
          Bayar
        </button>

        <button
          type="button"
          onClick={() => goTo("/penumpang")}
        >
          Penumpang
        </button>

        <button
          type="button"
          onClick={() => goTo("/promo")}
        >
          Promo
        </button>

      </nav>

      <section className="content-body">

        <div className="cards-grid">

          <div className="stat-card-metric">

            <div className="val">
              {formatRupiah(
                currentData.pendapatanTerkonfirmasi
              )}
            </div>

            <div className="desc">
              {currentData.isCurrentMonth
                ? "Total Pendapatan Terkonfirmasi"
                : `Total Pendapatan Bulan ${monthNames[selectedMonth]}`}
            </div>

          </div>

          <div className="stat-card-metric">

            <div className="val">
              {currentData.isCurrentMonth
                ? formatRupiah(
                    currentData.pendapatanTertunda
                  )
                : currentData.totalPesanan}
            </div>

            <div className="desc">
              {currentData.isCurrentMonth
                ? "Total Pendapatan Tertunda"
                : "Total Pesanan"}
            </div>

          </div>

          {currentData.isCurrentMonth && (
            <>

              <div className="stat-card-metric">

                <div className="val">
                  {currentData.disetujui}
                </div>

                <div className="desc">
                  Total Pesanan Dikonfirmasi
                </div>

              </div>

              <div className="stat-card-metric">

                <div className="val">
                  {currentData.pesananBelumDikonfirmasi}
                </div>

                <div className="desc">
                  Total Pesanan Belum Dikonfirmasi
                </div>

              </div>

            </>
          )}

        </div>

        <div className="filter-buttons-row">

          <button
            type="button"
            className={
              filterType === "bulanan"
                ? "filter-btn-orange active"
                : "filter-btn-orange inactive"
            }
            onClick={() =>
              setFilterType("bulanan")
            }
          >
            Bulanan
          </button>

          <button
            type="button"
            className={
              filterType === "mingguan"
                ? "filter-btn-orange active"
                : "filter-btn-orange inactive"
            }
            onClick={() =>
              setFilterType("mingguan")
            }
          >
            Mingguan
          </button>

        </div>

        {filterType === "bulanan" && (
          <>

            <div className="chart-box">

              <div className="chart-title-text">
                Grafik Pendapatan Mei -{" "}
                {monthNames[selectedMonth]} 2026
              </div>

              <div className="line-graph-flex">

                <div className="y-labels">

                  {monthlyRevenueAxis.map(
                    (value, index) => (
                      <span key={index}>
                        {formatShortRupiah(value)}
                      </span>
                    )
                  )}

                </div>

                <div className="svg-container">

                  <svg
                    viewBox="0 0 500 140"
                    className="svg-chart"
                    preserveAspectRatio="none"
                  >

                    <line
                      x1="0"
                      y1="10"
                      x2="500"
                      y2="10"
                      className="grid-line"
                    />

                    <line
                      x1="0"
                      y1="42"
                      x2="500"
                      y2="42"
                      className="grid-line"
                    />

                    <line
                      x1="0"
                      y1="75"
                      x2="500"
                      y2="75"
                      className="grid-line"
                    />

                    <line
                      x1="0"
                      y1="108"
                      x2="500"
                      y2="108"
                      className="grid-line"
                    />

                    <line
                      x1="0"
                      y1="140"
                      x2="500"
                      y2="140"
                      className="grid-line"
                    />

                    <defs>

                      <linearGradient
                        id="orangeGradMonthly"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >

                        <stop
                          offset="0%"
                          stopColor="#ff7a00"
                          stopOpacity="0.35"
                        />

                        <stop
                          offset="100%"
                          stopColor="#ff7a00"
                          stopOpacity="0"
                        />

                      </linearGradient>

                    </defs>

                    <polygon
                      points={monthlyPolygon}
                      fill="url(#orangeGradMonthly)"
                    />

                    <polyline
                      fill="none"
                      stroke="#ff7a00"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={monthlyLinePoints}
                    />

                    {visibleMonthlyData.map(
                      (item, index) => {

                        const x =
                          visibleMonthlyData.length === 1
                            ? 0
                            : (index /
                                (visibleMonthlyData.length - 1)) *
                              500;

                        const chartBottom = 130;
                        const chartHeight = 120;

                        const y =
                          chartBottom -
                          (item.revenue /
                            monthlyMaxRevenue) *
                            chartHeight;

                        return (
                          <circle
                            key={item.label}
                            cx={x}
                            cy={y}
                            r="4.5"
                            fill="#ff7a00"
                          />
                        );
                      }
                    )}

                  </svg>

                  <div className="x-labels">

                    {visibleMonthlyData.map(
                      (item) => (
                        <span key={item.label}>
                          {item.label}
                        </span>
                      )
                    )}

                  </div>

                </div>

              </div>

            </div>

            <div className="chart-box">

              <div className="chart-title-text">
                Jumlah Order per Bulan
              </div>

              <div className="chart-subtitle-text">
                Mei - {monthNames[selectedMonth]} 2026
              </div>

              <div className="bar-graph-flex">

                <div className="y-labels">

                  {monthlyOrderAxis.map(
                    (value, index) => (
                      <span key={index}>
                        {Math.round(value)}
                      </span>
                    )
                  )}

                </div>

                <div className="bar-container-area">

                  <div className="bars-wrapper">

                    {visibleMonthlyData.map(
                      (item) => {

                        const height =
                          (item.orders /
                            monthlyMaxOrders) *
                          100;

                        return (
                          <div
                            className="bar-col"
                            key={item.label}
                          >

                            <span className="bar-value">
                              {item.orders}
                            </span>

                            <div
                              className="teal-bar"
                              style={{
                                height: `${height}%`,
                              }}
                            />

                          </div>
                        );
                      }
                    )}

                  </div>

                  <div className="x-labels">

                    {visibleMonthlyData.map(
                      (item) => (
                        <span key={item.label}>
                          {item.label}
                        </span>
                      )
                    )}

                  </div>

                </div>

              </div>

            </div>

          </>
        )}

        {filterType === "mingguan" && (
          <>

            <div className="chart-box">

              <div className="chart-title-text">
                Grafik Pendapatan Mingguan{" "}
                {monthNames[selectedMonth]} 2026
              </div>

              <div className="chart-subtitle-text">
                {currentData.weeklyDates}
              </div>

              <div className="line-graph-flex">

                <div className="y-labels">

                  {weeklyRevenueAxis.map(
                    (value, index) => (
                      <span key={index}>
                        {formatShortRupiah(value)}
                      </span>
                    )
                  )}

                </div>

                <div className="svg-container">

                  <svg
                    viewBox="0 0 500 140"
                    className="svg-chart"
                    preserveAspectRatio="none"
                  >

                    <line
                      x1="0"
                      y1="10"
                      x2="500"
                      y2="10"
                      className="grid-line"
                    />

                    <line
                      x1="0"
                      y1="42"
                      x2="500"
                      y2="42"
                      className="grid-line"
                    />

                    <line
                      x1="0"
                      y1="75"
                      x2="500"
                      y2="75"
                      className="grid-line"
                    />

                    <line
                      x1="0"
                      y1="108"
                      x2="500"
                      y2="108"
                      className="grid-line"
                    />

                    <line
                      x1="0"
                      y1="140"
                      x2="500"
                      y2="140"
                      className="grid-line"
                    />

                    <defs>

                      <linearGradient
                        id="orangeGradWeekly"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >

                        <stop
                          offset="0%"
                          stopColor="#ff7a00"
                          stopOpacity="0.35"
                        />

                        <stop
                          offset="100%"
                          stopColor="#ff7a00"
                          stopOpacity="0"
                        />

                      </linearGradient>

                    </defs>

                    <polygon
                      points={weeklyPolygon}
                      fill="url(#orangeGradWeekly)"
                    />

                    <polyline
                      fill="none"
                      stroke="#ff7a00"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={weeklyLinePoints}
                    />

                    {currentData.weeklyRevenue.map(
                      (value, index) => {

                        const x =
                          currentData.weeklyRevenue.length === 1
                            ? 0
                            : (index /
                                (currentData.weeklyRevenue.length - 1)) *
                              500;

                        const chartBottom = 130;
                        const chartHeight = 120;

                        const y =
                          chartBottom -
                          (value /
                            weeklyMaxRevenue) *
                            chartHeight;

                        return (
                          <circle
                            key={index}
                            cx={x}
                            cy={y}
                            r="4.5"
                            fill="#ff7a00"
                          />
                        );
                      }
                    )}

                  </svg>

                  <div className="x-labels">

                    {weeklyLabels.map((label) => (
                      <span key={label}>
                        {label}
                      </span>
                    ))}

                  </div>

                </div>

              </div>

            </div>

            <div className="chart-box">

              <div className="chart-title-text">
                Jumlah Order per Hari
              </div>

              <div className="chart-subtitle-text">
                {currentData.weeklyDates}
              </div>

              <div className="bar-graph-flex">

                <div className="y-labels">

                  {[50, 38, 25, 13, 0].map(
                    (value) => (
                      <span key={value}>
                        {value}
                      </span>
                    )
                  )}

                </div>

                <div className="bar-container-area">

                  <div className="bars-wrapper">

                    {currentData.weeklyOrders.map(
                      (value, index) => {

                        const height =
                          (value /
                            weeklyMaxOrders) *
                          100;

                        return (
                          <div
                            className="bar-col"
                            key={index}
                          >

                            <span className="bar-value">
                              {value}
                            </span>

                            <div
                              className="teal-bar"
                              style={{
                                height: `${height}%`,
                              }}
                            />

                          </div>
                        );
                      }
                    )}

                  </div>

                  <div className="x-labels">

                    {weeklyLabels.map((label) => (
                      <span key={label}>
                        {label}
                      </span>
                    ))}

                  </div>

                </div>

              </div>

            </div>

          </>
        )}

        <div className="booking-status-card">

          <div className="booking-status-title">
            Status Bus Booking Saat Ini
          </div>

          <div className="status-row">

            <span className="status-label">
              Disetujui
            </span>

            <div className="status-bar-bg">

              <div
                className="status-bar-fill approved"
                style={{
                  width: `${approvedPercentage}%`,
                }}
              />

            </div>

            <span className="status-count">
              {statusApproved}
            </span>

          </div>

          <div className="status-row">

            <span className="status-label">
              Menunggu
            </span>

            <div className="status-bar-bg">

              <div
                className="status-bar-fill waiting"
                style={{
                  width: `${waitingPercentage}%`,
                }}
              />

            </div>

            <span className="status-count">
              {statusWaiting}
            </span>

          </div>

          <div className="status-row">

            <span className="status-label">
              Ditolak
            </span>

            <div className="status-bar-bg">

              <div
                className="status-bar-fill rejected"
                style={{
                  width: `${rejectedPercentage}%`,
                }}
              />

            </div>

            <span className="status-count">
              {statusRejected}
            </span>

          </div>

        </div>

      </section>

    </main>
  );
}