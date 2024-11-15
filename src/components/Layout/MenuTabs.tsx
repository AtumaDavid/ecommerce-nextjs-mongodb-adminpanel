// import Image from "next/image";
// import Link from "next/link";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import React, { useState } from "react";

// // interface MenuTabsProps {
// //   onNavigate?: () => void;
// // }

// type TabName = "Men" | "Women" | "Juniors";
// type TabData = {
//   [key in TabName]: {
//     clothing: string[];
//     shoes: string[];
//     accessories: string[];
//     image: string;
//   };
// };

// /**
//  * Helper function to convert URL tab parameter into a valid TabName
//  * @param tabParam - The raw tab parameter from the URL
//  * @returns A valid TabName ("Men", "Women", or "Juniors")
//  *
//  * Examples:
//  * - getTabName("men") => "Men"
//  * - getTabName("WOMEN") => "Women"
//  * - getTabName(null) => "Men" (default)
//  * - getTabName("invalid") => "Men" (fallback)
//  */
// const getTabName = (tabParam: string | null): TabName => {
//   if (!tabParam) return "Men"; //Default tab if none is specified

//   // capitalize first letter and lowercase the rest
//   const formattedTab =
//     tabParam.charAt(0).toUpperCase() + tabParam.slice(1).toLowerCase();

//   // Check if its a valid tab name
//   if (
//     formattedTab === "Men" ||
//     formattedTab === "Women" ||
//     formattedTab === "Juniors"
//   ) {
//     return formattedTab as TabName;
//   }
//   return "Men"; //Fallback to default if invalid
// };

// /**
//  * Helper function to create URLs with proper parameters
//  * @param category - The category to link to
//  * @param currentTab - The current active tab
//  * @returns Formatted URL string with encoded parameters
//  *
//  * Example: formatCategoryUrl("Hoodies & Sweatshirts", "Men")
//  * Returns: "/products?category=hoodies%20%26%20sweatshirts&tab=men"
//  */
// const formatCategoryUrl = (category: string, currentTab: string) => {
//   const searchParams = new URLSearchParams();
//   searchParams.set("category", category.toLowerCase());
//   searchParams.set("tab", currentTab.toLowerCase());
//   return `/products?${searchParams.toString()}`;
// };

// const tabData: TabData = {
//   Men: {
//     image: "/men-cover.png",
//     clothing: [
//       "Hoodies & Sweatshirts",
//       "Jackets & Vests",
//       "Pants & Tights",
//       "Shorts",
//       "Tops & T-shirts",
//     ],
//     shoes: ["Basket Ball", "Running", "Sandals & Slides", "Sneakers", "Soccer"],
//     accessories: ["Bags & Backpacks", "Hat & Beanies", "Socks", "Underwear"],
//   },
//   Women: {
//     image: "/women-cover.png",
//     clothing: [
//       "Dresses & Skirts",
//       "Hoodies & Sweatshirts",
//       "Pants",
//       "Tights & Leggings",
//       "Tops & T-shirts",
//     ],
//     shoes: ["Running", "Sneakers", "Training & Gym"],
//     accessories: ["Bags & Backpacks", "Hats", "Socks"],
//   },
//   Juniors: {
//     image: "/juniors-cover.png",
//     clothing: ["Hoodies & Sweatshirts", "Shorts", "Tops & T-shirts"],
//     shoes: ["Basket Ball", "Running", "Sneakers"],
//     accessories: ["Bags & Backpacks", "Hats"],
//   },
// };

// export const MenuTabs = () => {
//   //   const [activeTab, setActiveTab] = useState<TabName>("Men");
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   //   get active tab from URL parameters, with default to "Men"
//   const activeTab = getTabName(searchParams.get("tab"));

//   //   //   handle both tab updates and navigation
//   //   const handleNavigation = (url: string) => {
//   //     router.push(url);
//   //     if (onNavigate) {
//   //       onNavigate();
//   //     }
//   //   };

//   /**
//    * Updates the URL when a new tab is selected
//    * Preserves other URL parameters while updating the tab parameter
//    * @param newTab - The tab to switch to
//    */
//   const updateTab = (newTab: TabName) => {
//     // Create new URLSearchParams instance with current parameters
//     const current = new URLSearchParams(Array.from(searchParams.entries()));
//     // update tab parameter
//     current.set("tab", newTab.toLowerCase());

//     // create the new URL with updated parameters
//     const search = current.toString();
//     const query = search ? `?${search}` : "";
//     // Navigate to the URL
//     router.push(`${pathname}${query}`);
//     // handleNavigation(`${pathname}${query}`);
//   };

//   const renderContent = () => {
//     const data = tabData[activeTab];
//     return (
//       <div className="flex justify-between py-3 w-full">
//         <div className="flex justify-between space-x-8 p-4 w-full">
//           {/* LEFT SIDE - IMAGE */}
//           <div className="w-1/2">
//             {/* <img src={data?.image} alt="category" className="rounded-lg w-full object-cover h-[300px]" /> */}
//             <Image
//               src={data?.image}
//               alt="category"
//               className="rounded-lg object-cover"
//               height={300}
//               width={200}
//             />
//           </div>

