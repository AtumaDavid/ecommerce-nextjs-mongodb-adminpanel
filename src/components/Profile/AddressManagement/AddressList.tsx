import React, { useState } from "react";

// Define the type for an address object
type Address = {
  name: string;
  email: string;
  phone: string;
  address: string;
  area: string;
  city: string;
  country: string;
  zipCode: string;
};

type AddressListProps = {
  addresses: Address[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
};

const AddressList: React.FC<AddressListProps> = ({
  addresses,
  onEdit,
  onDelete,
}) => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null
  );

  const toggleDropdown = (index: number) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {addresses.map((address, index) => (
        <div key={index} className="bg-gray-50 p-4 rounded-lg relative">
          <div className="absolute top-4 right-4">
            <button
              onClick={() => toggleDropdown(index)}
              className="text-gray-400 hover:text-primary focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v.01M12 12v.01M12 18v.01"
                />
              </svg>
            </button>
            {openDropdownIndex === index && (
              <div className="absolute right-0 mt-2 w-28 bg-white shadow-lg rounded-md z-10">
                <button
                  onClick={() => {
                    onEdit(index);
                    setOpenDropdownIndex(null);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    onDelete(index);
                    setOpenDropdownIndex(null);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
          <div className="grid md:grid-cols-2 gap-2">
            <div>
              <p className="font-medium">{address.name}</p>
              <p className="text-sm text-gray-600">
                {address.email}, {address.phone}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">
                {address.address}, {address.area}, {address.city},{" "}
                {address.country}
              </p>
              <p className="text-sm text-gray-500">{address.zipCode}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddressList;
