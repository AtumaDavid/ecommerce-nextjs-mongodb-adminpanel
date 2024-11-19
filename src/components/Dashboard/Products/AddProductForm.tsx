"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaSave, FaTimes } from "react-icons/fa";

// Define the interface for form values
interface ProductFormValues {
  name: string;
  sku: string;
  category: string;
  barcode: string;
  buyingPrice: string;
  sellingPrice: string;
  tax: string;
  brand: string;
  status: "active" | "inactive";
  purchasable: "yes" | "no";
  stockOut: "enable" | "disable";
  refundable: "yes" | "no";
  maxPurchaseQuantity: string;
  lowStockWarning: string;
  unit: string;
  weight?: string;
  tags?: string;
  description?: string;
}

// Define the interface for component props
interface ProductFormProps {
  onSubmit: (values: ProductFormValues) => void;
}

// Constants
const VAT_OPTIONS = [
  { value: "no-VAT", label: "No VAT" },
  { value: "VAT-5", label: "VAT 5%" },
  { value: "VAT-10", label: "VAT 10%" },
  { value: "VAT-20", label: "VAT 20%" },
] as const;

const BARCODE_TYPES = [
  { value: "UAN-13", label: "UAN-13" },
  { value: "UPC-A", label: "UPC-A" },
] as const;

const CATEGORIES = [
  { value: "electronics", label: "Electronics" },
  { value: "clothing", label: "Clothing" },
  { value: "food", label: "Food" },
] as const;

const generateSKU = (): string => {
  return Math.floor(10000 + Math.random() * 90000).toString();
};

