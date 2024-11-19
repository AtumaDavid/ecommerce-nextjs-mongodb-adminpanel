import React, { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import { SidebarProps } from "./types/product";

const SidebarForm: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      // Trigger animation after component is rendered
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    } else {
      setIsVisible(false);
      // Wait for animation to complete before unmounting
      const timeout = setTimeout(() => {
        setIsRendered(false);
      }, 300); // Match this with CSS transition duration
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!isRendered) return null;

  return (
    <div
      className={`fixed inset-0 z-40 transition-opacity duration-300 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full md:w-1/2 w-full bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out ${
          isVisible ? "translate-x-0 " : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-medium">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
          >
            <GrClose className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto overflow-hidden h-[calc(100%-4rem)]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SidebarForm;
