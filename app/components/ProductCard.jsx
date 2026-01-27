"use client";

import Link from "next/link";
import AddToCartButton from "../components/AddToCartButton";
import { slugify } from "../utils/slugify";

export default function ProductCard({ product }) {
  const slug = slugify(product.title);

  return (
    <div className="bg-white rounded-xl p-4 flex flex-col hover:shadow-lg transition border">
      {/* Clickable Product Area */}
      <Link href={`/products/${slug}`} className="group flex-1">
        <img
          src={product.images[0]}
          alt={product.title}
          className="rounded-lg w-full h-44 sm:h-48 object-cover group-hover:opacity-90 transition"
        />

        <h3 className="mt-3 font-semibold text-[#22323c] group-hover:text-[#17d492] transition">
          {product.title}
        </h3>

        <p className="text-sm text-gray-500 line-clamp-2 mt-1">
          {product.description}
        </p>
      </Link>

      {/* Price + Cart */}
      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="font-bold text-lg text-[#22323c]">
          ₹{product.price}
        </span>

        <AddToCartButton product={product} />
      </div>
    </div>
  );
}
