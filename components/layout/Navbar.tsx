"use client";
import Image from "next/image";
import Link from "next/link";
import { Download, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "#beranda", label: "Beranda" },
  { href: "#cara-penggunaan", label: "Cara Penggunaan" },
  { href: "#pembayaran", label: "Pembayaran" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("beranda");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map((link) => {
        const id = link.href.replace("#", "");
        const element = document.getElementById(id);
        return { id, element, top: element?.offsetTop || 0 };
      });

      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        if (scrollPosition >= sections[i].top) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="GalonKu" width={40} height={40} />
          <div className="flex flex-col">
            <span className="font-bold text-xl text-primary-dark leading-none">
              GalonKu
            </span>
            <span className="text-[10px] text-slate-500 font-medium">
              Air Murni Berkualitas
            </span>
          </div>
        </Link>
        <div className="hidden lg:flex gap-6 lg:gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium transition-colors ${
                  isActive
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-slate-600 hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
        <button
          type="button"
          className="bg-primary text-white px-5 lg:px-6 py-2.5 rounded-xl font-bold hidden lg:flex items-center gap-2 text-sm lg:text-base hover:bg-blue-600 transition-all shadow-lg shadow-primary/20"
          aria-label="Download GalonKu app"
        >
          <Download size={18} /> Download App
        </button>

        {/* Mobile Toggle Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 text-slate-600 hover:text-primary transition-colors"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-100 shadow-xl flex flex-col p-6 gap-6 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`font-semibold text-lg py-2 transition-colors ${
                    isActive ? "text-primary" : "text-slate-600 hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
          <button
            type="button"
            className="w-full bg-primary text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 text-base hover:bg-blue-600 transition-all shadow-lg shadow-primary/20"
            aria-label="Download GalonKu app"
          >
            <Download size={18} /> Download App
          </button>
        </div>
      )}
    </nav>
  );
}
