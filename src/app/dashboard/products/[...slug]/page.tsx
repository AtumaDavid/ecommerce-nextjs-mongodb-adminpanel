// "use client";
// import React, { useState, ReactNode } from "react";
// import {
//   FaInfoCircle,
//   FaImage,
//   FaThLarge,
//   FaEllipsisV,
//   FaGift,
//   FaVideo,
//   FaShippingFast,
//   FaGlobe,
// } from "react-icons/fa";

// // Define your own IconType
// type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

// // Type definitions
// type TabName =
//   | "Information"
//   | "Images"
//   | "Variation"
//   | "Offer"
//   | "Video"
//   | "Shipping & Return"
//   | "SEO";

// interface ProductDetail {
//   label: string;
//   value: string;
// }

// interface TabButtonProps {
//   tab: TabName;
//   icon: IconType;
//   activeTab: TabName;
//   onTabChange: (tab: TabName) => void;
//   children?: ReactNode; // Optional children prop
// }

// interface DropdownItemProps {
//   tab: TabName;
//   icon: IconType;
//   color: string;
// }

// const PRODUCT_DETAILS: ProductDetail[] = [
//   { label: "Name", value: "Snapback Hat" },
//   { label: "SKU", value: "558" },
//   { label: "Category", value: "Hats" },
//   { label: "Barcode", value: "EAN-5, EAN-20" },
//   { label: "Brand", value: "puma" },
//   { label: "Tax", value: "VAT-5, VAT-20" },
//   { label: "Buying Price", value: "80.00" },
//   { label: "Selling Price", value: "100.00" },
// ];

// const TabButton: React.FC<TabButtonProps> = ({
//   children,
//   tab,
//   icon: Icon,
//   activeTab,
//   onTabChange,
// }) => (
//   <button
//     onClick={() => onTabChange(tab)}
//     className={` flex items-center space-x-2 w-full px-4 py-2 rounded-lg transition-all duration-200
//       ${
//         activeTab === tab
//           ? "bg-red-500 text-white"
//           : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-100"
//       }
//     `}
//   >
//     <Icon className="w-5 h-5" />
//     <span className="hidden sm:inline">{tab}</span>
//     {children}
//   </button>
// );

// const DashboardProductDetails: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<TabName>("Information");
//   const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

//   const toggleDropdown = () => {
//     setIsDropdownOpen((prev) => !prev);
//   };

//   const renderContent = () => {
//     switch (activeTab) {
//       case "Information":
//         return (
//           <div className="mt-4 w-full">
//             <h2 className="text-gray-600 text-lg font-semibold">Information</h2>
//             <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
//               {PRODUCT_DETAILS.map(({ label, value }) => (
//                 <div key={label} className="bg-gray-50 p-3 rounded-lg">
//                   <p className="text-gray-700 font-medium">{label}</p>
//                   <p className="text-gray-500">{value}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         );
//       case "Images":
//       case "Variation":
//       case "Offer":
//       case "Video":
//       case "Shipping & Return":
//       case "SEO":
//         return (
//           <div className="mt-4 w-full">
//             <h2 className="text-gray-600 text-lg font-semibold">{activeTab}</h2>
//             <p className="text-gray-500">{activeTab} content goes here...</p>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   const DROPDOWN_ITEMS: DropdownItemProps[] = [
//     { tab: "Offer", icon: FaGift, color: "text-gray-500" },
//     { tab: "Video", icon: FaVideo, color: "text-gray-500" },
//     { tab: "Shipping & Return", icon: FaShippingFast, color: "text-gray-500" },
//     { tab: "SEO", icon: FaGlobe, color: "text-gray-500" },
//   ];

//   return (
//     <div className="p-4 mx-auto">
//       <div className="flex flex-row items-center gap-2 mb-4 w-full">
//         {[
//           { tab: "Information", icon: FaInfoCircle },
//           { tab: "Images", icon: FaImage },
//           { tab: "Variation", icon: FaThLarge },
//         ].map(({ tab, icon }) => (
//           <TabButton
//             key={tab}
//             tab={tab as TabName}
//             icon={icon}
//             activeTab={activeTab}
//             onTabChange={setActiveTab}
//           />
//         ))}

//         <div className="relative w-full">
//           <button
//             onClick={toggleDropdown}
//             className={`flex-1 flex items-center w-full space-x-2 px-4 py-2 rounded-lg transition-all duration-200
//         ${
//           isDropdownOpen ||
//           DROPDOWN_ITEMS.some((item) => item.tab === activeTab)
//             ? "bg-red-500 text-white"
//             : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-100"
//         }`}
//           >
//             <FaEllipsisV className="w-5 h-5" />
//             <span className="hidden sm:inline">More</span>
//           </button>

//           {isDropdownOpen && (
//             <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
//               {DROPDOWN_ITEMS.map(({ tab, icon: Icon, color }) => (
//                 <button
//                   key={tab}
//                   onClick={() => {
//                     setActiveTab(tab);
//                     setIsDropdownOpen(false);
//                   }}
//                   className={`w-full flex items-center space-x-3 p-2 transition-all duration-200
//                     ${
//                       activeTab === tab
//                         ? "bg-red-100 text-red-700 font-semibold"
//                         : "text-gray-700 hover:bg-gray-100"
//                     }
//                   `}
//                 >
//                   <Icon
//                     className={`w-5 h-5 ${
//                       activeTab === tab ? "text-red-500" : color
//                     }`}
//                   />
//                   <span>{tab}</span>
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {renderContent()}
//     </div>
//   );
// };

// export default DashboardProductDetails;

"use client";
import {
  DROPDOWN_ITEMS,
  PRIMARY_TABS,
} from "@/components/Dashboard/Products/ViewProductsDetails/Constants";
import TabButton from "@/components/Dashboard/Products/ViewProductsDetails/TabButton";
import TabContent from "@/components/Dashboard/Products/ViewProductsDetails/TabContent";
import { ProductTabName } from "@/components/Dashboard/Products/ViewProductsDetails/types";
import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";

const DashboardProductDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ProductTabName>("Information");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

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

      <TabContent activeTab={activeTab} />
    </div>
  );
};

export default DashboardProductDetails;
