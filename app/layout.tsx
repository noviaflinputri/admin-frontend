import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Panel Admin",
  description: "Manajemen Pembayaran dan Penumpang",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}