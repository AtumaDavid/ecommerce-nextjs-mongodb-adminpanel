// components/DashboardProduct.tsx
"use client";
import AddProductForm from "@/components/Dashboard/Products/AddProductForm";
import Pagination from "@/components/Dashboard/Products/Pagination";
import ProductTable from "@/components/Dashboard/Products/ProductTable";
import SidebarForm from "@/components/Dashboard/Products/SidebarForm";
import TableControls from "@/components/Dashboard/Products/TableControls";
import {
  Product,
  SortField,
  SortOrder,
} from "@/components/Dashboard/Products/types/product";
import { createPrintStyle, exportToExcel } from "@/utils/exportUtils";
import React, { useState, useMemo } from "react";
// import { GrClose } from "react-icons/gr";
// import TableControls from "./TableControls";
// import ProductTable from "./ProductTable";
// import Pagination from "./Pagination";
// import { Product, SortField, SortOrder } from "../types/product";

const ITEMS_PER_PAGE = 10;

// Move dummyProducts to a separate data file in a real application
// const dummyProducts: Product[] = [
//   {
//     id: 1,
//     name: "Product 1",
//     image: "https://via.placeholder.com/80",
//     category: "Electronics",
//     buyingPrice: 10000,
//     sellingPrice: 15000,
//     status: "Active",
//     description: "Description for Product 1",
//   },
//   {
//     id: 2,
//     name: "Product 2",
//     image: "https://via.placeholder.com/80",
//     category: "Fashion",
//     buyingPrice: 20000,
//     sellingPrice: 25000,
//     status: "Inactive",
//     description: "Description for Product 2",
//   },
// ];
//   buyingPrice: Math.floor(Math.random() * 500000) + 10000,
//   sellingPrice: Math.floor(Math.random() * 1000000) + 50000,
//   status: Math.random() > 0.2 ? "Active" : "Inactive",
//   description: `Description for Product ${index + 1}`,
// }));
const dummyProducts: Product[] = Array.from({ length: 40 }, (_, index) => ({
  id: index + 1,
  name: `Product ${index + 1}`,
  image: `https://via.placeholder.com/80`,
  category: ["Electronics", "Fashion", "Home & Kitchen", "Books"][
    Math.floor(Math.random() * 4)
  ],
  buyingPrice: Math.floor(Math.random() * 500000) + 10000,
  sellingPrice: Math.floor(Math.random() * 1000000) + 50000,
  status: Math.random() > 0.2 ? "Active" : "Inactive",
  description: `Description for Product ${index + 1}`,
}));

const DashboardProduct = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  // Sort and filter products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...dummyProducts];

    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortOrder === "asc"
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });

    return filtered;
  }, [dummyProducts, searchQuery, sortField, sortOrder]);

  // Pagination calculations
  const totalPages = Math.ceil(
    filteredAndSortedProducts.length / ITEMS_PER_PAGE
  );
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = filteredAndSortedProducts.slice(startIndex, endIndex);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(price);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleExport = (type: "print" | "excel") => {
    if (type === "print") {
      // Add print styles
      const printStyle = createPrintStyle();
      document.head.appendChild(printStyle);

      // Trigger print
      window.print();

      // Remove print styles after printing
      setTimeout(() => {
        document.head.removeChild(printStyle);
      }, 100);
    } else {
      // Export to Excel (CSV)
      exportToExcel(filteredAndSortedProducts);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAddProduct = () => {
    setIsSidebarOpen(true);
  };

  return (
    <div className="container mx-auto">
      {/* Header */}
      <div className="text-xl font-medium text-gray-600">
        <span>
          Dashboard /{" "}
          <a href="#" className="hover:underline">
            Products
          </a>
        </span>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-sm p-3">
        {/* Table Controls */}
        <TableControls
          onSearch={handleSearch}
          onAddProduct={handleAddProduct}
          searchQuery={searchQuery}
          onExport={handleExport}
        />

        {/* Product Table */}
        <ProductTable
          products={currentProducts}
          sortConfig={{ field: sortField, order: sortOrder }}
          onSort={handleSort}
          formatPrice={formatPrice}
        />

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          startIndex={startIndex}
          endIndex={endIndex}
          totalItems={filteredAndSortedProducts.length}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Add Product Sidebar - You can create a separate component for this */}
      <SidebarForm
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        title="Add New Product"
      >
        <AddProductForm
          onSubmit={(data) => {
            console.log("Form submitted:", data);
            setIsSidebarOpen(false);
          }}
        />
      </SidebarForm>
    </div>
  );
};

export default DashboardProduct;
// SIDEBAR!!!!!!
//  {
//    isSidebarOpen && (
//      <div
//        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out ${
//          isSidebarOpen ? "opacity-100" : "opacity-0"
//        }`}
//        onClick={() => setIsSidebarOpen(false)} // Close sidebar when clicking on the overlay
//      >
//        <div
//          className={`fixed right-0 top-0 h-full w-96 bg-white shadow-lg z-50 p-6 transition-transform duration-300 ease-in-out ${
//            isSidebarOpen ? "translate-x-0" : "translate-x-full"
//          }`}
//          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the sidebar
//        >
//          <div className="flex justify-between items-center mb-6">
//            <h2 className="text-xl font-medium">Add New Product</h2>
//            <button
//              onClick={() => setIsSidebarOpen(false)}
//              className="text-gray-500 hover:text-gray-700"
//            >
//              <GrClose />
//            </button>
//          </div>
//          {/* Add your form components here */}
//        </div>
//      </div>
//    );
//  }

