import ProductCard from "@/components/Product/ProductCard";
import ProductFilter from "@/components/Product/ProductFilter";
import React, { Suspense } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

export default function Products() {
  const products = [
    {
      title: "Product title",
      image: "/men-cover.png",
      price: "#50",
      originalPrice: "#70",
    },
    {
      title: "Product title",
      image: "/men-cover.png",
      price: "#50",
      originalPrice: "#70",
    },
    {
      title: "Product title",
      image: "/men-cover.png",
      price: "#50",
      originalPrice: "#70",
    },
    {
      title: "Product title",
      image: "/men-cover.png",
      price: "#50",
      originalPrice: "#70",
    },
    {
      title: "Product title",
      image: "/men-cover.png",
      price: "#50",
      originalPrice: "#70",
    },
  ];
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="xl:container mx-auto px-2 xl:px-4 py-12">
        <div className="flex items-center space-x-3">
          <p>Home</p> <MdOutlineKeyboardArrowRight /> <p>Products</p>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <h1 className="text-4xl font-bold mb-0">Explore All Products</h1>
          <span>(40 Products found)</span>
        </div>
        <div className="mt-8">
          <div className="flex space-x-3">
            <div className="w-1/4">
              <ProductFilter />
            </div>
            <div className="w-full">
              <ProductCard isWishListed={false} data={products} />
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