//           {/* Right side - Three columns of links */}
//           <div className="flex justify-between space-x-8 w-full">
//             {/* shoes */}
//             <div className="w-1/3">
//               <h2 className="font-bold mb-4">Shoes</h2>
//               <ul className="space-y-2">
//                 {data?.shoes?.map((item) => {
//                   return (
//                     <li key={item} className="hover:underline">
//                       {/* <Link href={`/products?category=${item?.toLowerCase()}`}>
//                         {item}
//                       </Link> */}
//                       <Link href={formatCategoryUrl(item, activeTab)}>
//                         {item}
//                       </Link>
//                     </li>
//                   );
//                 })}
//               </ul>
//             </div>
//             {/* clothing */}
//             <div className="w-1/3">
//               <h2 className="font-bold mb-4">Clothing</h2>
//               <ul className="space-y-2">
//                 {data?.clothing?.map((item) => {
//                   return (
//                     <li key={item} className="hover:underline">
//                       <Link href={`/products?category=${item?.toLowerCase()}`}>
//                         {item}
//                       </Link>
//                       {/* <Link href={formatCategoryUrl(item, activeTab)}>
//                         {item}
//                       </Link> */}
//                     </li>
//                   );
//                 })}
//               </ul>
//             </div>
//             {/* accessories */}
//             <div className="w-1/3">
//               <h2 className="font-bold mb-4">Shoes</h2>
//               <ul className="space-y-2">
//                 {data?.accessories?.map((item) => {
//                   return (
//                     <li key={item} className="hover:underline">
//                       {/* <Link href={`/products?category=${item?.toLowerCase()}`}>
//                         {item}
//                       </Link> */}
//                       <Link href={formatCategoryUrl(item, activeTab)}>
//                         {item}
//                       </Link>
//                     </li>
//                   );
//                 })}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };
//   return (
//     <div className="w-full">
//       <nav className="justify-center space-x-8 py-4 border-b flex">
//         {(["Men", "Women", "Juniors"] as TabName[]).map((tab) => {
//           return (
//             <button
//               key={tab}
//               //   onClick={() => setActiveTab(tab)}
//               onClick={() => updateTab(tab)}
//               className={`text-black ${
//                 activeTab === tab
//                   ? "text-primary border-b-2 border-primary"
//                   : ""
//               }`}
//             >
//               {tab}
//             </button>
//           );
//         })}
//       </nav>
//       {renderContent()}
//     </div>
//   );
// };

import { CategoriesData } from "@/app/data/categories";
import { formatProductUrl } from "@/utils/urlFormatter";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import React from "react";

// type TabName = "Men" | "Women" | "Juniors";

type TabName = keyof typeof CategoriesData;
// const tabData = {
//   Men: {
//     image: "/men-cover.png",
//     clothing: [
//       "Hoodies & Sweatshirts",
//       "Jackets & Vests",
//       "Pants & Tights",
//       "Shorts",
//       "Tops & T-shirts",
//     ],
//     shoes: ["Basket Ball", "Running", "Sandals & Slides", "Sneakers", "Soccer"],
//     accessories: ["Bags & Backpacks", "Hats & Beanies", "Socks", "Underwear"],
//   },
//   Women: {
//     image: "/women-cover.png",
//     clothing: [
//       "Dresses & Skirts",
//       "Hoodies & Sweatshirts",
//       "Pants",
//       "Tights & Leggings",
//       "Tops & T-shirts",
//     ],
//     shoes: ["Running", "Sneakers", "Training & Gym"],
//     accessories: ["Bags & Backpacks", "Hats", "Socks"],
//   },
//   Juniors: {
//     image: "/juniors-cover.png",
//     clothing: ["Hoodies & Sweatshirts", "Shorts", "Tops & T-shirts"],
//     shoes: ["Basket Ball", "Running", "Sneakers"],
//     accessories: ["Bags & Backpacks", "Hats"],
//   },
// } as const;

const getTabName = (tab: string | null): TabName => {
  const formatted =
    (tab ?? "Men").charAt(0).toUpperCase() +
    (tab ?? "Men").slice(1).toLowerCase();
  return formatted === "Men" || formatted === "Women" || formatted === "Juniors"
    ? (formatted as TabName)
    : "Men";
};

// const formatCategoryUrl = (
//   category: string,
//   subcategory: string,
//   tab: TabName
// ) => {
//   return `/products?category=${encodeURIComponent(
//     category.toLowerCase()
//   )}&subcategory=${subcategory}&gender=${tab.toLowerCase()}`;
// };

export const MenuTabs = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab = getTabName(searchParams.get("gender"));

  const updateTab = (tab: TabName) => {
    router.push(`${pathname}?gender=${tab.toLowerCase()}`);
  };

  const renderCategoryLinks = (
    title: string,
    items: string[],
    tab: TabName
  ) => (
    <div className="w-1/3">
      <h2 className="font-bold mb-4">{title}</h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="hover:underline">
            {/* <Link href={formatCategoryUrl(title, item, tab)}>{item}</Link> */}
            <Link
              href={formatProductUrl({
                category: title,
                subcategory: item,
                gender: tab,
              })}
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="w-full">
      <nav className="flex justify-center space-x-8 py-4 border-b">
        {(["Men", "Women", "Juniors"] as TabName[]).map((tab) => (
          <button
            key={tab}
            onClick={() => updateTab(tab)}
            className={`text-black ${
              activeTab === tab ? "text-primary border-b-2 border-primary" : ""
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>
      <div className="flex p-3 w-full ">
        <div className="w-1/4 flex ">
          <Image
            src={CategoriesData[activeTab].image}
            alt={`${activeTab} category`}
            className="rounded-lg object-cover"
            height={300}
            width={200}
          />
        </div>
        <div className="flex w-full px-5 space-x-8  ">
          {renderCategoryLinks(
            "Shoes",
            Array.from(CategoriesData[activeTab].shoes),
            activeTab
          )}
          {renderCategoryLinks(
            "Clothing",
            Array.from(CategoriesData[activeTab].clothing),
            activeTab
          )}

          {renderCategoryLinks(
            "Accessories",
            Array.from(CategoriesData[activeTab].accessories),
            activeTab
          )}
        </div>
      </div>
    </div>
  );
};
