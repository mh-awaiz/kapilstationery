"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const words = [
  "All Stationery Items at Lowest Prices",
  "Free Delivery for Jamia Students",
  "Cash on Delivery Available",
];

const Hero = () => {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentWord = words[wordIndex];

    if (charIndex < currentWord.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + currentWord[charIndex]);
        setCharIndex(charIndex + 1);
      }, 80);

      return () => clearTimeout(timeout);
    } else {
      const pause = setTimeout(() => {
        setText("");
        setCharIndex(0);
        setWordIndex((prev) => (prev + 1) % words.length);
      }, 1500);

      return () => clearTimeout(pause);
    }
  }, [charIndex, wordIndex]);

  return (
    <section className="bg-[#22323c] text-[#f5f5f5]">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col-reverse md:flex-row items-center gap-10">
          {/* Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <Image
              src="/background.png"
              alt="Stationery Items"
              width={500}
              height={500}
              className="object-contain"
              priority
            />
          </div>

          {/* Content */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Your One-Stop
              <span className="text-[#17d492]"> Stationery Store</span>
            </h1>

            {/* Typewriter */}
            <p className="mt-4 text-lg md:text-xl text-[#17d492] h-8">
              {text}
              <span className="animate-pulse">|</span>
            </p>

            {/* Static Tags */}
            <div className="mt-6 space-y-2 text-sm md:text-base text-[#f5f5f5]/80">
              <p>✔ Get all stationery items at the lowest price</p>
              <p>✔ Free delivery for Jamia students</p>
              <p>✔ Cash on Delivery available</p>
            </div>

            {/* CTA */}
            <div className="mt-8 flex justify-center md:justify-start gap-4">
              <Link href="#products">
                <button className="bg-[#17d492] text-[#22323c] px-6 py-3 rounded-lg font-semibold hover:scale-105 transition">
                  Shop Now
                </button>
              </Link>
              <Link href="/contact">
                <button className="border border-[#17d492] text-[#17d492] px-6 py-3 rounded-lg hover:bg-[#17d492] hover:text-[#22323c] transition">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
