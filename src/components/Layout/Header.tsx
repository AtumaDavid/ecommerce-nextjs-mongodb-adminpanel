"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { CiHeart, CiSearch, CiShoppingCart, CiUser } from "react-icons/ci";
import { IoIosArrowDropdown } from "react-icons/io";
import Image from "next/image";
import Profile from "./Profile";
import { RiShoppingCartLine } from "react-icons/ri";
import { FaBars } from "react-icons/fa";
import MenuTabs from "./MenuTabs";

export default function Header() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  console.log(setIsLoggedIn);
  // const handleLogin = () => {
  //   // Perform login logic here
  //   setIsLoggedIn(true); // Set to true on successful login
  // };

  // const handleLogout = () => {
  //   // Perform logout logic here
  //   setIsLoggedIn(false); // Set to false on logout
  // };

  const handleProfileEnter = () => setIsProfileOpen(true);
  const handleProfileLeave = () => setIsProfileOpen(false);

  return (
    <div className="bg-white shadow-md sticky top-0 z-50">
      <div className="xl:container flex px-2 xl:px-4 items-center justify-between mx-auto">
        {/* Left-hand side */}
        {/* Mobile */}
        <div className="lg:hidden block">
          <FaBars className="text-2xl text-neutral-dark font-bold" />
        </div>
        <div className="flex items-center space-x-4 xl:space-x-8">
          <Link href={"/"} className="flex items-center space-x-3 py-4">
            <CiShoppingCart className="text-neutral-dark text-3xl" />
            <div className="font-bold">
              <span className="text-3xl font-bold text-neutral-dark">
                SHOPY
              </span>
            </div>
          </Link>
          {/* Navbar labels */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-8 py-4">
            <Link
              href={"/"}
              className={`font-bold text-xl ${
                pathname === "/" ? "text-primary" : "text-black"
              }`}
            >
              Home
            </Link>
            <div className="relative group py-4">
              <button className="text-black flex items-center gap-2 font-bold text-xl">
                Categories <IoIosArrowDropdown className="text-xl" />
              </button>
              <div className="absolute w-[800px] bg-white rounded shadow-md hidden group-hover:block">
                <MenuTabs />
              </div>
            </div>
            <Link
              href={"/offers"}
              className={`${
                pathname === "/offers" ? "text-primary" : "text-black"
              } font-bold text-xl py-4`}
            >
              Offers
            </Link>
          </div>
        </div>

        {/* Right-hand side */}
        <div className="hidden lg:flex items-center space-x-3 xl:space-x-6">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="search"
              className="pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:outline-none"
            />
            <CiSearch className="text-2xl text-neutral-dark font-bold absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          {/* Language */}
          <div className="relative group me-4 py-4">
            <div className="flex items-center space-x-2 cursor-pointer">
              <Image
                src={"/english.png"}
                alt="flag"
                className="h-5"
                width={20}
                height={5}
              />
              <span>English</span>
              <IoIosArrowDropdown className="text-xl ms-3" />
            </div>
            <div className="absolute top-14 left-[1px] w-48 p-3 bg-white border rounded shadow-lg hidden group-hover:block">
              <button className="flex items-center space-x-8 gap-3">
                <Image src={"/english.png"} alt="flag" width={20} height={5} />
                English
              </button>
            </div>
          </div>
          {/* Wishlist */}
          <Link href={"/wishlist"}>
            <CiHeart className="text-2xl text-neutral-dark font-bold" />
          </Link>
          {/* User profile */}
          <div
            className="relative me-4 py-4"
            onMouseEnter={handleProfileEnter}
            onMouseLeave={handleProfileLeave}
          >
            <div className="flex items-center space-x-2 cursor-pointer">
              <CiUser className="text-2xl text-neutral-dark font-bold" />
            </div>
            {isProfileOpen && (
              <div className="absolute top-14 right-[-10px] w-64 p-3 bg-white rounded-md shadow-md">
                {!isLoggedIn ? (
                  <div className="flex flex-col items-center py-3">
                    <Link
                      href={"/registration"}
                      className="py-2 px-3 block bg-neutral-dark rounded-full text-neutral-light text-xl w-full text-center"
                    >
                      Register your account
                    </Link>
                    <p className="py-1 text-center">OR</p>
                    <Link
                      href={"/signin"}
                      className="py-2 px-3 block bg-neutral-light rounded-full text-neutral-dark text-xl w-full text-center"
                    >
                      Login to your account
                    </Link>
                  </div>
                ) : (
                  <Profile
                    user={{
                      name: "David",
                      phone: "123456789",
                      avatarUrl: "/profile.png",
                    }}
                  />
                )}
              </div>
            )}
          </div>
          {/* Cart */}
          <div className="p-2 rounded-full cursor-pointer border border-neutral-dark">
            <RiShoppingCartLine className="text-2xl text-neutral-dark font-bold" />
          </div>
        </div>
        {/* Mobile right-hand side */}
        <div className="lg:hidden">
          <CiSearch className="text-2xl text-neutral-dark font-bold" />
        </div>
      </div>
    </div>
  );
}
