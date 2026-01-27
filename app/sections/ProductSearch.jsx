"use client";

import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import { products } from "../constant/product.js";
import ProductCard from "../components/ProductCard";

const PRODUCTS_PER_PAGE = 6;

const ProductsSection = () => {
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE);

  // Fuse.js setup
  const fuse = useMemo(
    () =>
      new Fuse(products, {
        keys: ["title", "description"],
        threshold: 0.3,
      }),
    [],
  );

  const filteredProducts = query
    ? fuse.search(query).map((res) => res.item)
    : products;

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  return (
    <section id="products" className="bg-[#22323c] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#17d492] mb-8 text-center">
          Our Products
        </h2>

        {/* Search Bar */}
        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setVisibleCount(PRODUCTS_PER_PAGE); // reset on search
            }}
            className="w-full sm:w-1/2 px-4 py-2 rounded-lg 
              border border-[#17d492]/30 
              focus:outline-none focus:ring-2 focus:ring-[#17d492] 
              text-white bg-[#334b54]"
          />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {visibleProducts.length > 0 ? (
            visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="text-center text-[#f5f5f5] col-span-full">
              No products found.
            </p>
          )}
        </div>

        {/* Show More / Less */}
        {filteredProducts.length > PRODUCTS_PER_PAGE && (
          <div className="mt-10 flex justify-center gap-4">
            {visibleCount < filteredProducts.length && (
              <button
                onClick={() =>
                  setVisibleCount((prev) => prev + PRODUCTS_PER_PAGE)
                }
                className="bg-[#17d492] text-[#22323c] px-6 py-2 rounded-lg 
                  font-semibold hover:opacity-90 transition"
              >
                Show More
              </button>
            )}

            {visibleCount > PRODUCTS_PER_PAGE && (
              <button
                onClick={() => setVisibleCount(PRODUCTS_PER_PAGE)}
                className="border border-[#17d492] text-[#17d492] px-6 py-2 
                  rounded-lg hover:bg-[#17d492] hover:text-[#22323c] transition"
              >
                Show Less
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
