import React, { useState } from "react";
import { Truck, MapPin, Store, Edit, Trash2, PlusCircle } from "lucide-react";
import { AddressFormData } from "./AddressForm";

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
  addresses: AddressFormData[];
  selectedAddress: number | null;
  setSelectedAddress: (index: number | null) => void;
  setShowAddressModal: (show: boolean) => void;
  setEditingAddress: (index: number | null) => void;
  handleDeleteAddress: (index: number) => void;
}

// Props interface
interface ShippingMethodProps {
  onShippingSelect: (shippingMethod: string) => void;
  // initialSelectedShipping?: string;
  // addresses: Address[];
}

const ShippingMethods: React.FC<ShippingMethodProps> = ({
  onShippingSelect,
  // initialSelectedShipping,
  addresses = [],
  selectedAddress,
  setSelectedAddress,
  setShowAddressModal,
  setEditingAddress,
  handleDeleteAddress,
}) => {
  // State for shipping mode and selections
  const [shippingMode, setShippingMode] = useState<"delivery" | "pickup">(
    "delivery"
  );
  // const [selectedShipping, setSelectedShipping] = useState<string>(
  //   initialSelectedShipping || ""
  // );
  const [selectedStoreLocation, setSelectedStoreLocation] =
    useState<string>("");

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

  // Handle store location selection
  const handleStoreLocationSelect = (locationId: string) => {
    setSelectedStoreLocation(locationId);
    onShippingSelect(locationId);
  };

  const AddressSelection = () => (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-xl font-semibold">Your Shipping Address Address</h2>
        <button
          onClick={() => setShowAddressModal(true)}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors w-full sm:w-auto"
        >
          <PlusCircle className="mr-2 w-5 h-5" />
          Add New Address
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="text-center p-4 bg-gray-100 rounded-lg">
          <p className="text-gray-600">No addresses available</p>
          <p className="text-sm text-gray-500 mt-2">
            Click "Add New Address" to get started
          </p>
        </div>
      ) : (
        addresses.map((address, index) => (
          <div
            key={index}
            className={`
            border p-4 rounded-lg cursor-pointer 
            ${
              selectedAddress === index
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-blue-300"
            }
          `}
            onClick={() => setSelectedAddress(index)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{address.fullName}</h3>
                <p>{address.streetAddress}</p>
                <p>{`${address.city}, ${address.state}, ${address.country}`}</p>
                <p>{address.phone}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingAddress(index);
                  }}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteAddress(index);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );

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

      {/* Show Pickup Locations */}
      {shippingMode === "pickup" && (
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

      {/* Address Selection Component */}
      {shippingMode === "delivery" && <AddressSelection />}
    </div>
  );
};

export default ShippingMethods;
