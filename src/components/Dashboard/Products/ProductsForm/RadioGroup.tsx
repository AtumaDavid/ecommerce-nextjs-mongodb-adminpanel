import React from "react";

interface RadioGroupProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  value,
  onChange,
  options,
}) => (
  <div>
    <label className="block text-gray-700 font-bold mb-2">
      {label} <span className="text-red-500">*</span>
    </label>
    <div className="flex items-center space-x-4">
      {options.map((option) => (
        <label key={option.value} className="inline-flex items-center">
          <input
            type="radio"
            name={label}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
          />
          <span className="ml-2">{option.label}</span>
        </label>
      ))}
    </div>
  </div>
);

export default RadioGroup;
