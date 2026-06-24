"use client";

import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/data";
import { ArrowRight } from "lucide-react";

export function ProductBannerGrid() {
  // Pick featured products for the banner grid
  const featured = [
    products.find((p) => p.id === "p5"),   // iPhone
    products.find((p) => p.id === "p10"),  // Sony Headphones
    products.find((p) => p.id === "p15"),  // Samsung TV
    products.find((p) => p.id === "p20"),  // Blender
    products.find((p) => p.id === "p25"),  // Running Shoes
    products.find((p) => p.id === "p30"),  // Watch
  ].filter(Boolean);

  const banners = [
    {
      title: "Smartphones",
      subtitle: "Latest Models",
      image: featured[0]?.image || "",
      href: "/category/smartphones",
      size: "large",
    },
    {
      title: "Audio",
      subtitle: "Premium Sound",
      image: featured[1]?.image || "",
      href: "/category/electronics",
      size: "small",
    },
    {
      title: "TVs",
      subtitle: "4K UHD",
      image: featured[2]?.image || "",
      href: "/category/electronics",
      size: "small",
    },
    {
      title: "Kitchen",
      subtitle: "Modern Appliances",
      image: featured[3]?.image || "",
      href: "/category/home-living",
      size: "small",
    },
    {
      title: "Fashion",
      subtitle: "Trending Now",
      image: featured[4]?.image || "",
      href: "/category/fashion",
      size: "small",
    },
    {
      title: "Watches",
      subtitle: "Luxury Picks",
      image: featured[5]?.image || "",
      href: "/category/fashion",
      size: "large",
    },
  ];

  return (
    <section className="py-4 sm:py-6">
      <div className="mb-3 sm:mb-4">
        <h2 className="text-base font-bold text-foreground sm:text-lg">Shop by Category</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {banners.map((banner, index) => {
          const isLarge = banner.size === "large";

          return (
            <Link
              key={index}
              href={banner.href}
              className={`
                group relative overflow-hidden rounded-2xl bg-muted
                transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5
                ${isLarge ? "col-span-2 row-span-2 aspect-[4/3] md:aspect-auto md:min-h-[280px]" : "aspect-square"}
              `}
            >
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes={isLarge ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                <p className="text-[10px] font-medium text-white/70 uppercase tracking-wider mb-0.5">
                  {banner.subtitle}
                </p>
                <h3 className="text-sm font-bold text-white sm:text-base">
                  {banner.title}
                </h3>
                <div className="mt-1.5 flex items-center gap-1 text-xs font-medium text-primary">
                  <span>Shop Now</span>
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}