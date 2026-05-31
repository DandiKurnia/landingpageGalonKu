"use client";
import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="GalonKu" width={40} height={40} />
          <div className="flex flex-col">
            <span className="font-bold text-xl text-[#1C3D5A] leading-none">GalonKu</span>
            <span className="text-[10px] text-slate-500 font-medium">Air Murni Berkualitas</span>
          </div>
        </Link>
        <div className="hidden md:flex gap-8">
          <Link href="#beranda" className="font-medium text-[#2F80ED]">Beranda</Link>
          <Link href="#pembayaran" className="font-medium text-slate-600 hover:text-[#2F80ED]">Pembayaran</Link>
          <Link href="#faq" className="font-medium text-slate-600 hover:text-[#2F80ED]">FAQ</Link>
        </div>
        <button className="bg-[#2F80ED] text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20">
          <Download size={18} /> Download App
        </button>
      </div>
    </nav>
  );
}
