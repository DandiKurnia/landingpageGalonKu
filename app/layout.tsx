import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "GalonKu - Isi Ulang Galon Otomatis",
  description: "Praktis, Otomatis, dan Aman. GalonKu memudahkan Anda memesan isi galon berkualitas dari dispenser otomatis terdekat.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${inter.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="antialiased bg-white text-slate-900 font-sans" suppressHydrationWarning>{children}</body>
    </html>
  );
}
