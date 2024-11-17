// "use client";
// import AccountInfo from "@/components/Profile/AccountInfo";
// import Address from "@/components/Profile/Address";
// import ChangePassword from "@/components/Profile/ChangePassword";
// import DashboardOverview from "@/components/Profile/DashboardOverview";
// import OrderHistory from "@/components/Profile/OrderHistory";
// import ReturnOrders from "@/components/Profile/ReturnOrders";
// import Sidebar from "@/components/Profile/Sidebar";
// import React, { useState } from "react";
// import { RiMenuLine } from "react-icons/ri";

// const Overview: React.FC = () => {
//   const [activeItem, setActiveItem] = useState("Order History");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const renderActiveComponent = () => {
//     switch (activeItem) {
//       case "Overview":
//         return <DashboardOverview />;
//       case "Order History":
//         return <OrderHistory />;
//       case "Return Orders":
//         return <ReturnOrders />;
//       case "Account Info":
//         return <AccountInfo />;
//       case "Change Password":
//         return <ChangePassword />;
//       case "Address":
//         return <Address />;
//       default:
//         return <OrderHistory />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <div className="lg:hidden bg-white shadow-md p-4">
//         <button
//           onClick={() => setIsSidebarOpen(true)}
//           className="p-2 hover:bg-gray-100 rounded-lg"
//         >
//           <RiMenuLine size={24} />
//         </button>
//       </div>

//       <div className="flex p-4 lg:p-6">
//         <Sidebar
//           activeItem={activeItem}
//           setActiveItem={setActiveItem}
//           isOpen={isSidebarOpen}
//           onClose={() => setIsSidebarOpen(false)}
//         />
//         <div className="w-full lg:w-3/4 lg:ml-6">{renderActiveComponent()}</div>
//       </div>
//     </div>
//   );
// };

// export default Overview;

// "use client";
// import AccountInfo from "@/components/Profile/AccountInfo";
// import Address from "@/components/Profile/Address";
// import ChangePassword from "@/components/Profile/ChangePassword";
// import DashboardOverview from "@/components/Profile/DashboardOverview";
// import OrderHistory from "@/components/Profile/OrderHistory";
// import ReturnOrders from "@/components/Profile/ReturnOrders";
// import Sidebar from "@/components/Profile/Sidebar";
// import { useRouter, usePathname } from "next/navigation";
// import React, { useState, useEffect } from "react";
// import { RiMenuLine } from "react-icons/ri";

// // Map routes to their corresponding components
// const routeComponentMap = {
//   "/profile": "Overview",
//   "/profile/orders": "Order History",
//   "/profile/returns": "Return Orders",
//   "/profile/account": "Account Info",
//   "/profile/password": "Change Password",
//   "/profile/address": "Address",
// };

// // Map sidebar items to their routes
// const itemToRouteMap = {
//   Overview: "/profile",
//   "Order History": "/profile/orders",
//   "Return Orders": "/profile/returns",
//   "Account Info": "/profile/account",
//   "Change Password": "/profile/password",
//   Address: "/profile/address",
// };

// const Overview: React.FC = () => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [activeItem, setActiveItem] = useState(() => {
//     // Initialize active item based on current route
//     return (
//       routeComponentMap[pathname as keyof typeof routeComponentMap] ||
//       "Order History"
//     );
//   });

//   // Update active item when route changes
//   useEffect(() => {
//     const newActiveItem =
//       routeComponentMap[pathname as keyof typeof routeComponentMap];
//     if (newActiveItem) {
//       setActiveItem(newActiveItem);
//     }
//   }, [pathname]);

//   // Handle sidebar item click with routing
//   const handleItemClick = (item: string) => {
//     const route = itemToRouteMap[item as keyof typeof itemToRouteMap];
//     if (route) {
//       router.push(route);
//       setActiveItem(item);
//       setIsSidebarOpen(false);
//     }
//   };

//   const renderActiveComponent = () => {
//     switch (activeItem) {
//       case "Overview":
//         return <DashboardOverview />;
//       case "Order History":
//         return <OrderHistory />;
//       case "Return Orders":
//         return <ReturnOrders />;
//       case "Account Info":
//         return <AccountInfo />;
//       case "Change Password":
//         return <ChangePassword />;
//       case "Address":
//         return <Address />;
//       default:
//         return <OrderHistory />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <div className="lg:hidden bg-white shadow-md p-4">
//         <button
//           onClick={() => setIsSidebarOpen(true)}
//           className="p-2 hover:bg-gray-100 rounded-lg"
//         >
//           <RiMenuLine size={24} />
//         </button>
//       </div>

//       <div className="flex p-4 lg:p-6">
//         <Sidebar
//           activeItem={activeItem}
//           setActiveItem={handleItemClick}
//           isOpen={isSidebarOpen}
//           onClose={() => setIsSidebarOpen(false)}
//         />
//         <div className="w-full lg:w-3/4 lg:ml-6">{renderActiveComponent()}</div>
//       </div>
//     </div>
//   );
// };

// export default Overview;

"use client";
import DashboardOverview from "@/components/Profile/DashboardOverview";
// import { usePathname } from "next/navigation";
import React from "react";

// // Map routes to their titles for the heading
// const routeTitleMap = {
//   "/accounts/overview": "Overview",
//   "/accounts/order-history": "Order History",
//   "/accounts/returns": "Return Orders",
//   "/accounts/account": "Account Info",
//   "/accounts/password": "Change Password",
//   "/accounts/address": "Address",
// };

const Overview: React.FC = () => {
  // const pathname = usePathname();
  // const pageTitle =
  //   routeTitleMap[pathname as keyof typeof routeTitleMap] || "Overview";

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary">Overview</h1>
      <div className="mt-6">
        <DashboardOverview />
      </div>
    </div>
  );
};

export default Overview;
