"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";

export const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const slides = [
    { image: "/slider_one-cover.png", alt: "slider one" },
    { image: "/slider_two-cover.png", alt: "slider two" },
    { image: "/slider_three-cover.png", alt: "slider three" },
  ];
  return (
    <div className="xl:container mx-auto overflow-hidden px-2 xl:px-4 my-4 banner">
      <Slider {...settings}>
        {slides.map((item, index) => (
          <div key={index} className=" h-[250px] lg:h-[400px]">
            {/* <img
              src={item?.image}
              alt={item?.alt}
              className="w-full h-full rounded-md"
            /> */}
            <Image
              src={item?.image}
              alt={item?.alt}
              className="w-full h-full rounded-md"
              width={500}
              height={300}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};
