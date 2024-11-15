import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaHeart, FaStar } from "react-icons/fa";

interface Product {
  image: string;
  title: string;
  price: string;
  originalPrice?: string;
}

interface ProductCardProps {
  data: Product[];
  isWishListed?: boolean;
}
export const ProductCard = ({ data, isWishListed }: ProductCardProps) => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {data?.map((item, index) => (
        <Link
          key={index}
          href={`/products/${item.title.toLowerCase().replace(/s+/g, "-")}`}
          className="bg-white rounded-lg shadow-md p-2"
        >
          <div className="w-full">
            <div className="relative">
              <span className="absolute top-3 left-3 z-10 bg-neutral-dark text-white text-xs font-bold px-2 py-1 rounded-full">
                Flash sale
              </span>
              <FaHeart
                size={34}
                color={`${isWishListed ? "!text-[#ff4800]" : "text-gray-300"}`}
                className="absolute top-4 right-4 bg-white p-[10px] rounded-full z-10"
              />
              <div className="overflow-hidden">
                {/* <Image
                  src={item.image}
                  alt={item.title}
                  className="rounded-md w-full transform scale-95 hover:scale-100 transition duration-500 ease-in-out"
                 
                /> */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="rounded-xl w-full h-56 object-cover transform scale-100 hover:scale-105 transition duration-500 ease-in-out"
                />
              </div>
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold">{item?.title}</h2>
              <div className="my-2 flex items-center">
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-black">
                  {item?.price}
                </span>
                <span className=" text-red-500 line-through">
                  {item?.originalPrice}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
