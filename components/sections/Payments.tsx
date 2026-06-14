"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const partners = {
  banks: [
    { name: "BCA", image: "/images/paymentGateway/banks/bca.png" },
    { name: "Mandiri", image: "/images/paymentGateway/banks/mandiri.png" },
    { name: "BRI", image: "/images/paymentGateway/banks/bri.png" },
    { name: "BNI", image: "/images/paymentGateway/banks/bni.png" },
  ],
  wallets: [
    { name: "OVO", image: "/images/paymentGateway/e-wallet/ovo.png" },
    { name: "DANA", image: "/images/paymentGateway/e-wallet/dana.png" },
    { name: "GoPay", image: "/images/paymentGateway/e-wallet/gopay1.png" },
    {
      name: "ShopeePay",
      image: "/images/paymentGateway/e-wallet/shopeepay.png",
    },
  ],
  others: [
    { name: "Alfamart", image: "/images/paymentGateway/retail/alfamart.png" },
    { name: "Indomaret", image: "/images/paymentGateway/retail/indomaret.png" },
  ],
  qris: { name: "QRIS", image: "/images/paymentGateway/qris.webp" },
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
              {/* Powered by Xendit Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-slate-100 rounded-full"
              >
                <span className="text-xs text-slate-600 font-medium">
                  Powered by
                </span>
                <Image
                  src="/images/paymentGateway/xendit.png"
                  alt="Xendit"
                  width={200}
                  height={80}
                  className="object-contain h-8 w-auto"
                  quality={100}
                />
              </motion.div>

              <h2 className="text-3xl lg:text-4xl font-extrabold text-primary-dark mb-6 leading-tight">
                Transaksi Aman dengan <br />
                <span className="text-primary">Gateway Terpercaya</span>
              </h2>
              <p className="text-slate-500 mb-10 text-lg">
                GalonKu menggunakan sistem pembayaran bersertifikasi untuk
                menjaga keamanan setiap transaksi Anda.
              </p>
              <ul className="space-y-4">
                {[
                  "Enkripsi end-to-end",
                  "Proteksi fraud berlapis",
                  "Terverifikasi dan terpercaya",
                  "Didukung ribuan bisnis di Indonesia",
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-slate-700 font-medium"
                  >
                    <div className="bg-green-100 p-1 rounded-full">
                      <Check
                        size={12}
                        className="text-green-600"
                        strokeWidth={3}
                      />
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
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">
                    Transfer Bank
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {partners.banks.map((bank) => (
                      <motion.div
                        key={bank.name}
                        variants={itemVariants}
                        className="h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
                      >
                        <Image
                          src={bank.image}
                          alt={bank.name}
                          width={80}
                          height={40}
                          className="object-contain"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* E-Wallet */}
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">
                    E-Wallet
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {partners.wallets.map((wallet) => (
                      <motion.div
                        key={wallet.name}
                        variants={itemVariants}
                        className="h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
                      >
                        <Image
                          src={wallet.image}
                          alt={wallet.name}
                          width={80}
                          height={40}
                          className="object-contain"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Retail & QRIS */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">
                      Retail
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      {partners.others.map((retail) => (
                        <motion.div
                          key={retail.name}
                          variants={itemVariants}
                          className="h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
                        >
                          <Image
                            src={retail.image}
                            alt={retail.name}
                            width={80}
                            height={40}
                            className="object-contain"
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">
                      Scan & Pay
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <motion.div
                        variants={itemVariants}
                        className="h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
                      >
                        <Image
                          src={partners.qris.image}
                          alt={partners.qris.name}
                          width={80}
                          height={40}
                          className="object-contain"
                        />
                      </motion.div>
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
