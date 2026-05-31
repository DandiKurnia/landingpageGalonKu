# Design Spec: GalonKu Landing Page Implementation

**Date**: 2026-05-31
**Topic**: Modern Premium Landing Page for GalonKu
**Status**: Draft

## 1. Overview
GalonKu is an automated water gallon refill service. This project involves porting a mockup from `prompt/landing.html` into a production-ready Next.js application with a "Modern Premium" aesthetic.

## 2. Aesthetic Direction
- **Tone**: Modern Premium. Refined, trustworthy, and fluid.
- **Typography**: 
  - Headings: `Clash Display` (or similar distinctive display font) via `next/font`.
  - Body: `Satoshi` or `Inter` for clarity.
- **Color Palette**:
  - Primary: `#2F80ED` (Water Blue)
  - Dark: `#1C3D5A` (Deep Navy)
  - Backgrounds: Subtle mesh gradients and `bg-white/glass` effects.
- **Motion**: 
  - Staggered reveals for section items using Framer Motion.
  - Floating animations for the hero image.
  - Smooth scroll behavior.

## 3. Architecture & Components
The application will use the Next.js App Router and Tailwind CSS v4.

### Global Setup
- `app/layout.tsx`: Font configuration and metadata.
- `app/globals.css`: Tailwind v4 theme extensions and glassmorphism utilities.

### Component Breakdown
- `Navbar`: Sticky, glassmorphism, mobile drawer.
- `HeroSection`: 
  - Text: Indonesian copy from mockup.
  - Image: `public/images/sectionOne.png` (animated).
- `FeatureSection`: Icon-driven value propositions.
- `PaymentSection`: Grid of payment partner logos (BCA, Mandiri, OVO, etc.).
- `TestimonialSection`: Card-based customer quotes with Framer Motion hover states.
- `FAQSection`: Animated accordion for common questions.
- `CTASection`: High-conversion block with water texture background.
- `Footer`: Branding, site links, and contact info.

## 4. Technical Constraints
- **Framework**: Next.js 16.2 (App Router).
- **Styling**: Tailwind CSS v4.
- **Animations**: Framer Motion.
- **Icons**: Lucide React.
- **Responsive**: Mobile-first design, matching layout shifts in the mockup.

## 5. Implementation Steps
1. Configure `next/font` and Tailwind theme.
2. Build layout components (`Navbar`, `Footer`).
3. Implement `HeroSection` with `sectionOne.png`.
4. Build data-driven sections (`Features`, `Payments`, `Testimonials`, `FAQ`).
5. Add Framer Motion transitions across all sections.
6. Final verification against `landing.html` requirements.
