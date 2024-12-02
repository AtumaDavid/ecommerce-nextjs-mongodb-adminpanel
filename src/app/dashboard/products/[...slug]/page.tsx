"use client";
import {
  DROPDOWN_ITEMS,
  PRIMARY_TABS,
} from "@/components/Dashboard/Products/ViewProductsDetails/Constants";
import TabButton from "@/components/Dashboard/Products/ViewProductsDetails/TabButton";
import TabContent from "@/components/Dashboard/Products/ViewProductsDetails/TabContent";
import { ProductTabName } from "@/components/Dashboard/Products/ViewProductsDetails/types";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";

const DashboardProductDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ProductTabName>("Information");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const params = useParams();
  // console.log(params);

  // // Use useEffect to log the ID when the component mounts
  // useEffect(() => {
  //   // The slug will be an array, so we'll join it in case of multiple segments
  //   const productId = params?.slug ? params.slug[1] : null;
  //   console.log("Product ID:", productId);
  // }, [params]);

  const productId = params?.slug ? params.slug[1] : null;
  // console.log(productId);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="p-4 mx-auto">
      <div className="flex flex-row items-center gap-2 mb-4 w-full">
        {PRIMARY_TABS.map(({ tab, icon }) => (
          <TabButton
            key={tab}
            tab={tab}
            icon={icon}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        ))}

        <div className="relative w-full">
          <button
            onClick={toggleDropdown}
            className={`flex-1 flex items-center w-full space-x-2 px-4 py-2 rounded-lg transition-all duration-200
              ${
                isDropdownOpen ||
                DROPDOWN_ITEMS.some((item) => item.tab === activeTab)
                  ? "bg-primary text-white"
                  : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-100"
              }`}
          >
            <FaEllipsisV className="w-5 h-5" />
            <span className="hidden sm:inline">More</span>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              {DROPDOWN_ITEMS.map(({ tab, icon: Icon, color }) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    // setIsDropdownOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 p-2 transition-all duration-200 
                    ${
                      activeTab === tab
                        ? "bg-neutral-light text-primary font-semibold"
                        : "text-gray-700 hover:bg-gray-100"
                    }
                  `}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      activeTab === tab ? "text-primary" : color
                    }`}
                  />
                  <span>{tab}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <TabContent activeTab={activeTab} productId={productId} />
    </div>
  );
};

export default DashboardProductDetails;
