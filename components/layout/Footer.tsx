"use client";
import type { SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, Zap, Globe, MessageCircle } from "lucide-react";

const menuLinks = [
  { label: "Beranda", href: "#beranda" },
  { label: "Pembayaran", href: "#pembayaran" },
  { label: "FAQ", href: "#faq" },
];

const serviceLinks = [
  { label: "Syarat & Ketentuan", href: "#" },
  { label: "Kebijakan Privasi", href: "#" },
  { label: "Kebijakan Pengembalian", href: "#" },
];

const contactItems = [
  { icon: Phone, text: "+62 812-3456-7890" },
  { icon: Mail, text: "halo@galonku.id" },
  { icon: MapPin, text: "Jakarta, Indonesia" },
];

const socialLinks = [
  { icon: Globe, href: "#", label: "Facebook", color: "bg-primary hover:bg-primary-hover" },
  { icon: InstagramFallback, href: "#", label: "Instagram", color: "bg-primary hover:bg-primary-hover" },
  { icon: MessageCircle, href: "#", label: "WhatsApp", color: "bg-green-500 hover:bg-green-600" },
];

function InstagramFallback(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand Info */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Image src="/images/logo.png" alt="GalonKu" width={40} height={40} />
              <div className="flex flex-col">
                <span className="font-bold text-xl text-primary-dark leading-none">GalonKu</span>
                <span className="text-[10px] text-slate-500 font-medium tracking-wide">Air Murni Berkualitas</span>
              </div>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Solusi praktis untuk kebutuhan air minum keluarga Anda. Bersih, aman, dan selalu tepat waktu.
            </p>
          </div>

          {/* Menu */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-primary-dark mb-5">Menu</h4>
            <ul className="space-y-3 text-sm">
              {menuLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-slate-500 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Layanan */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-primary-dark mb-5">Layanan</h4>
            <ul className="space-y-3 text-sm">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-slate-500 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-primary-dark mb-5">Kontak Kami</h4>
            <ul className="space-y-3 text-sm">
              {contactItems.map((item) => (
                <li key={item.text} className="flex items-start gap-2 text-slate-500">
                  <item.icon size={16} className="text-primary mt-0.5 flex-shrink-0" />
                  {item.text}
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-primary-dark mb-5">Ikuti Kami</h4>
            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className={`w-9 h-9 rounded-full text-white flex items-center justify-center transition-colors ${s.color}`}
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} GalonKu. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            Powered by
            <span className="font-bold text-slate-600 flex items-center gap-1">
              <Zap size={12} className="text-primary" /> Xendit
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
