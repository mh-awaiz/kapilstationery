"use client";
import React, { useState } from "react";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-[#22323c] text-[#f5f5f5] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/image.png"
              alt="Logo"
              width={50}
              height={50}
              className="h-14 w-auto object-contain transition-transform duration-300 hover:scale-105"
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {["Home", "About", "Contact",].map((item) => (
              <Link
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="relative group"
              >
                <span className="transition-colors group-hover:text-[#17d492]">
                  {item}
                </span>
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#17d492] transition-all duration-300 group-hover:w-full" />
              </Link>
              
            ))}
            <Link href="#products">Products</Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <Link
              href="/cart"
              className="relative transform transition duration-300 hover:scale-110 hover:text-[#17d492]"
            >
              <FaShoppingCart className="text-xl" />

              {/* Cart Badge (enable when cartCount > 0) */}
              
              {/* <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full 
              bg-[#17d492] text-[#22323c] text-xs font-bold flex items-center justify-center animate-pulse">
                2
              </span>  */}
             
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-xl transition-transform duration-300"
              onClick={() => setOpen(!open)}
            >
              {open ? (
                <FaTimes className="rotate-90 transition-transform duration-300" />
              ) : (
                <FaBars />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu with Smooth Animation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          open ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        } bg-[#22323c] border-t border-white/20`}
      >
        <div className="flex flex-col px-4 py-4 gap-4">
          {["Home", "About", "Contact"].map((item, i) => (
            <Link
              key={item}
              href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="transform transition-all duration-300 hover:translate-x-2 hover:text-[#17d492]"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
