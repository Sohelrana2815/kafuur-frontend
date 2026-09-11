"use client";

import { ArrowUpRight, Leaf, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const items = [
  {
    id: "01",
    name: "Aura Vetiver",
    category: "BODY SPRAY",
    description:
      "Smoky, deep roots mixed with a bright citrus kick. Minimalist, clean, and highly refined.",
    price: "$18.00",
    status: "IN STOCK | SHIPS DIRECT",
    imgSrc:
      "https://res.cloudinary.com/dt683zwm2/image/upload/v1789101896/nivia-man_euweab.jpg",
  },
  {
    id: "02",
    name: "Cedarwood Rain",
    category: "DEODORANT SPRAY",
    description:
      "Wet bark, cool morning air, and rich, earthy evergreen. Deeply grounding aroma.",
    price: "$14.50",
    status: "IN STOCK | LIMITED BATCH",
    imgSrc:
      "https://res.cloudinary.com/dt683zwm2/image/upload/v1789101896/nivia-man_euweab.jpg",
  },
  {
    id: "03",
    name: "Nirvana Rose",
    category: "PREMIUM MIST",
    description:
      "Velvet petals, rare oriental spice, and ancient wood. Layered, celestial beauty.",
    price: "$21.00",
    status: "IN STOCK | EXCLUSIVE EDIT",
    imgSrc:
      "https://res.cloudinary.com/dt683zwm2/image/upload/v1789101896/nivia-man_euweab.jpg",
  },
];

export default function ScentWardrobe() {
  return (
    <section className="relative w-full overflow-hidden py-20 lg:py-28">
      {/* Atmospheric accent */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-amber-500/[0.02] blur-[150px]" />

      {/* Decorative leaf */}
      <div className="pointer-events-none absolute -bottom-10 right-4 hidden opacity-10 lg:block">
        <Leaf className="h-72 w-72 rotate-45 text-amber-400/40 stroke-[0.5]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 space-y-3 text-center lg:mb-24">
          <p className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.4em] text-amber-500 sm:text-xs">
            <Sparkles className="h-3 w-3 text-amber-500/80" />
            Personal Scent Edits
          </p>

          <h2 className="mx-auto max-w-2xl font-heading text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            Our Scent Wardrobe for You
          </h2>

          <div className="flex items-center justify-center gap-2 py-1">
            <div className="h-px w-8 bg-amber-500/30" />
            <Leaf className="h-4 w-4 text-amber-400/60" />
            <div className="h-px w-8 bg-amber-500/30" />
          </div>

          <p className="mx-auto max-w-xl text-xs font-light leading-relaxed text-neutral-400 sm:text-sm">
            A thoughtfully hand-selected fragrance edit — chosen for unique
            aromatic profiles and complexity, not mass market appeal.
          </p>
        </div>

        {/* Editorial Layout */}
        <div className="space-y-24 lg:grid lg:grid-cols-12 lg:items-start lg:gap-12 lg:space-y-0">
          {/* Left column */}
          <div className="lg:col-span-5">
            {items.slice(0, 1).map((item) => (
              <ScentItem key={item.id} item={item} variant="large" />
            ))}
          </div>

          {/* Center decorative divider */}
          <div className="hidden lg:col-span-2 lg:flex lg:flex-col lg:items-center lg:justify-center lg:pt-40">
            <div className="h-20 w-px bg-gradient-to-b from-transparent to-amber-500/20" />

            <div className="my-2 rounded-full border border-amber-500/20 bg-neutral-900/50 p-2">
              <Leaf className="h-5 w-5 rotate-45 text-amber-400/40" />
            </div>

            <div className="h-20 w-px bg-gradient-to-t from-transparent to-amber-500/20" />
          </div>

          {/* Right column */}
          <div className="space-y-24 lg:col-span-5 lg:space-y-20">
            {items.slice(1).map((item, index) => (
              <ScentItem
                key={item.id}
                item={item}
                variant={index === 0 ? "medium" : "small"}
              />
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-20 text-center lg:mt-28">
          <Link
            href="/wardrobe-collections"
            className="group inline-flex items-center gap-2 border-b border-neutral-800 pb-2 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400 transition-all duration-300 hover:border-amber-500/60 hover:text-amber-400"
          >
            <span>View Full Scent Wardrobe</span>

            <ArrowUpRight className="h-4 w-4 text-neutral-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber-400" />
          </Link>
        </div>
      </div>
    </section>
  );
}

type ScentItemProps = {
  item: (typeof items)[number];
  variant: "large" | "medium" | "small";
};

function ScentItem({ item, variant }: ScentItemProps) {
  const variantClasses = {
    large: {
      wrapper: "space-y-6 lg:pt-12",
      image: "aspect-[4/5]",
      opacity: "opacity-70 group-hover:opacity-80",
    },
    medium: {
      wrapper: "space-y-6 lg:-mt-10",
      image: "aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3]",
      opacity: "opacity-60 group-hover:opacity-75",
    },
    small: {
      wrapper: "space-y-6",
      image: "aspect-[4/3]",
      opacity: "opacity-60 group-hover:opacity-75",
    },
  }[variant];

  return (
    <div className={variantClasses.wrapper}>
      {/* Image */}
      <div className="relative group">
        {/* Editorial number */}
        <span className="absolute -top-12 -left-4 select-none font-heading text-7xl font-light tracking-tighter text-neutral-800/40 sm:text-8xl">
          {item.id}
        </span>

        {/* Outer frame */}
        <div
          className={`relative w-full rounded-2xl border border-amber-500/10 bg-gradient-to-b from-neutral-900 to-black p-4 shadow-2xl transition-transform duration-500 group-hover:scale-[1.01] ${variantClasses.image}`}
        >
          <div className="relative h-full w-full overflow-hidden rounded-xl bg-neutral-950">
            <Image
              src={item.imgSrc}
              alt={item.name}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className={`object-cover transition-opacity duration-500 ${variantClasses.opacity}`}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />
          </div>
        </div>
      </div>

      {/* Product details */}
      <div className="space-y-2 pl-2">
        <span className="block text-[10px] font-bold tracking-[0.2em] text-amber-500">
          {item.category}
        </span>

        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-heading text-xl font-bold text-white">
            {item.name}
          </h3>

          <span className="shrink-0 text-base font-semibold text-amber-400">
            {item.price}
          </span>
        </div>

        <p className="text-xs font-light leading-relaxed text-neutral-400 sm:text-sm">
          {item.description}
        </p>

        <span className="block pt-1 font-mono text-[9px] tracking-wider text-neutral-500">
          {item.status}
        </span>
      </div>
    </div>
  );
}
