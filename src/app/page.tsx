import { Carousel } from "@/components/Home/Carousel";
import { CategoryCarousel } from "@/components/Home/CategoryCarousel";
import { PromotionCard } from "@/components/Home/PromotionCard";
import { ProductCard } from "@/components/Product/ProductCard";
import { FaHeadset, FaHeart, FaLock, FaShippingFast } from "react-icons/fa";

export default function Home() {
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
    <div className="mb-8">
      <Carousel />
      <CategoryCarousel />
      <PromotionCard />
      <div className="xl:container px-2 xl:px-4 mt-10 mx-auto">
        <h2 className="text-3xl font-bold mb-4">Trendy Collections</h2>
        <ProductCard isWishListed={false} data={products} />
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
  );
}
