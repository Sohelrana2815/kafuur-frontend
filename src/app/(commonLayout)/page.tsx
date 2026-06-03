import Hero from "@/components/modules/home/Hero";
import FeaturedProducts from "@/components/modules/home/featured-products";
import ScentWardrobe from "@/components/modules/home/ScentWardrobe"; // Adjust this path if your file is named differently

export default function HomePage() {
  return (
    <div className="w-full flex flex-col gap-16 md:gap-24 pb-16 md:pb-24">
      {/* 1. Premium Luxury Hero Section */}
      <Hero />

      {/* 2. Curated Grid Sections */}
      <div className="w-full">
        <FeaturedProducts />
      </div>

      {/* 3. Unique Editorial Scent Wardrobe */}
      <div className="w-full">
        <ScentWardrobe />
      </div>
    </div>
  );
}