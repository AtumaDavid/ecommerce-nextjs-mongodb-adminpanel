"use client";
import React, { useState } from "react";
import { CreditCard } from "lucide-react";

// Define payment method interface
interface PaymentMethod {
  id: string;
  name: string;
  icon?: React.ReactNode;
}

// Props interface
interface PaymentMethodProps {
  onPaymentSelect: (paymentMethod: string) => void;
  initialSelectedPayment?: string;
}

const PaymentMethods: React.FC<PaymentMethodProps> = ({
  onPaymentSelect,
  initialSelectedPayment,
}) => {
  // State for selected payment method
  const [selectedPayment, setSelectedPayment] = useState<string>(
    initialSelectedPayment || ""
  );

  // Comprehensive list of payment methods
  const paymentMethods: PaymentMethod[] = [
    {
      id: "cod",
      name: "Cash On Delivery",
      icon: <CreditCard className="w-6 h-6" />,
    },
    {
      id: "credit",
      name: "Credit Card",
      icon: <CreditCard className="w-6 h-6" />,
    },
    {
      id: "debit",
      name: "Debit Card",
      icon: <CreditCard className="w-6 h-6" />,
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: <CreditCard className="w-6 h-6" />,
    },
    {
      id: "stripe",
      name: "Stripe",
      icon: <CreditCard className="w-6 h-6" />,
    },
    {
      id: "apple_pay",
      name: "Apple Pay",
      icon: <CreditCard className="w-6 h-6" />,
    },
    {
      id: "google_pay",
      name: "Google Pay",
      icon: <CreditCard className="w-6 h-6" />,
    },
    {
      id: "bank_transfer",
      name: "Bank Transfer",
      icon: <CreditCard className="w-6 h-6" />,
    },
    {
      id: "crypto",
      name: "Cryptocurrency",
      icon: <CreditCard className="w-6 h-6" />,
    },
  ];

  // Handle payment method selection
  const handlePaymentSelect = (methodId: string) => {
    setSelectedPayment(methodId);
    onPaymentSelect(methodId);
  };

  // Render payment method details when selected
  const renderPaymentDetails = () => {
    switch (selectedPayment) {
      case "credit":
      case "debit":
        return (
          <div className="mt-4 space-y-4">
            <div>
              <label className="block mb-1">Card Number</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Expiry Date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block mb-1">CVV</label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>
          </div>
        );
      case "paypal":
        return (
          <div className="mt-4">
            <button className="w-full bg-blue-500 text-white p-2 rounded-lg">
              Continue to PayPal
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Payment Method Grid */}
      <div className="grid grid-cols-3 gap-4">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 ${
              selectedPayment === method.id
                ? "border-red-500 bg-red-50 shadow-md"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => handlePaymentSelect(method.id)}
          >
            <div className="flex items-center justify-center h-12 mb-2">
              {method.icon || <CreditCard className="w-6 h-6" />}
            </div>
            <p className="text-center text-sm">{method.name}</p>
          </div>
        ))}
      </div>

      {/* Conditional Payment Details */}
      {renderPaymentDetails()}

      {/* Additional Payment Notes */}
      <div className="text-sm text-gray-600 mt-4">
        <p>* Secure payment processing with end-to-end encryption</p>
        <p>* Your payment information is never stored on our servers</p>
      </div>
    </div>
  );
};

export default PaymentMethods;
