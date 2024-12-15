"use client";
import { useToast } from "@/context/ToastContext";
import axiosInstance from "@/lib/axiosInstance";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaHeart, FaStar } from "react-icons/fa";

interface Product {
  _id?: string;
  product?: {
    _id?: string;
    images: string[];
    name: string;
    slug: string;
    sellingPrice?: string | number;
    originalPrice?: string | number;
    price?: string | number;
    offer?: {
      discountPercentage?: number;
    };
  };
  images?: string[];
  name?: string;
  slug?: string;
  sellingPrice?: string | number;
  originalPrice?: string | number;
  price?: string | number;
  offer?: {
    discountPercentage?: number;
  };
}

interface ProductCardProps {
  data: Product[];
  isWishListed?: boolean;
  onWishlistUpdate?: () => void;
}

// Helper function to calculate discounted price
function calculateDiscountedPrice(
  originalPrice: string | number,
  discountPercentage: number
): string {
  const price =
    typeof originalPrice === "string"
      ? parseFloat(originalPrice)
      : originalPrice;
  const discount = price * (discountPercentage / 100);
  return (price - discount).toFixed(2);
}

export default function ProductCard({
  data,
  onWishlistUpdate,
}: ProductCardProps) {
  const { showToast } = useToast();
  const [wishlistedItems, setWishlistedItems] = useState<string[]>([]);

  // Add this useEffect to initialize wishlist items
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axiosInstance.get("/wishlist");
        if (response.data.status) {
          // Assuming response.data.data is an array of wishlist items

          const wishlistProductIds = response.data.data.map(
            (item: { product: { _id: string } }) => item.product._id
          );

          setWishlistedItems(wishlistProductIds);
        }
      } catch (error) {
        console.error("Failed to fetch wishlist", error);
      }
    };

    fetchWishlist();
  }, []);

  const addToWishList = async (productId: string) => {
    try {
      const response = await axiosInstance.post("/wishlist", {
        product: productId,
      });

      if (response.data.status) {
        showToast({
          type: "success",
          message: "Product added to wishlist successfully",
        });
        // Add the product ID to wishlistedItems
        setWishlistedItems((prev) => [...prev, productId]);
      } else {
        showToast({
          type: "error",
          message: response.data.msg || "Failed to add product to wishlist",
        });
      }
    } catch (error) {
      console.error("Wishlist Error:", error);
      showToast({
        type: "error",
        message: "An unexpected error occurred",
      });
      // // Handle different types of errors
      // if (error.response) {
      //   showToast({
      //     type: "error",
      //     message:
      //       error.response.data.msg || "Failed to add product to wishlist",
      //   });
      // } else if (error.request) {
      //   showToast({
      //     type: "error",
      //     message: "No response received. Check your network connection.",
      //   });
      // } else {
      //   showToast({
      //     type: "error",
      //     message: "An unexpected error occurred",
      //   });
      // }
    }
  };

  const removeFromWishList = async (productId: string) => {
    try {
      const response = await axiosInstance.delete(`/wishlist/${productId}`);

      if (response?.data?.status) {
        showToast({
          type: "success",
          message: "Product removed from wishlist successfully",
        });

        // Remove the product ID from wishlistedItems
        setWishlistedItems((prev) => prev.filter((id) => id !== productId));

        onWishlistUpdate?.();
      } else {
        showToast({
          type: "error",
          message:
            response.data.msg || "Failed to remove product from wishlist",
        });
      }
    } catch (error) {
      console.error("Remove Wishlist Error:", error);
      showToast({
        type: "error",
        message: "An unexpected error occurred",
      });

      // // Handle different types of errors
      // if (error.response) {
      //   showToast({
      //     type: "error",
      //     message:
      //       error.response.data.msg || "Failed to remove product from wishlist",
      //   });
      // } else if (error.request) {
      //   showToast({
      //     type: "error",
      //     message: "No response received. Check your network connection.",
      //   });
      // } else {
      //   showToast({
      //     type: "error",
      //     message: "An unexpected error occurred",
      //   });
      // }
    }
  };

  // Add this useEffect to initialize wishlist items
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axiosInstance.get("/wishlist");
        if (response.data.status) {
          // Assuming response.data.data is an array of wishlist items
          const wishlistProductIds = response.data.data.map(
            (item: { product: { _id: string } }) => item.product._id
          );
          setWishlistedItems(wishlistProductIds);
        }
      } catch (error) {
        console.error("Failed to fetch wishlist", error);
      }
    };

    fetchWishlist();
  }, []);

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {data?.map((item, index) => {
        // Extract the actual product object from the wishlist item
        const product = item.product || item;

        // Determine if there's an offer
        const hasOffer =
          product.offer?.discountPercentage &&
          product.offer.discountPercentage > 0;

        // Determine prices
        const originalPrice = product.sellingPrice || product.originalPrice;
        const discountedPrice = hasOffer
          ? product.price ||
            calculateDiscountedPrice(
              originalPrice as string,
              product.offer?.discountPercentage || 0
            )
          : originalPrice;

        return (
          <Link
            key={index}
            href={`/products/${product.slug}`}
            className="bg-white rounded-lg shadow-md p-2"
          >
            <div className="w-full">
              <div className="relative">
                {hasOffer && (
                  <span className="absolute top-3 left-3 z-10 bg-neutral-dark text-white text-xs font-bold px-2 py-1 rounded-full">
                    Flash Sale! {""}
                    {product?.offer?.discountPercentage}% OFF
                  </span>
                )}

                <button
                  onClick={(e) => {
                    e.preventDefault(); // Prevent link navigation

                    // Check if the product is already in wishlist
                    const isWishlisted = wishlistedItems.includes(
                      product._id || ""
                    );

                    if (isWishlisted) {
                      removeFromWishList(product._id || "");
                    } else {
                      addToWishList(product._id || "");
                    }
                  }}
                  className="absolute top-4 right-4 z-10"
                >
                  <FaHeart
                    size={34}
                    color={
                      wishlistedItems.includes(product._id || "")
                        ? "#ff4800"
                        : "text-gray-300"
                    }
                    className="bg-white p-[10px] rounded-full"
                  />
                </button>
                <div className="overflow-hidden">
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="rounded-xl w-full h-56 object-cover transform scale-100 hover:scale-105 transition duration-500 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold">{product?.name}</h2>
                <div className="my-2 flex items-center">
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                </div>
                <div className="flex items-center gap-3">
                  {hasOffer ? (
                    <>
                      <span className="text-2xl font-bold text-black">
                        ₦{discountedPrice}
                      </span>
                      <span className="text-red-500 line-through">
                        ₦{originalPrice}
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-black">
                      ₦{originalPrice}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
