"use client";
import React, { useState, useEffect } from "react";

// Define types for form data
export interface AddressFormData {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  streetAddress: string;
}

// Props interface
interface AddressFormProps {
  onSubmit: (formData: AddressFormData) => void;
  onCancel: () => void;
  initialData?: Partial<AddressFormData>;
}

const AddressForm: React.FC<AddressFormProps> = ({
  onSubmit,
  onCancel,
  initialData = {},
}) => {
  // State for form data with default values and initial data
  const [formData, setFormData] = useState<AddressFormData>({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
    streetAddress: "",
    ...initialData,
  });

  // State for form validation
  const [errors, setErrors] = useState<
    Partial<Record<keyof AddressFormData, string>>
  >({});

  // Validation function
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof AddressFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.country) {
      newErrors.country = "Country is required";
    }

    if (!formData.state) {
      newErrors.state = "State is required";
    }

    if (!formData.city) {
      newErrors.city = "City is required";
    }

    if (!formData.streetAddress.trim()) {
      newErrors.streetAddress = "Street Address is required";
    }

    // Optional email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  // Update specific form field
  const updateFormField = (field: keyof AddressFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  return (
    <div className="space-y-4">
      {/* Full Name */}
      <div>
        <label className="block mb-1">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className={`w-full p-2 border rounded-lg ${
            errors.fullName ? "border-red-500" : ""
          }`}
          value={formData.fullName}
          onChange={(e) => updateFormField("fullName", e.target.value)}
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block mb-1">Email</label>
        <input
          type="email"
          className={`w-full p-2 border rounded-lg ${
            errors.email ? "border-red-500" : ""
          }`}
          value={formData.email}
          onChange={(e) => updateFormField("email", e.target.value)}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="block mb-1">
          Phone <span className="text-red-500">*</span>
        </label>
        <div className="flex">
          <select
            className="p-2 border rounded-l-lg w-24"
            value={formData.country}
            onChange={(e) => updateFormField("country", e.target.value)}
          >
            <option value="BD">BD +880</option>
            <option value="US">US +1</option>
          </select>
          <input
            type="tel"
            className={`w-full p-2 border border-l-0 rounded-r-lg ${
              errors.phone ? "border-red-500" : ""
            }`}
            value={formData.phone}
            onChange={(e) => updateFormField("phone", e.target.value)}
          />
        </div>
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
        )}
      </div>

      {/* Country, State, City Selects */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block mb-1">
            Country <span className="text-red-500">*</span>
          </label>
          <select
            className={`w-full p-2 border rounded-lg ${
              errors.country ? "border-red-500" : ""
            }`}
            value={formData.country}
            onChange={(e) => updateFormField("country", e.target.value)}
          >
            <option value="">Select Country</option>
            <option value="BD">Bangladesh</option>
            <option value="US">United States</option>
          </select>
          {errors.country && (
            <p className="text-red-500 text-sm mt-1">{errors.country}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">
            State <span className="text-red-500">*</span>
          </label>
          <select
            className={`w-full p-2 border rounded-lg ${
              errors.state ? "border-red-500" : ""
            }`}
            value={formData.state}
            onChange={(e) => updateFormField("state", e.target.value)}
          >
            <option value="">Select State</option>
            <option value="DHK">Dhaka</option>
          </select>
          {errors.state && (
            <p className="text-red-500 text-sm mt-1">{errors.state}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">
            City <span className="text-red-500">*</span>
          </label>
          <select
            className={`w-full p-2 border rounded-lg ${
              errors.city ? "border-red-500" : ""
            }`}
            value={formData.city}
            onChange={(e) => updateFormField("city", e.target.value)}
          >
            <option value="">Select City</option>
            <option value="DHK">Dhaka</option>
          </select>
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city}</p>
          )}
        </div>
      </div>

      {/* Street Address */}
      <div>
        <label className="block mb-1">
          Street Address <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className={`w-full p-2 border rounded-lg ${
            errors.streetAddress ? "border-red-500" : ""
          }`}
          value={formData.streetAddress}
          onChange={(e) => updateFormField("streetAddress", e.target.value)}
        />
        {errors.streetAddress && (
          <p className="text-red-500 text-sm mt-1">{errors.streetAddress}</p>
        )}
      </div>

      {/* Zip Code */}
      <div>
        <label className="block mb-1">Zip Code</label>
        <input
          type="text"
          className={`w-full p-2 border rounded-lg ${
            errors.zipCode ? "border-red-500" : ""
          }`}
          value={formData.zipCode}
          onChange={(e) => updateFormField("zipCode", e.target.value)}
        />
        {errors.zipCode && (
          <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4 mt-6">
        <button onClick={onCancel} className="px-6 py-2 bg-gray-100 rounded-lg">
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-red-500 text-white rounded-lg"
        >
          Save Address
        </button>
      </div>
    </div>
  );
};

export default AddressForm;
