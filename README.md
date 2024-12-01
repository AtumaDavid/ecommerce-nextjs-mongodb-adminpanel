- React slick (carousel) === [React Slick Site](https://react-slick.neostack.com/)
- npm i yup formik
- multi-range-slider (npm i multi-range-slider-react)
- npm install react-chartjs-2 chart.js react-icons
<!-- - npm install --save-dev @types/draft-js -->
- npm install draft-js
- npm i axios
- npm i js-cookie (save token)
- npm i --save-dev @types/js-cookie
- npm i jwt-decode

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
// import { useProducts } from "@/hooks/useProducts";
// import axiosInstance from "@/lib/axiosInstance";
import { createPrintStyle, exportToExcel } from "@/utils/exportUtils";
import React, { useState, useMemo, useEffect } from "react";

const ITEMS_PER_PAGE = 10;

const DashboardProduct = () => {
// Fetch products
const fetchProducts = async () => {
try {
const response = await axiosInstance.get("/products");
// console.log(response.data.data);
setProducts(response.data.data);
} catch (error) {
console.error("Error fetching products:", error);
}
};
useEffect(() => {
fetchProducts();
}, []);

// DELETE PRODUCT
const deleteProduct = async (\_id: number) => {
try {
const response = await axiosInstance.delete(`/products/${_id}`);
if (response.status === 200) {
alert("Product deleted successfully");
// Fetch the updated list of products
fetchProducts();
}
} catch (error) {
console.error("Failed to delete product:", error);
alert("Failed to delete product");
}
};

// EDIT
const handleEditProduct = (\_id: number) => {
axiosInstance
.get(`/products/${_id}`)
.then((response) => {
if (response.data) {
console.log("Full product data:", response.data);
setIsSidebarOpen(true);
setEditingProduct(response.data);
} else {
console.error("No product data received");
alert("Failed to fetch product details");
}
})
.catch((error) => {
console.error("Error fetching product:", error);
alert("Failed to fetch product details");
});
};

// const handleEditProduct = (product: Product) => {
// setIsSidebarOpen(true);
// setEditingProduct(product); // Directly set the product to edit
// };

// // EDIT PRODUCT
// const editProduct = async (\_id: number) => {

// };

const [products, setProducts] = useState<Product[]>([]);
const [currentPage, setCurrentPage] = useState(1);
const [isSidebarOpen, setIsSidebarOpen] = useState(false);
const [searchQuery, setSearchQuery] = useState("");
const [sortField, setSortField] = useState<SortField>("name");
const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
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
const startIndex = (currentPage - 1) \* ITEMS_PER_PAGE;
const endIndex = startIndex + ITEMS_PER_PAGE;
const currentProducts = filteredAndSortedProducts.slice(startIndex, endIndex);

const formatPrice = (price: number) => {
return new Intl.NumberFormat("en-NG", {
style: "currency",
currency: "NGN",
}).format(price);
};

const handleAddProduct = async (formData: ProductFormData) => {
const newProduct: Product = {
\_id: Date.now(), // Unique ID
name: formData.name,
images:
formData.images ||
`https://via.placeholder.com/80?text=${encodeURIComponent(
          formData.name
        )}`,
category: `${formData.categoryInfo.gender} - ${formData.categoryInfo.category} - ${formData.categoryInfo.subcategory}`,
categoryInfo: formData.categoryInfo,
buyingPrice: parseFloat(formData.buyingPrice),
sellingPrice: parseFloat(formData.sellingPrice),
status: formData.status as "Active" | "Inactive",
description: formData.description,
barcode: formData.barcode,
tax: formData.tax as "No Vat" | "Vat-5" | "Vat-10" | "Vat-20",
canPurchasable: formData.canPurchasable,
showStockOut: formData.showStockOut,
refundable: formData.refundable,
maxPurchaseQuantity: parseInt(formData.maxPurchaseQuantity).toString(),
lowStockWarning: parseInt(formData.lowStockWarning).toString(),
unit: formData.unit,
tags: formData.tags || [],
};

    setProducts((prevProducts) => [newProduct, ...prevProducts]);

    setIsSidebarOpen(false);

};

// const handleUpdateProduct = async (formData: ProductFormData) => {
// if (editingProduct) {
// try {
// const response = await axiosInstance.put(
// `/products/${editingProduct._id}`,
// formData
// );

// if (response.status === 200) {
// // Refresh the product list
// fetchProducts();

// setIsSidebarOpen(false);
// setEditingProduct(undefined);
// } else {
// console.error("Update failed", response);
// alert("Failed to update product");
// }
// } catch (error) {
// console.error("Error updating product:", error);
// alert("Failed to update product");
// }
// }
// };

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
          onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
          initialData={editingProduct}
        />
      </SidebarForm>
    </div>

);
};

export default DashboardProduct;

// export async function getServerSideProps(req, res) {
// const products = await fetch("http://localhost:4000/api/products");
// const data = await products.json;
// console.log(data);

// return {
// props: {},
// };
// }
