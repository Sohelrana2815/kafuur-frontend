/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import * as React from "react";
import Link from "next/link";
import { Moon, Sun, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useCart } from "@/context/CartContext";

const navItems = [
  { label: "Products", href: "/products" },
  { label: "Our Mission", href: "/our-mission" },
  { label: "Contact Us", href: "/contact-us" },
];

export default function PublicNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  // 2. Consume the cart context
  const { totalItems } = useCart();
  // Avoid hydration mismatch flashes by waiting for mounting
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="sticky top-0 z-50 w-full pt-4 md:pt-6 pb-2 px-3 sm:px-6 lg:px-8 bg-transparent">
      <div className="mx-auto max-w-7xl w-full">
        {/* Main Capsule Container */}
        <nav className="w-full rounded-full border border-white/10 bg-[#121214]/80 backdrop-blur-md px-4 py-2.5 md:px-6 md:py-3 shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between">
            {/* Left Side: Brand Identity */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* Pink Brand Icon Circle */}
              <div className="flex h-9 w-9 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-full bg-[#ff5294]">
                <div className="h-3.5 w-3.5 md:h-4 md:w-4 rotate-45 bg-white rounded-sm" />
              </div>

              {/* Text details */}
              <Link
                href="/"
                className="flex flex-col justify-center focus:outline-none group"
              >
                <span className="font-bold text-sm md:text-base tracking-wide text-white leading-tight group-hover:text-white/90 transition-colors">
                  Kafuur
                </span>
                <span className="text-[8px] md:text-[9px] font-semibold tracking-widest text-neutral-400 uppercase leading-none mt-0.5">
                  Fresh{" "}
                  <span className="text-neutral-500 font-normal mx-0.5">•</span>{" "}
                  Trusted
                </span>
              </Link>
            </div>

            {/* Center Space: Desktop Navigation Links (Hidden on Mobile) */}
            <div className="hidden md:flex items-center gap-8" role="menubar">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-semibold text-neutral-300 hover:text-white transition-colors duration-200"
                  role="menuitem"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Right Side: Interaction Icon Group */}
            <div className="flex items-center gap-1.5 md:gap-2">
              {/* Desktop Theme Toggle (Hidden on Mobile) */}
              <div className="hidden sm:block relative h-9 w-9">
                <button
                  onClick={toggleTheme}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/5 bg-white/5 text-neutral-300 hover:bg-white/10 hover:text-white transition-all focus:outline-none"
                  aria-label="Toggle theme layout"
                >
                  {mounted && theme === "dark" ? (
                    <Moon className="h-[18px] w-[18px] text-neutral-300" />
                  ) : (
                    <Sun className="h-[18px] w-[18px] text-neutral-300" />
                  )}
                </button>
              </div>

              {/* Desktop Wishlist (Hidden on Mobile) */}
              <Link
                href="/wishlist"
                className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full border border-white/5 bg-white/5 text-neutral-300 hover:bg-white/10 hover:text-white transition-all"
                aria-label="Wishlist details"
              >
                <Heart className="h-[18px] w-[18px]" />
              </Link>

              {/* Shopping Bag Action (Always visible for easy checkouts) */}
              <Link
                href="/cart"
                className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/5 bg-white/5 text-neutral-300 hover:bg-white/10 hover:text-white transition-all"
                aria-label="Shopping cart container"
              >
                <ShoppingBag className="h-[17px] w-[17px]" />
                {/* 3. Dynamic Badge: Only show if items exist */}
                {mounted && totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#ff5294] text-[9px] font-bold text-white shadow-sm animate-in zoom-in duration-200">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Hamburger Trigger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-300 hover:text-white md:hidden focus:outline-none bg-white/5 border border-white/5 active:scale-95 transition-transform"
                aria-label="Toggle menu layout"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Panel Drawer */}
          {isMobileMenuOpen && (
            <div className="mt-3 flex flex-col gap-4 rounded-2xl border border-white/5 bg-[#121214]/95 backdrop-blur-xl p-4 md:hidden animate-in fade-in slide-in-from-top-3 duration-200">
              {/* Primary Navigation Links */}
              <div className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    onClick={() => setIsMobileMenuOpen(false)}
                    href={item.href}
                    className="text-base font-medium text-neutral-300 hover:text-white px-4 py-3 rounded-xl hover:bg-white/5 active:bg-white/10 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="h-px bg-white/10 mx-2" />

              {/* Secondary Utility Actions Grid */}
              <div className="grid grid-cols-3 gap-2 px-1">
                <Link
                  href="/wishlist"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl border border-white/5 bg-white/5 text-neutral-300 active:bg-white/10"
                >
                  <Heart className="h-5 w-5" />
                  <span className="text-[11px] font-medium">Wishlist</span>
                </Link>

                {/* Integrated Mobile Theme Toggle Button */}
                <button
                  onClick={toggleTheme}
                  className="flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl border border-white/5 bg-white/5 text-neutral-300 active:bg-white/10 focus:outline-none"
                >
                  {mounted && theme === "dark" ? (
                    <>
                      <Moon className="h-5 w-5 text-neutral-300" />
                      <span className="text-[11px] font-medium">Dark Mode</span>
                    </>
                  ) : (
                    <>
                      <Sun className="h-5 w-5 text-neutral-300" />
                      <span className="text-[11px] font-medium">
                        Light Mode
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
}