// Use the defined interfaces in the component
const ProductForm: React.FC<ProductFormProps> = ({ onSubmit }) => {
  const formik = useFormik<ProductFormValues>({
    initialValues: {
      name: "",
      sku: generateSKU(),
      category: "",
      barcode: "",
      buyingPrice: "",
      sellingPrice: "",
      tax: "no-VAT",
      brand: "",
      status: "active",
      purchasable: "yes",
      stockOut: "disable",
      refundable: "no",
      maxPurchaseQuantity: "",
      lowStockWarning: "",
      unit: "",
      weight: "",
      tags: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      sku: Yup.string().required("SKU is required"),
      category: Yup.string().required("Category is required"),
      barcode: Yup.string().required("Barcode type is required"),
      buyingPrice: Yup.number().required("Buying Price is required").min(0),
      sellingPrice: Yup.number().required("Selling Price is required").min(0),
      refundable: Yup.string().required("Refundable option is required"),
      maxPurchaseQuantity: Yup.number()
        .required("Maximum Purchase Quantity is required")
        .min(1),
      lowStockWarning: Yup.number()
        .required("Low Stock Quantity is required")
        .min(0),
    }),
    onSubmit: (values) => {
      onSubmit(values);
      console.log("Form Submitted", values);
    },
  });

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto bg-white shadow-md rounded-md">
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-gray-600">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              {...formik.getFieldProps("name")}
              id="name"
              type="text"
              className={`w-full mt-1 p-2 border rounded-md ${
                formik.touched.name && formik.errors.name
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
            )}
          </div>

          {/* SKU Field */}
          <div>
            <label htmlFor="sku" className="block text-gray-600">
              SKU <span className="text-red-500">*</span>
            </label>
            <div className="flex">
              <input
                id="sku"
                type="text"
                readOnly
                className="w-full mt-1 p-2 border rounded-l-md bg-gray-50"
                value={formik.values.sku}
              />
              <button
                type="button"
                onClick={() => formik.setFieldValue("sku", generateSKU())}
                className="mt-1 px-4 bg-gray-200 border border-l-0 rounded-r-md hover:bg-gray-300"
              >
                ↺
              </button>
            </div>
          </div>

          {/* Category Dropdown */}
          <div>
            <label htmlFor="category" className="block text-gray-600">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              {...formik.getFieldProps("category")}
              id="category"
              className={`w-full mt-1 p-2 border rounded-md ${
                formik.touched.category && formik.errors.category
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            >
              <option value="">--</option>
              {CATEGORIES.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {formik.touched.category && formik.errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.category}
              </p>
            )}
          </div>

          {/* Barcode Type Dropdown */}
          <div>
            <label htmlFor="barcode" className="block text-gray-600">
              Barcode Type <span className="text-red-500">*</span>
            </label>
            <select
              {...formik.getFieldProps("barcode")}
              id="barcode"
              className={`w-full mt-1 p-2 border rounded-md ${
                formik.touched.barcode && formik.errors.barcode
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            >
              <option value="">--</option>
              {BARCODE_TYPES.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Price Fields */}
          {/* buying price */}
          <div>
            <label htmlFor="buyingPrice" className="block text-gray-600">
              Buying Price <span className="text-red-500">*</span>
            </label>
            <input
              {...formik.getFieldProps("buyingPrice")}
              id="buyingPrice"
              type="number"
              className="w-full mt-1 p-2 border rounded-md"
            />
          </div>

          {/* selling price */}
          <div>
            <label htmlFor="sellingPrice" className="block text-gray-600">
              Selling Price <span className="text-red-500">*</span>
            </label>
            <input
              {...formik.getFieldProps("sellingPrice")}
              id="sellingPrice"
              type="number"
              className="w-full mt-1 p-2 border rounded-md"
            />
          </div>

          {/* VAT Dropdown */}
          <div>
            <label htmlFor="tax" className="block text-gray-600">
              VAT
            </label>
            <select
              {...formik.getFieldProps("tax")}
              id="tax"
              className="w-full mt-1 p-2 border rounded-md"
            >
              {VAT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Refundable Radio Button Group */}
          <div>
            <label className="block text-gray-600 mb-2">
              Refundable <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  {...formik.getFieldProps("refundable")}
                  value="yes"
                  checked={formik.values.refundable === "yes"}
                  className="mr-2"
                />
                Yes
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  {...formik.getFieldProps("refundable")}
                  value="no"
                  checked={formik.values.refundable === "no"}
                  className="mr-2"
                />
                No
              </label>
            </div>
          </div>

          {/* Show Stock Out Radio Button Group */}
          <div>
            <label className="block text-gray-600 mb-2">
              Show Stock Out <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  {...formik.getFieldProps("stockOut")}
                  value="enable"
                  checked={formik.values.stockOut === "enable"}
                  className="mr-2"
                />
                Enable
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  {...formik.getFieldProps("stockOut")}
                  value="disable"
                  checked={formik.values.stockOut === "disable"}
                  className="mr-2"
                />
                Disable
              </label>
            </div>
          </div>

          {/* Radio Button Groups */}
          <div>
            <label className="block text-gray-600 mb-2">
              Status <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  {...formik.getFieldProps("status")}
                  value="active"
                  checked={formik.values.status === "active"}
                  className="mr-2"
                />
                Active
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  {...formik.getFieldProps("status")}
                  value="inactive"
                  checked={formik.values.status === "inactive"}
                  className="mr-2"
                />
                Inactive
              </label>
            </div>
          </div>

          {/* Low Stock Warning Field */}
          <div>
            <label htmlFor="lowStockWarning" className="block text-gray-600">
              Low Stock Warning <span className="text-red-500">*</span>
            </label>
            <input
              {...formik.getFieldProps("lowStockWarning")}
              id="lowStockWarning"
              type="number" // Change type to number
              className={`w-full mt-1 p-2 border rounded-md ${
                formik.touched.lowStockWarning && formik.errors.lowStockWarning
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.lowStockWarning &&
              formik.errors.lowStockWarning && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.lowStockWarning}
                </p>
              )}
          </div>

          {/* Maximum Purchase Quantity Field */}
          <div>
            <label
              htmlFor="maxPurchaseQuantity"
              className="block text-gray-600"
            >
              Maximum Purchase Quantity <span className="text-red-500">*</span>
            </label>
            <input
              {...formik.getFieldProps("maxPurchaseQuantity")}
              id="maxPurchaseQuantity"
              type="number" // Change type to number
              className={`w-full mt-1 p-2 border rounded-md ${
                formik.touched.maxPurchaseQuantity &&
                formik.errors.maxPurchaseQuantity
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.maxPurchaseQuantity &&
              formik.errors.maxPurchaseQuantity && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.maxPurchaseQuantity}
                </p>
              )}
          </div>

          {/* purchaseable */}
          <div>
            <label className="block text-gray-600 mb-2">
              Can Purchase <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  {...formik.getFieldProps("purchasable")}
                  value="yes"
                  checked={formik.values.purchasable === "yes"}
                  className="mr-2"
                />
                Yes
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  {...formik.getFieldProps("purchasable")}
                  value="no"
                  checked={formik.values.purchasable === "no"}
                  className="mr-2"
                />
                No
              </label>
            </div>
          </div>

          {/* Tags Field */}
          <div>
            <label htmlFor="tags" className="block text-gray-600">
              Tags
            </label>
            <input
              {...formik.getFieldProps("tags")}
              id="tags"
              type="text"
              className="w-full mt-1 p-2 border rounded-md"
            />
          </div>

          {/* Description field */}
          <div className="col-span-2">
            <label htmlFor="description" className="block text-gray-600">
              Description
            </label>
            <textarea
              {...formik.getFieldProps("description")}
              id="description"
              rows={4}
              className="w-full mt-1 p-2 border rounded-md"
            />
          </div>
        </div>

        {/* submit */}
        <div className="flex justify-end gap-4">
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-md flex items-center"
          >
            <FaSave className="mr-2" /> Save
          </button>
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded-md flex items-center"
          >
            <FaTimes className="mr-2" /> Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
