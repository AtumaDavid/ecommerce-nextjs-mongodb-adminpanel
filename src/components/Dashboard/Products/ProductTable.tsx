"use client";
import React from "react";
import {
  FaSort,
  FaSortUp,
  FaSortDown,
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { ProductTableProps, SortField } from "./types/product";
import Link from "next/link";

interface ExtendedProductTableProps extends ProductTableProps {
  // onEditProduct?: (product: Product) => void;
  editProduct: (_id: number) => void;
  DeleteProduct: (_id: number) => void;
}

const ProductTable: React.FC<ExtendedProductTableProps> = ({
  products,
  sortConfig,
  onSort,
  formatPrice,
  editProduct,
  // onEditProduct,
  DeleteProduct,
}) => {
  const getSortIcon = (field: SortField) => {
    if (sortConfig.field !== field) return <FaSort className="w-3 h-3" />;
    return sortConfig.order === "asc" ? (
      <FaSortUp className="w-3 h-3" />
    ) : (
      <FaSortDown className="w-3 h-3" />
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full" id="printable-table">
        <thead className="bg-gray-50">
          <tr>
            <th
              className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer"
              onClick={() => onSort("createdAt")} // Add sorting for createdAt
            >
              <div className="flex items-center gap-2">
                CREATED AT
                <span className="no-print">{getSortIcon("createdAt")}</span>
              </div>
            </th>
            <th
              className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer"
              onClick={() => onSort("name")}
            >
              <div className="flex items-center gap-2">
                PRODUCT
                <span className="no-print">{getSortIcon("name")}</span>
              </div>
            </th>
            <th
              className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer"
              onClick={() => onSort("categoryInfo")}
            >
              <div className="flex items-center gap-2">
                CATEGORY INFO
                <span className="no-print">{getSortIcon("categoryInfo")}</span>
              </div>
            </th>
            <th
              className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer"
              onClick={() => onSort("buyingPrice")}
            >
              <div className="flex items-center gap-2">
                BUYING PRICE
                <span className="no-print">{getSortIcon("buyingPrice")}</span>
              </div>
            </th>
            <th
              className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer"
              onClick={() => onSort("sellingPrice")}
            >
              <div className="flex items-center gap-2">
                SELLING PRICE
                <span className="no-print">{getSortIcon("sellingPrice")}</span>
              </div>
            </th>
            <th
              className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer"
              onClick={() => onSort("status")}
            >
              <div className="flex items-center gap-2">
                STATUS
                <span className="no-print">{getSortIcon("status")}</span>
              </div>
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 no-print">
              ACTION
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.map((product) => (
            <tr
              key={`${product._id}-${product.name}`}
              className="hover:bg-gray-50"
            >
              <td className="px-4 py-3 text-gray-600">
                {new Date(product.createdAt).toLocaleDateString()}{" "}
                {/* Format the date */}
              </td>
              <td className="px-1 py-1">
                <div className="flex items-center gap-3">
                  {product.images ? (
                    (() => {
                      // Determine the image source
                      const imageSrc =
                        typeof product.images === "string" &&
                        product.images.trim() !== ""
                          ? product.images
                          : Array.isArray(product.images) &&
                            product.images.length > 0 &&
                            typeof product.images[0] === "string"
                          ? product.images[0]
                          : undefined;

                      // Only render img if we have a valid image source
                      return imageSrc ? (
                        <img
                          src={imageSrc}
                          alt={product.name || "Product Image"}
                          className="h-12 w-12 rounded-lg object-cover no-print"
                          onError={(e) => {
                            console.error("Image load error:", {
                              productId: product._id,
                              imageSrc,
                              imageType: typeof product.images,
                              imageValue: product.images,
                            });
                            const imgElement = e.target as HTMLImageElement;
                            imgElement.style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center no-print">
                          <span className="text-gray-500">No Image</span>
                        </div>
                      );
                    })()
                  ) : (
                    <div className="h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center no-print">
                      <span className="text-gray-500">No Image</span>
                    </div>
                  )}
                  <span className="font-medium text-gray-900">
                    {product.name}
                  </span>
                </div>
              </td>
              <td className="px-4 py-3 text-gray-600">
                {product.categoryInfo?.gender} {">"}
                {product.categoryInfo?.category} {">"}
                {product.categoryInfo?.subcategory} {""}
              </td>
              <td className="px-4 py-3 text-gray-600">
                {formatPrice(product.buyingPrice)}
              </td>
              <td className="px-4 py-3 text-gray-600">
                {formatPrice(product.sellingPrice)}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    product.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {product.status}
                </span>
              </td>
              <td className="px-4 py-3 no-print">
                <div className="flex gap-3">
                  <Link
                    // href={"/dashboard/products/edit/1"}
                    // as={`/dashboard/products/edit/${1}`}
                    href={`/dashboard/products/view/${product?._id}`}
                    className="text-blue-500 hover:text-blue-700 "
                  >
                    {/* <h4 className="hidden ">View</h4> */}
                    <FaEye className="w-4 h-4" />
                  </Link>
                  <button
                    className="text-green-500 hover:text-green-700"
                    onClick={() => editProduct(product?._id)}
                  >
                    <FaEdit className="w-4 h-4" />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => DeleteProduct(product._id)}
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
