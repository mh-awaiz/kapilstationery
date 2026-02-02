"use client";

import Link from "next/link";
import { useState } from "react";
import AddToCartButton from "../components/AddToCartButton";
import { slugify } from "../utils/slugify";

export default function ProductCard({ product }) {
  const slug = slugify(product.title);
  const [currentImage, setCurrentImage] = useState(0);

  const discountPercent = Math.round(
    ((product.actualPrice - product.price) / product.actualPrice) * 100,
  );

  return (
    <div className="bg-white rounded-xl p-4 flex flex-col hover:shadow-lg transition border relative">
      {/* Discount Badge */}
      {discountPercent > 0 && (
        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded">
          {discountPercent}% OFF
        </span>
      )}

      {/* Clickable Product Area */}
      {/* <Link href={`/products/${slug}`} className="group flex-1"> */}
        <img
          src={product.images[currentImage]}
          alt={product.title}
          className="rounded-lg w-full h-44 sm:h-48 object-cover transition"
        />

        {/* Image Dots */}
        <div className="flex justify-center gap-1 mt-2">
          {product.images.map((_, index) => (
            <span
              key={index}
              onMouseEnter={() => setCurrentImage(index)}
              className={`h-2 w-2 rounded-full cursor-pointer ${
                currentImage === index ? "bg-[#17d492]" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        <h3 className="mt-3 font-semibold text-[#22323c] group-hover:text-[#17d492] transition">
          {product.title}
        </h3>

        <p className="text-sm text-gray-500 line-clamp-2 mt-1">
          {product.description}
        </p>
      {/* </Link> */}

      {/* Price + Cart */}
      <div className="mt-4 flex items-center justify-between gap-3">
        <div>
          <span className="font-bold text-lg text-[#22323c]">
            ₹{product.price}
          </span>
          <span className="text-sm text-gray-400 line-through ml-2">
            ₹{product.actualPrice}
          </span>
        </div>

        <AddToCartButton product={product} />
      </div>
    </div>
  );
}
