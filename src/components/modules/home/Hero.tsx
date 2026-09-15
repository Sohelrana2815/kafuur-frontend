import { ArrowRight, Leaf, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3.5 py-1.5">
            <Leaf className="size-4 text-primary" />

            <span className="text-xs font-medium tracking-wide text-primary">
              Fresh Scents. Lasting Impressions.
            </span>
          </div>

          {/* Heading */}
          <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Find Your <span className="text-primary">Signature Scent.</span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Discover premium body sprays and fragrances designed to keep you
            feeling fresh, confident, and unforgettable. Explore clean,
            refreshing notes and rich, captivating aromas made to complement
            your personality.
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/products"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              See Collections
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/our-mission"
              className="inline-flex items-center justify-center rounded-full border border-border bg-background px-7 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Our Story
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-10 flex w-full max-w-xl flex-wrap justify-center gap-x-6 gap-y-3 border-t border-border pt-6">
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              <ShieldCheck className="size-4 text-primary" />
              Premium Quality
            </div>

            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              <span className="size-1.5 rounded-full bg-primary" />
              Everyday Freshness
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
