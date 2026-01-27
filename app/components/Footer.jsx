import React from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#22323c] text-[#f5f5f5]">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Brand */}
          <div>
            <h2 className="text-xl font-bold text-[#17d492]">
              Kapil Store
            </h2>
            <p className="text-sm mt-3 text-[#f5f5f5]/80">
              Your one-stop shop for books, notebooks, pens and all stationery
              essentials. Cash on Delivery available.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-[#17d492] transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#17d492] transition">
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#17d492] transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact</h3>
            <p className="text-sm text-[#f5f5f5]/80">
              📍 Local delivery available <br />
              📞 +91 9XXXXXXXXX <br />
              ✉️ support@stationerystore.com
            </p>

            {/* Social Icons */}
            <div className="flex justify-center md:justify-start gap-4 mt-4">
              <a
                href="#"
                className="p-2 bg-[#17d492] text-[#22323c] rounded-full hover:scale-105 transition"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="p-2 bg-[#17d492] text-[#22323c] rounded-full hover:scale-105 transition"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="p-2 bg-[#17d492] text-[#22323c] rounded-full hover:scale-105 transition"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[#f5f5f5]/20 mt-10 pt-6 text-center text-sm text-[#f5f5f5]/70">
          © {new Date().getFullYear()} Kapil Store. All rights reserved.
        </div>
        <p className="text-bold text-center">Website Developed by Mohammed Awaiz</p>
      </div>
    </footer>
  );
};

export default Footer;
