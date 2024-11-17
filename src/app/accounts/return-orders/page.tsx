// import React from "react";

// export default function page() {
//   return (
//     <div className="p-6 w-full max-w-4xl">
//       <h1 className="text-2xl font-semibold text-red-500 mb-6">
//         Return Orders
//       </h1>

//       <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
//         <table className="w-full min-w-[600px]">
//           <thead className="border-b">
//             <tr className="text-left">
//               <th className="p-4 font-medium">Order ID</th>
//               <th className="p-4 font-medium">Products</th>
//               <th className="p-4 font-medium">Status</th>
//               <th className="p-4 font-medium">Amount</th>
//               <th className="p-4 font-medium">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td className="p-4 text-gray-500" colSpan={5}>
//                 Showing 0 of results
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

import React from "react";

export default function Page() {
  return (
    <div className="p-3 sm:p-4 md:p-6 w-full max-w-4xl mx-auto">
      <h1 className="text-xl sm:text-2xl font-semibold text-primary mb-4 sm:mb-6">
        Return Orders
      </h1>

      <div className="bg-white rounded-lg shadow-sm">
        {/* Desktop and Tablet View */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b bg-gray-50">
              <tr className="text-left">
                <th className="px-4 py-3 font-medium text-sm text-gray-700">
                  Order ID
                </th>
                <th className="px-4 py-3 font-medium text-sm text-gray-700">
                  Products
                </th>
                <th className="px-4 py-3 font-medium text-sm text-gray-700">
                  Status
                </th>
                <th className="px-4 py-3 font-medium text-sm text-gray-700">
                  Amount
                </th>
                <th className="px-4 py-3 font-medium text-sm text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-4 text-sm text-gray-500" colSpan={5}>
                  Showing 0 of results
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="block sm:hidden">
          <div className="grid grid-cols-1 gap-4 p-4">
            <div className="bg-gray-50 rounded p-4 text-sm text-gray-500 text-center">
              Showing 0 of results
            </div>

            {/* Example of how a record would look on mobile */}
            {/* Uncomment and modify when you have actual data
            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium text-gray-900">Order ID</div>
                  <div className="text-sm text-gray-500">#123456</div>
                </div>
                <div className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                  Pending
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="text-sm">
                  <span className="font-medium text-gray-700">Products:</span>
                  <span className="text-gray-500 ml-2">2 items</span>
                </div>
                <div className="text-sm">
                  <span className="font-medium text-gray-700">Amount:</span>
                  <span className="text-gray-500 ml-2">$99.99</span>
                </div>
              </div>
              
              <button className="w-full px-4 py-2 text-sm font-medium text-red-500 border border-red-500 rounded-lg hover:bg-red-50 transition-colors">
                View Details
              </button>
            </div>
            */}
          </div>
        </div>
      </div>
    </div>
  );
}
