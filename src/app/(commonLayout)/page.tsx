import FeaturedProducts from "@/components/modules/home/featured-products";
import Hero from "@/components/modules/home/Hero";

export default function HomePage() {
  return (
    <div className="w-full flex flex-col gap-16 md:gap-24">
      {/* Premium Luxury Hero Section */}
      <Hero />

      {/* Your future sections can be stacked right underneath (e.g., Best Sellers, Featured Brands) */}
      <div className="w-full">
        <FeaturedProducts />
      </div>
    </div>
  );
}