"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import AddToCartButton from "../components/AddToCartButton";

export default function ProductCard({ product }) {
  const [currentImage, setCurrentImage] = useState(0);
  const intervalRef = useRef(null);

  // ✅ Safe images fallback
  const images = useMemo(() => {
    return Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : ["/placeholder.png"];
  }, [product.images]);

  // ✅ Price logic (handles price > actualPrice or actualPrice missing)
  const price = Number(product.price || 0); // Selling price
  const actualPrice = Number(product.actualPrice || 0); // Original price

  // Ensure we only show discount if original price > selling price
  const hasDiscount = actualPrice > price;
  const discountPercent = hasDiscount
    ? Math.round(((actualPrice - price) / actualPrice) * 100)
    : 0;

  // ✅ Auto slide
  useEffect(() => {
    startAutoSlide();
    return stopAutoSlide;
  }, [images.length]);

  const startAutoSlide = () => {
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <div
      className="bg-white rounded-xl p-4 flex flex-col hover:shadow-lg transition border relative"
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
    >
      {/* ✅ Discount Badge */}
      {hasDiscount && (
        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
          {discountPercent}% OFF
        </span>
      )}

      {/* ✅ Image */}
      <img
        src={images[currentImage]}
        alt={product.title}
        className="rounded-lg w-full h-44 sm:h-48 object-cover transition duration-500"
      />

      {/* ✅ Dots */}
      {images.length > 1 && (
        <div className="flex justify-center gap-1 mt-2">
          {images.map((_, index) => (
            <span
              key={index}
              onMouseEnter={() => setCurrentImage(index)}
              className={`h-2 w-2 rounded-full cursor-pointer transition ${
                currentImage === index ? "bg-[#17d492]" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}

      <h3 className="mt-3 font-semibold text-[#22323c]">{product.title}</h3>

      <p className="text-sm text-gray-500 line-clamp-2 mt-1">
        {product.description}
      </p>

      {/* ✅ Price + Cart */}
      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg text-[#22323c]">₹{price}</span>
          {hasDiscount && (
            <span className="text-sm text-gray-400 line-through">
              ₹{actualPrice}
            </span>
          )}
        </div>

        <AddToCartButton product={product} />
      </div>
    </div>
  );
}
