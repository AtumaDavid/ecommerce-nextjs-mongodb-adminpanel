"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { CiHeart, CiSearch, CiShoppingCart, CiUser } from "react-icons/ci";
import { IoIosArrowDropdown } from "react-icons/io";
import { MenuTabs } from "./MenuTabs";
import Image from "next/image";
import { Profile } from "./Profile";
import { FaCartShopping } from "react-icons/fa6";
import { RiShoppingCartLine } from "react-icons/ri";
import { FaBars } from "react-icons/fa";

export const Header = () => {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  //   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  //   // Toggle dropdown
  //   const toggleDropdown = () => {
  //     setIsDropdownOpen(!isDropdownOpen);
  //   };

  //   // Close dropdown when clicking outside
  //   const closeDropdown = () => {
  //     setIsDropdownOpen(false);
  //   };

  return (
    <div className="bg-white shadow-md sticky top-0 z-50">
      <div className="xl:container flex px-2 xl:px-4 items-center justify-between mx-auto">
        {/* left hand side */}
        <div className="flex items-center space-x-4 xl:space-x-8">
          {/* mobile */}
          <div className="lg:hidden">
            <FaBars className="text-2xl text-neutral-dark font-bold" />
          </div>
          <Link href={"/"} className="flex items-center space-x-3 py-4">
            <CiShoppingCart className="text-neutral-dark text-3xl" />
            <div className="font-bold">
              <span className="text-3xl font-bold text-neutral-dark">
                SHOPY
              </span>
            </div>
          </Link>
          {/* navbar labels */}
          <div className=" hidden lg:flex items-center space-x-4 xl:space-x-8 py-4">
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

        {/* second part- Right hand */}
        <div className="hidden lg:flex items-center space-x-3 xl:space-x-6">
          {/* search */}
          <div className="relative">
            <input
              type="text"
              placeholder="search"
              className="pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:outline-none"
            />
            <CiSearch className="text-2xl text-neutral-dark font-bold absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          {/* language */}
          <div className="relative group me-4 py-4">
            <div className="flex items-center space-x-2 cursor-pointer">
              <Image
                src={"/english.png"}
                alt="flag"
                className="h-5"
                width={20}
                height={5}
              />
              {/* <img src="" alt="flag" className="h-5" /> */}
              <span>English</span>
              <IoIosArrowDropdown className="text-xl ms-3" />
            </div>
            <div className="absolute top-14 left-[1px] w-48 p-3 bg-white border rounded shadow-lg hidden group-hover:block">
              <button className="flex items-center space-x-8 gap-3">
                <Image src={"/english.png"} alt="flag" width={20} height={5} />
                {/* <img src="" alt="flag" className="h-5" /> */}
                English
              </button>
            </div>
          </div>
          {/* wishlist */}
          <Link href={"/wishlist"}>
            <CiHeart className="text-2xl text-neutral-dark font-bold" />
          </Link>
          {/* user profile */}
          <div className="relative group me-4 py-4">
            <div className="flex items-center space-x-2 cursor-pointer">
              <CiUser className="text-2xl text-neutral-dark font-bold" />
            </div>
            <div className="absolute top-14 right-[-10px] w-64 p-3 bg-white rounded-md hidden shadow-md group-hover:block">
              {!isLoggedIn ? (
                <div className=" flex flex-col space-x-3 items-center justify-center py-3">
                  <Link
                    href={"/register"}
                    className=" py-2 px-3 block bg-neutral-dark rounded-full text-neutral-light text-xl w-full"
                  >
                    Register your account
                  </Link>
                  <p className="py-1 text-center">OR</p>
                  <Link
                    href={"/register"}
                    className="py-2 px-3 block bg-neutral-light rounded-full text-neutral-dark text-xl w-full"
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
          </div>
          {/* cart */}
          <div className=" p-2 rounded-full cursor-pointer border border-neutral-dark">
            <RiShoppingCartLine className="text-2xl text-neutral-dark font-bold" />
          </div>
        </div>
        {/* Mobile right hand */}
        <div className="lg:hidden">
          <CiSearch className="text-2xl text-neutral-dark font-bold" />
        </div>
      </div>
    </div>
  );
};

// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import React, { useState } from "react";
// import { CiShoppingCart } from "react-icons/ci";
// import { IoIosArrowDropdown } from "react-icons/io";
// import { MenuTabs } from "./MenuTabs";

// export const Header = () => {
//   const pathname = usePathname();
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   // Toggle dropdown
//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   // Close dropdown when clicking outside
//   const closeDropdown = () => {
//     setIsDropdownOpen(false);
//   };

//   return (
//     <header className="fixed top-0 w-full bg-white z-50">
//       <div className="flex items-center justify-between px-8 py-4 border-b">
//         {/* Left Section: Logo, Home, Categories */}
//         <div className="flex items-center space-x-8">
//           {/* Logo */}
//           <Link href="/" className="text-2xl font-bold">
//             SHOPY
//           </Link>

//           {/* Navigation */}
//           <nav className="flex items-center space-x-8">
//             <Link
//               href="/"
//               className={`${
//                 pathname === "/" ? "text-orange-500" : "text-black"
//               }`}
//             >
//               Home
//             </Link>

//             {/* Categories Dropdown */}
//             <div className="relative">
//               <button
//                 onClick={toggleDropdown}
//                 className="flex items-center space-x-1 focus:outline-none"
//               >
//                 <span
//                   className={`${
//                     pathname.startsWith("/products")
//                       ? "text-orange-500"
//                       : "text-black"
//                   }`}
//                 >
//                   Categories
//                 </span>
//                 <IoIosArrowDropdown
//                   className={`transition-transform ${
//                     isDropdownOpen ? "rotate-180" : ""
//                   }`}
//                 />
//               </button>

//               {/* Dropdown Content */}
//               {isDropdownOpen && (
//                 <>
//                   {/* Overlay to handle clicks outside */}
//                   <div className="fixed inset-0 z-40" onClick={closeDropdown} />

//                   {/* Dropdown Menu */}
//                   <div className="absolute left-0 w-screen bg-white shadow-lg z-50 border-t">
//                     <MenuTabs onNavigate={closeDropdown} />
//                   </div>
//                 </>
//               )}
//             </div>
//           </nav>
//         </div>

//         {/* Right Section: Cart Icon */}
//         <Link href="/cart" className="text-2xl">
//           <CiShoppingCart />
//         </Link>
//       </div>
//     </header>
//   );
// };
