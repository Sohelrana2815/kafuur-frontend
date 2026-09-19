"use client";

import { Menu, Moon, Sun, User, X } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import * as React from "react";
import CartIconBadge from "./CartIconBadge";
import LogoutButton from "./LogoutButton";

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

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const closeMenu = () => setIsMobileMenuOpen(false);

  // Derived theme helpers to eliminate duplicated JSX
  const isDark = mounted && theme === "dark";
  const ThemeIcon = isDark ? Moon : Sun;
  const themeLabel = isDark ? "Dark Mode" : "Light Mode";

  const iconBtnClass =
    "flex h-9 w-9 items-center justify-center rounded-full border border-white/5 bg-white/5 text-neutral-300 hover:bg-white/10 hover:text-white transition-all focus:outline-none active:scale-95";

  const tileClass =
    "flex flex-col items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl border border-white/5 bg-white/5 text-neutral-300 hover:text-white active:bg-white/10 transition-colors focus:outline-none text-center text-[11px] font-medium";

  return (
    <>
      <div className="flex items-center gap-1.5 md:gap-2">
        {/* Desktop Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`hidden sm:flex ${iconBtnClass}`}
          aria-label="Toggle theme"
        >
          <ThemeIcon className="h-[18px] w-[18px]" />
        </button>

        {/* Dynamic Cart Badge */}
        <CartIconBadge
          className={iconBtnClass}
          iconClassName="h-[17px] w-[17px]"
        />

        {/* Desktop Profile & Auth Actions */}
        {isLoggedIn ? (
          <div className="hidden sm:flex items-center gap-2 ml-1">
            <Link
              href="/my-profile"
              className={iconBtnClass}
              title="My Profile"
              aria-label="My Profile"
            >
              <User className="h-[18px] w-[18px]" />
            </Link>
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

      {/* Mobile Dropdown Drawer */}
      {isMobileMenuOpen && (
        <div className="absolute top-[60px] left-0 right-0 mt-3 flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#121214]/95 backdrop-blur-xl p-4 md:hidden animate-in fade-in slide-in-from-top-3 duration-200 z-50">
          {/* Nav Links */}
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
          <div
            className={`grid ${
              isLoggedIn ? "grid-cols-3" : "grid-cols-2"
            } gap-2 px-1 items-stretch`}
          >
            {/* Theme Toggle */}
            <button onClick={toggleTheme} className={tileClass}>
              <ThemeIcon className="h-5 w-5" />
              <span>{themeLabel}</span>
            </button>

            {/* Profile Link (Logged In) */}
            {isLoggedIn && (
              <Link
                href="/my-profile"
                onClick={closeMenu}
                className={tileClass}
              >
                <User className="h-5 w-5" />
                <span>Profile</span>
              </Link>
            )}

            {/* Auth Action */}
            {isLoggedIn ? (
              <div className="[&>button]:w-full [&>button]:h-full [&>button]:flex [&>button]:flex-col [&>button]:items-center [&>button]:justify-center [&>button]:gap-1.5 [&>button]:py-2.5 [&>button]:px-2 [&>button]:rounded-xl [&>button]:border [&>button]:border-red-500/20 [&>button]:bg-red-500/10 [&>button]:text-red-400 [&>button]:text-[11px] [&>button]:font-medium [&>button_svg]:h-5 [&>button_svg]:w-5">
                <LogoutButton />
              </div>
            ) : (
              <Link
                href="/login"
                onClick={closeMenu}
                className="flex flex-col items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 active:bg-primary/30 transition-colors text-center text-[11px] font-semibold"
              >
                <User className="h-5 w-5" />
                <span>Log In</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
