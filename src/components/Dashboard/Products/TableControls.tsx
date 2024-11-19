// components/TableControls.tsx
import React, { useState } from "react";
import {
  FaPlus,
  FaChevronDown,
  FaFilter,
  FaDownload,
  FaUpload,
  FaPrint,
  FaFileExcel,
} from "react-icons/fa";
import { TableControlsProps } from "./types/product";
// import { TableControlsProps } from "../types/product";

const TableControls: React.FC<TableControlsProps> = ({
  onSearch,
  onAddProduct,
  searchQuery,
  onExport,
}) => {
  const [showExportDropdown, setShowExportDropdown] = useState(false);

  const handleExport = (type: "print" | "excel") => {
    onExport(type);
    setShowExportDropdown(false);
  };

  return (
    <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
      <div className="flex flex-wrap gap-2">
        {/* <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2">
          <span>10</span>
          <FaChevronDown className="w-3 h-3" />
        </button> */}
        <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2">
          <FaFilter className="w-3 h-3" />
          <span>Filter</span>
        </button>
        <div className="relative">
          <button
            onClick={() => setShowExportDropdown(!showExportDropdown)}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2"
          >
            <FaDownload className="w-3 h-3" />
            <span>Export</span>
            <FaChevronDown className="w-3 h-3" />
          </button>
          {showExportDropdown && (
            <div className="absolute z-10 mt-2 w-48 bg-white rounded-lg shadow-lg border">
              <button
                onClick={() => handleExport("print")}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
              >
                <FaPrint className="w-4 h-4" />
                <span>Print</span>
              </button>
              <button
                onClick={() => handleExport("excel")}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
              >
                <FaFileExcel className="w-4 h-4" />
                <span>Export to Excel</span>
              </button>
            </div>
          )}
        </div>
        <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2">
          <FaUpload className="w-3 h-3" />
          <span>Import</span>
        </button>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring focus:ring-primary focus:outline-none"
        />
        <button
          onClick={onAddProduct}
          className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FaPlus className="w-3 h-3" />
          <span>Add Product</span>
        </button>
      </div>
    </div>
  );
};

export default TableControls;
