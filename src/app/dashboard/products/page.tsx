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
import axiosInstance from "@/lib/axiosInstance";
import { createPrintStyle, exportToExcel } from "@/utils/exportUtils";
import React, { useState, useMemo, useEffect } from "react";

const ITEMS_PER_PAGE = 10;

const DashboardProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(
    undefined
  );

  // SORT AND FILTER PRODUCTS
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    if (searchQuery) {
      filtered = filtered.filter((product) => {
        const productName = product.name || ""; // Default to an empty string if undefined
        const productCategory = product.category || ""; // Default to an empty string if undefined
        return (
          productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          productCategory.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    }

    filtered.sort((a, b) => {
      // const aValue = a[sortField];
      // const bValue = b[sortField];
      const aValue =
        sortField === "categoryInfo" ? a.categoryInfo?.category : a[sortField];
      const bValue =
        sortField === "categoryInfo" ? b.categoryInfo?.category : b[sortField];

      if (sortField === "createdAt") {
        return sortOrder === "asc"
          ? new Date(aValue).getTime() - new Date(bValue).getTime()
          : new Date(bValue).getTime() - new Date(aValue).getTime();
      }

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

  // PAGINATION CALCULATIONS
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

  // FETCH PRODUCT
  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("/products");
      // console.log(response.data.data);
      const sortedProducts = response.data.data.sort(
        (a: Product, b: Product) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }
      );
      // setProducts(response.data.data);
      setProducts(sortedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  // ADD PRODUCT
  const handleAddProduct = async (productData: ProductFormData) => {
    try {
      const response = await axiosInstance.post("/products", productData);
      // console.log("Product added:", response.data);
      setProducts((prevProducts) => [response.data, ...prevProducts]);
      await fetchProducts();
      setIsSidebarOpen(false);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // DELETE
  const deleteProduct = async (_id: number) => {
    try {
      const response = await axiosInstance.delete(`/products/${_id}`);
      if (response.status === 200) {
        alert("product deleted successfully");
        fetchProducts();
      }
    } catch (error) {
      console.error("Failed to delete product:", error);
      alert("Failed to delete product");
    }
  };

  // UPDATE PRODUCT
  const handleUpdateProduct = async (productData: ProductFormData) => {
    try {
      const response = await axiosInstance.put(
        `/products/${productData._id}`,
        productData
      );
      console.log("Product updated:", response.data);

      // Update the products state with the updated product
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === response.data._id ? response.data : product
        )
      );
      setIsSidebarOpen(false);
      setEditingProduct(undefined); // Reset editing product
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // EDIT PRODUCT
  const handleEditProduct = async (_id: number) => {
    try {
      const response = await axiosInstance.get(`/products/${_id}`);
      if (response.data?.status && response.data.data) {
        setEditingProduct(response.data.data); // Pass the actual product data
        setIsSidebarOpen(true);
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
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
          // onEditProduct={handleEditProduct}
          editProduct={handleEditProduct}
          DeleteProduct={deleteProduct}
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
        onClose={() => {
          setIsSidebarOpen(false);
          setEditingProduct(undefined);
        }}
        title={editingProduct ? "Edit Product" : "Add New Product"}
      >
        <AddProductForm
          onSubmit={
            editingProduct
              ? handleUpdateProduct // Use the new update function
              : handleAddProduct
          }
          initialData={editingProduct}
        />
      </SidebarForm>
    </div>
  );
};

export default DashboardProduct;
