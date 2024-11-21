"use client";
import AddProductForm from "@/components/Dashboard/Products/AddProductForm";
import Pagination from "@/components/Dashboard/Products/Pagination";
import ProductTable from "@/components/Dashboard/Products/ProductTable";
import SidebarForm from "@/components/Dashboard/Products/SidebarForm";
import TableControls from "@/components/Dashboard/Products/TableControls";
import {
  Product,
  ProductFormData,
  SortField,
  SortOrder,
} from "@/components/Dashboard/Products/types/product";
import { createPrintStyle, exportToExcel } from "@/utils/exportUtils";
import React, { useState, useMemo } from "react";

const ITEMS_PER_PAGE = 10;

// interface CategoryInfo {
//   gender: string;
//   category: string;
//   subcategory: string;
// }

// interface ProductFormData {
//   name: string;
//   categoryInfo: CategoryInfo;
//   buyingPrice: string; // Assuming this is a string from the form
//   sellingPrice: string; // Assuming this is a string from the form
//   status: string;
//   description: string;
//   barcode: string;
//   tax: "No Vat" | "Vat-5" | "Vat-10" | "Vat-20"; // Assuming these are the only possible values
//   canPurchasable: boolean;
//   showStockOut: boolean;
//   refundable: boolean;
//   maxPurchaseQuantity: string; // Assuming this is a string from the form
//   lowStockWarning: string; // Assuming this is a string from the form
//   unit: string;
//   tags?: string[]; // Optional, assuming it can be an array of strings
// }

const DashboardProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(
    undefined
  );

  // Sort and filter products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
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
  }, [products, searchQuery, sortField, sortOrder]);

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

  const handleAddProduct = (formData: ProductFormData) => {
    const newProduct: Product = {
      id: Date.now(), // Unique ID
      name: formData.name,
      image: `https://via.placeholder.com/80?text=${encodeURIComponent(
        formData.name
      )}`,
      category: `${formData.categoryInfo.gender} - ${formData.categoryInfo.category} - ${formData.categoryInfo.subcategory}`,
      buyingPrice: parseFloat(formData.buyingPrice),
      sellingPrice: parseFloat(formData.sellingPrice),
      status: formData.status as "Active" | "Inactive",
      description: formData.description,
      barcode: parseInt(formData.barcode, 10),
      tax: formData.tax as "No Vat" | "Vat-5" | "Vat-10" | "Vat-20", // Cast to the correct type
      canPurchasable: formData.canPurchasable.toString(),
      showStockOut: formData.showStockOut.toString(),
      refundable: formData.refundable.toString(), // Add this line
      maxPurchaseQuantity: parseInt(formData.maxPurchaseQuantity).toString(), // Add this line
      lowStockWarning: parseInt(formData.lowStockWarning).toString(), // Add this line
      unit: formData.unit, // Add this line
      tags: formData.tags || [], // Add this line, ensure it's an array
    };

    setProducts((prevProducts) => [...prevProducts, newProduct]);
    setIsSidebarOpen(false);
  };

  const handleUpdateProduct = (formData: ProductFormData) => {
    if (editingProduct) {
      const updatedProduct: Product = {
        ...editingProduct,
        name: formData.name,
        category: `${formData.categoryInfo.gender} - ${formData.categoryInfo.category} - ${formData.categoryInfo.subcategory}`,
        buyingPrice: parseFloat(formData.buyingPrice),
        sellingPrice: parseFloat(formData.sellingPrice),
        status: formData.status as "Active" | "Inactive",
        description: formData.description,
        barcode: parseInt(formData.barcode, 10),
        tax: formData.tax as "No Vat" | "Vat-5" | "Vat-10" | "Vat-20", // Cast to the correct type
        canPurchasable: formData.canPurchasable.toString(),
        showStockOut: formData.showStockOut.toString(),
        refundable: formData.refundable.toString(), // Add this line
        maxPurchaseQuantity: parseInt(formData.maxPurchaseQuantity).toString(), // Add this line
        lowStockWarning: parseInt(formData.lowStockWarning).toString(), // Add this line
        unit: formData.unit, // Add this line
        tags: formData.tags || [], // Add this line, ensure it's an array
      };

      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === editingProduct.id ? updatedProduct : p
        )
      );
      setIsSidebarOpen(false);
      setEditingProduct(undefined);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsSidebarOpen(true);
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
      const printStyle = createPrintStyle();
      document.head.appendChild(printStyle);
      window.print();
      setTimeout(() => {
        document.head.removeChild(printStyle);
      }, 100);
    } else {
      exportToExcel(filteredAndSortedProducts);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto">
      <div className="text-xl font-medium text-gray-600 p-2">
        <span>
          Dashboard /{" "}
          <a href="#" className="hover:underline">
            Products
          </a>
        </span>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-3">
        <TableControls
          onSearch={handleSearch}
          onAddProduct={() => setIsSidebarOpen(true)}
          searchQuery={searchQuery}
          onExport={handleExport}
        />

        <ProductTable
          products={currentProducts}
          sortConfig={{ field: sortField, order: sortOrder }}
          onSort={handleSort}
          formatPrice={formatPrice}
          onEditProduct={handleEditProduct}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          startIndex={startIndex}
          endIndex={endIndex}
          totalItems={filteredAndSortedProducts.length}
          onPageChange={handlePageChange}
        />
      </div>

      <SidebarForm
        isOpen={isSidebarOpen}
        // onClose={() => setIsSidebarOpen(false)}
        onClose={() => {
          setIsSidebarOpen(false);
          setEditingProduct(undefined);
        }}
        // title="Add New Product"
        title={editingProduct ? "Edit Product" : "Add New Product"}
      >
        {/* <AddProductForm onSubmit={handleAddProduct} /> */}
        <AddProductForm
          onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
          initialData={editingProduct}
        />
      </SidebarForm>
    </div>
  );
};

export default DashboardProduct;
