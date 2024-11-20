import React from "react";

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  error?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  value,
  onChange,
  options,
  error,
}) => (
  <div>
    <label className="block text-gray-700 font-bold mb-2">
      {label} <span className="text-red-500">*</span>
    </label>
    <select
      className="w-full border border-gray-300 p-2 rounded focus:outline-blue-500"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">--</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && <div className="text-red-500">{error}</div>}
  </div>
);

export default SelectField;
