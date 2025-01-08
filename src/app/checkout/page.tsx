"use client";
import { useState } from "react";
import { ChevronLeft, Minus, Plus, PlusCircle } from "lucide-react";
import Modal from "@/components/cart/CheckoutFlow/Modal";
import CouponModal from "@/components/cart/CheckoutFlow/CouponModal";
import StepIndicator from "@/components/cart/CheckoutFlow/StepIndicator";
import AddressForm, {
  AddressFormData,
} from "@/components/cart/CheckoutFlow/AddressForm";
import PaymentMethods from "@/components/cart/CheckoutFlow/Payment";
import ShippingMethods from "@/components/cart/CheckoutFlow/Shipping";

// Main component
export default function CheckoutFlow() {
  const [step, setStep] = useState(1);
  const [quantity, setQuantity] = useState(1);
  // const [selectedAddress, setSelectedAddress] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [selectedShipping, setSelectedShipping] = useState("");
  // const [useShippingAsBilling, setUseShippingAsBilling] = useState(true);
  const [addresses, setAddresses] = useState<AddressFormData[]>([
    {
      fullName: "Adebayo Okonkwo",
      phone: "+234 805 123 4567",
      email: "customer@example.com",
      city: "Lagos",
      state: "Lagos",
      country: "Nigeria",
      streetAddress: "No. 12, Admiralty Way, Lekki Phase 1",
      zipCode: "100001",
    },
    {
      fullName: "Chukwudi Nnamdi",
      phone: "+234 802 987 6543",
      email: "customer@example.com",
      city: "Abuja",
      state: "Federal Capital Territory",
      country: "Nigeria",
      streetAddress: "Plot 1452, Cadastral Zone A3, Gwarinpa",
      zipCode: "900108",
    },
  ]);

  // PAYMENT
  const handlePaymentSelect = (method: string) => {
    setSelectedPayment(method);
    // Additional logic for payment processing
  };

  // SHIPPING
  const handleShippingSelect = (method: string) => {
    setSelectedShipping(method);
    // Additional logic for shipping processing
  };

  const handleAddAddress = (formData: AddressFormData) => {
    setAddresses([...addresses, formData]);
    setShowAddressModal(false);
  };

  // const handleEditAddress = (formData: AddressFormData) => {
  //   const newAddresses = [...addresses];
  //   newAddresses[editingAddress] = formData;
  //   setAddresses(newAddresses);
  //   setEditingAddress(null);
  // };
  const handleEditAddress = (formData: AddressFormData) => {
    if (editingAddress !== null) {
      const newAddresses = [...addresses];
      newAddresses[editingAddress] = formData;
      setAddresses(newAddresses);
      setEditingAddress(null);
    }
  };

  const OrderSummary = () => (
    <div className="bg-white p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₦150.00</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span>₦22.50</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping Charge</span>
          <span>₦10.00</span>
        </div>
        <div className="flex justify-between">
          <span>Discount</span>
          <span>₦0.00</span>
        </div>
        <div className="flex justify-between font-semibold pt-4 border-t">
          <span>Total</span>
          <span>₦182.50</span>
        </div>
      </div>
    </div>
  );

  const Cart = () => (
    <div className="bg-white p-6 rounded-lg mb-6">
      <div className="flex items-start space-x-4">
        <img
          src="/api/placeholder/100/120"
          alt="Classic French Men's Hoodie"
          className="rounded-lg"
        />
        <div className="flex-grow">
          <h3 className="font-semibold">Classics French Men's Hoodie</h3>
          <p className="text-gray-600">White | M</p>
          <p className="font-semibold mt-2">₦150.00</p>
          <div className="flex items-center space-x-4 mt-4">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1 rounded-full border"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-1 rounded-full border"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            className="text-gray-500 hover:text-gray-700"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-semibold ml-4">
            {step === 1
              ? "Your Shopping Cart"
              : step === 2
              ? "Provide Your Shipping Information"
              : "Payment Information"}
          </h1>
        </div>

        <StepIndicator currentStep={step} totalSteps={3} />

        <Modal
          isOpen={showAddressModal}
          onClose={() => setShowAddressModal(false)}
          title="Add New Address"
        >
          <AddressForm
            onSubmit={handleAddAddress}
            onCancel={() => setShowAddressModal(false)}
          />
        </Modal>

        <Modal
          isOpen={editingAddress !== null}
          onClose={() => setEditingAddress(null)}
          title="Edit Address"
        >
          {/* <AddressForm
            initialData={addresses[editingAddress]}
            onSubmit={handleEditAddress}
            onCancel={() => setEditingAddress(null)}
          /> */}
          {editingAddress !== null && (
            <AddressForm
              initialData={addresses[editingAddress]}
              onSubmit={handleEditAddress}
              onCancel={() => setEditingAddress(null)}
            />
          )}
        </Modal>

        <CouponModal
          isOpen={showCouponModal}
          onClose={() => setShowCouponModal(false)}
        />

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            {step === 1 && <Cart />}
            {step === 2 && (
              <ShippingMethods
                onShippingSelect={handleShippingSelect}
                initialSelectedShipping={selectedShipping}
              />
            )}
            {step === 3 && (
              <PaymentMethods
                onPaymentSelect={handlePaymentSelect}
                initialSelectedPayment={selectedPayment}
              />
            )}

            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setStep(Math.max(1, step - 1))}
                className="px-6 py-3 bg-gray-100 rounded-lg"
              >
                Back to {step === 2 ? "Cart" : "Checkout"}
              </button>
              {step < 3 ? (
                <button
                  onClick={() => setStep(Math.min(3, step + 1))}
                  className="px-6 py-3 bg-red-500 text-white rounded-lg"
                >
                  {step === 1 ? "Process to Checkout" : "Save and Pay"}
                </button>
              ) : (
                <button className="px-6 py-3 bg-red-500 text-white rounded-lg">
                  Confirm Order
                </button>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div
              onClick={() => setShowCouponModal(true)}
              className="p-4 border border-blue-200 rounded-lg bg-blue-50 flex items-center space-x-2"
            >
              <div className="p-2 bg-blue-100 rounded">
                <PlusCircle className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="font-semibold">Apply Coupon Code</h3>
                <p className="text-sm text-gray-600">
                  Get discount with your order
                </p>
              </div>
            </div>
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
}

// const StepIndicator = () => (
//   <div className="flex items-center justify-center mb-8">
//     <div
//       className={`w-8 h-8 rounded-full flex items-center justify-center ${
//         step >= 1 ? "bg-green-500 text-white" : "bg-gray-200"
//       }`}
//     >
//       {step > 1 ? "✓" : "1"}
//     </div>
//     <div
//       className={`w-24 h-1 ${step >= 2 ? "bg-green-500" : "bg-gray-200"}`}
//     />
//     <div
//       className={`w-8 h-8 rounded-full flex items-center justify-center ${
//         step >= 2 ? "bg-green-500 text-white" : "bg-gray-200"
//       }`}
//     >
//       {step > 2 ? "✓" : "2"}
//     </div>
//     <div
//       className={`w-24 h-1 ${step >= 3 ? "bg-green-500" : "bg-gray-200"}`}
//     />
//     <div
//       className={`w-8 h-8 rounded-full flex items-center justify-center ${
//         step === 3 ? "bg-green-500 text-white" : "bg-gray-200"
//       }`}
//     >
//       3
//     </div>
//   </div>
// );
