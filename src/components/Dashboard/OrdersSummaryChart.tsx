"use client";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Order {
  id: string;
  date: Date;
  amount: number;
}

interface OrderData {
  total: number;
  delivered: { count: number; data: Order[] };
  canceled: { count: number; data: Order[] };
  rejected: { count: number; data: Order[] };
}

const OrderSummaryChart: React.FC = () => {
  const [orderData, setOrderData] = useState<OrderData>({
    total: 0,
    delivered: { count: 0, data: [] },
    canceled: { count: 0, data: [] },
    rejected: { count: 0, data: [] },
  });
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  useEffect(() => {
    const initialData = generateFixedData(); // Changed to fixed data generation
    setOrderData(initialData);
  }, []);

  const generateFixedData = (): OrderData => {
    const total = 150; // Fixed total orders
    const delivered = 90; // Fixed delivered orders
    const canceled = 30; // Fixed canceled orders
    const rejected = total - delivered - canceled; // Calculate rejected orders

    const fixedDate = new Date("2023-10-01"); // Fixed date for order generation

    const generateOrders = (count: number): Order[] =>
      Array.from({ length: count }, (_, index) => ({
        id: `ORD-${index + 1}`, // Fixed ID generation
        date: new Date(fixedDate.getTime() - index * 24 * 60 * 60 * 1000), // Use fixed date for the last few days
        amount: 500, // Fixed amount for simplicity
      }));

    return {
      total,
      delivered: { count: delivered, data: generateOrders(delivered) },
      canceled: { count: canceled, data: generateOrders(canceled) },
      rejected: { count: rejected, data: generateOrders(rejected) },
    };
  };

  const calculatePercentage = (value: number): number => {
    return orderData.total
      ? parseFloat(((value / orderData.total) * 100).toFixed(1))
      : 0;
  };

  const calculateStrokeValues = (count: number): number => {
    const totalCircumference = 440; // Full circle
    return (count / (orderData.total || 1)) * totalCircumference;
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Date Filters */}
      <div className="flex flex-wrap justify-start gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-600">From:</label>
          <DatePicker
            selected={fromDate}
            onChange={(date) => setFromDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Start Date"
            className="border border-gray-300 rounded-md p-2 text-sm"
          />
        </div>
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-600">To:</label>
          <DatePicker
            selected={toDate}
            onChange={(date) => setToDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="End Date"
            className="border border-gray-300 rounded-md p-2 text-sm"
          />
        </div>
        <button
          onClick={() => {
            setFromDate(null);
            setToDate(null);
          }}
          className="bg-primary text-white text-sm px-4 py-2 rounded-md hover:bg-primary-dark transition"
        >
          Reset
        </button>
      </div>

      {/* Chart and Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Circle Chart */}
        <div className="flex justify-center items-center">
          <div className="relative w-40 h-40">
            <svg
              className="transform -rotate-90"
              width="160"
              height="160"
              viewBox="0 0 160 160"
            >
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="10"
              />
              {/* Delivered */}
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="#34d399"
                strokeWidth="10"
                strokeDasharray={`${calculateStrokeValues(
                  orderData.delivered.count
                )}, 440`}
                strokeDashoffset="0"
              />
              {/* Canceled */}
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="#f87171"
                strokeWidth="10"
                strokeDasharray={`${calculateStrokeValues(
                  orderData.canceled.count
                )}, 440`}
                strokeDashoffset={`-${calculateStrokeValues(
                  orderData.delivered.count
                )}`}
              />
              {/* Rejected */}
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="10"
                strokeDasharray={`${calculateStrokeValues(
                  orderData.rejected.count
                )}, 440`}
                strokeDashoffset={`-${
                  calculateStrokeValues(orderData.delivered.count) +
                  calculateStrokeValues(orderData.canceled.count)
                }`}
              />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-semibold text-gray-800">
                {orderData.total}
              </p>
            </div>
          </div>
        </div>

        {/* Progress Bars */}
        <div>
          <div className="mb-4">
            <span className="inline-block w-3 h-3 bg-[#34d399] rounded-full mr-2"></span>
            Delivered: {orderData.delivered.count}(
            {calculatePercentage(orderData.delivered.count)}%)
          </div>
          <div className="mb-4">
            <span className="inline-block w-3 h-3 bg-[#f87171] rounded-full mr-2"></span>
            Canceled: {orderData.canceled.count}(
            {calculatePercentage(orderData.canceled.count)}%)
          </div>
          <div className="mb-4">
            <span className="inline-block w-3 h-3 bg-[#fbbf24] rounded-full mr-2"></span>
            Rejected: {orderData.rejected.count}(
            {calculatePercentage(orderData.rejected.count)}%)
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryChart;
