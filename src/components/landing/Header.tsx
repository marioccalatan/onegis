import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <span className="font-heading font-bold text-xl">OneGIS</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#home" className="text-sm font-medium hover:text-accent transition-colors">
              Home
            </Link>
            <Link href="#features" className="text-sm font-medium hover:text-accent transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-accent transition-colors">
              Pricing
            </Link>
            <Link href="#about" className="text-sm font-medium hover:text-accent transition-colors">
              About
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-accent hover:bg-accent/90">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}