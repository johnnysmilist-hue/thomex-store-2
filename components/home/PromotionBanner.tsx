"use client";

import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

export function PromotionBanner() {
  return (
    <Link href="/deals" className="block group">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#03045E] via-[#023E8A] to-[#0077B6] p-4 sm:p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99]">
        {/* Animated background dots */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-8 h-2 w-2 rounded-full bg-white animate-pulse" />
          <div className="absolute top-12 right-16 h-1.5 w-1.5 rounded-full bg-white animate-pulse delay-300" />
          <div className="absolute bottom-6 left-1/4 h-1 w-1 rounded-full bg-white animate-pulse delay-700" />
          <div className="absolute bottom-8 right-1/3 h-2 w-2 rounded-full bg-white animate-pulse delay-500" />
        </div>
        
        <div className="relative flex items-center justify-between gap-4">
          <div className="space-y-1 sm:space-y-2">
            <div className="flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-[#48CAE4] sm:h-5 sm:w-5" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#90E0EF] sm:text-xs">Limited Time Offer</span>
            </div>
            <h3 className="text-lg font-bold text-white sm:text-xl md:text-2xl">Summer Mega Sale</h3>
            <p className="text-xs text-[#ADE8F4] sm:text-sm">Up to 50% off on electronics, fashion & more</p>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm transition-all group-hover:bg-white/25">
              Shop Now
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </div>
          </div>
          
          <div className="hidden sm:flex h-16 w-16 md:h-20 md:w-20 flex-shrink-0 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
            <span className="text-2xl font-extrabold text-white md:text-3xl">50%</span>
          </div>
        </div>
      </div>
    </Link>
  );
}