"use client";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote: "Praktis sekali! Tinggal scan, isi jumlah, bayar, langsung ambil. Kualitas airnya juga bagus.",
    name: "Budi Santoso",
    initials: "BS",
    color: "#2F80ED",
  },
  {
    quote: "Sistemnya modern dan mudah digunakan. Lokasinya juga dekat dari rumah saya.",
    name: "Rina Amelia",
    initials: "RA",
    color: "#1C3D5A",
  },
  {
    quote: "Pembayaran aman dengan banyak pilihan, saya jadi lebih tenang bertransaksi di GalonKu.",
    name: "Andi Wijaya",
    initials: "AW",
    color: "#56CCF2",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function Testimonials() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-primary-dark mb-4">
            Apa Kata Pelanggan Kami?
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={cardVariants}
              className="bg-white border border-slate-100 shadow-xl shadow-slate-200/50 rounded-3xl p-8 relative flex flex-col h-full hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
            >
              <Quote
                size={40}
                className="absolute top-6 left-6 text-primary-pale"
                strokeWidth={1.5}
              />
              <div className="relative z-10 flex flex-col flex-grow">
                <p className="text-slate-600 mb-8 italic leading-relaxed flex-grow text-lg">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm border-2 border-primary-pale"
                    style={{ backgroundColor: t.color }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="flex text-amber-400 gap-0.5 mb-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                      ))}
                    </div>
                    <h4 className="font-bold text-primary-dark">{t.name}</h4>
                    <p className="text-xs text-slate-500">Pelanggan Setia</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
