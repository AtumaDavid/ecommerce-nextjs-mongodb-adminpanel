"use client";
import React, { useState } from "react";

export default function ProductDetails() {
  const [activeTab, setActiveTab] = useState("details");

  // Tab content components
  const TabContent = () => {
    switch (activeTab) {
      case "details":
        return (
          <div className="mt-8 prose prose-sm max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Product Details
            </h2>
            <p>
              The Classic French Terry Crew brings super-soft comfort to a style
              that&apos;s tried and true. It&apos;s a top you&apos;ll want to
              wear every day, and it&apos;s comfortable and durable enough that
              you can.
            </p>

            <div className="mt-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Soft Comfort
                </h3>
                <p className="mt-2">
                  French terry fabric is lightweight, soft, and comfortable.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Durable Style
                </h3>
                <p className="mt-2">
                  Reinforced shoulder seams and ribbing enhance durability.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Product Details
                </h3>
                <ul className="mt-2 list-disc pl-5 space-y-2">
                  <li>Ribbing at the hem and cuffs</li>
                  <li>Back neck tape</li>
                  <li>Fabric: 80% cotton 20% polyester</li>
                  <li>Machine wash</li>
                  <li>Imported</li>
                  <li>Color Shown: Black/White</li>
                  <li>Style: BV2666-010</li>
                </ul>
              </div>
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
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Shipping Policy
                </h3>
                <ul className="mt-2 list-disc pl-5 space-y-2">
                  <li>Free standard shipping on orders over $50</li>
                  <li>Express shipping available (2-3 business days)</li>
                  <li>International shipping available to select countries</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Return Policy
                </h3>
                <ul className="mt-2 list-disc pl-5 space-y-2">
                  <li>30-day return window for unworn items</li>
                  <li>Free returns on all U.S. orders</li>
                  <li>
                    Items must be in original packaging with tags attached
                  </li>
                </ul>
              </div>
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
