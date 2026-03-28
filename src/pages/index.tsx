import { SEO } from "@/components/SEO";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Pricing } from "@/components/landing/Pricing";
import { About } from "@/components/landing/About";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <SEO
        title="UtilityGIS - Professional Geographic Information Systems"
        description="Professional GIS platform designed for any field. Manage spatial data, analyze patterns, and make informed decisions with powerful mapping tools."
      />
      <div className="min-h-screen">
        <Header />
        <main>
          <Hero />
          <Features />
          <Pricing />
          <About />
        </main>
        <Footer />
      </div>
    </>
  );
}