"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Leaf, Sparkles, ArrowUpRight } from "lucide-react"

const items = [
    {
        id: "01",
        name: "Aura Vetiver",
        category: "BODY SPRAY",
        description: "Smoky, deep roots mixed with a bright citrus kick. Minimalist, clean, and highly refined.",
        price: "$18.00",
        status: "IN STOCK | SHIPS DIRECT",
        imgSrc: "/watermarked_img_18310805968046119067.png" // Highlighting premium organic layout style
    },
    {
        id: "02",
        name: "Cedarwood Rain",
        category: "DEODORANT SPRAY",
        description: "Wet bark, cool morning air, and rich, earthy evergreen. Deeply grounding aroma.",
        price: "$14.50",
        status: "IN STOCK | LIMITED BATCH",
        imgSrc: "/image_1d9906.jpg" // Interleaving the secondary placeholder structure
    },
    {
        id: "03",
        name: "Nirvana Rose",
        category: "PREMIUM MIST",
        description: "Velvet petals, rare oriental spice, and ancient wood. Layered, celestial beauty.",
        price: "$21.00",
        status: "IN STOCK | EXCLUSIVE EDIT",
        imgSrc: "/watermarked_img_18310805968046119067.png"
    }
]

export default function ScentWardrobe() {
    return (
        <section className="relative w-full py-20 lg:py-28 overflow-hidden bg-[#09090b] text-neutral-100">

            {/* Luxury Golden Atmospheric Accents */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -z-10 h-[500px] w-[500px] rounded-full bg-amber-500/[0.02] blur-[150px] pointer-events-none" />

            {/* Decorative Elegant Background Watermark Leaf */}
            <div className="absolute -bottom-10 right-4 opacity-10 pointer-events-none hidden lg:block">
                <Leaf className="h-72 w-72 text-amber-400/40 stroke-[0.5] rotate-45" />
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Editorial Centered Header */}
                <div className="text-center space-y-3 mb-16 lg:mb-24">
                    <p className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-amber-500 font-bold flex items-center justify-center gap-2">
                        <Sparkles className="h-3 w-3 text-amber-500/80" /> Personal Scent Edits
                    </p>
                    <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-heading max-w-2xl mx-auto leading-tight">
                        Our Scent Wardrobe for You
                    </h2>
                    <div className="flex justify-center items-center gap-2 py-1">
                        <div className="h-px w-8 bg-amber-500/30" />
                        <Leaf className="h-4 w-4 text-amber-400/60" />
                        <div className="h-px w-8 bg-amber-500/30" />
                    </div>
                    <p className="max-w-xl mx-auto text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                        A thoughtfully hand-selected fragrance edit — chosen for unique aromatic profiles and complexity, not mass market appeal.
                    </p>
                </div>

                {/* Asymmetric Magazine-Style Layout Construction */}
                <div className="space-y-24 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start">

                    {/* ITEM 01: Left Dynamic Block */}
                    <div className="lg:col-span-5 space-y-6 lg:pt-12">
                        <div className="relative group">
                            {/* Oversized Background Editorial Numbering */}
                            <span className="absolute -top-12 -left-4 text-7xl sm:text-8xl font-light text-neutral-800/40 select-none font-heading tracking-tighter">
                                {items[0].id}
                            </span>

                            {/* Frameless Floating Visual Stage */}
                            <div className="relative aspect-[4/5] w-full rounded-2xl border border-amber-500/10 bg-gradient-to-b from-neutral-900 to-black p-4 shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]">
                                <div className="relative h-full w-full overflow-hidden rounded-xl bg-neutral-950">
                                    <Image
                                        src={items[0].imgSrc}
                                        alt={items[0].name}
                                        fill
                                        sizes="(max-w-7xl) 40vw, 100vw"
                                        className="object-cover opacity-70 group-hover:opacity-80 transition-opacity duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />
                                </div>
                            </div>
                        </div>

                        {/* Micro Text Content Blocks Directly Anchored Below */}
                        <div className="space-y-2 pl-2">
                            <span className="text-[10px] tracking-[0.2em] text-amber-500 font-bold block">{items[0].category}</span>
                            <div className="flex items-baseline justify-between">
                                <h3 className="text-xl font-bold text-white font-heading">{items[0].name}</h3>
                                <span className="text-base font-semibold text-amber-400">{items[0].price}</span>
                            </div>
                            <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">{items[0].description}</p>
                            <span className="text-[9px] tracking-wider text-neutral-500 block pt-1 font-mono">{items[0].status}</span>
                        </div>
                    </div>

                    {/* CENTER DIVISION: Filigree Decorative Leaf Interlink Pillar */}
                    <div className="hidden lg:col-span-2 lg:flex flex-col items-center justify-center pt-40 pointer-events-none">
                        <div className="h-20 w-px bg-gradient-to-b from-transparent to-amber-500/20" />
                        <div className="p-2 my-2 rounded-full border border-amber-500/20 bg-neutral-900/50">
                            <Leaf className="h-5 w-5 text-amber-400/40 rotate-45" />
                        </div>
                        <div className="h-20 w-px bg-gradient-to-t from-transparent to-amber-500/20" />
                    </div>

                    {/* RIGHT SIDE LAYERED COLUMN (Holds Item 02 shifted up, and Item 03 nestled low) */}
                    <div className="lg:col-span-5 space-y-24 lg:space-y-20">

                        {/* ITEM 02: Shifts upwards naturally in the layout view */}
                        <div className="space-y-6 lg:mt-[-40px]">
                            <div className="relative group">
                                <span className="absolute -top-12 -left-4 text-7xl sm:text-8xl font-light text-neutral-800/40 select-none font-heading tracking-tighter">
                                    {items[1].id}
                                </span>

                                <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] w-full rounded-2xl border border-amber-500/10 bg-gradient-to-b from-neutral-900 to-black p-4 shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]">
                                    <div className="relative h-full w-full overflow-hidden rounded-xl bg-neutral-950">
                                        <Image
                                            src={items[1].imgSrc}
                                            alt={items[1].name}
                                            fill
                                            sizes="(max-w-7xl) 40vw, 100vw"
                                            className="object-cover opacity-60 group-hover:opacity-75 transition-opacity duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2 pl-2">
                                <span className="text-[10px] tracking-[0.2em] text-amber-500 font-bold block">{items[1].category}</span>
                                <div className="flex items-baseline justify-between">
                                    <h3 className="text-xl font-bold text-white font-heading">{items[1].name}</h3>
                                    <span className="text-base font-semibold text-amber-400">{items[1].price}</span>
                                </div>
                                <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">{items[1].description}</p>
                                <span className="text-[9px] tracking-wider text-neutral-500 block pt-1 font-mono">{items[1].status}</span>
                            </div>
                        </div>

                        {/* ITEM 03: Nestled editorial lower block */}
                        <div className="space-y-6">
                            <div className="relative group">
                                <span className="absolute -top-12 -left-4 text-7xl sm:text-8xl font-light text-neutral-800/40 select-none font-heading tracking-tighter">
                                    {items[2].id}
                                </span>

                                <div className="relative aspect-[4/3] w-full rounded-2xl border border-amber-500/10 bg-gradient-to-b from-neutral-900 to-black p-4 shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]">
                                    <div className="relative h-full w-full overflow-hidden rounded-xl bg-neutral-950">
                                        <Image
                                            src={items[2].imgSrc}
                                            alt={items[2].name}
                                            fill
                                            sizes="(max-w-7xl) 40vw, 100vw"
                                            className="object-cover opacity-60 group-hover:opacity-75 transition-opacity duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2 pl-2">
                                <span className="text-[10px] tracking-[0.2em] text-amber-500 font-bold block">{items[2].category}</span>
                                <div className="flex items-baseline justify-between">
                                    <h3 className="text-xl font-bold text-white font-heading">{items[2].name}</h3>
                                    <span className="text-base font-semibold text-amber-400">{items[2].price}</span>
                                </div>
                                <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">{items[2].description}</p>
                                <span className="text-[9px] tracking-wider text-neutral-500 block pt-1 font-mono">{items[2].status}</span>
                            </div>
                        </div>

                    </div>

                </div>

                {/* Dynamic Minimalist Section Closer Button */}
                <div className="mt-20 lg:mt-28 text-center">
                    <Link
                        href="/wardrobe-collections"
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] font-semibold text-neutral-400 hover:text-amber-400 border-b border-neutral-800 hover:border-amber-500/60 pb-2 transition-all duration-300 group"
                    >
                        <span>View Full Scent Wardrobe</span>
                        <ArrowUpRight className="h-4 w-4 text-neutral-500 group-hover:text-amber-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                </div>

            </div>
        </section>
    )
}