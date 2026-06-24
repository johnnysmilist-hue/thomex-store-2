import Link from "next/link";
import { Mail, MapPin, Phone, CreditCard, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { PaymentLogos } from "@/components/PaymentLogos";

const footerLinks = {
  shop: [
    { label: "Electronics", href: "/category/electronics" },
    { label: "Fashion", href: "/category/fashion" },
    { label: "Home & Living", href: "/category/home-living" },
    { label: "Beauty & Health", href: "/category/beauty-health" },
    { label: "Groceries", href: "/category/groceries" },
  ],
  support: [
    { label: "Help Center", href: "/help" },
    { label: "Returns & Refunds", href: "/returns" },
    { label: "Shipping Info", href: "/shipping" },
    { label: "Track Order", href: "/track" },
    { label: "Contact Us", href: "/contact" },
  ],
  company: [
    { label: "About Thomex", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Sell on Thomex", href: "/sell" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-muted dark:bg-[#03071e] text-foreground dark:text-foreground mt-auto transition-colors duration-300">
      {/* Trust badges */}
      <div className="border-b border-border dark:border-white/5">
        <div className="container-market py-6 md:py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="flex items-center gap-3">
              <Truck className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm text-primary">Fast Delivery</p>
                <p className="text-xs text-muted-foreground">2-5 days nationwide</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm text-primary">Secure Payment</p>
                <p className="text-xs text-muted-foreground">M-Pesa & cards</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm text-primary">Easy Returns</p>
                <p className="text-xs text-muted-foreground">7-day return policy</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CreditCard className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm text-primary">Best Prices</p>
                <p className="text-xs text-muted-foreground">Price match guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-market py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block">
              <h2 className="text-xl font-heading font-extrabold text-primary">
                Thomex
              </h2>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              East Africa's trusted marketplace. Quality products, great prices, delivered to your door.
            </p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <span>Nairobi, Kenya</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span>+254 700 123 456</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span>support@thomex.co.ke</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-sm mb-3 text-primary">Shop</h3>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-3 text-primary">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-3 text-primary">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-semibold text-sm mb-3 text-primary">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Subscribe for exclusive deals and updates.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 bg-background dark:bg-white/5 border border-border dark:border-white/10 rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
              >
                Join
              </button>
            </form>
            <div className="mt-4">
              <p className="text-xs text-muted-foreground mb-2">We Accept</p>
              <PaymentLogos size="sm" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border dark:border-white/5">
        <div className="container-market py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            © 2026 Thomex. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link href="/cookies" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}