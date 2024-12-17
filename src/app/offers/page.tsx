"use client";
import ProductCard from "@/components/Product/ProductCard";
import axiosInstance from "@/lib/axiosInstance";
import React, { Suspense, useEffect, useState } from "react";

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

export default function Offers() {
  const [flashSaleProducts, setFlashSaleProducts] = useState<Product[]>([]);

  const calculateDiscountedPrice = (
    originalPrice: string,
    discountPercentage: number
  ) => {
    const price = parseFloat(originalPrice);
    const discount = price * (discountPercentage / 100);
    return (price - discount).toFixed(2);
  };

  const processFlashSaleProducts = (products: Product[]): Product[] => {
    return products.map((product: Product) => ({
      ...product,
      originalPrice: product.sellingPrice, // The base selling price becomes the original price
      price: calculateDiscountedPrice(
        product.sellingPrice,
        product.offer?.discountPercentage || 0
      ),
    }));
  };

  const fetchFlashSaleProducts = async () => {
    await axiosInstance.get("/products/flash-sales").then((data) => {
      if (data?.data?.status) {
        // setFlashSaleProducts(data?.data?.data);
        const processedProducts = processFlashSaleProducts(data?.data?.data);
        setFlashSaleProducts(processedProducts);
      }
      // console.log(data?.data);
    });
  };
  useEffect(() => {
    fetchFlashSaleProducts();
  }, []);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="xl:container px-2 xl:px-4 py-12 mx-auto mb-2">
        <div className="flex mt-5">
          <h1 className="text-4xl font-bold mb-0">Offer Products</h1>
          <span className="text-xl ms-2">
            ({flashSaleProducts.length} product(s) found)
          </span>
        </div>
        <div className="mt-5">
          <ProductCard isWishListed={false} data={flashSaleProducts} />
        </div>
      </div>
    </Suspense>
  );
}
