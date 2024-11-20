"use client";
import Header from "@/components/Dashboard/Header";
import Sidebar from "@/components/Dashboard/Sidebar";
import React, { useEffect, useState } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

//Auto-close the sidebar on small screens//   // Auto-close the sidebar on small screens

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [openSidebar, setOpenSidebar] = useState(true);

  //Auto-close the sidebar on small screens//
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setOpenSidebar(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Check on initial render

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="overflow-hidden h-screen">
      <Header openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      <div className="flex">
        <aside
          className={`w-64 h-full  relative shadow-md transform transition-all ease-in-out duration-300 ${
            openSidebar ? "left-0" : "left-[-16rem]"
          }`}
        >
          <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        </aside>
        <main
          className={` bg-[#f7f7fc], overflow-y-scroll h-[90vh] border border-red-500 transform transition-all ease-in-out duration-300 ${
            openSidebar ? "left-0 w-full" : "absolute z-0 w-full"
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
