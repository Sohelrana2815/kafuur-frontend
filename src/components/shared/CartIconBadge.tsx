// src/components/shared/CartIconBadge.tsx
"use client";

import { useCart } from "@/context/CartContext";
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
  const { cartCount } = useCart();

  return (
    <Link
      href="/cart"
      className={`relative ${className}`}
      aria-label="Shopping cart"
    >
      <ShoppingCart className={iconClassName || "h-5 w-5"} />

      {/* Badge rendering logic */}
      {cartCount > 0 && (
        <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold dark:text-black text-white shadow-sm">
          {cartCount > 99 ? "99+" : cartCount}
        </span>
      )}
    </Link>
  );
}
