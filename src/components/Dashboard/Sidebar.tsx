import Link from "next/link";
import React, { useState } from "react";
import { FaBox, FaThLarge } from "react-icons/fa";

interface DashboardSidebarProps {
  openSidebar: boolean;
}
export default function Sidebar({ openSidebar }: DashboardSidebarProps) {
  const [activeLink, setActiveLink] = useState<string>("Dashboard");

  const sideBarSections = [
    {
      title: "Product & Stocks",
      items: [
        {
          icon: <FaBox />,
          label: "Products",
          link: "/dashboard/products",
        },
      ],
    },
  ];
  return (
    <div className="h-full bg-white shadow-md w-64">
      <div className="p-4 scroll h-[90vh] overflow-x-hidden overflow-y-scroll">
        <Link
          href={"/dashboard"}
          className={`${
            activeLink === "Dashboard"
              ? "bg-primary text-white font-semibold"
              : ""
          } flex items-center space-x-2 p-2 rounded-md cursor-pointer`}
        >
          <FaThLarge />
          <span className={`${!openSidebar && "hidden"} md:inline`}>
            Dashboard
          </span>
        </Link>
        {sideBarSections?.map((item, index) => (
          <div className="mt-4" key={index}>
            <h2 className="text-xs text-gray-500 font-semibold">
              {item?.title}
            </h2>
            <div className="mt-2">
              {item?.items?.map((item, index) => (
                <Link
                  href={item.link}
                  key={index}
                  className={`${
                    activeLink === item.label
                      ? "bg-primary text-white font-semibold"
                      : ""
                  } flex items-center space-x-2 p-2 rounded-md cursor-pointer`}
                  onClick={() => setActiveLink(item?.label)}
                >
                  {item.icon}
                  <span className="md:inline">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
