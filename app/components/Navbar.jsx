"use client";
import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Effect to change background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/#products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-[#22323c]/80 backdrop-blur-md py-2 shadow-lg" 
          : "bg-[#22323c] py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-[#17d492] blur-md opacity-0 group-hover:opacity-9 transition-opacity"></div>
              <Image
                src="/newlogonav.png"
                alt="Logo"
                width={100}
                height={100}
                className="relative h-12 w-auto transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative text-sm font-bold uppercase tracking-widest text-slate-300 hover:text-[#17d492] transition-colors group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#17d492] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-6">
            <Link
              href="/cart"
              className="group relative p-2 text-white hover:text-[#17d492] transition-colors"
            >
              <FaShoppingCart size={22} className="group-hover:rotate-12 transition-transform" />
            </Link>

            {/* Mobile Toggle */}
            <button
              className="md:hidden text-white hover:text-[#17d492] transition-colors"
              onClick={() => setOpen(!open)}
            >
              {open ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-x-0 top-[72px] p-6 bg-[#1a2830] border-t border-white/5 transition-all duration-500 ease-in-out md:hidden ${
          open ? "translate-y-0 opacity-100 visible" : "-translate-y-10 opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col gap-6">
          {navLinks.map((link, i) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-2xl font-black text-white hover:text-[#17d492] transition-all flex justify-between items-center group"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {link.name}
              <div className="h-1 w-1 rounded-full bg-[#17d492] opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
          <div className="mt-4 pt-6 border-t border-white/10">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Support</p>
            <p className="text-[#17d492] font-bold mt-1">+91 7982670413</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;