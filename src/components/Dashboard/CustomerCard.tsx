import React from "react";

// Reusable CustomerCard Component
interface CustomerCardProps {
  name: string;
  orders: number;
  profileImage?: string; // Optional custom profile image
}

export default function CustomerCard({
  name,
  orders,
  profileImage = "https://placehold.co/100x100",
}: CustomerCardProps) {
  return (
    <div className="border rounded-lg shadow-md p-4 m-4 w-full max-w-xs text-center">
      <img
        src={profileImage}
        alt={`${name}'s profile`}
        className="mx-auto mb-2 rounded-full h-24 w-24 object-cover"
      />
      <div className="text-gray-700 text-lg font-medium mb-2">{name}</div>
      <div className="bg-primary text-white py-2 rounded-b-lg font-semibold">
        {orders} {orders === 1 ? "Order" : "Orders"}
      </div>
    </div>
  );
}
