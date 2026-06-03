"use client"

import { Leaf, Award, ShieldCheck, MapPin, Sparkles, Box } from "lucide-react"

const missionFeatures = [
    {
        icon: ShieldCheck,
        title: "100% Certified Genuine Products",
        description: "Every item in our storefront is sourced through authorized, certified supply chains. We don't deal with secondary brokers, parallel imports, or factory overruns.",
    },
    {
        icon: MapPin,
        title: "Direct from Origin Sourcing",
        description: "Our supply chain maps back directly to authorized origin points. This allows us to guarantee product integrity from the production line to our warehouse.",
    },
    {
        icon: Box,
        title: "Transparent Supply Chain Certified",
        description: "We are actively certified by independent supply chain auditors. Every purchase on our platform comes with a digital guarantee certificate verify its origin.",
    },
    {
        icon: MapPin,
        title: "Verified Cash on Delivery Support",
        description: "Your security is built into our payment model. We support verified Cash on Delivery (COD) across our entire logistics network.",
    },
    {
        icon: Box,
        title: "Tamper-Proof Logistics Network",
        description: "Our logistical partners utilize sealed, tamper-proof packaging protocols. COD parcels are only accepted if the security seals are intact at the point of delivery.",
    },
    {
        icon: Leaf,
        title: "Sustainable Certified Packaging",
        description: "Our logistics are designed around minimal footprint. COD seals and mailers are certified biodegradable and sourced from sustainable materials.",
    },
]

export default function OurMissionPage() {
    return (
        <section className="relative w-full py-16 md:py-24 overflow-hidden bg-[#09090b] text-neutral-100 font-sans">

            {/* Luxury Golden Atmospheric Accents */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -z-10 h-[500px] w-[500px] rounded-full bg-amber-500/[0.02] blur-[150px] pointer-events-none" />

            {/* Dynamic Centered Header */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center space-y-4 mb-20 md:mb-28">
                    <p className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-amber-500 font-bold flex items-center justify-center gap-2">
                        <Sparkles className="h-3 w-3 text-amber-500/80" /> Authentic by Design
                    </p>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white font-heading max-w-3xl mx-auto leading-tight">
                        Our Mission is Our <br /> Supply Chain
                    </h1>
                    <div className="flex justify-center items-center gap-2 py-2">
                        <div className="h-px w-10 bg-amber-500/30" />
                        <Award className="h-5 w-5 text-amber-400/60" />
                        <div className="h-px w-10 bg-amber-500/30" />
                    </div>
                    <p className="max-w-xl mx-auto text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
                        We don’t sell a feeling; we provide a certified system of sourcing and secure delivery.
                    </p>
                </div>

                {/* Standard 3-Column Functional Grid 
          (Scales to 1 column on mobile, 2 on tablet)
        */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 mb-16 lg:mb-24">
                    {missionFeatures.map((feature, idx) => {
                        const IconComponent = feature.icon
                        return (
                            <div
                                key={idx}
                                className="relative group flex flex-col items-center text-center space-y-5 rounded-2xl border border-white/[0.03] bg-[#0c0c0e]/60 p-8 shadow-2xl transition-all duration-300 hover:border-amber-500/20"
                            >
                                {/* Oversized Floating Luxury Icon Box 
                  Matching watermarked_img_18310805968046119067.png style
                */}
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center justify-center p-3.5 rounded-2xl border border-amber-500/10 bg-neutral-900 shadow-xl group-hover:scale-105 group-hover:border-amber-500/20 transition-all duration-300">
                                    <IconComponent className="h-7 w-7 text-amber-400" strokeWidth={1} />
                                </div>

                                {/* Spacer to prevent text collision with the top icon box */}
                                <div className="h-8 w-full" />

                                {/* Technical Headline */}
                                <h3 className="text-lg md:text-xl font-semibold text-white tracking-tight leading-snug font-heading px-2">
                                    {feature.title}
                                </h3>

                                {/* Functional Descriptive Copy */}
                                <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed max-w-sm">
                                    {feature.description}
                                </p>

                                {/* Bottom decorative Leaf hint */}
                                <div className="pt-2 opacity-20 group-hover:opacity-100 transition-opacity">
                                    <Leaf className="h-4 w-4 text-emerald-500/80" strokeWidth={1} />
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Bottom Supply Chain Proof Close */}
                <div className="max-w-5xl mx-auto p-12 rounded-3xl border border-white/[0.05] bg-neutral-900/30 text-center relative overflow-hidden">
                    {/* Subtle Decorative Supply Chain Vectorhint */}
                    <ShieldCheck className="absolute -top-10 -right-10 h-48 w-48 text-neutral-800/10 stroke-[0.5] rotate-12 pointer-events-none" />

                    <p className="text-xl md:text-2xl font-light text-neutral-200 leading-normal font-sans">
                        "Your trust isn’t built on our goals; it’s built when you verify our seals. Every purchase comes with guaranteed authenticity and verified secure local payment."
                    </p>
                    <p className="mt-8 text-xs text-neutral-600 uppercase tracking-widest font-mono">
                        Logistics Certified Authentic Pipeline v1.2
                    </p>
                </div>

            </div>
        </section>
    )
}