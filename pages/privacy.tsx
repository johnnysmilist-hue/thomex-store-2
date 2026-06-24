"use client";

export default function PrivacyPage() {
  return (
    <div className="py-6 md:py-8 max-w-3xl">
      <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">Privacy Policy</h1>
      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">1. Information We Collect</h2>
          <p>We collect personal information you provide (name, email, phone, address) and usage data (browsing history, device info) to improve our services.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">2. How We Use Information</h2>
          <p>Your data is used to process orders, deliver products, send updates, and personalize your shopping experience. We never sell your data to third parties.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">3. Data Security</h2>
          <p>We use industry-standard encryption and security measures. Payment processing is handled by trusted providers — we do not store card details.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">4. Cookies</h2>
          <p>We use cookies to remember your preferences and improve site functionality. You can disable cookies in your browser settings.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">5. Your Rights</h2>
          <p>You may request access, correction, or deletion of your personal data by contacting our support team.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">6. Updates</h2>
          <p>This policy may be updated periodically. We encourage you to review it regularly.</p>
        </section>
      </div>
    </div>
  );
}