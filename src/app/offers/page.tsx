import ProductCard from "@/components/Product/ProductCard";
import React from "react";

export default function Offers() {
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
    <div className="xl:container px-2 xl:px-4 py-12 mx-auto mb-2">
      <div className="flex mt-5">
        <h1 className="text-4xl font-bold mb-0">Offer Products</h1>
        <span className="text-xl ms-2">(40 products found)</span>
      </div>
      <div className="mt-5">
        <ProductCard isWishListed={false} data={products} />
      </div>
    </div>
  );
}
