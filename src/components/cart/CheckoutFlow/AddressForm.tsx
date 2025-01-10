"use client";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Country, State, City } from "country-state-city";
import Select from "react-select";

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

// Transform countries for react-select
const countryOptions = Country.getAllCountries().map((country) => ({
  value: country.name,
  label: country.name,
}));

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

  const [selectedCountry, setSelectedCountry] = useState("ng");
  const [selectedState, setSelectedState] = useState("");

  // Countries Dropdown
  const countries = Country.getAllCountries();

  // Get States for Selected Country
  const states = selectedCountry
    ? State.getStatesOfCountry(selectedCountry)
    : [];

  // Get Cities for Selected State
  const cities =
    selectedCountry && selectedState
      ? City.getCitiesOfState(selectedCountry, selectedState)
      : [];

  // Update form field with phone and country
  const updatePhoneField = (phone: string, country: any) => {
    updateFormField("phone", phone);
    setSelectedCountry(country.countryCode);
    updateFormField("country", country.countryCode.toUpperCase());
  };

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

  // Handle Country Change
  const handleCountryChange = (countryName: string) => {
    updateFormField("country", countryName);

    // Find the corresponding country code to set states
    const selectedCountry = countries.find((c) => c.name === countryName);
    setSelectedCountry(selectedCountry ? selectedCountry.isoCode : "");

    // Reset dependent fields
    updateFormField("state", "");
    updateFormField("city", "");
    setSelectedState("");
  };

  // Handle State Change
  const handleStateChange = (stateName: string) => {
    updateFormField("state", stateName);

    // Find the corresponding state code
    const selectedState = states.find((s) => s.name === stateName);
    setSelectedState(selectedState ? selectedState.isoCode : "");

    // Reset city
    updateFormField("city", "");
  };

  return (
    <div className="space-y-4 p-4 sm:p-6">
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
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <PhoneInput
            country={selectedCountry}
            value={formData.phone}
            onChange={(phone, country) => updatePhoneField(phone, country)}
            inputProps={{
              required: true,
              className: `
          w-full 
          p-2 
          pl-12 
          border 
          rounded-lg 
          focus:outline-none 
          focus:ring-2 
          focus:ring-blue-500 
          ${errors.phone ? "border-red-500" : "border-gray-300"}
        `,
            }}
            specialLabel=""
            containerClass="w-full"
            dropdownClass="custom-dropdown"
            inputClass="!w-full !p-2 !pl-12"
            buttonClass="!border-r-0 !rounded-l-lg"
            searchClass="!text-sm"
            disableSearchIcon={false}
            enableSearch={true}
            searchPlaceholder="Search country"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1 absolute">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* Country, State, City Selects */}
      {/* Country Dropdown */}
      <div>
        <label className="block mb-1">
          Country <span className="text-red-500">*</span>
        </label>
        <Select
          options={countryOptions}
          value={
            formData.country
              ? { value: formData.country, label: formData.country }
              : null
          }
          onChange={(selectedOption) => {
            const country = selectedOption as { value: string; label: string };
            handleCountryChange(country.value);
          }}
          placeholder="Select Country"
          className={`w-full ${errors.country ? "border-red-500" : ""}`}
          classNamePrefix="react-select"
          styles={{
            control: (base) => ({
              ...base,
              borderColor: errors.country ? "red" : base.borderColor,
            }),
          }}
          isSearchable={true}
          noOptionsMessage={() => "No countries found"}
        />
        {errors.country && (
          <p className="text-red-500 text-sm mt-1">{errors.country}</p>
        )}
      </div>

      {/* State Dropdown */}
      <div>
        <label className="block mb-1">
          State <span className="text-red-500">*</span>
        </label>
        <select
          className={`w-full p-2 border rounded-lg ${
            errors.state ? "border-red-500" : ""
          }`}
          value={formData.state}
          onChange={(e) => handleStateChange(e.target.value)}
          disabled={!selectedCountry}
        >
          <option value="">Select State</option>
          {states
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((state) => (
              <option key={state.isoCode} value={state.name}>
                {state.name}
              </option>
            ))}
        </select>
        {errors.state && (
          <p className="text-red-500 text-sm mt-1">{errors.state}</p>
        )}
      </div>

      {/* City Dropdown */}
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
          disabled={!selectedState}
        >
          <option value="">Select City</option>
          {cities
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
        </select>
        {errors.city && (
          <p className="text-red-500 text-sm mt-1">{errors.city}</p>
        )}
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
