"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext"; // Adjust path to your context
import {
  Heart,
  ShoppingBag,
  Truck,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface ProductDetailViewProps {
  product: {
    id: string;
    name: string;
    images: string[];
    price: number;
    category: string;
    shortDescription: string;
    longDescription: string;
  };
}

export default function ProductDetailView({ product }: ProductDetailViewProps) {
  // 1. Image Gallery State
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const primaryImage = product.images?.[activeImageIndex] || null;

  // 2. Consume Cart Context
  const { addToCart } = useCart();

  // 3. Handlers
  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to your cart!`);
  };

  const handleAddToWishlist = () => {
    // Implement your wishlist logic here later
    toast("Added to wishlist!");
  };

  const formattedPrice = Number(product.price).toFixed(2);
  const fallbackBrand = product.name.split(" ")[0] || "KAFUUR";

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      {/* Back Navigation */}
      <Link
        href="/products"
        className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Collection
      </Link>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
        {/* LEFT COLUMN: Image Gallery */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          {/* Main Large Image */}
          <div className="relative aspect-[4/5] w-full rounded-2xl bg-gradient-to-b from-[#18181b] to-[#121214] border border-white/5 overflow-hidden flex items-center justify-center">
            {primaryImage ? (
              <img
                src={primaryImage}
                alt={`${product.name} preview`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-neutral-600">No image available</div>
            )}
            <span className="absolute top-4 left-4 text-[10px] uppercase tracking-widest text-neutral-300 bg-black/40 px-3 py-1 rounded backdrop-blur-md font-medium">
              {product.category}
            </span>
          </div>

          {/* Thumbnail Strip */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`relative shrink-0 w-20 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                    activeImageIndex === index
                      ? "border-[#ff5294] opacity-100"
                      : "border-transparent opacity-50 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Product Information */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <div className="mb-8">
            <span className="text-xs font-bold tracking-[0.2em] text-[#ff5294] uppercase mb-2 block">
              {fallbackBrand}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
              {product.name}
            </h1>
            <div className="text-2xl font-medium text-neutral-200">
              ${formattedPrice}
            </div>
          </div>

          <div className="h-px bg-white/10 w-full mb-8" />

          {/* Short Description */}
          <p className="text-base text-neutral-300 leading-relaxed mb-8">
            {product.shortDescription}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 bg-white text-black py-4 px-8 rounded-full font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors active:scale-95"
            >
              <ShoppingBag className="w-5 h-5" />
              Add to Cart
            </button>
            <button
              onClick={handleAddToWishlist}
              className="flex items-center justify-center gap-2 border border-white/20 text-white py-4 px-8 rounded-full font-bold uppercase tracking-wider hover:bg-white/5 transition-colors active:scale-95"
            >
              <Heart className="w-5 h-5" />
              Wishlist
            </button>
          </div>

          {/* Value Propositions */}
          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="flex items-center gap-3 text-sm text-neutral-400">
              <Truck className="w-5 h-5 text-neutral-500" /> Free local delivery
            </div>
            <div className="flex items-center gap-3 text-sm text-neutral-400">
              <ShieldCheck className="w-5 h-5 text-neutral-500" /> Authenticity
              guaranteed
            </div>
          </div>

          {/* Long Description / Specifications */}
          <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
            <h3 className="text-lg font-semibold text-white mb-4">
              Product Details
            </h3>
            <div className="text-sm text-neutral-400 leading-relaxed space-y-4 whitespace-pre-wrap">
              {product.longDescription}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
