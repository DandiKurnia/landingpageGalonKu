"use client";
import { motion } from "framer-motion";
import { Check, ShieldCheck } from "lucide-react";

const partners = {
  banks: ["BCA", "mandiri", "BRI", "BNI"],
  wallets: ["OVO", "DANA", "gopay", "ShopeePay"],
  others: ["Alfamart", "Indomaret"],
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function Payments() {
  return (
    <section id="pembayaran" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-50 rounded-[2.5rem] p-8 lg:p-16 border border-slate-100"
        >
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            {/* Left Column: Description */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-pale text-primary font-bold text-xs mb-6 uppercase tracking-wider">
                <ShieldCheck size={14} /> PEMBAYARAN AMAN
              </div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-primary-dark mb-6 leading-tight">
                Transaksi Aman dengan <br />
                <span className="text-primary">Gateway Terpercaya</span>
              </h2>
              <p className="text-slate-500 mb-10 text-lg">
                GalonKu menggunakan sistem pembayaran bersertifikasi untuk menjaga keamanan setiap transaksi Anda.
              </p>

              <ul className="space-y-4">
                {[
                  "Enkripsi end-to-end",
                  "Proteksi fraud berlapis",
                  "Terverifikasi dan terpercaya",
                  "Didukung ribuan bisnis di Indonesia",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-slate-700 font-medium">
                    <div className="bg-green-100 p-1 rounded-full">
                      <Check size={12} className="text-green-600" strokeWidth={3} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column: Logos Grid */}
            <div className="lg:col-span-7">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-8"
              >
                {/* Bank Transfer */}
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Transfer Bank</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {partners.banks.map((bank) => (
                      <motion.div
                        key={bank}
                        variants={itemVariants}
                        className="h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center font-bold text-blue-900 shadow-sm hover:shadow-md transition-shadow cursor-default group"
                      >
                        <span className={bank === "mandiri" ? "text-amber-600 lowercase" : bank === "BCA" ? "italic" : ""}>{bank}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* E-Wallet */}
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">E-Wallet</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {partners.wallets.map((wallet) => (
                      <motion.div
                        key={wallet}
                        variants={itemVariants}
                        className="h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center font-bold shadow-sm hover:shadow-md transition-shadow cursor-default"
                      >
                        <span className={
                          wallet === "OVO" ? "text-purple-600" :
                          wallet === "DANA" ? "text-primary" :
                          wallet === "gopay" ? "text-green-500" :
                          "text-orange-500"
                        }>
                          {wallet}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Others */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Kartu Kredit / Debit</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <motion.div variants={itemVariants} className="h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center font-bold text-blue-900 italic shadow-sm">VISA</motion.div>
                      <motion.div variants={itemVariants} className="h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm">
                        <div className="flex">
                          <div className="w-5 h-5 bg-red-500 rounded-full" />
                          <div className="w-5 h-5 bg-amber-500 rounded-full -ml-2 mix-blend-multiply" />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Retail</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {partners.others.map((retail) => (
                        <motion.div
                          key={retail}
                          variants={itemVariants}
                          className="h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center font-bold text-xs shadow-sm"
                        >
                          <span className={retail === "Alfamart" ? "text-red-600" : "text-blue-600"}>{retail}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
