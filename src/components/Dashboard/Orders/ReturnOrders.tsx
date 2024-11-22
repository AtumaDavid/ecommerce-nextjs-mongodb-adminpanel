"use client";

import React, { useState } from "react";
import Pagination from "../Products/Pagination";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { SiMicrosoftexcel } from "react-icons/si";
import { LuPrinter } from "react-icons/lu";
import { CiExport, CiFilter } from "react-icons/ci";
import Link from "next/link";

interface Order {
  id: string;
  customer: string;
  referenceNo: string; // New field
  total: number; // New field
  reason: string; // New field
  date: string;
}

const ReturnOrders = () => {
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Simulating more data for pagination
  const orders: Order[] = Array.from({ length: 25 }, (_, index) => ({
    id: `181${1243 - index}`,

    customer: "Will Smith",
    referenceNo: `REF${Math.floor(Math.random() * 10000)}`, // Simulated reference number
    total: Math.round(Math.random() * 1000 * 100) / 100, // Total amount
    reason: index % 2 === 0 ? "Damaged" : "Wrong Item", // Simulated reason
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
                Customer
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reference No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reason
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

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.date}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.referenceNo}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${order.total.toFixed(2)}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.reason}
                </td>

                <td className="px-4 py-3 no-print">
                  <div className="flex gap-3">
                    <Link
                      href={"/dashboard/return-orders/[id]"}
                      as={`/dashboard/return-orders/${1}`}
                      className="text-blue-500 hover:text-blue-700 "
                    >
                      {/* <h4 className="hidden ">View</h4> */}
                      <FaEye className="w-4 h-4" />
                    </Link>
                    <button className="text-green-500 hover:text-green-700">
                      <FaEdit className="w-4 h-4" />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
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

export default ReturnOrders;
