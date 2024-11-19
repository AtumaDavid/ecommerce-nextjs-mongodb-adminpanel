// utils/exportUtils.ts
// import { Product } from "../types/product";

import { Product } from "@/components/Dashboard/Products/types/product";

export const createPrintStyle = () => {
  const style = document.createElement("style");
  style.innerHTML = `
    @media print {
      body * {
        visibility: hidden;
      }
      #printable-table,
      #printable-table * {
        visibility: visible;
      }
      #printable-table {
        position: absolute;
        left: 0;
        top: 0;
      }
      .no-print {
        display: none !important;
      }
    }
  `;
  return style;
};

export const exportToExcel = (products: Product[]) => {
  // Format data for excel export
  const excelData = products.map((product) => ({
    "Product Name": product.name,
    Category: product.category,
    "Buying Price": product.buyingPrice,
    "Selling Price": product.sellingPrice,
    Status: product.status,
    Description: product.description,
  }));

  // Convert to CSV format
  const headers = Object.keys(excelData[0]);
  const csvContent = [
    headers.join(","),
    ...excelData.map((row) =>
      headers
        .map((header) => {
          const value = row[header as keyof typeof row];
          // Handle values that might contain commas
          return typeof value === "string" && value.includes(",")
            ? `"${value}"`
            : value;
        })
        .join(",")
    ),
  ].join("\n");

  // Create and trigger download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `products_export_${new Date().toISOString().split("T")[0]}.csv`
  );
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
