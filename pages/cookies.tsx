"use client";

export default function CookiesPage() {
  return (
    <div className="py-6 md:py-8 max-w-3xl">
      <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">Cookie Policy</h1>
      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">1. What Are Cookies</h2>
          <p>Cookies are small text files stored on your device when you visit our website. They help us remember your preferences and improve your experience.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">2. How We Use Cookies</h2>
          <p>We use cookies to keep you signed in, remember items in your cart, save your theme preference, and analyze site traffic to improve our services.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">3. Types of Cookies</h2>
          <p><strong className="text-foreground">Essential:</strong> Required for the site to function (cart, login, theme).<br />
          <strong className="text-foreground">Analytics:</strong> Help us understand how visitors use our site.<br />
          <strong className="text-foreground">Preferences:</strong> Remember your settings and choices.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">4. Managing Cookies</h2>
          <p>You can disable cookies in your browser settings. Note that some features may not work properly without essential cookies.</p>
        </section>
      </div>
    </div>
  );
}