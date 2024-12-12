"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaHeart, FaShoppingBag, FaStar } from "react-icons/fa";
import ProductCard from "@/components/Product/ProductCard";
import ProductDetails from "@/components/Product/ProductDetails";
import { useParams } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";

interface Product {
  id?: string;
  name: string;
  slug: string;
  images: string[];
  sellingPrice: string;
  originalPrice?: string;
  price?: string;
  offer?: {
    discountPercentage?: number;
  };
}
export default function ProductDetail() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const fetchedProduct = async () => {
    await axiosInstance.get(`/products/${params?.slug}/byslug`).then((data) => {
      if (data?.data?.status) {
        setProduct(data?.data?.data);
      }
    });
  };

  useEffect(() => {
    fetchedProduct();
  }, []);

  // When the product is fetched, set the first image as the selected image
  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

  // console.log(product);

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

  const images = [
    "/women-cover.png",
    "/men-cover.png",
    "/juniors-cover.png",
    "/auth.jpg",
  ];

  const colors = ["White", "Black", "Orange"];
  const sizes = ["S", "M", "L", "XL"];

  const handleQuantityChange = (action: "increase" | "decrease") => {
    if (action === "increase") {
      setQuantity((prev) => Math.min(prev + 1, 10));
    } else {
      setQuantity((prev) => Math.max(prev - 1, 1));
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link href="#" className="hover:text-gray-700">
            Gender
          </Link>
          <MdOutlineKeyboardArrowRight className="h-4 w-4" />
          <Link href="#" className="hover:text-gray-700">
            Category
          </Link>
          <MdOutlineKeyboardArrowRight className="h-4 w-4" />
          <Link href="#" className="hover:text-gray-700">
            Sub-Category
          </Link>
        </nav>

        {/* Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt="Product image"
                  className="h-full w-full object-cover object-center"
                  width={600}
                  height={600}
                />
              )}
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product?.images?.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`aspect-square rounded-lg bg-gray-100 overflow-hidden ${
                    selectedImage === image ? "ring-2 ring-primary" : ""
                  }`}
                >
                  <img
                    src={image}
                    alt={`Product ${index + 1}`}
                    className="h-full w-full object-cover object-center"
                    width={150}
                    height={150}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {product?.name}
              </h1>
              <div>
                {product?.offer?.discountPercentage ? (
                  <div className="flex items-center gap-3 mt-4">
                    <p className="text-xl text-[#00CA4E]">
                      {/* Calculate the discounted price */}
                      {product.sellingPrice && product.offer?.discountPercentage
                        ? `₦${(
                            parseFloat(product.sellingPrice.replace("₦", "")) *
                            (1 - product.offer.discountPercentage / 100)
                          ).toFixed(2)}`
                        : product.sellingPrice}
                    </p>
                    <p className="text-base text-gray-500 line-through">
                      ₦{product.sellingPrice}
                    </p>
                    <p className="text-base text-red-500 font-bold">
                      {product.offer.discountPercentage}% OFF
                    </p>
                  </div>
                ) : (
                  <p className="mt-4 text-xl text-[#00CA4E]">
                    {product?.sellingPrice}
                  </p>
                )}
                <span className="flex gap-2 mt-2">
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                </span>
              </div>
            </div>

            {/* Color Selection */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-gray-900">
                Color: {selectedColor}
              </h2>
              <div className="flex flex-wrap gap-3">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-6 py-2 rounded-full text-sm ${
                      selectedColor === color
                        ? "bg-primary text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                    } transition-all duration-200`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-gray-900">
                Size: {selectedSize}
              </h2>
              <div className="flex flex-wrap gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 flex items-center justify-center rounded-lg text-sm
                      ${
                        selectedSize === size
                          ? "bg-primary text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                      } transition-all duration-200`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-gray-900">Quantity</h2>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleQuantityChange("decrease")}
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="text-lg w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange("increase")}
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  Available: (10) Pieces
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 pt-4">
              {!selectedSize || !selectedColor ? (
                <p className="text-sm text-red-500">
                  Please select a color and size before adding to the cart.
                </p>
              ) : null}

              <div className="grid grid-cols-1 gap-4">
                <button
                  className={`flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-medium ${
                    !selectedSize || !selectedColor
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-primary text-white hover:bg-primary/90"
                  } transition-all duration-200`}
                  disabled={!selectedSize || !selectedColor}
                >
                  <FaShoppingBag className="h-5 w-5" />
                  Add to Cart
                </button>
                <button className="flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-medium border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all duration-200">
                  <FaHeart className="h-5 w-5" />
                  Favorite
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <ProductDetails />

        {/* RELATED PRODUCTS */}
        <div className="mt-8 prose prose-sm max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Related Products
          </h2>
          {/* <ProductCard isWishListed={false} data={products} /> */}
        </div>
      </div>
    </div>
  );
}
