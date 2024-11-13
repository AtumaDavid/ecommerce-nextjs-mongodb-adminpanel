"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { CiShoppingCart } from "react-icons/ci";
import { IoIosArrowDropdown } from "react-icons/io";

export const Header = () => {
  const pathname = usePathname();
  return (
    <div className="bg-white shadow-md sticky top-0 z-50">
      <div className="container flex px-4 items-center justify-between mx-auto">
        <div className="flex items-center space-x-8">
          <Link href={"/"} className="flex items-center space-x-3 py-4">
            <CiShoppingCart className="text-[#f76411] text-3xl" />
            <div className="font-bold">
              <span className="text-3xl font-bold text-[#f23e14]">S</span>
              <span className="text-3xl font-bold text-[#e06246]">HOPY</span>
            </div>
          </Link>
          {/* navbar labels */}
          <div className="flex items-center space-x-8 py-4">
            <Link
              href={"/"}
              className={`font-bold text-xl ${
                pathname === "/" ? "text-[#f23e14]" : "text-black"
              }`}
            >
              Home
            </Link>
            <div className="relative group py-4">
              <button className="text-black flex items-center gap-2 font-bold text-xl">
                Categories <IoIosArrowDropdown />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
