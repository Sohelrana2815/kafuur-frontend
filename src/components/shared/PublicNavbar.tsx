import Link from "next/link";
import { NAV_ITEMS } from "@/lib/nav-config";
import NavActions from "./NavActions";
import { getCookie } from "@/services/auth/tokenHandlers";
import { Leaf } from "lucide-react";

export default async function PublicNavbar() {
  // 1. Await the cookie on the server
  const accessToken = await getCookie("accessToken");

  // 2. Convert to a boolean: true if token exists, false if not
  const isLoggedIn = !!accessToken;

  return (
    <div className="sticky top-0 z-50 w-full pt-4 md:pt-6 pb-2 px-3 sm:px-6 lg:px-8 bg-transparent">
      <div className="mx-auto max-w-7xl w-full">
        <nav className="relative w-full rounded-full border border-white/10 bg-[#121214]/80 backdrop-blur-md px-4 py-2.5 md:px-6 md:py-3 shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between">
            {/* Left Side: Brand Identity */}
            <div className="flex items-center gap-2 md:gap-3">
              <Leaf className="text-primary" />
              <Link
                href="/"
                className="flex flex-col justify-center focus:outline-none group"
              >
                <span className="font-bold text-sm md:text-base tracking-wide text-white leading-tight group-hover:text-white/90 transition-colors">
                  Kafuur
                </span>
              </Link>
            </div>

            {/* Center Space: Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8" role="menubar">
              {NAV_ITEMS.map((item) => (
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

            {/* 3. Pass the boolean prop to the Client Component */}
            <NavActions isLoggedIn={isLoggedIn} />
          </div>
        </nav>
      </div>
    </div>
  );
}
