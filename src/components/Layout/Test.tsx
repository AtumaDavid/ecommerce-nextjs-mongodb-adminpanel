import React from "react";

export default function Test() {
  return <div>test</div>;
}

// "use client";

// import Header from "@/components/Dashboard/Header";
// import Sidebar from "@/components/Dashboard/Sidebar";
// import React, { useState, useEffect } from "react";

// interface DashboardLayoutProps {
//   children: React.ReactNode;
// }

// export default function DashboardLayout({ children }: DashboardLayoutProps) {
//   const [openSidebar, setOpenSidebar] = useState(true);

//   // Auto-close the sidebar on small screens
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 768) {
//         setOpenSidebar(false);
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     handleResize(); // Check on initial render

//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <div className="overflow-hidden h-screen">
//       <Header openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />

//       <div className="flex h-full">
//         {/* Sidebar */}
//         <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />

//         {/* Main Content */}
//         <main
//           className={`flex-1 p-4 bg-[#f7f7fc] overflow-y-auto transition-all duration-300 ${
//             openSidebar ? "md:ml-64" : "md:ml-0"
//           }`}
//         >
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }

// "use client";

// import Link from "next/link";
// import React, { useState } from "react";
// import { AiOutlineProduct } from "react-icons/ai";
// import { FaThLarge } from "react-icons/fa";
// import { IoMdClose } from "react-icons/io"; // Icon for the back/close button

// interface DashboardSidebarProps {
//   openSidebar: boolean;
//   setOpenSidebar: (open: boolean) => void; // Pass the state handler
// }

// export default function Sidebar({
//   openSidebar,
//   setOpenSidebar,
// }: DashboardSidebarProps) {
//   const [activeLink, setActiveLink] = useState<string>("Dashboard");

//   const sideBarSections = [
//     {
//       title: "Product & Stocks",
//       items: [
//         {
//           icon: <AiOutlineProduct />,
//           label: "Products",
//           link: "/dashboard/products",
//         },
//       ],
//     },
//   ];

//   return (
//     <aside
//       className={`fixed top-0 left-0 h-full bg-white shadow-md w-64 transform transition-transform duration-300 z-50 ${
//         openSidebar ? "translate-x-0" : "-translate-x-full"
//       } md:translate-x-0 md:relative`}
//     >
//       <div className="p-4 h-full flex flex-col">
//         {/* Back Button for Small Screens */}
//         <button
//           className="md:hidden p-2 rounded-full self-end text-gray-600 hover:bg-gray-200"
//           onClick={() => setOpenSidebar(false)} // Close sidebar
//         >
//           <IoMdClose size={24} />
//         </button>

//         {/* Dashboard Link */}
//         <Link
//           href="/dashboard"
//           className={`${
//             activeLink === "Dashboard"
//               ? "bg-primary text-white font-semibold"
//               : ""
//           } flex items-center space-x-2 p-2 rounded-md cursor-pointer`}
//           onClick={() => setActiveLink("Dashboard")}
//         >
//           <FaThLarge />
//           <span className={`${!openSidebar && "hidden"} md:inline`}>
//             Dashboard
//           </span>
//         </Link>

//         {/* Sidebar Sections */}
//         {sideBarSections.map((section, index) => (
//           <div className="mt-4" key={index}>
//             <h2 className="text-xs text-gray-500 font-semibold">
//               {section.title}
//             </h2>
//             <div className="mt-2">
//               {section.items.map((item, idx) => (
//                 <Link
//                   href={item.link}
//                   key={idx}
//                   className={`${
//                     activeLink === item.label
//                       ? "bg-primary text-white font-semibold"
//                       : ""
//                   } flex items-center space-x-2 p-2 rounded-md cursor-pointer`}
//                   onClick={() => setActiveLink(item.label)}
//                 >
//                   {item.icon}
//                   <span className={`${!openSidebar && "hidden"} md:inline`}>
//                     {item.label}
//                   </span>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </aside>
//   );
// }