// "use client";
// import React, { useState, useMemo } from "react";
// import {
//   FaPlus,
//   FaChevronDown,
//   FaFilter,
//   FaDownload,
//   FaUpload,
//   FaEye,
//   FaEdit,
//   FaTrash,
//   FaTimes,
//   FaSort,
//   FaSortUp,
//   FaSortDown,
//   FaPrint,
//   FaFileExcel,
// } from "react-icons/fa";

// interface Product {
//   id: number;
//   name: string;
//   image: string;
//   category: string;
//   buyingPrice: number;
//   sellingPrice: number;
//   status: "Active" | "Inactive";
//   description: string;
// }

// type SortField = keyof Pick<
//   Product,
//   "name" | "category" | "buyingPrice" | "sellingPrice" | "status"
// >;
// type SortOrder = "asc" | "desc";

// const ITEMS_PER_PAGE = 10;

// // Dummy products with placeholder images
// const dummyProducts: Product[] = Array.from({ length: 20 }, (_, index) => ({
//   id: index + 1,
//   name: `Product ${index + 1}`,
//   image: `https://via.placeholder.com/80`,
//   category: ["Electronics", "Fashion", "Home & Kitchen", "Books"][
//     Math.floor(Math.random() * 4)
//   ],
//   buyingPrice: Math.floor(Math.random() * 500000) + 10000,
//   sellingPrice: Math.floor(Math.random() * 1000000) + 50000,
//   status: Math.random() > 0.2 ? "Active" : "Inactive",
//   description: `Description for Product ${index + 1}`,
// }));

// const DashboardProduct = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortField, setSortField] = useState<SortField>("name");
//   const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
//   const [showExportDropdown, setShowExportDropdown] = useState(false);
//   const [formData, setFormData] = useState<Partial<Product>>({
//     name: "",
//     category: "",
//     buyingPrice: 0,
//     sellingPrice: 0,
//     description: "",
//   });

//   // Sort and filter products
//   const filteredAndSortedProducts = useMemo(() => {
//     let filtered = [...dummyProducts];

//     // Apply search filter
//     if (searchQuery) {
//       filtered = filtered.filter(
//         (product) =>
//           product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           product.description.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     // Apply sorting
//     filtered.sort((a, b) => {
//       const aValue = a[sortField];
//       const bValue = b[sortField];

//       if (typeof aValue === "string" && typeof bValue === "string") {
//         return sortOrder === "asc"
//           ? aValue.localeCompare(bValue)
//           : bValue.localeCompare(aValue);
//       }

//       return sortOrder === "asc"
//         ? (aValue as number) - (bValue as number)
//         : (bValue as number) - (aValue as number);
//     });

//     return filtered;
//   }, [dummyProducts, searchQuery, sortField, sortOrder]);

//   // Pagination calculations
//   const totalPages = Math.ceil(
//     filteredAndSortedProducts.length / ITEMS_PER_PAGE
//   );
//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//   const endIndex = startIndex + ITEMS_PER_PAGE;
//   const currentProducts = filteredAndSortedProducts.slice(startIndex, endIndex);

//   const formatPrice = (price: number) => {
//     return new Intl.NumberFormat("en-NG", {
//       style: "currency",
//       currency: "NGN",
//     }).format(price);
//   };

//   const handleSort = (field: SortField) => {
//     if (sortField === field) {
//       setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//     } else {
//       setSortField(field);
//       setSortOrder("asc");
//     }
//   };

//   const handleExport = (type: "print" | "excel") => {
//     if (type === "print") {
//       window.print();
//     } else {
//       // In a real application, you would implement Excel export here
//       console.log("Exporting to Excel...");
//     }
//     setShowExportDropdown(false);
//   };

//   const getSortIcon = (field: SortField) => {
//     if (sortField !== field) return <FaSort className="w-3 h-3" />;
//     return sortOrder === "asc" ? (
//       <FaSortUp className="w-3 h-3" />
//     ) : (
//       <FaSortDown className="w-3 h-3" />
//     );
//   };

//   return (
//     <div className="container mx-auto p-4">
//       {/* Header */}
//       <div className="text-xl font-medium text-gray-600 mb-6">
//         <span>
//           Dashboard /{" "}
//           <a href="#" className="hover:underline">
//             Products
//           </a>
//         </span>
//       </div>

