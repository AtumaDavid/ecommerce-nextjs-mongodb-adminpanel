import React from "react";
import Link from "next/link";

interface NavigationItemProps {
  item: {
    id: string;
    icon: React.ComponentType<{ size?: number }>;
    label: string;
    path: string;
  };
  isActive: boolean;
  onClick: () => void;
}

const NavigationItem: React.FC<NavigationItemProps> = ({
  item,
  isActive,
  onClick,
}) => {
  const Icon = item.icon;

  return (
    <Link href={item.path} onClick={onClick}>
      <li className="mb-6">
        <div
          className={`flex items-center gap-3 cursor-pointer ${
            isActive ? "text-primary" : "text-gray-500"
          }`}
        >
          <div className={` ${isActive ? "text-primary" : "text-gray-400"}`}>
            <Icon size={20} />
          </div>
          <span className="text-[17px] font-bold">{item.label}</span>
        </div>
      </li>
    </Link>
  );
};

export default NavigationItem;
