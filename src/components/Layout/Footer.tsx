import Link from "next/link";
import React from "react";
import { CiShoppingCart } from "react-icons/ci";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="py-12 bg-primary-dark">
      <div className="xl:container mx-auto px-2 xl:px-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-white gap-5">
          {/* One */}
          <div className="mb-8 md:mb-0">
            <Link href={"/"} className="flex items-center space-x-3 py-4">
              <CiShoppingCart className="text-neutral-light text-3xl" />
              <div className="font-bold">
                <span className="text-3xl font-bold text-neutral-light">
                  SHOPY
                </span>
              </div>
            </Link>
            <p className="mb-2 text-white">Subscribe to Newsletter</p>
            <div className="flex mt-4 items-center mb-4 rounded-full ring ring-white">
              <input
                type="email"
                placeholder="Your Email Address..."
                name="newsLetter"
                className="p-2 rounded-l-full text-black focus:outline-none"
              />
              <button className="bg-primary-light text-white p-2 rounded-r-full">
                Subscribe
              </button>
            </div>
            <div className="flex space-x-4 justify-between mt-5">
              <Link href={"#"}>
                <FaFacebookF
                  size={30}
                  className="border border-white rounded-full p-1"
                />
              </Link>
              <Link href={"#"}>
                <FaTwitter
                  size={30}
                  className="border border-white rounded-full p-1"
                />
              </Link>
              <Link href={"#"}>
                <FaInstagram
                  size={30}
                  className="border border-white rounded-full p-1"
                />
              </Link>
              <Link href={"#"}>
                <FaYoutube
                  size={30}
                  className="border border-white rounded-full p-1"
                />
              </Link>
            </div>
          </div>
          <div className="flex gap-3">
            {/* two */}
            <div className="mb-8 md:mb-0 w-1/3">
              <h3 className="font-bold mb-2">Support</h3>
              <ul>
                <li className="mb-1">
                  <Link href={"#"}>FAQ</Link>
                </li>
                <li className="mb-1">
                  <Link href={"#"}>Return & Exchange</Link>
                </li>
                <li className="mb-1">
                  <Link href={"#"}>Shipping </Link>
                </li>
                <li className="mb-1">
                  <Link href={"#"}>Size Charts</Link>
                </li>
              </ul>
            </div>
            {/* three */}
            <div className="mb-8 md:mb-0 w-1/3">
              <h3 className="font-bold mb-2">Legal</h3>
              <ul>
                <li className="mb-1">
                  <Link href={"#"}>Cookies Policy</Link>
                </li>
                <li className="mb-1">
                  <Link href={"#"}>Terms & Conditions</Link>
                </li>
                <li className="mb-1">
                  <Link href={"#"}>Privacy</Link>
                </li>
                <li className="mb-1">
                  <Link href={"#"}>About Us</Link>
                </li>
                <li className="mb-1">
                  <Link href={"#"}> Contact Us</Link>
                </li>
              </ul>
            </div>
            {/* four */}
            <div className="mb-8 md:mb-0 w-1/3">
              <h3 className="font-bold mb-2">Contact</h3>
              <ul>
                <li className="mb-1">
                  <Link href={"#"}>
                    House : 25, Road No: 2, Block A, Mirpur-1, Dhaka 1216
                  </Link>
                </li>
                <li className="mb-1">
                  <Link href={"#"}> info@inilabs.net</Link>
                </li>
                <li className="mb-1">
                  <Link href={"#"}>13333846282</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
