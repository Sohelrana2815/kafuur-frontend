"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductImageGalleryProps {
  images?: string[];
  productName: string;
}

export default function ProductImageGallery({
  images = [],
  productName,
}: ProductImageGalleryProps) {
  const validImages = images.filter(Boolean);
  const displayImages = validImages.slice(0, 3);

  const [selectedImage, setSelectedImage] = useState(
    displayImages[0] || "/placeholder.svg",
  );

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Thumbnails */}
        {displayImages.length > 1 && (
          <div className="order-2 flex gap-3 sm:order-1 sm:w-20 sm:flex-col">
            {displayImages.map((image, index) => {
              const isSelected = selectedImage === image;

              return (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  aria-label={`View image ${index + 1}`}
                  aria-pressed={isSelected}
                  className={`relative aspect-square w-16 shrink-0 cursor-pointer overflow-hidden rounded-lg border bg-muted/30 transition sm:w-full ${
                    isSelected
                      ? "border-foreground ring-1 ring-foreground"
                      : "border-border hover:border-foreground/50"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${productName} thumbnail ${index + 1}`}
                    fill
                    sizes="80px"
                    className="object-contain p-2"
                  />
                </button>
              );
            })}
          </div>
        )}

        {/* Main Image */}
        <div className="order-1 relative aspect-square w-full overflow-hidden rounded-2xl border border-border bg-muted/30 sm:order-2 ">
          <Image
            src={selectedImage}
            alt={productName}
            fill
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw"
            className="object-contain p-6 sm:p-8 lg:p-10"
          />
        </div>
      </div>
    </div>
  );
}
