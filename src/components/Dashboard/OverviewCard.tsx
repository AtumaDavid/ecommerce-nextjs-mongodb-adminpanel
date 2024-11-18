// OverviewCard.tsx
import React from "react";
// import { CardProps } from "./types";

export interface CardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  bgColor?: string; // Optional for overview cards
  textColor?: string; // Optional for statistics cards
}

const OverviewCard: React.FC<CardProps> = ({
  title,
  value,
  icon,
  bgColor = "bg-gray-200",
}) => (
  <div className={`${bgColor} text-white p-4 rounded-lg flex items-center`}>
    <div className="text-2xl mr-2">{icon}</div>
    <div>
      <p className="text-sm">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

export default OverviewCard;
