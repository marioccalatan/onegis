import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12 border-t border-border">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <span className="font-heading font-bold text-xl">UtilityGIS</span>
            </div>
            <p className="text-sm text-primary-foreground/80">
              Professional geographic information systems for modern workflows.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><Link href="#features" className="hover:text-accent transition-colors">Features</Link></li>
              <li><Link href="#pricing" className="hover:text-accent transition-colors">Pricing</Link></li>
              <li><Link href="/login" className="hover:text-accent transition-colors">Login</Link></li>
              <li><Link href="/signup" className="hover:text-accent transition-colors">Sign Up</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><Link href="#about" className="hover:text-accent transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><Link href="#" className="hover:text-accent transition-colors">Privacy</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Terms</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Security</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-primary-foreground/10 text-center text-sm text-primary-foreground/60">
          <p>© {new Date().getFullYear()} UtilityGIS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}