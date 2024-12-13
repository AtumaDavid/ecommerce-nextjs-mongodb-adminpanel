"use client";
import { ProductDetail } from "@/app/products/[slug]/page";
import React, { useState } from "react";

interface ProductDetailsProps {
  data: ProductDetail | null | undefined;
}

export default function ProductDetails({ data }: ProductDetailsProps) {
  const [activeTab, setActiveTab] = useState("details");

  // Tab content components
  const TabContent = () => {
    switch (activeTab) {
      case "details":
        return (
          <div className="mt-8  max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Product Details
            </h2>
            <div>
              {data?.description
                ? data.description
                : "No description available "}
            </div>
          </div>
        );
      case "videos":
        return (
          <div className="mt-8 prose prose-sm max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Product Videos
            </h2>
            <p>
              Check out our product videos showcasing the features and styling
              options.
            </p>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                Video placeholder 1
              </div>
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                Video placeholder 2
              </div>
            </div>
          </div>
        );
      case "reviews":
        return (
          <div className="mt-8 prose prose-sm max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Customer Reviews
            </h2>
            <div className="space-y-6">
              <div className="border-b pb-4">
                <div className="flex items-center mb-2">
                  <span className="text-yellow-400">★★★★★</span>
                  <span className="ml-2 text-gray-600">John D.</span>
                </div>
                <p>Great product! Very comfortable and fits perfectly.</p>
              </div>
              <div className="border-b pb-4">
                <div className="flex items-center mb-2">
                  <span className="text-yellow-400">★★★★☆</span>
                  <span className="ml-2 text-gray-600">Sarah M.</span>
                </div>
                <p>Nice quality, but runs a bit large.</p>
              </div>
            </div>
          </div>
        );
      case "shipping":
        return (
          <div className="mt-8 prose prose-sm max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Shipping & Returns
            </h2>
            {/* <div className="space-y-6">{data?.shippingReturn.shippingType}</div> */}
            {/* <div className="space-y-6">{data?.shippingReturn.shippingCost}</div> */}
            {/* <div className="space-y-6">
              {data?.shippingReturn.isProductQuantity}
            </div> */}
            <div className="space-y-6">
              {data?.shippingReturn?.returnPolicy ? (
                <p>{data.shippingReturn.returnPolicy}</p>
              ) : (
                <p>No return policy information available.</p>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mt-16 border-t border-gray-200 pt-10 border rounded-xl p-8">
      <div className="flex overflow-x-auto space-x-8 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("details")}
          className={`px-1 py-4 text-sm font-medium transition-colors duration-200 ${
            activeTab === "details"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Details
        </button>
        <button
          onClick={() => setActiveTab("videos")}
          className={`px-1 py-4 text-sm font-medium transition-colors duration-200 ${
            activeTab === "videos"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Videos
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`px-1 py-4 text-sm font-medium transition-colors duration-200 ${
            activeTab === "reviews"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Reviews
        </button>
        <button
          onClick={() => setActiveTab("shipping")}
          className={`px-1 py-4 text-sm font-medium transition-colors duration-200 ${
            activeTab === "shipping"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Shipping & Return
        </button>
      </div>

      <TabContent />
    </div>
  );
}
