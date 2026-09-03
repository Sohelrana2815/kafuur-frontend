"use client";

import { products } from "@/data/featured-products-data";
import { Award, Clock3, CornerDownRight, Leaf, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function FeaturedProducts() {
  return (
    <section className="w-full py-12 md:py-16 text-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 md:mb-12 space-y-2">
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground font-heading">
            Signature Perfumes
          </h2>
          <p className="max-w-2xl text-xs sm:text-base text-muted-foreground font-light leading-relaxed">
            Discover fragrances crafted to match your style, mood, and every
            memorable moment.
          </p>
        </div>

        {/* 
          UPDATED RESPONSIVE GRID: 
          grid-cols-2 (Mobile) -> sm:grid-cols-2 (Tablet) -> lg:grid-cols-4 (Desktop) 
        */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 xl:gap-8 mb-16 md:mb-20">
          {products.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col justify-between rounded-xl sm:rounded-2xl p-2.5 sm:p-3 bg-card border border-border hover:border-primary/30 transition-all duration-300"
            >
              <div>
                {/* Product Image Holder */}
                <div
                  className={`relative aspect-square w-full rounded-lg sm:rounded-xl bg-gradient-to-b from-muted to-card border border-border overflow-hidden flex items-center justify-center p-3 sm:p-6 mb-3 transition-all duration-300 ${
                    product.isFeatured ? "ring-1 ring-primary/40 shadow-sm" : ""
                  }`}
                >
                  <Image
                    src={product.image}
                    alt={`${product.name}`}
                    fill
                    sizes="(max-w-7xl) 25vw, 50vw"
                    className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />

                  {product.isFeatured && (
                    <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-primary/10 border border-primary/30 text-primary text-[7px] sm:text-[9px] uppercase tracking-widest font-bold px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full backdrop-blur-md">
                      Best
                    </span>
                  )}
                </div>

                {/* Product Details Meta */}
                <div className="px-0.5 space-y-0.5 sm:space-y-1">
                  <span className="text-[8px] sm:text-[10px] uppercase tracking-wider text-primary font-bold">
                    {product.type}
                  </span>
                  <h3 className="text-xs sm:text-base font-bold text-foreground tracking-tight line-clamp-1">
                    {product.brand}{" "}
                    <span className="text-muted-foreground font-normal">
                      {product.name}
                    </span>
                  </h3>
                  <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-1 font-light">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Spotlight Banner Section */}
        <div className="w-full rounded-2xl sm:rounded-3xl border border-border bg-gradient-to-b from-card/50 to-background/80 p-5 sm:p-8 lg:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/[0.02] rounded-full blur-[80px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Left Column: Spotlight Image Card */}
            <div className="lg:col-span-5 relative aspect-[4/5] sm:aspect-[16/9] lg:aspect-[3/4] w-full rounded-xl sm:rounded-2xl border border-border overflow-hidden bg-card">
              <Image
                src="/image_1e6b9c.jpg"
                alt="Park Avenue Spotlight Campaign"
                fill
                sizes="(max-w-7xl) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80" />
            </div>

            {/* Right Column: Narrative Presentation & Rebuilt CTA Button */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-4 sm:space-y-6">
              <div className="space-y-1 sm:space-y-2">
                <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  <Leaf className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary" />{" "}
                  Brand Spotlight
                </span>
                <h3 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight font-heading">
                  Meet <br className="hidden sm:block" />
                  <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                    Park Avenue
                  </span>
                </h3>
              </div>

              <p className="text-xs sm:text-base text-muted-foreground font-light leading-relaxed max-w-xl">
                A grooming house built on absolute certainty. Every single
                aerosol can of Park Avenue we secure is imported directly from
                authenticated channels — completely bypassing parallel brokers
                or lookalike formulations. Just the long-lasting, uncompromised
                signature aura your day demands.
              </p>

              {/* Pill Trust Metrics */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                <div className="flex items-center gap-1 sm:gap-1.5 rounded-full border border-border bg-muted/50 px-2.5 py-1 sm:px-3.5 sm:py-1.5 text-[10px] sm:text-xs text-muted-foreground">
                  <Clock3 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary" />
                  <span>Long-Lasting</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5 rounded-full border border-border bg-muted/50 px-2.5 py-1 sm:px-3.5 sm:py-1.5 text-[10px] sm:text-xs text-muted-foreground">
                  <Award className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary" />
                  <span>Direct Sourcing</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5 rounded-full border border-border bg-muted/50 px-2.5 py-1 sm:px-3.5 sm:py-1.5 text-[10px] sm:text-xs text-muted-foreground">
                  <Leaf className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary" />
                  <span>30-Day Returns</span>
                </div>
              </div>

              {/* Action Trigger */}
              <div className="pt-2 sm:pt-4">
                <Link
                  href="/brand/park-avenue"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-full border border-primary/60 bg-primary/5 hover:bg-primary/10 px-6 py-3 sm:px-8 sm:py-3.5 transition-all duration-300 group focus:outline-none"
                >
                  <span className="text-xs sm:text-sm font-semibold text-foreground tracking-wide">
                    Go to Park Avenue
                  </span>
                  <CornerDownRight className="h-3.5 w-3.5 text-primary transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
