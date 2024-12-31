"use client";
import Image from "next/image";
import React, { useState } from "react";

export default function PromotionCard() {
  const [promotions, setPromotions] = useState([
    { image: "/winter_exclusive_for_man-cover.png", alt: "promotion1" },
    { image: "/winter_exclusive_for_woman-cover.png", alt: "promotion2" },
    { image: "/winter_exclusive_for_kids-cover.png", alt: "promotion3" },
  ]);
  // console.log(setPromotions);

  return (
    <div className="xl:container px-2 xl:px-4 mx-auto my-16">
      <div className="flex flex-wrap md:flex-nowrap gap-3 justify-between items-center">
        {promotions?.map((item, index) => (
          <div key={index} className="md:w-1/3 w-full justify-center flex">
            <Image
              src={item?.image}
              alt={item?.alt}
              width={450}
              height={300}
              className="rounded-md w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
