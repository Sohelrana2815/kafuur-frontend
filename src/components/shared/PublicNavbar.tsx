import { getCookie } from "@/services/auth/tokenHandlers";
import { getDefaultDashboardRoute, UserRole } from "@/utils/auth-utils";
import jwt from "jsonwebtoken";
import { Leaf } from "lucide-react";
import Link from "next/link";
import NavActions from "./NavActions";

export default async function PublicNavbar() {
  // 1. Await the cookie on the server
  const accessToken = await getCookie("accessToken");
  let userRole: UserRole | null = null;
  if (accessToken) {
    try {
      const verifiedToken = jwt.verify(
        accessToken,
        process.env.JWT_ACCESS_SECRET as string,
      );

      if (typeof verifiedToken !== "string") {
        userRole = (verifiedToken as { role: UserRole }).role;
      }
    } catch {
      userRole = null;
    }
  }
  // 2. Convert to a boolean: true if token exists, false if not
  const isLoggedIn = !!accessToken;

  const NAV_ITEMS = [
    { label: "Products", href: "/products" },
    { label: "Our Mission", href: "/our-mission" },
    { label: "Contact Us", href: "/contact-us" },

    ...(userRole
      ? [
          {
            label: "Dashboard",
            href: getDefaultDashboardRoute(userRole),
          },
        ]
      : []),
  ];

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
            <NavActions navItems={NAV_ITEMS} isLoggedIn={isLoggedIn} />
          </div>
        </nav>
      </div>
    </div>
  );
}
