"use client";
import React, { useState } from "react";
import AddressList from "./AddressList";
import AddressFormModal from "./AddressFormModal";
import DeleteModal from "./DeleteModal";

const AddressManagement = () => {
  const [addresses, setAddresses] = useState([
    {
      name: "Will Smith",
      email: "customer@example.com",
      phone: "125333344",
      address: "House :3, Road: 1, Block: C, Mirpur 2",
      area: "Dhaka",
      city: "Dhaka",
      country: "Bangladesh",
      zipCode: "1216",
    },
    {
      name: "Will Smith",
      email: "customer@example.com",
      phone: "125333344",
      address: "House :30, Road: 13, Block: A, Dhanmondi 32",
      area: "Dhaka",
      city: "Dhaka",
      country: "Bangladesh",
      zipCode: "1209",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [formType, setFormType] = useState<"add" | "edit">("add");
  const [selectedAddress, setSelectedAddress] = useState<{
    name: string;
    email: string;
    phone: string;
    address: string;
    area: string;
    city: string;
    country: string;
    zipCode: string;
  } | null>(null);

  const handleAddNew = () => {
    setSelectedAddress(null);
    setFormType("add");
    setIsModalOpen(true);
  };

  const handleEdit = (index: number) => {
    setSelectedIndex(index);
    setSelectedAddress(addresses[index]); // This works because selectedAddress is now typed correctly.
    setFormType("edit");
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    if (selectedIndex !== null) {
      setAddresses((prev) => prev.filter((_, i) => i !== selectedIndex));
      setSelectedIndex(null);
      setIsDeleteModalOpen(false);
    }
  };

  const handleSave = (newAddress: any) => {
    if (formType === "edit" && selectedIndex !== null) {
      const updatedAddresses = [...addresses];
      updatedAddresses[selectedIndex] = newAddress;
      setAddresses(updatedAddresses);
    } else {
      setAddresses((prev) => [...prev, newAddress]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Address Management</h2>

      <AddressList
        addresses={addresses}
        onEdit={handleEdit}
        onDelete={(index: number) => {
          setSelectedIndex(index);
          setIsDeleteModalOpen(true);
        }}
      />

      <button
        onClick={handleAddNew}
        className="flex items-center justify-center w-full p-4 border-2 border-dashed border-primary rounded-lg text-primary hover:bg-primary-light transition-colors"
      >
        Add New Address
      </button>

      {isModalOpen && (
        <AddressFormModal
          formType={formType}
          address={selectedAddress}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

export default AddressManagement;
