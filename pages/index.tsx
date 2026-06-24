import { HeroBanner } from "@/components/home/HeroBanner";
import { CategoryPills } from "@/components/home/CategoryPills";
import { FlashDeals } from "@/components/home/FlashDeals";
import { TrendingCarousel } from "@/components/home/TrendingCarousel";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { HomeEssentials } from "@/components/home/HomeEssentials";
import { RecentFinds } from "@/components/home/RecentFinds";
import { PhoneDeals } from "@/components/home/PhoneDeals";
import { ComputerDeals } from "@/components/home/ComputerDeals";
import { SponsoredProducts } from "@/components/home/SponsoredProducts";
import { PartnerDeals } from "@/components/home/PartnerDeals";
import { PromotionBanner } from "@/components/home/PromotionBanner";
import { ProductBannerGrid } from "@/components/home/ProductBannerGrid";

export default function Home() {
  return (
    <div className="space-y-2 pb-8 sm:space-y-4 sm:pb-12">
      <HeroBanner />
      <CategoryPills />
      <FlashDeals />
      <ProductBannerGrid />
      <PromotionBanner />
      <TrendingCarousel />
      <RecentFinds />
      <PhoneDeals />
      <ComputerDeals />
      <HomeEssentials />
      <SponsoredProducts />
      <PartnerDeals />
      <FeaturedProducts />
    </div>
  );
}