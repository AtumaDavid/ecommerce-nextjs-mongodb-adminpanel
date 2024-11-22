"use client";

import React, { useState } from "react";
import Pagination from "../Products/Pagination";
import { FaEye } from "react-icons/fa";
import { SiMicrosoftexcel } from "react-icons/si";
import { LuPrinter } from "react-icons/lu";
import { CiExport, CiFilter } from "react-icons/ci";
import Link from "next/link";

interface Order {
  id: string;
  type: string;
  customer: string;
  amount: number;
  date: string;
  status: "Reject" | "Accept";
}

// interface PaginationProps {
//   currentPage: number;
//   totalPages: number;
//   startIndex: number;
//   endIndex: number;
//   totalItems: number;
//   onPageChange: (page: number) => void;
// }

// const Pagination: React.FC<PaginationProps> = ({
//   currentPage,
//   totalPages,
//   startIndex,
//   endIndex,
//   totalItems,
//   onPageChange,
// }) => {
//   return (
//     <div className="flex justify-between items-center mt-6 flex-wrap gap-4">
//       <span className="text-sm text-gray-600">
//         Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of{" "}
//         {totalItems} entries
//       </span>
//       <div className="flex gap-2">
//         {Array.from({ length: totalPages }, (_, i) => (
//           <button
//             key={i + 1}
//             onClick={() => onPageChange(i + 1)}
//             className={`px-3 py-1 rounded ${
//               currentPage === i + 1
//                 ? "bg-blue-500 text-white"
//                 : "border hover:bg-gray-50"
//             }`}
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

const RefundOrders = () => {
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Simulating more data for pagination
  const orders: Order[] = Array.from({ length: 25 }, (_, index) => ({
    id: `181${1243 - index}`,
    type: "Delivery",
    customer: "Will Smith",
    amount: Math.round(Math.random() * 1000 * 100) / 100,
    date: "05:55 PM, 18-11-2024",
    status: index % 3 === 0 ? "Reject" : "Accept",
  }));

  // Pagination calculations
  const totalItems = orders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = orders.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl text-gray-700">Orders</h1>
        <div className="flex gap-2">
          {/* Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="px-4 py-2 border border-gray-300 rounded-md flex items-center gap-2 hover:bg-gray-50"
            >
              <CiFilter className="h-4 w-4" />
              Filter
            </button>
            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200">
                <div className="py-1">
                  {/* <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                    Status: All
                  </button> */}
                  <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                    Status: Accept
                  </button>
                  <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                    Status: Reject
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Export Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsExportOpen(!isExportOpen)}
              className="px-4 py-2 border border-gray-300 rounded-md flex items-center gap-2 hover:bg-gray-50"
            >
              <CiExport className="h-4 w-4" />
              Export
            </button>
            {isExportOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200">
                <div className="py-1">
                  <button className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left flex items-center gap-2">
                    <LuPrinter className="h-4 w-4" />
                    Print
                  </button>
                  <button className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left flex items-center gap-2">
                    <SiMicrosoftexcel className="h-4 w-4" />
                    XLS
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order Type
              </th> */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.id}
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {order.type}
                  </span>
                </td> */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.customer}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.status === "Accept"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Link
                    href={"#"}
                    as={`#`}
                    className="text-blue-500 hover:text-blue-700 "
                  >
                    {/* <h4 className="hidden ">View</h4> */}
                    <FaEye className="w-4 h-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        startIndex={startIndex}
        endIndex={endIndex}
        totalItems={totalItems}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default RefundOrders;
