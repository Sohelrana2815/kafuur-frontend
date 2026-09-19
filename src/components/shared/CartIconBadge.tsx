// src/components/shared/CartIconBadge.tsx
"use client";

import { useCartStore } from "@/store/useCartStore";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

interface CartIconBadgeProps {
  className?: string;
  iconClassName?: string;
}

export default function CartIconBadge({
  className,
  iconClassName,
}: CartIconBadgeProps) {
  // Subscribe directly to cartCount from Zustand
  const cartCount = useCartStore((state) => state.cartCount);

  return (
    <Link
      href="/cart"
      className={`relative ${className}`}
      aria-label="Shopping cart"
    >
      <ShoppingCart className={iconClassName || "h-5 w-5"} />

      {/* Badge rendering logic */}
      {cartCount > 0 && (
        <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#E7AC2A] text-[9px] font-bold text-black shadow-sm">
          {cartCount > 99 ? "99+" : cartCount}
        </span>
      )}
    </Link>
  );
}
