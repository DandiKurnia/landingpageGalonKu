# GalonKu Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a production-grade, "Modern Premium" landing page for GalonKu using Next.js 16 and Tailwind v4.

**Architecture:** Modular component-based structure using Next.js App Router. Sections are decoupled into individual components. Animations handled by Framer Motion.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, Framer Motion, Lucide React.

---

### Task 1: Dependencies & Theme Setup

**Files:**
- Modify: `package.json`
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Install Framer Motion and Lucide React**

Run: `npm install framer-motion lucide-react`

- [ ] **Step 2: Configure Fonts in Layout**

```tsx
// app/layout.tsx
import { Inter } from "next/font/google";
// import localFont from "next/font/local"; // Add local fonts if available

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${inter.variable} scroll-smooth`}>
      <body className="antialiased bg-white text-slate-900 font-sans">{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Setup Tailwind v4 Theme Extensions**

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  --font-sans: var(--font-inter);
  --color-primary: #2F80ED;
  --color-primary-dark: #1C3D5A;
}

@layer utilities {
  .glass {
    @apply bg-white/70 backdrop-blur-md border border-white/20;
  }
}
```

- [ ] **Step 4: Commit**

```bash
git add package.json app/globals.css app/layout.tsx
git commit -m "chore: setup dependencies and tailwind theme"
```

---

### Task 2: Navbar Component

**Files:**
- Create: `components/layout/Navbar.tsx`

- [ ] **Step 1: Create Navbar with Glassmorphism**

```tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="GalonKu" width={40} height={40} />
          <div className="flex flex-col">
            <span className="font-bold text-xl text-[#1C3D5A] leading-none">GalonKu</span>
            <span className="text-[10px] text-slate-500 font-medium">Air Murni Berkualitas</span>
          </div>
        </Link>
        <div className="hidden md:flex gap-8">
          <Link href="#beranda" className="font-medium text-[#2F80ED]">Beranda</Link>
          <Link href="#pembayaran" className="font-medium text-slate-600 hover:text-[#2F80ED]">Pembayaran</Link>
          <Link href="#faq" className="font-medium text-slate-600 hover:text-[#2F80ED]">FAQ</Link>
        </div>
        <button className="bg-[#2F80ED] text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20">
          <Download size={18} /> Download App
        </button>
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/layout/Navbar.tsx
git commit -m "feat: add responsive Navbar"
```

---

### Task 3: Hero Section

**Files:**
- Create: `components/sections/Hero.tsx`

- [ ] **Step 1: Implement Hero with sectionOne.png**

```tsx
"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Droplet, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section id="beranda" className="relative pt-40 pb-20 overflow-hidden bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#2F80ED] font-bold text-xs mb-6">
            <Droplet size={14} /> ISI GALON OTOMATIS
          </div>
          <h1 className="text-5xl font-extrabold text-[#1C3D5A] leading-tight mb-6">
            Praktis, Otomatis, <br /> <span className="text-[#2F80ED]">dan Aman</span>
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-lg">GalonKu memudahkan Anda memesan isi galon berkualitas.</p>
          <button className="bg-[#2F80ED] text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-blue-500/20">
            Download App <ArrowRight size={20} />
          </button>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <Image src="/images/sectionOne.png" alt="Hero" width={600} height={600} className="drop-shadow-2xl" />
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/Hero.tsx
git commit -m "feat: implement Hero section"
```

---

### Task 4: Final Assembly

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace app/page.tsx with modular sections**

```tsx
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      {/* Other sections would be added here */}
    </main>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/page.tsx
git commit -m "feat: assemble landing page"
```
