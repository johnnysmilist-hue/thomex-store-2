import Link from "next/link";
import { Smartphone, Shirt, Home, Heart, Dumbbell, Apple, Gamepad2, Car } from "lucide-react";
import { categories } from "@/lib/data";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ReactNode> = {
  Smartphone: <Smartphone className="h-5 w-5" />,
  Shirt: <Shirt className="h-5 w-5" />,
  Home: <Home className="h-5 w-5" />,
  Heart: <Heart className="h-5 w-5" />,
  Dumbbell: <Dumbbell className="h-5 w-5" />,
  Apple: <Apple className="h-5 w-5" />,
  Gamepad2: <Gamepad2 className="h-5 w-5" />,
  Car: <Car className="h-5 w-5" />,
};

export function CategoryPills() {
  return (
    <section className="py-4 sm:py-6">
      <h2 className="mb-3 text-base font-bold text-foreground sm:mb-4 sm:text-lg">Shop by Category</h2>
      <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-hide sm:gap-3">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/category/${cat.slug}`}
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-full border border-primary/20 bg-background px-3.5 py-2 text-sm font-medium text-foreground transition hover:border-primary hover:bg-primary/5 sm:px-4 sm:py-2.5",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            )}
          >
            <span className="text-primary">{iconMap[cat.icon]}</span>
            <span className="whitespace-nowrap">{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}