import { ArrowRight, Leaf, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full py-12 md:py-20 lg:py-24 overflow-hidden">
      {/* Subtle Luxury Ambient Glows */}
      <div className="absolute top-1/4 left-10 -z-10 h-75 w-75 rounded-full blur-[120px]" />
      <div className="absolute bottom-10 right-10 -z-10 h-75 w-75 rounded-full  blur-[100px]" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Left Side: Elegant Body Spray Visual Representation */}

        <div className="relative flex items-center justify-center overflow-hidden rounded-2xl border max-h-100 border-white/10 lg:max-h-150 w-full">
          <Image
            src="/hero-product.webp"
            alt="Dark glass bottle with single liquid drop"
            width={500}
            height={500}
            priority
            className="h-100 lg:h-150 w-full object-cover rounded-2xl"
          />
        </div>

        {/* Right Side: Luxury Value Proposition & Context */}
        <div className="flex flex-col justify-center space-y-6 text-left">
          {/* Paradise Quranic Leaf Accent Sub-badge */}
          <div className="inline-flex items-center gap-2 self-start rounded-full border border-emerald-500/10 bg-emerald-500/5 px-3 py-1">
            <Leaf className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-xs font-medium tracking-wide text-primary">
              Quality You Can Trust
            </span>
          </div>

          {/* Premium Headline */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
              Elevate Your <br />
              <span className="bg-linear-to-r from-amber-200 via-amber-400 to-yellow-600 bg-clip-text text-transparent">
                Everyday Aura.
              </span>
            </h1>
          </div>

          {/* Re-written context focusing cleanly on actual luxury body sprays */}
          <p className="max-w-xl text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
            Quality is our priority. We bring you a carefully selected
            collection of authentic premium perfumes from trusted sources, each
            chosen for its distinctive character and refined scent. Whether you
            prefer something fresh, subtle, or bold, find a premium perfume that
            complements your style and leaves a lasting impression wherever you
            go.
          </p>

          {/* Luxury Re-imagined Action Trigger */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <Link
              href="/products"
              className="group relative flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all duration-300"
            >
              <span>Explore Our Collection</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/our-mission"
              className="flex items-center justify-center px-6 py-3.5 text-sm font-medium dark:text-muted-foreground hover:text-foreground rounded-full border border-border bg-muted hover:bg-accent transition-colors text-primary"
            >
              Our Story
            </Link>
          </div>

          {/* Bottom Trust Indicators */}
          <div className="pt-6 border-t border-white/6 flex flex-wrap gap-x-6 gap-y-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium tracking-wide uppercase">
              <ShieldCheck className="h-4 w-4 text-amber-400/80" />
              Premium Quality
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium tracking-wide uppercase">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Made for You
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
