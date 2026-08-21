"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Droplet, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="beranda"
      className="relative pt-28 md:pt-36 lg:pt-40 pb-16 md:pb-20 overflow-hidden bg-slate-50"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="order-2 md:order-1 text-center md:text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-primary font-bold text-xs mb-6">
            <Droplet size={14} /> ISI GALON OTOMATIS
          </div>
          <h1 className="text-4xl md:text-4xl lg:text-6xl font-extrabold text-primary-dark leading-tight mb-6">
            Praktis, Otomatis, <br className="hidden md:block" />{" "}
            <span className="text-primary">dan Aman</span>
          </h1>
          <p className="text-base text-slate-600 mb-8 max-w-lg mx-auto md:mx-0">
            GalonKu memudahkan Anda memesan isi galon berkualitas dari dispenser
            otomatis terdekat. Pesan, bayar, dan ambil galon Anda dengan cepat
            dan aman.
          </p>
          <button
            type="button"
            className="w-full sm:w-auto bg-primary text-white px-6 py-4 md:py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
            aria-label="Download GalonKu app"
          >
            Download App <ArrowRight size={20} />
          </button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring" }}
          className="relative order-1 md:order-2 px-6 sm:px-12 md:px-0"
        >
          <div className="absolute inset-0 bg-primary/10 blur-[80px] md:blur-[100px] rounded-full" />
          <Image
            src="/images/sectionOne.png"
            alt="GalonKu Hero Product"
            width={600}
            height={600}
            className="relative z-10 drop-shadow-2xl mx-auto w-full max-w-[400px] md:max-w-full"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
