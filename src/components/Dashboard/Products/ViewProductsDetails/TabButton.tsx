"use client";
import React from "react";
import { TabButtonProps } from "./types";

const TabButton: React.FC<TabButtonProps> = ({
  children,
  tab,
  icon: Icon,
  activeTab,
  onTabChange,
}) => (
  <button
    onClick={() => onTabChange(tab)}
    className={`flex items-center space-x-2 w-full px-4 py-2 rounded-lg transition-all duration-200
      ${
        activeTab === tab
          ? "bg-primary text-white"
          : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-100"
      }
    `}
  >
    <Icon className="w-5 h-5" />
    <span className="hidden sm:inline">{tab}</span>
    {children}
  </button>
);

export default TabButton;
