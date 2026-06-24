"use client";

import { cn } from "@/lib/utils";

interface PaymentLogosProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  layout?: "row" | "grid";
}

export function PaymentLogos({ 
  className, 
  size = "md", 
  showLabel = false,
  layout = "row" 
}: PaymentLogosProps) {
  const sizes = {
    sm: { h: "h-7", icon: "h-4", gap: "gap-2", pad: "px-2 py-1" },
    md: { h: "h-9", icon: "h-5", gap: "gap-2.5", pad: "px-2.5 py-1.5" },
    lg: { h: "h-11", icon: "h-6", gap: "gap-3", pad: "px-3 py-2" },
  };

  const s = sizes[size];

  const LogoContainer = ({ children, label }: { children: React.ReactNode; label?: string }) => (
    <div 
      className={cn(
        "flex items-center justify-center rounded-lg bg-white shadow-sm border border-border/40",
        "transition-transform duration-200 hover:scale-105 hover:shadow-md",
        s.h, s.pad
      )}
      title={label}
    >
      {children}
    </div>
  );

  const logos = (
    <>
      {/* M-Pesa — Official Safaricom brand green */}
      <LogoContainer label="M-Pesa">
        <svg viewBox="0 0 120 32" className={cn(s.icon, "w-auto")} xmlns="http://www.w3.org/2000/svg" aria-label="M-Pesa">
          <rect x="2" y="4" width="28" height="24" rx="4" fill="#00A650"/>
          <rect x="7" y="10" width="4" height="12" rx="1" fill="#FFFFFF"/>
          <rect x="14" y="7" width="4" height="18" rx="1" fill="#FFFFFF"/>
          <rect x="21" y="13" width="4" height="10" rx="1" fill="#FFFFFF"/>
          <text x="36" y="22" fontSize="13" fontWeight="900" fill="#00A650" fontFamily="Arial, Helvetica, sans-serif" letterSpacing="0.5">M-PESA</text>
        </svg>
      </LogoContainer>

      {/* Visa — Official blue wordmark */}
      <LogoContainer label="Visa">
        <svg viewBox="0 0 80 32" className={cn(s.icon, "w-auto")} xmlns="http://www.w3.org/2000/svg" aria-label="Visa">
          <path d="M32.8 24h-4.2l2.6-16h4.2l-2.6 16zM50.5 8.5c-.7-.3-1.8-.6-3.2-.6-3.5 0-6 1.7-6 4.4 0 1.9 1.7 3 3.1 3.6 1.4.6 1.8 1 1.8 1.7 0 .9-1.1 1.4-2.2 1.4-1.5 0-2.3-.3-2.9-.7l-.4-.2-.5 3c.8.3 2 .6 3.4.6 3.7 0 6.2-1.8 6.2-4.5 0-1.5-.9-2.6-3-3.6-1.2-.6-2-.9-2-1.7 0-.6.7-1.2 2.1-1.2 1.2 0 2 .2 2.7.5l.3.1.4-2.8-.2-.1zM61.8 8.7h-2.9c-.9 0-1.6.2-2 1.1l-5.7 12.6h3.9l.8-2.2h4.8l.5 2.2h3.5l-2.9-13.7zm-4.3 8.8 1.9-5 .6 5h-2.5zM25.8 8.7h-5.9l-.1.6c4.4 1 7.3 3.5 8.4 6.4l-1.2-6.5c-.2-.5-.7-.7-1.2-.5zM16.2 8.7h-4.2l-5.4 13.7h3.9l.7-2.1h4.7l.4 2.1h3.4l-2.3-11.9-.2-1.8zm-3.6 8.8.6-2 .4 2h-1z" fill="#1A1F71"/>
        </svg>
      </LogoContainer>

      {/* Mastercard — Official interlocking circles */}
      <LogoContainer label="Mastercard">
        <svg viewBox="0 0 60 32" className={cn(s.icon, "w-auto")} xmlns="http://www.w3.org/2000/svg" aria-label="Mastercard">
          <circle cx="20" cy="16" r="10" fill="#EB001B"/>
          <circle cx="34" cy="16" r="10" fill="#F79E1B" opacity="0.85"/>
          <path d="M27 16c0 3.3-1.8 6.3-4.5 8 2.7-1.7 4.5-4.7 4.5-8s-1.8-6.3-4.5-8c2.7 1.7 4.5 4.7 4.5 8z" fill="#FF5F00"/>
        </svg>
      </LogoContainer>

      {/* Airtel Money — Official red swoosh */}
      <LogoContainer label="Airtel Money">
        <svg viewBox="0 0 120 32" className={cn(s.icon, "w-auto")} xmlns="http://www.w3.org/2000/svg" aria-label="Airtel Money">
          <path d="M8 26L18 6h3l-10 20h-3z" fill="#E4000F"/>
          <path d="M20 26L30 6h3l-10 20h-3z" fill="#E4000F"/>
          <text x="36" y="20" fontSize="12" fontWeight="800" fill="#E4000F" fontFamily="Arial, Helvetica, sans-serif">airtel</text>
          <text x="72" y="20" fontSize="10" fontWeight="600" fill="#666666" fontFamily="Arial, Helvetica, sans-serif">money</text>
        </svg>
      </LogoContainer>

      {/* PayPal — Official dual-tone blue */}
      <LogoContainer label="PayPal">
        <svg viewBox="0 0 90 32" className={cn(s.icon, "w-auto")} xmlns="http://www.w3.org/2000/svg" aria-label="PayPal">
          <path d="M14 6h4.5c2.8 0 4.5 1.3 4.5 3.9 0 3.4-1.7 5.1-5.1 5.1h-1.7l-.9 5.1h-2.8l3.5-14.1z" fill="#003087"/>
          <path d="M18 11.5h1.7c1.1 0 2-.4 2-1.7s-.9-1.6-2-1.6h-1.4l-.3 3.3z" fill="#0070E0"/>
          <text x="32" y="19" fontSize="11" fontWeight="800" fill="#003087" fontFamily="Arial, Helvetica, sans-serif" letterSpacing="-0.5">Pay</text>
          <text x="52" y="19" fontSize="11" fontWeight="800" fill="#0070E0" fontFamily="Arial, Helvetica, sans-serif" letterSpacing="-0.5">Pal</text>
        </svg>
      </LogoContainer>
    </>
  );

  if (layout === "grid") {
    return (
      <div className={cn("grid grid-cols-3 sm:grid-cols-5 gap-2", className)}>
        {logos}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center flex-wrap", s.gap, className)}>
      {showLabel && (
        <span className="text-xs text-muted-foreground font-medium whitespace-nowrap">We accept:</span>
      )}
      {logos}
    </div>
  );
}