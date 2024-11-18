// StatisticsCard.tsx
import React from "react";

export interface CardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  bgColor?: string; // Optional for overview cards
  textColor?: string; // Optional for statistics cards
}

const StatisticsCard: React.FC<CardProps> = ({
  title,
  value,
  icon,
  textColor = "text-gray-700",
}) => (
  <div className="bg-white p-4 rounded-lg shadow flex items-center">
    <div className={`text-2xl ${textColor} mr-2`}>{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

export default StatisticsCard;
