// app/profile/layout.tsx
"use client";
import Sidebar from "@/components/Profile/Sidebar";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { RiMenuLine } from "react-icons/ri";

// Map routes to their corresponding titles
const routeTitleMap = {
  "/accounts/overview": "Overview",
  "/accounts/order-history": "Order History",
  "/accounts/return-orders": "Return Orders",
  "/accounts/info": "Account Info",
  "/accounts/change-password": "Change Password",
  "/accounts/address": "Address",
};

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const activeItem =
    routeTitleMap[pathname as keyof typeof routeTitleMap] || "Overview";

  return (
    <div className="xl:container px-2 xl:px-4 mx-auto">
      <div className="min-h-screen">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white shadow-md p-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <RiMenuLine size={24} />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex gap-6 py-4 lg:py-6">
          <Sidebar
            activeItem={activeItem}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />

          {/* Content Area */}
          <div className="flex-1 lg:w-3/4">{children}</div>
        </div>
      </div>
    </div>
  );
}
