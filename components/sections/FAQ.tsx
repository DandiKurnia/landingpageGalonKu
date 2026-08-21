"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqItems = [
  {
    question: "Bagaimana cara mengisi ulang galon?",
    answer:
      "Cukup datang ke dispenser otomatis kami terdekat, scan barcode melalui aplikasi GalonKu, pilih jumlah galon, lakukan pembayaran, dan galon Anda siap untuk diambil.",
  },
  {
    question: "Metode pembayaran apa saja yang diterima?",
    answer:
      "Kami menerima berbagai metode pembayaran melalui sistem Payment Gateway yang aman, termasuk transfer bank (BCA, Mandiri, BRI, BNI), e-Wallet (OVO, DANA, GoPay, ShopeePay), dan minimarket.",
  },
  {
    question: "Apakah air GalonKu sudah tersertifikasi?",
    answer:
      "Ya, semua air GalonKu telah melalui proses filtrasi berlapis dan tersertifikasi oleh lembaga kesehatan terkait. Kami menjamin kualitas air yang aman untuk dikonsumsi keluarga Anda.",
  },
  {
    question: "Berapa lama galon dapat disimpan setelah diisi?",
    answer:
      "Galon yang telah diisi dapat disimpan hingga 30 hari dalam kondisi tertutup dan disimpan di tempat yang sejuk. Pastikan galon selalu tertutup rapat untuk menjaga kualitas air.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 md:py-20 lg:py-24 bg-slate-50 border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-primary-dark mb-4">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-slate-500 text-lg">
            Temukan jawaban untuk pertanyaan umum seputar GalonKu
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {faqItems.map((item, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow text-left"
                aria-expanded={openIndex === idx}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <HelpCircle
                      size={20}
                      className="text-primary flex-shrink-0 mt-1"
                      strokeWidth={2}
                    />
                    <h3 className="font-bold text-slate-900 text-lg">
                      {item.question}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: openIndex === idx ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown
                      size={20}
                      className="text-slate-400"
                      strokeWidth={2}
                    />
                  </motion.div>
                </div>
              </button>

              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-white border border-t-0 border-slate-200 rounded-b-2xl px-6 py-4 text-slate-600 text-base leading-relaxed">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
