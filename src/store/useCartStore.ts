import { create } from "zustand";

interface CartState {
  cartCount: number;
  setCartCount: (count: number) => void;
  updateCartCountOptimistically: (change: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cartCount: 0,
  setCartCount: (count) => set({ cartCount: count }),
  updateCartCountOptimistically: (change) =>
    set((state) => ({ cartCount: Math.max(0, state.cartCount + change) })),
  clearCart: () => set({ cartCount: 0 }),
}));
