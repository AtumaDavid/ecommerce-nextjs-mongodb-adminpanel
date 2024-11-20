import React from "react";

interface TextAreaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const TextArea: React.FC<TextAreaProps> = ({ label, value, onChange }) => (
  <div className="sm:col-span-2">
    <label className="block text-gray-700 font-bold mb-2">{label}</label>
    <textarea
      className="w-full border border-gray-300 p-2 rounded focus:outline-blue-500"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={4} // Adjust the number of rows as needed
    />
  </div>
);

export default TextArea;
