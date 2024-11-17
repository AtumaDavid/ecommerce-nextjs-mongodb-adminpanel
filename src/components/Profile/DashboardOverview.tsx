import React from "react";
// import OrderHistory from "./OrderHistory";

export default function DashboardOverview() {
  return (
    <div className="p-6 w-full max-w-4xl">
      <div className="mb-8">
        <h2 className="text-xl mb-4">Welcome Back, Will Smith!</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-pink-500 text-white rounded-lg flex items-center justify-center mb-3">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <div className="text-3xl font-semibold mb-1">3</div>
            <div className="text-gray-500 text-sm">Total Orders</div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-red-500 text-white rounded-lg flex items-center justify-center mb-3">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <div className="text-3xl font-semibold mb-1">2</div>
            <div className="text-gray-500 text-sm">Total Completed</div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-purple-500 text-white rounded-lg flex items-center justify-center mb-3">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3"
                />
              </svg>
            </div>
            <div className="text-3xl font-semibold mb-1">1</div>
            <div className="text-gray-500 text-sm">Total Returned</div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-blue-500 text-white rounded-lg flex items-center justify-center mb-3">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </div>
            <div className="text-3xl font-semibold mb-1">$0.00</div>
            <div className="text-gray-500 text-sm">Wallet Balance</div>
          </div>
        </div>
      </div>
    </div>
  );
}
