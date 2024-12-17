"use client";
// import Carousel from "@/components/Home/Carousel";
// import CategoryCarousel from "@/components/Home/CategoryCarousel";
// import PromotionCard from "@/components/Home/PromotionCard";
// import ProductCard from "@/components/Product/ProductCard";
import Carousel from "@/components/Home/Carousel";
import CategoryCarousel from "@/components/Home/CategoryCarousel";
import PromotionCard from "@/components/Home/PromotionCard";
import ProductCard from "@/components/Product/ProductCard";
import axiosInstance from "@/lib/axiosInstance";
import { Suspense, useEffect, useState } from "react";
import { FaHeadset, FaHeart, FaLock, FaShippingFast } from "react-icons/fa";

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
export default function Home() {
  const [flashSaleProducts, setFlashSaleProducts] = useState<Product[]>([]);
  const [latestProducts, setLatestProducts] = useState([]);

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

  const fetchLatestProducts = async () => {
    await axiosInstance.get("/products").then((data) => {
      if (data?.data?.status) {
        setLatestProducts(data?.data?.data);
        // console.log(data?.data?.data);
      }
    });
  };

  useEffect(() => {
    fetchLatestProducts();
  }, []);

  // console.log(flashSaleProducts);

  const services = [
    {
      icon: <FaHeadset size={30} className="text-center text-neutral-dark" />,
      title: "Professional Service",
      description: "Efficient customer support from passionate team",
    },
    {
      icon: <FaLock size={30} className="text-center text-neutral-dark" />,
      title: "Secure Payment",
      description: "Different secure payment methods",
    },
    {
      icon: (
        <FaShippingFast size={30} className="text-center text-neutral-dark" />
      ),
      title: "Fast Delivery",
      description: "Fast and convenient door to door delivery",
    },
    {
      icon: <FaHeart size={30} className="text-center text-neutral-dark" />,
      title: "Quality & Savings",
      description: "Comprehensive quality control and affordable prices",
    },
  ];
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="mb-8">
        <Carousel />
        <CategoryCarousel />
        <PromotionCard />
        <div className="xl:container px-2 xl:px-4 mt-10 mx-auto">
          <h2 className="text-3xl font-bold mb-4">Latest Products</h2>
          <ProductCard isWishListed={false} data={latestProducts.slice(0, 8)} />
        </div>
        <div className="xl:container px-2 xl:px-4 mt-10 mx-auto">
          <h2 className="text-3xl font-bold mb-4">Flash Sales</h2>
          <ProductCard
            isWishListed={false}
            data={flashSaleProducts.slice(0, 8)}
          />
        </div>

        {/* services */}
        <div className="mx-auto xl:container px-2 xl:px-4 mt-10 ">
          <div className="flex justify-center gap-9 items-center p-8 flex-wrap">
            {services?.map((item, index) => (
              <div key={index} className="text-center w-52">
                <div className="flex items-center justify-center mb-3">
                  {item?.icon}
                </div>
                <h3 className="font-bold text-lg">{item?.title}</h3>
                <p className="text-sm">{item?.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Suspense>
  );
}
