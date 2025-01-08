import React, { useState } from "react";
import Modal from "./Modal";
// import Modal from "./Modal"; // Import the Modal component

// Define types for coupon
interface Coupon {
  code: string;
  validity: string;
}

// Props interface for the component
interface CouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCouponApply?: (couponCode: string) => void;
}

const CouponModal: React.FC<CouponModalProps> = ({
  isOpen,
  onClose,
  onCouponApply,
}) => {
  // State for manual coupon input
  const [couponCode, setCouponCode] = useState<string>("");

  //   // Predefined available coupons
  //   const availableCoupons: Coupon[] = [
  //     {
  //       code: "denim",
  //       validity: "05:49 PM, 06-01-2025 - 05:49 PM, 06-01-2026",
  //     },
  //     {
  //       code: "festive",
  //       validity: "05:49 PM, 06-01-2025 - 05:49 PM, 06-01-2026",
  //     },
  //   ];

  // Handler for manual coupon application
  const handleManualCouponApply = () => {
    if (onCouponApply && couponCode.trim()) {
      onCouponApply(couponCode.trim());
      setCouponCode(""); // Clear input after applying
    }
  };

  //   // Handler for predefined coupon selection
  //   const handlePredefinedCouponApply = (code: string) => {
  //     if (onCouponApply) {
  //       onCouponApply(code);
  //       onClose(); // Close modal after applying
  //     }
  //   };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Coupon Code">
      <div className="space-y-4">
        {/* Manual Coupon Input */}
        <div className="flex">
          <input
            type="text"
            className="flex-grow p-2 border rounded-l-lg"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded-r-lg"
            onClick={handleManualCouponApply}
          >
            Apply
          </button>
        </div>

        {/* Available Coupons List */}
        {/* <div className="space-y-4">
          {availableCoupons.map((coupon) => (
            <div key={coupon.code} className="p-4 bg-blue-50 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <span className="inline-block px-3 py-1 bg-yellow-300 rounded-lg text-sm mb-2">
                    Code: {coupon.code}
                  </span>
                  <p className="text-sm text-gray-600">{coupon.validity}</p>
                </div>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-lg"
                  onClick={() => handlePredefinedCouponApply(coupon.code)}
                >
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </Modal>
  );
};

export default CouponModal;
