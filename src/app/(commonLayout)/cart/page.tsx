"use client";

import React, { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration errors by rendering after mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevent UI flash during hydration

  // Empty State View
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[80vh] w-full bg-[#09090b] flex flex-col items-center justify-center px-4">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-10 h-10 text-neutral-500" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">
          Your cart is empty
        </h2>
        <p className="text-neutral-400 mb-8 text-center max-w-md">
          Looks like you haven&apos;t added any premium fragrances to your cart
          yet.
        </p>
        <Link
          href="/products"
          className="bg-white text-black px-8 py-3.5 rounded-full font-bold uppercase tracking-wider text-sm hover:bg-neutral-200 transition-colors active:scale-95"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#09090b] text-white pt-24 pb-24 font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
            Shopping Cart
          </h1>
          <p className="text-sm text-neutral-400">
            Review your selected items before proceeding to checkout.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Left Column: Cart Items List */}
          <div className="flex-1">
            <div className="hidden sm:grid grid-cols-12 gap-4 text-xs font-semibold uppercase tracking-widest text-neutral-500 pb-4 border-b border-white/10 mb-6">
              <div className="col-span-6">Product</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-3 text-right">Total</div>
            </div>

            <div className="flex flex-col space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="group flex flex-col sm:grid sm:grid-cols-12 gap-4 items-center py-4 border-b border-white/5"
                >
                  {/* Product Details (Image + Title) */}
                  <div className="col-span-6 flex items-center gap-4 w-full">
                    {/* Image */}
                    <Link
                      href={`/products/${item.id}`}
                      className="shrink-0 w-20 h-24 sm:w-24 sm:h-28 rounded-lg bg-gradient-to-b from-[#18181b] to-[#121214] border border-white/5 overflow-hidden flex items-center justify-center transition-opacity hover:opacity-80"
                    >
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ShoppingBag className="w-6 h-6 text-neutral-600" />
                      )}
                    </Link>

                    {/* Text block */}
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold tracking-[0.2em] text-[#ff5294] uppercase mb-1">
                        {item.category}
                      </span>
                      <Link
                        href={`/products/${item.id}`}
                        className="text-sm sm:text-base font-medium text-white hover:text-neutral-300 transition-colors line-clamp-2 mb-1"
                      >
                        {item.name}
                      </Link>
                      <span className="text-sm text-neutral-400 block sm:hidden mb-3">
                        ${item.price.toFixed(2)}
                      </span>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-xs text-neutral-500 hover:text-red-400 flex items-center gap-1.5 transition-colors w-fit"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </button>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="col-span-3 flex justify-start sm:justify-center w-full sm:w-auto">
                    <div className="flex items-center border border-white/10 rounded-full bg-white/5 h-10 w-28">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="flex-1 flex justify-center items-center text-neutral-400 hover:text-white active:scale-95 transition-all"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="flex-1 flex justify-center items-center text-neutral-400 hover:text-white active:scale-95 transition-all"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Individual Item Total */}
                  <div className="col-span-3 hidden sm:flex justify-end text-right w-full">
                    <span className="text-base font-medium text-white tracking-wide">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="w-full lg:w-96 shrink-0">
            <div className="sticky top-28 bg-[#121214] border border-white/10 rounded-2xl p-6 md:p-8">
              <h2 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">
                Order Summary
              </h2>

              <div className="flex flex-col gap-4 text-sm mb-6 pb-6 border-b border-white/10">
                <div className="flex justify-between text-neutral-300">
                  <span>Subtotal</span>
                  <span className="font-medium text-white">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-300">
                  <span>Estimated Shipping</span>
                  <span className="font-medium text-white text-right">
                    Calculated at Checkout
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-8">
                <span className="text-base font-medium text-white">Total</span>
                <span className="text-2xl font-bold text-white">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>

              <Link href="/checkout">
                <button className="w-full flex items-center justify-center gap-2 bg-[#ff5294] text-white py-4 px-6 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#e6407d] transition-colors active:scale-95 shadow-[0_0_20px_rgba(255,82,148,0.2)]">
                  Continue to Order <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
