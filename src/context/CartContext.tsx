// src/context/CartContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ICartContext {
  cartCount: number;
  setCartCount: (count: number) => void;
  updateCartCountOptimistically: (change: number) => void;
}

const CartContext = createContext<ICartContext | undefined>(undefined);

export function CartProvider({ children, initialCount = 0 }: { children: ReactNode, initialCount?: number }) {
  const [cartCount, setCartCount] = useState(initialCount);

  const updateCartCountOptimistically = (change: number) => {
    setCartCount((prev) => Math.max(0, prev + change));
  };

  return (
    <CartContext.Provider value={{ cartCount, setCartCount, updateCartCountOptimistically }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}