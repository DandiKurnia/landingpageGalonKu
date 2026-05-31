"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Droplet, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section id="beranda" className="relative pt-40 pb-20 overflow-hidden bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-primary font-bold text-xs mb-6">
            <Droplet size={14} /> ISI GALON OTOMATIS
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-primary-dark leading-tight mb-6">
            Praktis, Otomatis, <br /> <span className="text-primary">dan Aman</span>
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-lg">GalonKu memudahkan Anda memesan isi galon berkualitas dari dispenser otomatis terdekat. Pesan, bayar, dan ambil galon Anda dengan cepat dan aman.</p>
          <button type="button" className="bg-primary text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-primary/20 hover:scale-105 transition-transform" aria-label="Download GalonKu app">
            Download App <ArrowRight size={20} />
          </button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring" }}
          className="relative"
        >
          <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full" />
          <Image src="/images/sectionOne.png" alt="GalonKu Hero Product" width={600} height={600} className="relative z-10 drop-shadow-2xl" priority />
        </motion.div>
      </div>
    </section>
  );
}
