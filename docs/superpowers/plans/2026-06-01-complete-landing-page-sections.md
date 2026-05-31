# Complete Landing Page Sections Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the remaining GalonKu landing page sections and integrate them into the homepage with premium visuals, Framer Motion animations, Lucide icons, semantic HTML, and Indonesian copy from the mockup.

**Architecture:** Keep each landing section in its own focused client component under `components/sections/` and keep the footer in `components/layout/`. Reuse shared motion patterns and Tailwind theme tokens from `app/globals.css`, then compose all sections in `app/page.tsx` below the existing `Hero`.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, Framer Motion, Lucide React

---

### Task 1: Extend shared theme tokens

**Files:**
- Modify: `D:\Gunadarma\SEMESTER\Semester_6\Penulisan Ilmiah\codePorgram\website\galonkulanding\app\globals.css`

- [ ] Add `primary-hover`, `primary-light`, and `primary-pale` CSS theme tokens.
- [ ] Add a reusable `.bg-water-texture` utility for the CTA section.
- [ ] Keep existing `.glass` utility unchanged.

### Task 2: Implement Payments section

**Files:**
- Create: `D:\Gunadarma\SEMESTER\Semester_6\Penulisan Ilmiah\codePorgram\website\galonkulanding\components\sections\Payments.tsx`

- [ ] Create a client component with semantic `<section id="pembayaran">` markup.
- [ ] Use Framer Motion entrance animations with staggered partner cards.
- [ ] Use Lucide icons for security checklist and category headings.
- [ ] Render partner grids for Transfer Bank, E-Wallet, Kartu Kredit / Debit, and Retail with copy from the mockup.

### Task 3: Implement Testimonials section

**Files:**
- Create: `D:\Gunadarma\SEMESTER\Semester_6\Penulisan Ilmiah\codePorgram\website\galonkulanding\components\sections\Testimonials.tsx`

- [ ] Create a client component with semantic testimonial cards.
- [ ] Use Framer Motion staggered card entrance animations.
- [ ] Use Lucide icons for quote and star motifs.
- [ ] Use the three Indonesian customer quotes and names from the mockup.

### Task 4: Implement FAQ accordion

**Files:**
- Create: `D:\Gunadarma\SEMESTER\Semester_6\Penulisan Ilmiah\codePorgram\website\galonkulanding\components\sections\FAQ.tsx`

- [ ] Create a client FAQ section with accessible accordion behavior.
- [ ] Use React state to toggle open items.
- [ ] Use Framer Motion for reveal animation and Lucide icons for affordances.
- [ ] Include common questions from the mockup plus closely matching landing-page-safe follow-ups.

### Task 5: Implement CTA section

**Files:**
- Create: `D:\Gunadarma\SEMESTER\Semester_6\Penulisan Ilmiah\codePorgram\website\galonkulanding\components\sections\CTA.tsx`

- [ ] Create a bottom conversion section using the shared `bg-water-texture` utility.
- [ ] Use Framer Motion for entrance animation.
- [ ] Use Lucide icon in CTA button.
- [ ] Preserve Indonesian headline and supporting text from the mockup.

### Task 6: Implement footer

**Files:**
- Create: `D:\Gunadarma\SEMESTER\Semester_6\Penulisan Ilmiah\codePorgram\website\galonkulanding\components\layout\Footer.tsx`

- [ ] Build branded footer with logo, links, layanan, kontak, social links, and partner info.
- [ ] Use semantic footer structure and Lucide icons.
- [ ] Use premium glass-style cards where appropriate without overloading the layout.

### Task 7: Compose page and verify

**Files:**
- Modify: `D:\Gunadarma\SEMESTER\Semester_6\Penulisan Ilmiah\codePorgram\website\galonkulanding\app\page.tsx`

- [ ] Import and render `Payments`, `Testimonials`, `FAQ`, `CTA`, and `Footer` after `Hero`.
- [ ] Run `npm run build`.
- [ ] Run `npm run lint`.
- [ ] Commit with message `feat: complete landing page sections`.
