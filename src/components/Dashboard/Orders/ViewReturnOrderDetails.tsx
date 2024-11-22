import React from "react";

interface Product {
  name: string;
  unitCost: number;
  quantity: number;
  discount: number;
  taxes: number;
  subtotal: number;
}

interface InvoiceProps {
  customer: {
    name: string;
    phone: string;
    email: string;
  };
  reference: string;
  date: string;
  reason: string;
  products: Product[];
  createdDate: string;
}

const Invoice: React.FC<InvoiceProps> = ({
  customer,
  reference,
  date,
  reason,
  products,
  createdDate,
}) => {
  const calculateTotal = () => {
    const subtotal = products.reduce(
      (acc, product) => acc + product.subtotal,
      0
    );
    const tax = products.reduce((acc, product) => acc + product.taxes, 0);
    const discount = products.reduce(
      (acc, product) => acc + product.discount,
      0
    );
    return { subtotal, tax, discount, total: subtotal + tax - discount };
  };

  const { subtotal, tax, discount, total } = calculateTotal();

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-md border border-gray-200 sm:p-6 lg:p-8">
      <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
        {/* Customer Details */}
        <div className="flex items-start gap-4">
          <div className="p-4 bg-blue-100 rounded-full">
            <span className="text-blue-500 text-2xl">👤</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Customer</h2>
            <p>Name: {customer.name}</p>
            <p>Phone: {customer.phone}</p>
            <p>Email: {customer.email}</p>
          </div>
        </div>

        {/* Reference Details */}
        <div className="flex items-start gap-4">
          <div className="p-4 bg-green-100 rounded-full">
            <span className="text-green-500 text-2xl">📄</span>
          </div>
          <div>
            <p>Reference: {reference}</p>
            <p>Date: {date}</p>
          </div>
        </div>
      </div>

      {/* Reason */}
      <div className="mb-6">
        <h3 className="font-semibold">Reason:</h3>
        <p>{reason}</p>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-left text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border-b border-gray-300">PRODUCT</th>
              <th className="p-2 border-b border-gray-300">UNIT COST</th>
              <th className="p-2 border-b border-gray-300">QUANTITY</th>
              <th className="p-2 border-b border-gray-300">DISCOUNT</th>
              <th className="p-2 border-b border-gray-300">TAXES</th>
              <th className="p-2 border-b border-gray-300">SUBTOTAL</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{product.name}</td>
                <td className="p-2">{product.unitCost.toFixed(2)}</td>
                <td className="p-2">{product.quantity}</td>
                <td className="p-2">{product.discount.toFixed(2)}</td>
                <td className="p-2">{product.taxes.toFixed(2)}</td>
                <td className="p-2">{product.subtotal.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="flex flex-wrap justify-between items-start gap-4 mt-6">
        <div>
          <p>Created Date: {createdDate}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-md w-full sm:w-auto">
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>₦{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Tax Fee</span>
            <span>₦{tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Discount</span>
            <span>₦{discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>₦{total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Print Button */}
      <div className="flex justify-end mt-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded-md">
          Print
        </button>
      </div>
    </div>
  );
};

export default Invoice;
