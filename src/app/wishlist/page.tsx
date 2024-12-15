"use client";

import ProductCard from "@/components/Product/ProductCard";
import axiosInstance from "@/lib/axiosInstance";
import React, { useEffect, useState } from "react";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get("/wishlist");
      if (response?.data?.status) {
        setWishlist(response?.data?.data || []);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  // Render when no products are found
  const NoProductsFound = () => (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-24 w-24 text-gray-300 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      <h2 className="text-2xl font-semibold text-gray-600 mb-2">
        Your Wishlist is Empty
      </h2>
      <p className="text-gray-500 mb-6">
        Looks like you haven&apos;t added any items to your wishlist yet.
      </p>
      <button
        className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors"
        onClick={() => {
          // Redirect to products page or perform any other action
          window.location.href = "/products";
        }}
      >
        Continue Shopping
      </button>
    </div>
  );

  // Callback to update wishlist after item removal
  const handleWishlistUpdate = () => {
    fetchWishlist();
  };

  return (
    <div className="xl:container px-2 xl:px-4 py-12 mx-auto mb-2">
      <div className="flex mt-5">
        <h1 className="text-4xl font-bold mb-0">Wish List</h1>
        <span className="text-xl ms-2">({wishlist.length} products found)</span>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
        </div>
      ) : wishlist.length === 0 ? (
        <NoProductsFound />
      ) : (
        <div className="mt-5">
          <ProductCard
            isWishListed={true}
            data={wishlist}
            onWishlistUpdate={handleWishlistUpdate}
          />
        </div>
      )}
    </div>
  );
}
