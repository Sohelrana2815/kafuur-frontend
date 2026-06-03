// components/modules/products/Products.tsx
"use client"

import React from "react"

interface Product {
    id: string
    brand: string
    name: string
    price: number
    category: "men" | "women"
}

const BODY_SPRAYS: Product[] = [
    { id: "1", brand: "FOGG", name: "Fresh Scent 150ml", price: 12.00, category: "men" },
    { id: "2", brand: "AXE", name: "Apollo 150ml", price: 12.00, category: "men" },
    { id: "3", brand: "KAFUUR", name: "Kafuur - Coastal Rain", price: 12.00, category: "men" },
    { id: "4", brand: "BRUT", name: "Brut Original 150ml", price: 12.00, category: "men" },
    { id: "5", brand: "BRUT", name: "Brut Original Spray", price: 12.00, category: "men" },
    { id: "6", brand: "FOGG", name: "Fresh Scent 150ml", price: 12.00, category: "women" },
    { id: "7", brand: "NIVEA", name: "Novey Scent Spray", price: 12.00, category: "women" },
    { id: "8", brand: "NIVEA", name: "Fresh Scent 150ml", price: 12.00, category: "men" },
    { id: "9", brand: "KAFUUR", name: "Ronan Scentt Spray", price: 12.00, category: "women" },
    { id: "10", brand: "BRUT", name: "Brut Original Spray", price: 12.00, category: "men" },
    { id: "11", brand: "NIVEA", name: "Prvate Scent Spray", price: 12.00, category: "women" },
    { id: "12", brand: "KAFUUR", name: "Fresh Scent 150ml", price: 12.00, category: "women" },
]

export default function Products() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  gap-x-4 gap-y-10">
            {BODY_SPRAYS.map((product, index) => (
                <div key={product.id} className="group flex flex-col space-y-3">

                    {/* Card Image Wrapper */}
                    <div className="relative aspect-[4/5] w-full rounded-lg bg-gradient-to-b from-[#18181b] to-[#121214] border border-white/[0.04] overflow-hidden flex flex-col items-center justify-center transition-colors duration-300 group-hover:border-white/[0.09]">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_65%)] pointer-events-none" />
                        <svg className="w-14 h-14 text-neutral-700/60 transition-transform duration-500 group-hover:scale-105" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m15 0a3 3 0 01-3 3h-9a3 3 0 01-3-3m15 0a3 3 0 00-3-3h-9a3 3 0 00-3 3m16.5-3V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
                        </svg>
                        <span className="absolute bottom-3 right-3 text-[9px] uppercase tracking-widest text-neutral-600 font-medium">
                            {product.category}
                        </span>
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col space-y-1.5 px-0.5">
                        <span className="text-[10px] font-bold tracking-[0.2em] text-neutral-500 uppercase">{product.brand}</span>
                        <h3 className="text-xs md:text-sm font-normal text-white tracking-wide truncate group-hover:text-neutral-200 transition-colors">{product.name}</h3>
                        <span className="text-xs font-semibold text-neutral-400">${product.price.toFixed(2)}</span>
                    </div>

                    {/* Add to Cart Button */}
                    <div className="pt-1">
                        <button className="w-full py-2.5 px-4 text-[11px] font-bold tracking-widest text-neutral-400 border border-neutral-800 bg-transparent rounded uppercase transition-colors duration-200 hover:text-white hover:border-neutral-500 active:scale-[0.98]">
                            Add To Cart
                        </button>
                    </div>

                </div>
            ))}
        </div>
    )
}