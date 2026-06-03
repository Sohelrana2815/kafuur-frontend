"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Leaf, Award, Clock3, CornerDownRight, Sparkles } from "lucide-react"

const products = [
    {
        type: "Body Spray",
        brand: "Fogg",
        name: "Scent Royal",
        description: "Long-lasting fragrance, 150ml",
        price: 12.00,
    },
    {
        type: "Deodorant",
        brand: "Park Avenue",
        name: "Storm",
        description: "Premium men's deodorant, non-alcoholic",
        price: 9.50,
        isFeatured: true,
    },
    {
        type: "Body Spray",
        brand: "Axe",
        name: "Dark Temptation",
        description: "Bold, chocolatey notes, 150ml",
        price: 11.00,
    },
    {
        type: "Deodorant",
        brand: "Wildstone",
        name: "Legend",
        description: "Fresh aquatic scent, 24h protection",
        price: 8.00,
    }
]

export default function FeaturedProducts() {
    return (
        <section className="w-full py-12 md:py-16 bg-[#09090b] text-neutral-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="mb-8 md:mb-12 space-y-2">
                    <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-amber-500 font-semibold flex items-center gap-2">
                        <Sparkles className="h-3 w-3" /> The Curated Edit
                    </p>
                    <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-heading">
                        Featured Products
                    </h2>
                    <p className="max-w-2xl text-xs sm:text-base text-neutral-400 font-light leading-relaxed">
                        A hand-picked lineup of premium body sprays and deodorants — every container authenticated, every mist genuine.
                    </p>
                </div>

                {/* 
          UPDATED RESONSIVE GRID: 
          grid-cols-2 (Mobile) -> sm:grid-cols-2 (Tablet) -> lg:grid-cols-4 (Desktop) 
        */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 xl:gap-8 mb-16 md:mb-20">
                    {products.map((product, idx) => (
                        <div key={idx} className="group flex flex-col justify-between rounded-xl sm:rounded-2xl p-2.5 sm:p-3 bg-neutral-900/20 border border-white/[0.03] hover:border-amber-500/20 transition-all duration-300">
                            <div>
                                {/* Product Image Holder */}
                                <div className={`relative aspect-square w-full rounded-lg sm:rounded-xl bg-gradient-to-b from-neutral-900 to-neutral-950 border border-white/[0.05] overflow-hidden flex items-center justify-center p-3 sm:p-6 mb-3 transition-all duration-300 ${product.isFeatured ? 'ring-1 ring-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.05)]' : ''
                                    }`}>

                                    <Image
                                        src="/image_1e6b9e.jpg"
                                        alt={`${product.brand} visual preview`}
                                        fill
                                        sizes="(max-w-7xl) 25vw, 50vw"
                                        className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60" />

                                    {product.isFeatured && (
                                        <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[7px] sm:text-[9px] uppercase tracking-widest font-bold px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full backdrop-blur-md">
                                            Best
                                        </span>
                                    )}
                                </div>

                                {/* Product Details Meta */}
                                <div className="px-0.5 space-y-0.5 sm:space-y-1">
                                    <span className="text-[8px] sm:text-[10px] uppercase tracking-wider text-amber-500 font-bold">
                                        {product.type}
                                    </span>
                                    <h3 className="text-xs sm:text-base font-bold text-white tracking-tight line-clamp-1">
                                        {product.brand} <span className="text-neutral-400 font-normal">{product.name}</span>
                                    </h3>
                                    <p className="text-[10px] sm:text-xs text-neutral-400 line-clamp-1 font-light">
                                        {product.description}
                                    </p>
                                </div>
                            </div>

                            {/* Mobile-Friendly Adaptive Price Strip */}
                            <div className="px-0.5 pt-2 mt-3 border-t border-white/[0.04] flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                <span className="text-xs sm:text-sm font-bold text-amber-400">
                                    ${product.price.toFixed(2)}
                                </span>
                                <span className="text-[9px] sm:text-[11px] text-neutral-400 font-medium group-hover:text-white transition-colors flex items-center gap-0.5 sm:gap-1">
                                    View <CornerDownRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-2px] group-hover:translate-x-0" />
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Feature Spotlight Banner Section */}
                <div className="w-full rounded-2xl sm:rounded-3xl border border-white/[0.06] bg-gradient-to-b from-neutral-900/50 to-neutral-950/80 p-5 sm:p-8 lg:p-12 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-500/[0.02] rounded-full blur-[80px] pointer-events-none" />

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">

                        {/* Left Column: Spotlight Image Card */}
                        <div className="lg:col-span-5 relative aspect-[4/5] sm:aspect-[16/9] lg:aspect-[3/4] w-full rounded-xl sm:rounded-2xl border border-white/[0.08] overflow-hidden bg-neutral-950">
                            <Image
                                src="/image_1e6b9c.jpg"
                                alt="Park Avenue Spotlight Campaign"
                                fill
                                sizes="(max-w-7xl) 40vw, 100vw"
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-80" />
                        </div>

                        {/* Right Column: Narrative Presentation & Rebuilt CTA Button */}
                        <div className="lg:col-span-7 flex flex-col justify-center space-y-4 sm:space-y-6">
                            <div className="space-y-1 sm:space-y-2">
                                <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-amber-500">
                                    <Leaf className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-emerald-500" /> Brand Spotlight
                                </span>
                                <h3 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight font-heading">
                                    Meet <br className="hidden sm:block" />
                                    <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">
                                        Park Avenue
                                    </span>
                                </h3>
                            </div>

                            <p className="text-xs sm:text-base text-neutral-300 font-light leading-relaxed max-w-xl">
                                A grooming house built on absolute certainty. Every single aerosol can of Park Avenue we secure is imported directly from authenticated channels — completely bypassing parallel brokers or lookalike formulations. Just the long-lasting, uncompromised signature aura your day demands.
                            </p>

                            {/* Pill Trust Metrics */}
                            <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                                <div className="flex items-center gap-1 sm:gap-1.5 rounded-full border border-white/[0.05] bg-white/[0.03] px-2.5 py-1 sm:px-3.5 sm:py-1.5 text-[10px] sm:text-xs text-neutral-300">
                                    <Clock3 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-amber-500" />
                                    <span>Long-Lasting</span>
                                </div>
                                <div className="flex items-center gap-1 sm:gap-1.5 rounded-full border border-white/[0.05] bg-white/[0.03] px-2.5 py-1 sm:px-3.5 sm:py-1.5 text-[10px] sm:text-xs text-neutral-300">
                                    <Award className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-amber-500" />
                                    <span>Direct Sourcing</span>
                                </div>
                                <div className="flex items-center gap-1 sm:gap-1.5 rounded-full border border-white/[0.05] bg-white/[0.03] px-2.5 py-1 sm:px-3.5 sm:py-1.5 text-[10px] sm:text-xs text-neutral-300">
                                    <Leaf className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-amber-500" />
                                    <span>30-Day Returns</span>
                                </div>
                            </div>

                            {/* Action Trigger */}
                            <div className="pt-2 sm:pt-4">
                                <Link
                                    href="/brand/park-avenue"
                                    className="inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-full border border-amber-500/60 bg-amber-500/5 hover:bg-amber-500/10 px-6 py-3 sm:px-8 sm:py-3.5 transition-all duration-300 group focus:outline-none"
                                >
                                    <span className="text-xs sm:text-sm font-semibold text-white tracking-wide">
                                        Go to Park Avenue
                                    </span>
                                    <CornerDownRight className="h-3.5 w-3.5 text-amber-500 transition-transform duration-300 group-hover:translate-x-1" />
                                </Link>
                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </section>
    )
}