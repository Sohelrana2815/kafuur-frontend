"use client"

import React from "react"
import Link from "next/link"
import { Leaf, ArrowRight, ShieldCheck, Sparkles } from "lucide-react"

export default function Hero() {
    return (
        <section className="relative w-full py-12 md:py-20 lg:py-24 overflow-hidden bg-[#09090b]">

            {/* Subtle Luxury Ambient Glows */}
            <div className="absolute top-1/4 left-10 -z-10 h-[300px] w-[300px] rounded-full bg-amber-500/5 blur-[120px]" />
            <div className="absolute bottom-10 right-10 -z-10 h-[250px] w-[250px] rounded-full bg-emerald-500/5 blur-[100px]" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                {/* Left Side: Elegant Body Spray Visual Representation */}
                <div className="relative flex items-center justify-center order-first">
                    {/* Main Glowing Backdrop Frame */}
                    <div className="absolute inset-0 m-auto h-[75%] w-[75%] rounded-3xl bg-gradient-to-tr from-amber-500/10 via-neutral-900/40 to-emerald-500/5 blur-xl -z-10" />

                    {/* Luxury Structured Display Card */}
                    <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-3xl border border-white/[0.06] bg-gradient-to-b from-neutral-900/60 to-neutral-950/90 p-6 shadow-2xl flex flex-col items-center justify-center group overflow-hidden">

                        {/* Fine Geometric Luxury Accents */}
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />
                        <div className="absolute bottom-6 right-6 opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity duration-500">
                            <Leaf className="h-40 w-40 text-amber-400 rotate-12 stroke-[0.5]" />
                        </div>

                        {/* 
              Body Spray Canister Container 
              Replace the internal div/SVG with your actual transparency-masked `.png` body spray render path when ready.
            */}
                        <div className="relative w-44 h-72 sm:w-52 sm:h-80 transition-transform duration-750 ease-out group-hover:scale-105 filter drop-shadow-[0_25px_25px_rgba(0,0,0,0.7)]">
                            {/* Fallback Beautiful Aerosol Deodorant CSS Canvas Structure */}
                            <div className="w-full h-full rounded-t-[2.5rem] rounded-b-[1.5rem] bg-gradient-to-b from-neutral-800 via-neutral-900 to-black border border-white/10 p-4 flex flex-col justify-between items-center relative overflow-hidden">
                                {/* Matte Spray Cap Divider line */}
                                <div className="absolute top-[22%] left-0 w-full h-[2px] bg-black/80 shadow-[0_1px_0_rgba(255,255,255,0.05)]" />
                                <div className="absolute top-[4%] right-[45%] w-3 h-2 bg-neutral-900 rounded-sm border-t border-white/10" />

                                {/* Minimalist Premium Branding on the can */}
                                <div className="pt-24 w-full text-center z-10">
                                    <Leaf className="h-5 w-5 text-amber-400/80 mx-auto mb-2 animate-pulse" />
                                    <p className="text-[10px] uppercase tracking-[0.3em] text-amber-400 font-bold">Kafuur</p>
                                    <p className="text-[7px] uppercase tracking-[0.4em] text-neutral-400 mt-1">Aromatic Intense</p>
                                </div>

                                <div className="pb-4 w-full text-center z-10">
                                    <div className="h-px w-8 bg-neutral-800 mx-auto mb-2" />
                                    <p className="text-[8px] uppercase tracking-[0.2em] text-neutral-400">Premium Deodorant</p>
                                </div>
                            </div>
                        </div>

                        {/* Subtle floating feature tags */}
                        <div className="absolute top-8 left-8 flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 backdrop-blur-md">
                            <Sparkles className="h-3 w-3 text-amber-400" />
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-300">Pure Paradise</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Luxury Value Proposition & Context */}
                <div className="flex flex-col justify-center space-y-6 text-left">

                    {/* Paradise Quranic Leaf Accent Sub-badge */}
                    <div className="inline-flex items-center gap-2 self-start rounded-full border border-emerald-500/10 bg-emerald-500/5 px-3 py-1">
                        <Leaf className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-xs font-medium tracking-wide text-emerald-300/90">
                            Breathe Pure Paradise
                        </span>
                    </div>

                    {/* Premium Headline */}
                    <div className="space-y-2">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
                            Elevate Your <br />
                            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600 bg-clip-text text-transparent">
                                Everyday Aura.
                            </span>
                        </h1>
                    </div>

                    {/* Re-written context focusing cleanly on actual luxury body sprays */}
                    <p className="max-w-xl text-base sm:text-lg text-neutral-400 font-light leading-relaxed">
                        No synthetic imitations. No compromises. Discover a higher standard of daily protection with premium authentic body sprays. Experience all-day uncompromising freshness from the icons you respect—<span className="text-neutral-200 font-medium">Fogg, Axe, and Wild Stone</span>—delivered directly to your door.
                    </p>

                    {/* Luxury Re-imagined Action Trigger */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                        <Link
                            href="/collections/all"
                            className="group relative flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-3.5 text-sm font-semibold text-neutral-950 shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 transition-all duration-300 active:scale-[0.98]"
                        >
                            <span>Discover Pure Freshness</span>
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>

                        <Link
                            href="/our-mission"
                            className="flex items-center justify-center px-6 py-3.5 text-sm font-medium text-neutral-300 hover:text-white transition-colors duration-200 rounded-full border border-white/5 bg-white/5 hover:bg-white/10"
                        >
                            Our Story
                        </Link>
                    </div>

                    {/* Bottom Trust Indicators */}
                    <div className="pt-6 border-t border-white/[0.06] flex flex-wrap gap-x-6 gap-y-3">
                        <div className="flex items-center gap-2 text-xs text-neutral-400 font-medium tracking-wide uppercase">
                            <ShieldCheck className="h-4 w-4 text-amber-400/80" />
                            100% Brand Certified Genuine
                        </div>
                        <div className="flex items-center gap-2 text-xs text-neutral-400 font-medium tracking-wide uppercase">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            Sourced Direct From Importers
                        </div>
                    </div>

                </div>

            </div>
        </section>
    )
}