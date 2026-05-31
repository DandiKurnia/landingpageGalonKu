"use client";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-water-texture rounded-[2.5rem] p-12 lg:p-20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl shadow-blue-900/20"
      >
        {/* Decorative elements */}
        <div className="absolute -left-10 -bottom-10 opacity-30 w-48 h-48 border-[6px] border-white rounded-full pointer-events-none" />
        <div className="absolute right-20 top-10 opacity-20 w-24 h-24 border-[4px] border-white rounded-full pointer-events-none" />
        <div className="absolute left-1/3 top-1/4 opacity-10 w-8 h-8 bg-white rounded-full blur-sm pointer-events-none" />

        <div className="relative z-10 max-w-2xl text-center md:text-left">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
            Siap untuk hidup lebih praktis?
          </h2>
          <p className="text-blue-50/90 text-xl leading-relaxed">
            Pesan isi galon otomatis sekarang dan nikmati kemudahan tanpa ribet. Tersedia 24/7 untuk memenuhi kebutuhan Anda.
          </p>
        </div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative z-10 flex-shrink-0"
        >
          <a
            href="#"
            className="inline-flex items-center gap-3 bg-white text-primary font-extrabold text-xl px-10 py-5 rounded-2xl hover:bg-slate-50 transition-colors shadow-xl"
          >
            Download App <Download size={24} strokeWidth={3} />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
