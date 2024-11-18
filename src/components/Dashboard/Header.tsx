import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiShoppingCart } from "react-icons/ci";
import { HiBars3BottomLeft } from "react-icons/hi2";
import { IoIosArrowDropdown } from "react-icons/io";

interface DashboardHeaderProps {
  openSidebar: boolean;
  setOpenSidebar: (open: boolean) => void;
}

const Header: React.FC<DashboardHeaderProps> = ({
  setOpenSidebar,
  openSidebar,
}) => {
  return (
    <div className="flex px-4 bg-white h-[10vh] shadow-md sticky top-0 w-full z-50 items-center justify-between">
      <div className="flex items-center">
        {/* Sidebar Toggle - Now positioned on the left */}
        <div
          className="bg-neutral-light cursor-pointer p-2 rounded mr-2"
          onClick={() => setOpenSidebar(!openSidebar)}
        >
          <HiBars3BottomLeft className="text-neutral-dark" />
        </div>

        {/* Logo */}
        <Link href={"/"} className="flex items-center space-x-3 py-4">
          <CiShoppingCart className="text-neutral-dark text-2xl md:text-3xl" />
          <div className="font-bold hidden sm:block">
            <span className="text-2xl md:text-3xl font-bold text-neutral-dark">
              SHOPY
            </span>
          </div>
        </Link>
      </div>

      <div className="flex items-center space-x-2 md:space-x-4">
        {/* Language Selector - Hidden on mobile */}
        <div className="relative group me-4 py-4 hidden md:block">
          <div className="flex items-center gap-2 p-2 cursor-pointer">
            <Image
              src={"/english.png"}
              alt="flag"
              className="h-5"
              width={20}
              height={5}
            />
            <span className="hidden sm:inline">English</span>
            <IoIosArrowDropdown className="text-xl" />
          </div>

          <div className="absolute top-14 left-[1px] w-48 bg-white rounded shadow-md hidden group-hover:block gap-3">
            <div className="flex items-center p-2 gap-3 cursor-pointer">
              <Image
                src={"/english.png"}
                alt="flag"
                className="h-5"
                width={20}
                height={5}
              />
              <span>English</span>
            </div>
            <div className="flex items-center p-2 gap-3 cursor-pointer">
              <Image
                src={"/english.png"}
                alt="flag"
                className="h-5"
                width={20}
                height={5}
              />
              <span>English</span>
            </div>
          </div>
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-2 p-2">
          <img
            src="https://placehold.co/40x40"
            alt="user icon"
            className="rounded-md w-8 h-8 border-neutral-dark border"
          />
          <div className="flex flex-col">
            <span className="text-sm">Hello</span>
            <span className="text-sm font-bold">John Doe</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
