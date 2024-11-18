"use client";

import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  data: number[]; // Initial data
  labels: string[]; // Initial labels
  title?: string; // Optional chart title
}

export default function CustomerStats({ data, labels, title }: BarChartProps) {
  const [chartData, setChartData] = useState<ChartData<"bar">>({
    labels,
    datasets: [
      {
        label: "Customer Stats",
        data,
        backgroundColor: "rgba(59, 130, 246, 0.8)", // Tailwind `blue-500`
        borderColor: "rgba(37, 99, 235, 1)", // Tailwind `blue-600`
        borderWidth: 1,
      },
    ],
  });

  // Dynamic data update example
  useEffect(() => {
    setChartData({
      labels,
      datasets: [
        {
          label: "Customer Stats",
          data,
          backgroundColor: "rgba(3, 113, 113, 0.5)",
          borderColor: "rgba(3, 49, 46, 1)",
          borderWidth: 1,
        },
      ],
    });
  }, [data, labels]); // Updates whenever `data` or `labels` props change

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false, // Ensures the chart is responsive
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: !!title,
        text: title || "",
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Hides the grid lines
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false, // Hides the grid lines
        },
        ticks: {
          callback: (tickValue: string | number) => `${tickValue}`, // Adjusted parameter type
        },
      },
    },
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 w-full">
      <div className="h-64 sm:h-72 lg:h-96">
        {" "}
        {/* Adjust height based on screen size */}
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}
