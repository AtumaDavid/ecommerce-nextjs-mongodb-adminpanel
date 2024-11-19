"use client";
import React from "react";
import { navItems } from "./Sidebar";
import NavigationItem from "./NavigationItem";

interface NavigationProps {
  activeItem: string;
  onClose: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeItem, onClose }) => {
  return (
    <nav className="mt-8">
      <ul>
        {navItems.map((item) => (
          <NavigationItem
            key={item.id}
            item={item}
            isActive={activeItem === item.id}
            onClick={() => {
              if (window.innerWidth < 1024) {
                onClose();
              }
            }}
          />
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
