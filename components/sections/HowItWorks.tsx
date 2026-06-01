"use client";
import { motion, Variants } from "framer-motion";
import { Smartphone, Plus, Shield, Droplet } from "lucide-react";

const steps = [
  {
    icon: Smartphone,
    number: 1,
    title: "Scan Barcode",
    description:
      "Scan barcode pada mesin dispenser GalonKu di lokasi terdekat.",
  },
  {
    icon: Plus,
    number: 2,
    title: "Isi Jumlah",
    description: "Pilih atau masukkan jumlah galon yang ingin Anda isi ulang.",
  },
  {
    icon: Shield,
    number: 3,
    title: "Pembayaran",
    description:
      "Selesaikan pembayaran instan dengan metode e-Wallet pilihan Anda.",
  },
  {
    icon: Droplet,
    number: 4,
    title: "Ambil Galon",
    description:
      "Proses selesai! Anda siap membawa pulang galon yang sudah terisi.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function HowItWorks() {
  return (
    <section
      id="cara-penggunaan"
      className="relative py-24 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-primary-dark mb-4 leading-tight">
            Mudah, Cepat, dan <span className="text-primary">Praktis</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Hanya 4 langkah sederhana untuk mendapatkan air berkualitas dari
            GalonKu
          </p>
        </motion.div>

        {/* Steps Container */}
        <div className="relative mt-12">
          {/* Dashed Line Connector (Desktop Only) */}
          <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-[2px] border-t-2 border-dashed border-slate-200 z-0" />

          {/* Steps Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative z-10"
          >
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Icon Circle */}
                  <div className="relative mb-8">
                    <div className="w-24 h-24 rounded-full bg-white shadow-xl shadow-slate-200/60 flex items-center justify-center text-primary text-4xl border-4 border-white group-hover:scale-110 group-hover:border-blue-100 transition-all duration-300">
                      <Icon size={40} strokeWidth={1.5} />
                    </div>
                    {/* Step Number Badge */}
                    <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm border-4 border-white shadow-lg">
                      {step.number}
                    </div>
                  </div>

                  {/* Step Title */}
                  <h3 className="font-bold text-primary-dark text-lg mb-3">
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
