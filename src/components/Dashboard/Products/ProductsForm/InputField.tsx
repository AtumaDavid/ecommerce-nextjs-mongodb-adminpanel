import React from "react";

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  error,
  type = "text",
}) => (
  <div>
    <label className="block text-gray-700 font-bold mb-2">
      {label} <span className="text-red-500">*</span>
    </label>
    <input
      type={type}
      className="w-full border border-gray-300 p-2 rounded focus:outline-blue-500"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    {error && <div className="text-red-500">{error}</div>}
  </div>
);

export default InputField;
