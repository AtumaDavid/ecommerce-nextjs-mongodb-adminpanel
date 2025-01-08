"use client";
import React, { useState } from "react";
import { Truck, MapPin, Store } from "lucide-react";

// Define shipping method interface
interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDelivery: string;
  icon?: React.ReactNode;
}

// Define store location interface
interface StoreLocation {
  id: string;
  name: string;
  address: string;
  phone: string;
  workingHours: string;
  distance: string;
}

// Props interface
interface ShippingMethodProps {
  onShippingSelect: (shippingMethod: string) => void;
  initialSelectedShipping?: string;
}

const ShippingMethods: React.FC<ShippingMethodProps> = ({
  onShippingSelect,
  initialSelectedShipping,
}) => {
  // State for shipping mode and selections
  const [shippingMode, setShippingMode] = useState<"delivery" | "pickup">(
    "delivery"
  );
  const [selectedShipping, setSelectedShipping] = useState<string>(
    initialSelectedShipping || ""
  );
  const [selectedStoreLocation, setSelectedStoreLocation] =
    useState<string>("");

  // Shipping methods
  const shippingMethods: ShippingMethod[] = [
    {
      id: "standard",
      name: "Standard Shipping",
      description: "Delivery in 5-7 business days",
      price: 5.99,
      estimatedDelivery: "5-7 Days",
      icon: <Truck className="w-6 h-6" />,
    },
    {
      id: "express",
      name: "Express Shipping",
      description: "Delivery in 2-3 business days",
      price: 12.99,
      estimatedDelivery: "2-3 Days",
      icon: <Truck className="w-6 h-6" />,
    },
    {
      id: "overnight",
      name: "Overnight Shipping",
      description: "Next business day delivery",
      price: 19.99,
      estimatedDelivery: "1 Day",
      icon: <Truck className="w-6 h-6" />,
    },
  ];

  // Store locations
  const storeLocations: StoreLocation[] = [
    {
      id: "downtown",
      name: "Downtown Flagship Store",
      address: "123 Main Street, City Center",
      phone: "+880 123 456 7890",
      workingHours: "10:00 AM - 8:00 PM",
      distance: "2.5 km",
    },
    {
      id: "midtown",
      name: "Midtown Shopping Complex",
      address: "456 Central Avenue, Business District",
      phone: "+880 987 654 3210",
      workingHours: "9:00 AM - 9:00 PM",
      distance: "5.2 km",
    },
    {
      id: "suburban",
      name: "Suburban Mall Branch",
      address: "789 Parkview Road, Suburban Area",
      phone: "+880 234 567 8901",
      workingHours: "11:00 AM - 7:00 PM",
      distance: "8.7 km",
    },
  ];

  // Handle shipping method selection
  const handleShippingSelect = (methodId: string) => {
    setSelectedShipping(methodId);
    onShippingSelect(methodId);
  };

  // Handle store location selection
  const handleStoreLocationSelect = (locationId: string) => {
    setSelectedStoreLocation(locationId);
    onShippingSelect(locationId);
  };

  return (
    <div className="space-y-6">
      {/* Shipping Mode Toggle */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setShippingMode("delivery")}
          className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
            shippingMode === "delivery"
              ? "bg-blue-500 text-white"
              : "bg-gray-100"
          }`}
        >
          <Truck className="w-5 h-5" />
          <span>Delivery</span>
        </button>
        <button
          onClick={() => setShippingMode("pickup")}
          className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
            shippingMode === "pickup" ? "bg-blue-500 text-white" : "bg-gray-100"
          }`}
        >
          <Store className="w-5 h-5" />
          <span>Pick Up</span>
        </button>
      </div>

      {/* Shipping Methods or Pickup Locations */}
      {shippingMode === "delivery" ? (
        <div className="grid grid-cols-3 gap-4">
          {shippingMethods.map((method) => (
            <div
              key={method.id}
              className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 ${
                selectedShipping === method.id
                  ? "border-red-500 bg-red-50 shadow-md"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => handleShippingSelect(method.id)}
            >
              <div className="flex items-center justify-center h-12 mb-2">
                {method.icon || <Truck className="w-6 h-6" />}
              </div>
              <div className="text-center">
                <h3 className="font-semibold">{method.name}</h3>
                <p className="text-sm text-gray-600">{method.description}</p>
                <p className="text-sm font-bold mt-1">
                  ${method.price.toFixed(2)}
                </p>
                <p className="text-xs text-blue-600">
                  Estimated: {method.estimatedDelivery}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {storeLocations.map((location) => (
            <div
              key={location.id}
              className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 ${
                selectedStoreLocation === location.id
                  ? "border-red-500 bg-red-50 shadow-md"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => handleStoreLocationSelect(location.id)}
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="font-semibold flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {location.name}
                  </p>
                  <p className="text-gray-600">{location.address}</p>
                  <p className="text-gray-600">Phone: {location.phone}</p>
                  <p className="text-gray-600">
                    Working Hours: {location.workingHours}
                  </p>
                  <p className="text-sm text-blue-600">
                    Distance: {location.distance}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Additional Shipping Information */}
      <div className="text-sm text-gray-600 mt-4">
        <p>
          * Shipping times may vary based on location and current conditions
        </p>
        <p>* Pickup availability subject to store hours and inventory</p>
      </div>
    </div>
  );
};

export default ShippingMethods;
