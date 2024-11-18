import React from "react";
import {
  FaDollarSign,
  FaBox,
  FaUsers,
  FaFileAlt,
  FaTruck,
  FaBoxOpen,
  FaCheckCircle,
  FaUndo,
  FaTruckLoading,
  FaTimesCircle,
  FaBan,
} from "react-icons/fa";
import OverviewCard, { CardProps } from "@/components/Dashboard/OverviewCard";
import StatisticsCard from "@/components/Dashboard/StatisticsCard";
import SalesChart from "@/components/Dashboard/SalesChart";
import OrderSummaryChart from "@/components/Dashboard/OrdersSummaryChart";
import CustomerStats from "@/components/Dashboard/CustomerStats";
import CustomerCard from "@/components/Dashboard/CustomerCard";
import ProductCard from "@/components/Product/ProductCard";

interface DashboardData {
  overview: CardProps[];
  statistics: CardProps[];
}

const DashboardPage = () => {
  const dashboardData: DashboardData = {
    overview: [
      {
        title: "Total Earnings",
        value: "$1673.20",
        icon: <FaDollarSign />,
        bgColor: "bg-pink-500",
      },
      {
        title: "Total Orders",
        value: "4",
        icon: <FaBox />,
        bgColor: "bg-red-500",
      },
      {
        title: "Total Customers",
        value: "2",
        icon: <FaUsers />,
        bgColor: "bg-purple-500",
      },
      {
        title: "Total Products",
        value: "108",
        icon: <FaFileAlt />,
        bgColor: "bg-blue-500",
      },
    ],
    statistics: [
      {
        title: "Total Orders",
        value: "0",
        icon: <FaBox />,
        textColor: "text-orange-500",
      },
      {
        title: "Delivered",
        value: "0",
        icon: <FaTruck />,
        textColor: "text-blue-500",
      },
      {
        title: "Pending",
        value: "0",
        icon: <FaBoxOpen />,
        textColor: "text-yellow-500",
      },
      {
        title: "Confirmed",
        value: "0",
        icon: <FaCheckCircle />,
        textColor: "text-green-500",
      },
      {
        title: "Returned",
        value: "0",
        icon: <FaUndo />,
        textColor: "text-blue-500",
      },
      {
        title: "Ongoing",
        value: "0",
        icon: <FaTruckLoading />,
        textColor: "text-blue-500",
      },
      {
        title: "Canceled",
        value: "0",
        icon: <FaTimesCircle />,
        textColor: "text-red-500",
      },
      {
        title: "Rejected",
        value: "0",
        icon: <FaBan />,
        textColor: "text-red-500",
      },
    ],
  };

  const customerStatsData = [20, 40, 60, 80, 100, 20, 40, 60, 80, 100, 76, 53];
  const customerStatsLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const sampleCustomers = [
    { name: "Will Smith", orders: 3 },
    { name: "Walking Customer", orders: 2 },
    {
      name: "Alex Johnson",
      orders: 5,
      //   profileImage: "https://placehold.co/100x100",
    },
    { name: "Sophia Brown", orders: 8 },
  ];

  //   product data
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

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-primary">Good Morning!</h1>
      <p className="text-xl text-black">Admin</p>

      {/* Overview Section */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {dashboardData.overview.map((item, index) => (
            <OverviewCard key={index} {...item} />
          ))}
        </div>
      </section>

      {/* Order Statistics Section */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Order Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {dashboardData.statistics.map((item, index) => (
            <StatisticsCard key={index} {...item} />
          ))}
        </div>
      </section>

      {/* Sales and Order Summary Section */}
      <section className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-md shadow">
          <div className="p-4">
            <h3 className="text-xl font-bold">Sales Summary</h3>
          </div>
          <div className="p-4">
            <SalesChart />
          </div>
        </div>
        <div className="bg-white rounded-md shadow">
          <div className="p-4">
            <h3 className="text-xl font-bold">Order Summary</h3>
          </div>
          <div className="p-4">
            <OrderSummaryChart />
          </div>
        </div>
      </section>

      {/* Customer Statistics and Top Customers Section */}
      <section className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-md shadow">
          <div className="p-4">
            <h3 className="text-xl font-bold">Customer Stats</h3>
          </div>
          <div className="p-4">
            <CustomerStats
              data={customerStatsData}
              labels={customerStatsLabels}
              title="Customer Growth Over Months"
            />
          </div>
        </div>
        <div className="bg-white rounded-md shadow">
          <div className="p-4">
            <h3 className="text-xl font-bold">Top Customers</h3>
          </div>
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            {sampleCustomers.map((customer, index) => (
              <CustomerCard key={index} {...customer} />
            ))}
          </div>
        </div>
      </section>

      {/* top products */}
      <section>
        <ProductCard isWishListed={false} data={products} />
      </section>
    </div>
  );
};

export default DashboardPage;
