"use client";
import Header from "@/components/Dashboard/Header";
import Sidebar from "@/components/Dashboard/Sidebar";
import React, { useState } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [openSidebar, setOpenSidebar] = useState(true);
  return (
    <div className="overflow-hidden h-screen">
      <Header openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      <div className="flex">
        <aside
          className={`w-64 relative shadow-md transform transition-all ease-in-out duration-300 ${
            openSidebar ? "left-0" : "left-[-16rem]"
          }`}
        >
          <Sidebar openSidebar={openSidebar} />
        </aside>
        <main
          className={`p-4 bg-[#f7f7fc], overflow-y-scroll h-[90vh] transform transition-all ease-in-out duration-300 ${
            openSidebar ? "left-0 w-full" : "absolute z-0 w-full"
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