//       {/* Main Content */}
//       <div className="bg-white rounded-lg shadow-sm p-6">
//         {/* Table Controls */}
//         <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
//           <div className="flex flex-wrap gap-2">
//             <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2">
//               <span>10</span>
//               <FaChevronDown className="w-3 h-3" />
//             </button>
//             <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2">
//               <FaFilter className="w-3 h-3" />
//               <span>Filter</span>
//             </button>
//             <div className="relative">
//               <button
//                 onClick={() => setShowExportDropdown(!showExportDropdown)}
//                 className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2"
//               >
//                 <FaDownload className="w-3 h-3" />
//                 <span>Export</span>
//                 <FaChevronDown className="w-3 h-3" />
//               </button>
//               {showExportDropdown && (
//                 <div className="absolute z-10 mt-2 w-48 bg-white rounded-lg shadow-lg border">
//                   <button
//                     onClick={() => handleExport("print")}
//                     className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
//                   >
//                     <FaPrint className="w-4 h-4" />
//                     <span>Print</span>
//                   </button>
//                   <button
//                     onClick={() => handleExport("excel")}
//                     className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
//                   >
//                     <FaFileExcel className="w-4 h-4" />
//                     <span>Export to Excel</span>
//                   </button>
//                 </div>
//               )}
//             </div>
//             <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2">
//               <FaUpload className="w-3 h-3" />
//               <span>Import</span>
//             </button>
//           </div>
//           <div className="flex gap-2">
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="px-4 py-2 border rounded-lg focus:ring focus:ring-red-500"
//             />
//             <button
//               onClick={() => setIsSidebarOpen(true)}
//               className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
//             >
//               <FaPlus className="w-3 h-3" />
//               <span>Add Product</span>
//             </button>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto">
//           <table className="min-w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th
//                   className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer"
//                   onClick={() => handleSort("name")}
//                 >
//                   <div className="flex items-center gap-2">
//                     PRODUCT
//                     {getSortIcon("name")}
//                   </div>
//                 </th>
//                 <th
//                   className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer"
//                   onClick={() => handleSort("category")}
//                 >
//                   <div className="flex items-center gap-2">
//                     CATEGORY
//                     {getSortIcon("category")}
//                   </div>
//                 </th>
//                 <th
//                   className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer"
//                   onClick={() => handleSort("buyingPrice")}
//                 >
//                   <div className="flex items-center gap-2">
//                     BUYING PRICE
//                     {getSortIcon("buyingPrice")}
//                   </div>
//                 </th>
//                 <th
//                   className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer"
//                   onClick={() => handleSort("sellingPrice")}
//                 >
//                   <div className="flex items-center gap-2">
//                     SELLING PRICE
//                     {getSortIcon("sellingPrice")}
//                   </div>
//                 </th>
//                 <th
//                   className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer"
//                   onClick={() => handleSort("status")}
//                 >
//                   <div className="flex items-center gap-2">
//                     STATUS
//                     {getSortIcon("status")}
//                   </div>
//                 </th>
//                 <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
//                   ACTION
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {currentProducts.map((product) => (
//                 <tr key={product.id} className="hover:bg-gray-50">
//                   <td className="px-4 py-3">
//                     <div className="flex items-center gap-3">
//                       <img
//                         src={product.image}
//                         alt={product.name}
//                         className="h-12 w-12 rounded-lg object-cover"
//                       />
//                       <span className="font-medium text-gray-900">
//                         {product.name}
//                       </span>
//                     </div>
//                   </td>
//                   <td className="px-4 py-3 text-gray-600">
//                     {product.category}
//                   </td>
//                   <td className="px-4 py-3 text-gray-600">
//                     {formatPrice(product.buyingPrice)}
//                   </td>
//                   <td className="px-4 py-3 text-gray-600">
//                     {formatPrice(product.sellingPrice)}
//                   </td>
//                   <td className="px-4 py-3">
//                     <span
//                       className={`px-3 py-1 rounded-full text-sm ${
//                         product.status === "Active"
//                           ? "bg-green-100 text-green-800"
//                           : "bg-red-100 text-red-800"
//                       }`}
//                     >
//                       {product.status}
//                     </span>
//                   </td>
//                   <td className="px-4 py-3">
//                     <div className="flex gap-3">
//                       <button className="text-blue-500 hover:text-blue-700">
//                         <FaEye className="w-4 h-4" />
//                       </button>
//                       <button className="text-green-500 hover:text-green-700">
//                         <FaEdit className="w-4 h-4" />
//                       </button>
//                       <button className="text-red-500 hover:text-red-700">
//                         <FaTrash className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="flex justify-between items-center mt-6 flex-wrap gap-4">
//           <span className="text-sm text-gray-600">
//             Showing {startIndex + 1} to{" "}
//             {Math.min(endIndex, filteredAndSortedProducts.length)} of{" "}
//             {filteredAndSortedProducts.length} entries
//           </span>
//           <div className="flex gap-2">
//             {Array.from({ length: totalPages }, (_, i) => (
//               <button
//                 key={i + 1}
//                 onClick={() => setCurrentPage(i + 1)}
//                 className={`px-3 py-1 rounded ${
//                   currentPage === i + 1
//                     ? "bg-blue-500 text-white"
//                     : "border hover:bg-gray-50"
//                 }`}
//               >
//                 {i + 1}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardProduct;
