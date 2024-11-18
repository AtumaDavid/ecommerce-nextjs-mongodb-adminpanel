"use client";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { FaChartBar } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SalesChart: React.FC = () => {
  const [salesData, setSalesData] = useState<{ total: number; avg: number }>({
    total: 0,
    avg: 0,
  });
  const [dailySales, setDailySales] = useState<
    { date: Date; amount: number }[]
  >([]);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [filteredData, setFilteredData] = useState<
    { date: string; amount: number }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const totalSales = 1673200; // Total sales in Naira
      const avgSales = totalSales / 31;
      const generatedSalesData = Array.from({ length: 31 }, (_, i) => ({
        date: new Date(2024, 10, i + 1), // Dates in November 2024
        amount: Math.random() * (totalSales / 31) * 1.5,
      }));

      setSalesData({ total: totalSales, avg: avgSales });
      setDailySales(generatedSalesData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (fromDate && toDate) {
      const filtered = dailySales.filter(
        (entry) => entry.date >= fromDate && entry.date <= toDate
      );
      setFilteredData(
        filtered.map((entry) => ({
          date: entry.date.toLocaleDateString("en-NG", {
            day: "numeric",
            month: "short",
          }),
          amount: entry.amount,
        }))
      );
    } else {
      setFilteredData(
        dailySales.map((entry) => ({
          date: entry.date.toLocaleDateString("en-NG", {
            day: "numeric",
            month: "short",
          }),
          amount: entry.amount,
        }))
      );
    }
  }, [fromDate, toDate, dailySales]);

  const MetricCard = ({
    icon,
    label,
    value,
  }: {
    icon: React.ReactNode;
    label: string;
    value: string;
  }) => (
    <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border border-gray-200">
      <div className="flex items-center justify-between flex-wrap">
        <div className="bg-gray-100 p-3 rounded-lg">{icon}</div>
        <div>
          <p className="text-sm font-medium text-gray-500 truncate">{label}</p>
          <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
            {value}
          </h3>
        </div>
      </div>
    </div>
  );

  const chartData: ChartData<"line"> = {
    labels: filteredData.map((entry) => entry.date),
    datasets: [
      {
        label: "Daily Sales (₦)",
        data: filteredData.map((entry) => entry.amount),
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.5)",
        tension: 0.4,
        pointRadius: 2,
        pointHoverRadius: 5,
      },
    ],
  };

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const rawValue = context.parsed as unknown as number;
            return `₦${rawValue.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: (tickValue: string | number) => {
            const value =
              typeof tickValue === "string" ? parseFloat(tickValue) : tickValue;
            return `₦${value}`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <MetricCard
          icon={<FaChartBar className="w-6 h-6 text-gray-400" />}
          label="Total Sales"
          value={`₦${Intl.NumberFormat("en-NG").format(salesData.total)}`}
        />
        <MetricCard
          icon={<FaChartBar className="w-6 h-6 text-gray-400" />}
          label="Avg Sales Per Day"
          value={`₦${Intl.NumberFormat("en-NG").format(salesData.avg)}`}
        />
      </div>

      {/* Date Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center space-x-2">
          <label
            htmlFor="fromDate"
            className="text-sm font-medium text-gray-700"
          >
            From:
          </label>
          <DatePicker
            id="fromDate"
            selected={fromDate}
            onChange={(date) => setFromDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Start Date"
            className="border border-gray-300 rounded-md p-2 w-40"
          />
        </div>
        <div className="flex items-center space-x-2">
          <label htmlFor="toDate" className="text-sm font-medium text-gray-700">
            To:
          </label>
          <DatePicker
            id="toDate"
            selected={toDate}
            onChange={(date) => setToDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="End Date"
            className="border border-gray-300 rounded-md p-2 w-40"
          />
        </div>
        <button
          onClick={() => {
            setFromDate(null);
            setToDate(null);
          }}
          className="bg-primary text-white px-4 py-2 rounded-md"
        >
          Reset
        </button>
      </div>

      {/* Sales Chart */}
      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border border-gray-200 overflow-x-auto">
        <div className="h-64">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default SalesChart;
