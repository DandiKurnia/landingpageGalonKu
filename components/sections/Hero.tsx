"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Droplet, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section id="beranda" className="relative pt-40 pb-20 overflow-hidden bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#2F80ED] font-bold text-xs mb-6">
            <Droplet size={14} /> ISI GALON OTOMATIS
          </div>
          <h1 className="text-5xl font-extrabold text-[#1C3D5A] leading-tight mb-6">
            Praktis, Otomatis, <br /> <span className="text-[#2F80ED]">dan Aman</span>
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-lg">GalonKu memudahkan Anda memesan isi galon berkualitas.</p>
          <button className="bg-[#2F80ED] text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-blue-500/20">
            Download App <ArrowRight size={20} />
          </button>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <Image src="/images/sectionOne.png" alt="Hero" width={600} height={600} className="drop-shadow-2xl" />
        </motion.div>
      </div>
    </section>
  );
}
