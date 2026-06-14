import Footer from "@/components/layout/Footer";
import CTA from "@/components/sections/CTA";
import FAQ from "@/components/sections/FAQ";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import Navbar from "@/components/layout/Navbar";
import Payments from "@/components/sections/Payments";
import Testimonials from "@/components/sections/Testimonials";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Payments />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
      <ChatWidget />
    </main>
  );
}
