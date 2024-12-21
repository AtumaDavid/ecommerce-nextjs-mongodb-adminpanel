"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaHeart, FaShoppingBag, FaStar } from "react-icons/fa";
import ProductCard from "@/components/Product/ProductCard";
import ProductDetails from "@/components/Product/ProductDetails";
import { useParams } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import { useToast } from "@/context/ToastContext";
// import Variations from "@/components/Dashboard/Products/ViewProductsDetails/information/Variation";
import useCartStore from "@/store/cartStore";

export interface ProductDetail {
  _id?: string;
  name: string;
  slug: string;
  images: string[];
  sellingPrice: string;
  originalPrice?: string;
  price?: string;
  description?: string;
  offer?: {
    discountPercentage?: number;
    startDate?: Date;
    endDate?: Date;
  };
  shippingReturn?: {
    returnPolicy?: string;
    shippingType?: string;
  };
  variations?: Array<{
    _id?: string;
    color?: string;
    size?: string;
    price?: number;
    quantityAvailable?: number;
  }>;
}
export default function ProductDetail() {
  const { showToast } = useToast();
  const params = useParams();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedVariation, setSelectedVariation] = useState<any>(null);
  const { addToCart, isLoading } = useCartStore();

  // Utility function to normalize strings (case-insensitive)
  const normalizeString = (str: string | undefined) =>
    str ? str.trim().toLowerCase() : "";

  const fetchedProduct = async () => {
    // await axiosInstance.get(`/products/${params?.slug}/byslug`).then((data) => {
    //   if (data?.data?.status) {
    //     setProduct(data?.data?.data);
    //   }
    // });
    try {
      const response = await axiosInstance.get(
        `/products/${params?.slug}/byslug`
      );
      if (response?.data?.status) {
        setProduct(response?.data?.data);
      }
    } catch (error) {
      showToast({
        type: "error",
        message: "Failed to fetch product details",
      });
    }
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

  const handleQuantityChange = (action: "increase" | "decrease") => {
    // if (action === "increase") {
    //   setQuantity((prev) => Math.min(prev + 1, 10));
    // } else {
    //   setQuantity((prev) => Math.max(prev - 1, 1));
    // }

    // If a specific variation is selected, use its quantity
    const maxQuantity = selectedVariation
      ? selectedVariation.quantityAvailable
      : 10; // Default max if no variation selected

    if (action === "increase") {
      setQuantity((prev) => Math.min(prev + 1, maxQuantity));
    } else {
      setQuantity((prev) => Math.max(prev - 1, 1));
    }
  };

  // When color or size changes, find the corresponding variation
  useEffect(() => {
    if (selectedColor && selectedSize) {
      const variation = product?.variations?.find(
        (v) =>
          normalizeString(v.color) === normalizeString(selectedColor) &&
          v.size === selectedSize
      );

      setSelectedVariation(variation);

      // Reset quantity if new variation has less available stock
      if (selectedVariation && quantity > selectedVariation.quantityAvailable) {
        setQuantity(selectedVariation.quantityAvailable);
      }
    } else {
      setSelectedVariation(null);
    }
  }, [selectedColor, selectedSize, product]);

  // Extract unique colors (case-insensitive)
  const uniqueColors = Array.from(
    new Set(
      product?.variations
        ?.map((item) => normalizeString(item?.color))
        .filter(Boolean)
    )
  );

  // ADD TO WISHLIST
  const addToWishList = async () => {
    // Prevent adding if no product is selected
    if (!product?._id) {
      showToast({
        type: "error",
        message: "No product selected",
      });
      return;
    }

    try {
      //  setIsAdding(true); // Add a loading state
      const response = await axiosInstance.post("/wishlist", {
        product: product._id,
      });

      // Check the response status explicitly
      if (response.data.status) {
        showToast({
          type: "success",
          message: "Product added to wishlist successfully",
        });
      } else {
        showToast({
          type: "error",
          message: response.data.msg || "Failed to add product to wishlist",
        });
      }
    } catch (error: any) {
      console.error("Wishlist Error:", error);

      // Handle different types of errors
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        showToast({
          type: "error",
          message:
            error.response.data.msg || "Failed to add product to wishlist",
        });
      } else if (error.request) {
        // The request was made but no response was received
        showToast({
          type: "error",
          message: "No response received. Check your network connection.",
        });
      } else {
        // Something happened in setting up the request that triggered an Error
        showToast({
          type: "error",
          message: "An unexpected error occurred",
        });
      }
    } finally {
      //  setIsAdding(false); // Always reset loading state
    }
  };

  // Price display logic
  const getDisplayPrice = () => {
    // Check if product exists
    if (!product) return 0;

    // Use product's selling price
    const basePrice = parseFloat(product.sellingPrice?.replace("₦", "") || "0");

    // Apply offer if exists
    if (
      product.offer?.discountPercentage &&
      product.offer.discountPercentage > 0
    ) {
      return basePrice * (1 - product.offer.discountPercentage / 100);
    }

    return basePrice;
  };

  // Add to Cart Handler
  const handleAddToCart = async () => {
    if (!product?._id) {
      showToast({
        type: "error",
        message: "No product selected",
      });
      return;
    }

    // Validation for variations
    if (
      product?.variations &&
      product.variations.length > 0 &&
      (!selectedSize || !selectedColor)
    ) {
      showToast({
        type: "error",
        message: "Please select both size and color",
      });
      return;
    }

    try {
      await addToCart(product._id, quantity, selectedVariation?._id);

      showToast({
        type: "success",
        message: "Product added to cart successfully",
      });
    } catch (error) {
      showToast({
        type: "error",
        message: "Failed to add product to cart",
      });
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
                      ₦{product ? getDisplayPrice().toFixed(2) : "0.00"}
                    </p>
                    <span className="line-through text-gray-400">
                      ₦
                      {product
                        ? parseFloat(
                            product.sellingPrice?.replace("₦", "") || "0"
                          ).toFixed(2)
                        : "0.00"}
                    </span>
                    <span className="text-red-500">
                      {product?.offer?.discountPercentage}% OFF
                    </span>
                  </div>
                ) : (
                  <p className="mt-4 text-xl text-[#00CA4E]">
                    ₦{product ? getDisplayPrice().toFixed(2) : "0.00"}
                  </p>
                )}
              </div>
            </div>

            {/* Color Selection */}
            {uniqueColors.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-lg font-medium text-gray-900">
                  Color: {selectedColor}
                </h2>
                <div className="flex flex-wrap gap-3">
                  {uniqueColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => {
                        const originalColor = product?.variations?.find(
                          (item) => normalizeString(item?.color) === color
                        )?.color;

                        setSelectedColor(originalColor || color);
                        setSelectedSize(""); // Reset size when color changes
                      }}
                      className={`px-6 py-2 rounded-full text-sm ${
                        normalizeString(selectedColor) === color
                          ? "bg-primary text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                      } transition-all duration-200`}
                    >
                      {
                        product?.variations?.find(
                          (item) => normalizeString(item?.color) === color
                        )?.color
                      }
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection (only for selected color) */}
            {selectedColor && (
              <div className="space-y-4">
                <h2 className="text-lg font-medium text-gray-900">
                  Size: {selectedSize}
                </h2>
                <div className="flex flex-wrap gap-3">
                  {product?.variations
                    ?.filter(
                      (item) =>
                        normalizeString(item.color) ===
                          normalizeString(selectedColor) && item.size
                    )
                    .map((item) => (
                      <button
                        key={item?.size}
                        onClick={() => setSelectedSize(item?.size || "")}
                        className={`px-6 py-2 rounded-full text-sm ${
                          selectedSize === item?.size
                            ? "bg-primary text-white"
                            : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                        } transition-all duration-200`}
                      >
                        {item?.size}
                      </button>
                    ))}
                </div>
              </div>
            )}

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
                  {/* Available: (10) Pieces */}
                  Available:{" "}
                  {selectedVariation
                    ? `(${selectedVariation.quantityAvailable}) Pieces`
                    : "(10) Pieces"}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-1 gap-4">
                <button
                  // onClick={addToCart}
                  onClick={handleAddToCart}
                  className={`flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-medium ${
                    // If variations exist, require selection
                    product?.variations &&
                    product.variations.length > 0 &&
                    (!selectedSize || !selectedColor)
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-primary text-white hover:bg-primary/90"
                  } transition-all duration-200`}
                  disabled={
                    // Disable only if variations exist and size/color are not selected
                    product?.variations &&
                    product.variations.length > 0 &&
                    (!selectedSize || !selectedColor)
                  }
                >
                  <FaShoppingBag className="h-5 w-5" />
                  Add to Cart
                </button>

                {/* Conditional warning message */}
                {product?.variations &&
                  product.variations.length > 0 &&
                  (!selectedSize || !selectedColor) && (
                    <div className="text-red-500 text-sm mt-2 text-center">
                      Please select{" "}
                      {!selectedSize && !selectedColor
                        ? "both size and color"
                        : !selectedSize
                        ? "size"
                        : "color"}{" "}
                      before adding to cart
                    </div>
                  )}

                <button
                  onClick={addToWishList}
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-medium border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all duration-200"
                >
                  <FaHeart className="h-5 w-5" />
                  Favorite
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <ProductDetails data={product} />

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
