import { CategoriesData } from "@/app/data/categories";
import { formatProductUrl } from "@/utils/urlFormatter";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

// Keep your helper functions and types outside the component
type TabName = keyof typeof CategoriesData;

const getTabName = (tab: string | null): TabName => {
  const formatted =
    (tab ?? "Men").charAt(0).toUpperCase() +
    (tab ?? "Men").slice(1).toLowerCase();
  return formatted === "Men" || formatted === "Women" || formatted === "Juniors"
    ? (formatted as TabName)
    : "Men";
};

// Create a separate component for the menu content
function MenuContent() {
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
}

// Main component wrapped with Suspense
export default function MenuTabs() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <MenuContent />
    </Suspense>
  );
}
