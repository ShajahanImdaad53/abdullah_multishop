"use client";

import { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";

export interface ProductImageProps extends Omit<ImageProps, "src" | "alt"> {
  src?: string | null;
  alt?: string;
  fallbackSrc?: string;
}

export const DEFAULT_PRODUCT_FALLBACK = "/placeholder-product.png";

export function ProductImage({
  src,
  alt = "Product Image",
  fallbackSrc = DEFAULT_PRODUCT_FALLBACK,
  className,
  ...props
}: ProductImageProps) {
  const getValidSrc = (source?: string | null): string => {
    if (typeof source === "string" && source.trim().length > 0) {
      return source.trim();
    }
    return fallbackSrc;
  };

  const [imgSrc, setImgSrc] = useState<string>(() => getValidSrc(src));

  useEffect(() => {
    setImgSrc(getValidSrc(src));
  }, [src, fallbackSrc]);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt || "Product Image"}
      className={className}
      onError={() => {
        if (imgSrc !== fallbackSrc) {
          if (process.env.NODE_ENV === "development") {
            console.warn(`[Product Image] Failed to load "${src}". Falling back to "${fallbackSrc}".`);
          }
          setImgSrc(fallbackSrc);
        }
      }}
    />
  );
}
