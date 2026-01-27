"use client";

import { useCart } from "../context/CartContext";

export default function AddToCartButton({ product, className = "" }) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={(e) => {
        e.stopPropagation(); // prevents card navigation
        addToCart(product);
      }}
      className={`bg-[#17d492] text-[#22323c] px-4 py-2 rounded-lg 
        font-medium hover:opacity-90 transition active:scale-95
        ${className}`}
    >
      Add to Cart
    </button>
  );
}

