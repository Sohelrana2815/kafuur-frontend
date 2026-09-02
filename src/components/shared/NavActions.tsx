"use client";

import { Heart, Menu, Moon, ShoppingCart, Sun, User, X } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import * as React from "react";
import LogoutButton from "./LogoutButton"; // Adjust path to your LogoutButton
import CartIconBadge from "./CartIconBadge";

// 1. Define the props interface
interface NavItem {
  label: string;
  href: string;
}

interface NavActionsProps {
  isLoggedIn: boolean;
  navItems: NavItem[];
}

export default function NavActions({ isLoggedIn, navItems }: NavActionsProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const closeMenu = () => setIsMobileMenuOpen(false);

  const iconBtnClass =
    "flex h-9 w-9 items-center justify-center rounded-full border border-white/5 bg-white/5 text-neutral-300 hover:bg-white/10 hover:text-white transition-all focus:outline-none active:scale-95";

  return (
    <>
      <div className="flex items-center gap-1.5 md:gap-2">
        <button
          onClick={toggleTheme}
          className={`hidden sm:flex ${iconBtnClass}`}
          aria-label="Toggle theme"
        >
          {mounted && theme === "dark" ? (
            <Moon className="h-[18px] w-[18px]" />
          ) : (
            <Sun className="h-[18px] w-[18px]" />
          )}
        </button>

        {/* 2. Replace the hardcoded cart link with the dynamic badge */}
        <CartIconBadge
          className={iconBtnClass}
          iconClassName="h-[17px] w-[17px]"
        />

        {/* 2. Desktop Conditional Rendering */}
        {isLoggedIn ? (
          <div className="hidden sm:inline-flex ml-1">
            <LogoutButton />
          </div>
        ) : (
          <Link
            href="/login"
            className="hidden sm:inline-flex items-center justify-center ml-1 px-4 py-1.5 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/10 rounded-full transition-all focus:outline-none active:scale-95"
          >
            Log In
          </Link>
        )}

        {/* Mobile Menu Trigger */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden ${iconBtnClass}`}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown Panel Drawer */}
      {isMobileMenuOpen && (
        <div className="absolute top-[60px] left-0 right-0 mt-3 flex flex-col gap-4 rounded-2xl border border-white/5 bg-[#121214]/95 backdrop-blur-xl p-4 md:hidden animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={closeMenu}
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
              onClick={closeMenu}
              className="flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl border border-white/5 bg-white/5 text-neutral-300 active:bg-white/10"
            >
              <Heart className="h-5 w-5" />
              <span className="text-[11px] font-medium">Wishlist</span>
            </Link>

            <button
              onClick={toggleTheme}
              className="flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl border border-white/5 bg-white/5 text-neutral-300 active:bg-white/10 focus:outline-none"
            >
              {mounted && theme === "dark" ? (
                <>
                  <Moon className="h-5 w-5" />
                  <span className="text-[11px] font-medium">Dark Mode</span>
                </>
              ) : (
                <>
                  <Sun className="h-5 w-5" />
                  <span className="text-[11px] font-medium">Light Mode</span>
                </>
              )}
            </button>

            {/* 3. Mobile Conditional Rendering */}
            {isLoggedIn ? (
              <LogoutButton />
            ) : (
              <Link
                href="/login"
                onClick={closeMenu}
                className="flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl border border-[#ff5294]/30 bg-[#ff5294]/10 text-[#ff5294] active:bg-[#ff5294]/20"
              >
                <User className="h-5 w-5" />
                <span className="text-[11px] font-semibold">Log In</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
