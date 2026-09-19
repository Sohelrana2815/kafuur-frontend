// src/app/not-found.tsx

import { ArrowLeft, Compass, Home, Sparkles } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[80vh] items-center justify-center overflow-hidden text-foreground px-4 py-20">
      {/* Background atmosphere glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[140px]" />

      <div className="mx-auto max-w-xl text-center">
        {/* Category Tag */}
        <div className="mb-6 flex items-center justify-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-primary sm:text-xs">
            404 Error
          </span>
        </div>

        {/* Decorative Icon Card */}
        <div className="mb-8 inline-flex items-center justify-center rounded-3xl border border-border bg-card p-6 shadow-xl">
          <Compass className="h-14 w-14 text-primary" />
        </div>

        {/* Heading */}
        <h1 className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Page Not Found
        </h1>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
          Sorry, we couldn&apos;t find the resource you were looking for. It may
          have been moved, deleted, or never existed.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 sm:w-auto"
          >
            <Home className="h-4 w-4" />
            <span>Return Home</span>
          </Link>

          <Link
            href="/contact-us"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3.5 text-sm font-medium text-foreground transition hover:bg-accent sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Contact Support</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
