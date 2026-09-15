"use client";

import { products } from "@/data/featured-products-data";
import { Award, Clock3, Crown, Leaf } from "lucide-react";
import Image from "next/image";

export default function FeaturedProducts() {
  const featuredProducts = products.filter((p) => p.isFeatured);
  return (
    <section className="w-full py-12 text-foreground md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <header className="mb-8 space-y-2 md:mb-12">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
            Signature Perfumes
          </h2>

          <p className="max-w-2xl text-xs font-light leading-relaxed text-muted-foreground sm:text-base">
            Explore refined fragrances selected for everyday elegance,
            confidence, and lasting impressions.
          </p>
        </header>

        {/* Featured Products */}
        <div className="mb-16 grid grid-cols-2 gap-3 md:mb-20 sm:gap-6 xl:gap-8 lg:grid-cols-4">
          {featuredProducts.map((product, index) => (
            <article
              key={product.id}
              className="group flex flex-col justify-between rounded-xl border border-border bg-card p-2.5 transition-colors duration-300 hover:border-primary/30 sm:rounded-2xl sm:p-3"
            >
              <div>
                {/* Product Image */}
                <div
                  className={`relative mb-3 flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg border border-border bg-muted sm:rounded-xl ${
                    product.isFeatured ? "ring-1 ring-primary/40" : ""
                  }`}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover opacity-90 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
                  />

                  <div className="absolute inset-0  bg-linear-to-t from-background/80 via-background/20 to-transparent" />

                  {product.isFeatured && (
                    <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-widest text-primary-foreground backdrop-blur-md sm:left-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-[9px]">
                      <Crown size={14} />
                    </span>
                  )}
                </div>

                {/* Product Information */}
                <div className="space-y-0.5 px-0.5 sm:space-y-1">
                  <span className="text-[8px] font-bold uppercase tracking-wider text-primary sm:text-[10px]">
                    {product.type}
                  </span>

                  <h3 className="line-clamp-1 text-xs font-bold tracking-tight text-foreground sm:text-base">
                    {product.brand}{" "}
                    <span className="font-normal text-muted-foreground">
                      {product.name}
                    </span>
                  </h3>

                  <p className="line-clamp-1 text-[10px] font-light text-muted-foreground sm:text-xs">
                    {product.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Brand Spotlight */}
        <section className="relative w-full overflow-hidden rounded-2xl border border-border bg-linear-to-b from-card to-background p-5 shadow-2xl sm:rounded-3xl sm:p-8 lg:p-12">
          <div className="pointer-events-none absolute right-0 top-0 size-100 rounded-full bg-primary/5 blur-[80px]" />

          <div className="relative grid grid-cols-1 items-center gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Spotlight Image */}
            <div className="relative aspect-4/5 w-full overflow-hidden rounded-xl border border-border bg-card sm:aspect-video sm:rounded-2xl lg:col-span-5 lg:aspect-3/4">
              <Image
                src="https://res.cloudinary.com/dt683zwm2/image/upload/v1789432167/perk-ave_c9lkic_piw2n3.webp"
                alt="Park Avenue Spotlight Campaign"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-linear-to-t from-background/80 via-background/20 to-transparent" />
            </div>

            {/* Spotlight Content */}
            <div className="flex flex-col justify-center space-y-4 sm:space-y-6 lg:col-span-7">
              <div className="space-y-1 sm:space-y-2">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary sm:text-xs">
                  <Leaf className="size-3.5 text-primary sm:size-3.5" />
                  Featured Brand
                </span>

                <h3 className="font-heading text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                  Discover <span className="text-primary">Park Avenue</span>
                </h3>
              </div>

              <p className="max-w-xl text-xs font-light leading-relaxed text-muted-foreground sm:text-base">
                Fresh, confident, and effortlessly classic. Park Avenue
                fragrances are made for everyday wear, bringing a refined scent
                and lasting freshness to your daily routine.
              </p>

              {/* Trust Metrics */}
              <div className="flex flex-wrap gap-1.5 pt-1 sm:gap-2">
                <div className="flex items-center gap-1 rounded-full border border-border bg-muted px-2.5 py-1 text-[10px] text-muted-foreground sm:gap-1.5 sm:px-3.5 sm:py-1.5 sm:text-xs">
                  <Clock3 className="size-3 text-primary sm:size-3.5" />
                  <span>Long-Lasting</span>
                </div>

                <div className="flex items-center gap-1 rounded-full border border-border bg-muted px-2.5 py-1 text-[10px] text-muted-foreground sm:gap-1.5 sm:px-3.5 sm:py-1.5 sm:text-xs">
                  <Award className="size-3 text-primary sm:size-3.5" />
                  <span>Trusted Brand</span>
                </div>

                <div className="flex items-center gap-1 rounded-full border border-border bg-muted px-2.5 py-1 text-[10px] text-muted-foreground sm:gap-1.5 sm:px-3.5 sm:py-1.5 sm:text-xs">
                  <Leaf className="size-3 text-primary sm:size-3.5" />
                  <span>Everyday Freshness</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
