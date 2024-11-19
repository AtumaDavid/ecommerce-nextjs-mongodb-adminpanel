// components/Pagination.tsx
import React from "react";
import { PaginationProps } from "./types/product";

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  totalItems,
  onPageChange,
}) => {
  return (
    <div className="flex justify-between items-center mt-6 flex-wrap gap-4">
      <span className="text-sm text-gray-600">
        Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of{" "}
        {totalItems} entries
      </span>
      <div className="flex gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => onPageChange(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "border hover:bg-gray-50"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
