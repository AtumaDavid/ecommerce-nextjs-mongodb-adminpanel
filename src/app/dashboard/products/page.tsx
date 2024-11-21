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

const ITEMS_PER_PAGE = 10;

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
      <div className="text-xl font-medium text-gray-600 p-2">
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
