import React, { useState } from "react";

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

type AddressFormModalProps = {
  formType: "add" | "edit";
  address?: Address | null;
  onClose: () => void;
  onSave: (address: Address) => void;
};

const AddressFormModal: React.FC<AddressFormModalProps> = ({
  formType,
  address,
  onClose,
  onSave,
}) => {
  const [formValues, setFormValues] = useState<Address>(
    address || {
      name: "",
      email: "",
      phone: "",
      address: "",
      area: "",
      city: "",
      country: "",
      zipCode: "",
    }
  );

  const [errors, setErrors] = useState<Partial<Record<keyof Address, string>>>(
    {}
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));

    // Clear the error when the user starts typing
    if (errors[name as keyof Address]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof Address, string>> = {};

    if (!formValues.name) newErrors.name = "The full name field is required.";
    if (!formValues.email) newErrors.email = "The email field is required.";
    if (!formValues.phone) newErrors.phone = "The phone field is required.";
    if (!formValues.address)
      newErrors.address = "The address field is required.";
    if (!formValues.country)
      newErrors.country = "The country field is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      onSave(formValues);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">
            {formType === "edit" ? "Edit Address" : "Add Address"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500"
          >
            &times;
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Full Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              className={`mt-1 block w-full border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm h-12 px-3`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              className={`mt-1 block w-full border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm h-12 px-3`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone *
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formValues.phone}
              onChange={handleChange}
              className={`mt-1 block w-full border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm h-12 px-3`}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Country */}
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Country *
            </label>
            <select
              id="country"
              name="country"
              value={formValues.country}
              onChange={handleChange}
              className={`mt-1 block w-full border ${
                errors.country ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm h-12 px-3`}
            >
              <option value="">-- Select --</option>
              <option value="Nigeria">Nigeria</option>
              <option value="USA">USA</option>
            </select>
            {errors.country && (
              <p className="text-red-500 text-xs mt-1">{errors.country}</p>
            )}
          </div>

          {/* State */}
          <div>
            <label
              htmlFor="area"
              className="block text-sm font-medium text-gray-700"
            >
              State
            </label>
            <input
              type="text"
              id="area"
              name="area"
              value={formValues.area}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm h-12 px-3"
            />
          </div>

          {/* City */}
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formValues.city}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm h-12 px-3"
            />
          </div>

          {/* Zip Code */}
          <div>
            <label
              htmlFor="zipCode"
              className="block text-sm font-medium text-gray-700"
            >
              Zip Code
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formValues.zipCode}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm h-12 px-3"
            />
          </div>

          {/* Street Address */}
          <div className="md:col-span-2">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Street Address *
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formValues.address}
              onChange={handleChange}
              className={`mt-1 block w-full border ${
                errors.address ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm h-12 px-3`}
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">{errors.address}</p>
            )}
          </div>

          {/* Actions */}
          <div className="md:col-span-2 flex justify-end space-x-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded-lg"
            >
              {formType === "edit" ? "Update Address" : "Add Address"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressFormModal;
