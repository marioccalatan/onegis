import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section id="home" className="pt-32 pb-20 md:pt-40 md:pb-32">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <h1 className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl text-balance">
            Geographic Intelligence
            <span className="block text-accent">Made Simple</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Professional GIS platform designed for any field. Manage spatial data, analyze patterns, and make informed decisions with powerful mapping tools.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline">
                Explore Features
              </Button>
            </Link>
          </div>

          <div className="pt-12">
            <div className="relative rounded-lg border border-border bg-card shadow-2xl overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-accent/20 via-primary/5 to-accent/10 flex items-center justify-center">
                <svg className="w-24 h-24 text-accent/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}