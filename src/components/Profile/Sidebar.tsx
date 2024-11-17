import React from "react";
import {
  RiDashboardLine,
  RiHistoryLine,
  RiRefundLine,
  RiUser3Line,
  RiLockPasswordLine,
  RiMapPinLine,
} from "react-icons/ri";
import UserProfile from "./UserProfile";
import Navigation from "./Navigation";

export const navItems = [
  {
    id: "Overview",
    icon: RiDashboardLine,
    label: "Overview",
    path: "/accounts/overview",
  },
  {
    id: "Order History",
    icon: RiHistoryLine,
    label: "Order History",
    path: "/accounts/order-history",
  },
  {
    id: "Return Orders",
    icon: RiRefundLine,
    label: "Return Orders",
    path: "/accounts/return-orders",
  },
  {
    id: "Account Info",
    icon: RiUser3Line,
    label: "Account Info",
    path: "/accounts/info",
  },
  {
    id: "Change Password",
    icon: RiLockPasswordLine,
    label: "Change Password",
    path: "/accounts/change-password",
  },
  {
    id: "Address",
    icon: RiMapPinLine,
    label: "Address",
    path: "/accounts/address",
  },
];

interface SidebarProps {
  activeItem: string;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem, isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed lg:static inset-y-0 left-0 w-[280px] bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-200 ease-in-out z-50 lg:z-0`}
      >
        <div className="p-8">
          <UserProfile />
          <Navigation activeItem={activeItem} onClose={onClose} />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
