"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="py-6 md:py-8">
      <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">Contact Us</h1>
      <p className="text-muted-foreground mb-8">We'd love to hear from you. Reach out anytime.</p>

      <div className="grid md:grid-cols-3 gap-6 md:gap-8">
        <div className="md:col-span-1 space-y-4">
          <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-xl">
            <Phone className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium text-sm">Phone</p>
              <p className="text-sm text-muted-foreground">+254 700 123 456</p>
              <p className="text-sm text-muted-foreground">+254 711 987 654</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-xl">
            <Mail className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium text-sm">Email</p>
              <p className="text-sm text-muted-foreground">support@thomex.co.ke</p>
              <p className="text-sm text-muted-foreground">sales@thomex.co.ke</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-xl">
            <MapPin className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium text-sm">Address</p>
              <p className="text-sm text-muted-foreground">Mombasa Road, Nairobi</p>
              <p className="text-sm text-muted-foreground">Kenya, 00100</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-4 bg-background border border-border rounded-2xl p-5 md:p-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
                <input
                  required
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-3 py-2.5 bg-muted rounded-lg border border-border text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                <input
                  required
                  type="email"
                  placeholder="john@example.com"
                  className="w-full px-3 py-2.5 bg-muted rounded-lg border border-border text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Subject</label>
              <input
                required
                type="text"
                placeholder="How can we help?"
                className="w-full px-3 py-2.5 bg-muted rounded-lg border border-border text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Message</label>
              <textarea
                required
                rows={5}
                placeholder="Tell us more about your inquiry..."
                className="w-full px-3 py-2.5 bg-muted rounded-lg border border-border text-sm focus:outline-none focus:border-primary resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={submitted}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-70"
            >
              {submitted ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Sent!
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}