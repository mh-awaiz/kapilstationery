import React from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { IoIosCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#22323c] text-[#f5f5f5]">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Brand */}
          <div>
            <h2 className="text-xl font-bold text-[#17d492]">Kapil Store</h2>
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

            <p className="text-sm text-[#f5f5f5]/80 flex items-center justify-center md:justify-start gap-2">
              <TbTruckDelivery size={25} className="p-1" />
              Local delivery available
            </p>

            <p className="text-sm text-[#f5f5f5]/80  flex items-center justify-center md:justify-start gap-2">
              <IoIosCall size={25} className="p-1" />
              +91 79826 70413
            </p>

            <p className="text-sm text-[#f5f5f5]/80  flex items-center justify-center md:justify-start gap-2">
              <MdEmail size={25} className="p-1" />{" "}
              kapilguptakapil1111@gmail.com
            </p>

            {/* Social Icons */}
            <div className="flex justify-center md:justify-start gap-4 mt-4">
              <a
                href="#"
                target="_blank"
                className="p-2 bg-[#17d492] text-[#22323c] rounded-full hover:scale-105 transition"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                target="_blank"
                className="p-2 bg-[#17d492] text-[#22323c] rounded-full hover:scale-105 transition"
              >
                <FaInstagram />
              </a>
              <a
                href="https://chat.whatsapp.com/Di7XVQjwzbf3yTEiX71tUS"
                target="_blank"
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
        <p className="text-bold text-center">
          Website Developed by{" "}
          <a
            href="https://mohammedawaiz.vercel.app/"
            target="_blank"
            className="text-[#17d492] font-semibold"
          >
            Mohammed Awaiz
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
