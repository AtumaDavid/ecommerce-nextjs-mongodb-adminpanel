// src/components/CategoryCarousel.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CategoriesData } from "@/app/data/categories";
import { formatProductUrl } from "@/utils/urlFormatter";

export default function CategoryCarousel() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-8 sm:my-12 text-center ">
      <h3 className="text-3xl sm:text-4xl font-semibold mb-8">
        Browse Categories
      </h3>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
        {Object.values(CategoriesData).map((category) => (
          <div
            key={category.name}
            className="text-left shadow-lg rounded-lg overflow-hidden hover:border border-primary"
          >
            <Image
              src={category.image}
              alt={category.name}
              width={250}
              height={150}
              className="w-full lg:h-80 h-52 object-contain"
            />
            <div className="p-4">
              <Link
                href={formatProductUrl({ gender: category.name })}
                className="text-2xl font-bold p-2 text-gray-800 hover:text-primary flex justify-center"
              >
                {category.name}
              </Link>
              <div className="space-y-2 mt-3">
                {["clothing", "shoes", "accessories"].map((subCategory) => (
                  <div key={subCategory} className="mb-4">
                    <h5 className="text-lg font-semibold text-gray-700 mb-2 capitalize block border-b">
                      {subCategory}
                    </h5>
                    <ul className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                      {(
                        category[
                          subCategory as keyof typeof category
                        ] as readonly string[]
                      ).map((item) => (
                        <li key={item} className="hover:underline">
                          <Link
                            href={formatProductUrl({
                              category: category.name,
                              subcategory: item,
                              gender: category.name,
                            })}
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
