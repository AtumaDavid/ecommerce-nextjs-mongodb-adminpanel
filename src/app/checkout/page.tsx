"use client";
import { useEffect, useState } from "react";
import { ChevronLeft, PlusCircle, Edit, Trash2 } from "lucide-react";
import Modal from "@/components/cart/CheckoutFlow/Modal";
import CouponModal from "@/components/cart/CheckoutFlow/CouponModal";
import StepIndicator from "@/components/cart/CheckoutFlow/StepIndicator";
import AddressForm, {
  AddressFormData,
} from "@/components/cart/CheckoutFlow/AddressForm";
import PaymentMethods from "@/components/cart/CheckoutFlow/Payment";
// import ShippingMethods from "@/components/cart/CheckoutFlow/Shipping";
import Cart from "@/components/cart/CheckoutFlow/Cart";
import useCartStore, { CartItem } from "@/store/cartStore";
import GetOrderSummary from "@/components/cart/CheckoutFlow/GetOrderSummary";
import axiosInstance from "@/lib/axiosInstance";

// Main component
export default function CheckoutFlow() {
  const { cart, total, fetchCart, updateCartItemQuantity, removeFromCart } =
    useCartStore();
  const [step, setStep] = useState(1);
  // const [selectedAddress, setSelectedAddress] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState<number | null>(null);
  // const [selectedShipping, setSelectedShipping] = useState("");
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
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

  // // SHIPPING
  // const handleShippingSelect = (method: string) => {
  //   setSelectedShipping(method);
  //   // Additional logic for shipping processing
  // };

  // Add new address
  const handleAddAddress = (formData: AddressFormData) => {
    // Validate the form data before adding
    if (formData.fullName && formData.phone && formData.streetAddress) {
      // setAddresses([...addresses, formData]);
      // setShowAddressModal(false);
      axiosInstance
        .put("/users", { shippingAddress: formData })
        .then((data) => {
          if (data?.status) {
            console.log(data?.status);
          } else {
            console.log("something went wrong");
          }
        });
    } else {
      // Optionally show an error message
      alert("Please fill in all required fields");
    }
  };

  const handleEditAddress = (formData: AddressFormData) => {
    if (editingAddress !== null) {
      const newAddresses = [...addresses];
      newAddresses[editingAddress] = formData;
      setAddresses(newAddresses);
      setEditingAddress(null);
    }
  };

  const handleDeleteAddress = (indexToRemove: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this address?"
    );
    if (confirmDelete) {
      setAddresses(addresses.filter((_, index) => index !== indexToRemove));
      if (selectedAddress === indexToRemove) {
        setSelectedAddress(null);
      }
    }
  };

  const OrderSummary = () => (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">Order Summary</h2>
      <div className="space-y-3">
        <div className="flex justify-between text-sm sm:text-base">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">₦150.00</span>
        </div>
        <div className="flex justify-between text-sm sm:text-base">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium">₦22.50</span>
        </div>
        <div className="flex justify-between text-sm sm:text-base">
          <span className="text-gray-600">Shipping Charge</span>
          <span className="font-medium">₦10.00</span>
        </div>
        <div className="flex justify-between text-sm sm:text-base">
          <span className="text-gray-600">Discount</span>
          <span className="font-medium text-green-600">-₦0.00</span>
        </div>
        <div className="flex justify-between font-semibold pt-3 border-t text-base sm:text-lg">
          <span>Total</span>
          <span>₦182.50</span>
        </div>
      </div>
    </div>
  );

  // const OrderSummary = () => {
  //   const [orderSummary, setOrderSummary] = useState(null);
  //   const orderId = "your_order_id"; // Replace with the actual order ID

  //   useEffect(() => {
  //     const fetchOrderSummary = async () => {
  //       const summary = await GetOrderSummary();
  //       setOrderSummary(summary);
  //     };
  //     fetchOrderSummary();
  //   }, [orderId]);

  //   if (!orderSummary) {
  //     return <div>Loading...</div>;
  //   }

  //   return (
  //     <div>
  //       <h2>Order Summary</h2>
  //       <div>
  //         <span>Subtotal:</span>
  //         <span>₦{orderSummary.subTotal}</span>
  //       </div>
  //       <div>
  //         <span>Tax:</span>
  //         <span>₦{orderSummary.tax}</span>
  //       </div>
  //       <div>
  //         <span>Discount:</span>
  //         <span>₦{orderSummary.discount}</span>
  //       </div>
  //       <div>
  //         <span>Shipping Charge:</span>
  //         <span>₦{orderSummary.shippingCharge}</span>
  //       </div>
  //       <div>
  //         <span>Total:</span>
  //         <span>₦{orderSummary.total}</span>
  //       </div>
  //     </div>
  //   );
  // };

  // Address Selection Component
  const AddressSelection = () => (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-xl font-semibold">Your Addresses</h2>
        <button
          onClick={() => setShowAddressModal(true)}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors w-full sm:w-auto"
        >
          <PlusCircle className="mr-2 w-5 h-5" />
          Add New Address
        </button>
      </div>

      {addresses.map((address, index) => (
        <div
          key={index}
          className={`
            border p-4 rounded-lg cursor-pointer 
            ${
              selectedAddress === index
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-blue-300"
            }
          `}
          onClick={() => setSelectedAddress(index)}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{address.fullName}</h3>
              <p>{address.streetAddress}</p>
              <p>{`${address.city}, ${address.state}, ${address.country}`}</p>
              <p>{address.phone}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingAddress(index);
                }}
                className="text-blue-500 hover:text-blue-700"
              >
                <Edit className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteAddress(index);
                }}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const handleIncreaseQuantity = async (item: CartItem) => {
    try {
      // Check max quantity (optional: add max stock logic)
      const maxQuantity = 10; // Default max, replace with actual stock check
      if (item.quantity >= maxQuantity) {
        // Optional: Show toast or alert
        return;
      }

      await updateCartItemQuantity(
        item.productId._id,
        item.quantity + 1,
        item.variationId
      );
    } catch (error) {
      console.error("Failed to increase quantity", error);
    }
  };

  const handleDecreaseQuantity = async (item: CartItem) => {
    try {
      if (item.quantity > 1) {
        await updateCartItemQuantity(
          item.productId._id,
          item.quantity - 1,
          item.variationId
        );
      } else {
        // Remove item if quantity becomes 0
        await removeFromCart(item.productId._id, item.variationId);
      }
    } catch (error) {
      console.error("Failed to decrease quantity", error);
    }
  };

  const handleRemoveItem = async (item: CartItem) => {
    try {
      await removeFromCart(item.productId._id, item.variationId);
    } catch (error) {
      console.error("Failed to remove item", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
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

        {/* Address Modal */}
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

        {/* Edit Address Modal */}
        <Modal
          isOpen={editingAddress !== null}
          onClose={() => setEditingAddress(null)}
          title="Edit Address"
        >
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
          {/* Order Summary Section and coupon */}
          <div className="col-span-3 lg:col-span-1 w-full space-y-4">
            {/* Coupon Code Section */}
            <div
              onClick={() => setShowCouponModal(true)}
              className="p-4 border border-blue-200 rounded-lg bg-blue-50 flex items-center space-x-2 cursor-pointer hover:bg-blue-100 transition-colors"
            >
              <div className="p-2 bg-blue-100 rounded">
                <PlusCircle className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="font-semibold text-sm sm:text-base">
                  Apply Coupon Code
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Get discount with your order
                </p>
              </div>
            </div>

            {/* Order Summary Section */}
            <OrderSummary />
          </div>
          <div className="col-span-3 lg:col-span-2">
            {step === 1 && (
              // <Cart quantity={quantity} setQuantity={setQuantity} />
              <Cart
                cartItems={cart}
                handleIncreaseQuantity={handleIncreaseQuantity}
                handleDecreaseQuantity={handleDecreaseQuantity}
                handleRemoveItem={handleRemoveItem}
              />
            )}
            {step === 2 && (
              <>
                <AddressSelection />
                {/* <ShippingMethods
                  onShippingSelect={handleShippingSelect}
                  initialSelectedShipping={selectedShipping}
                /> */}
              </>
            )}
            {step === 3 && (
              <PaymentMethods
                onPaymentSelect={handlePaymentSelect}
                initialSelectedPayment={selectedPayment}
              />
            )}

            <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
              <button
                onClick={() => setStep(Math.max(1, step - 1))}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors w-full sm:w-auto"
              >
                Back to {step === 2 ? "Cart" : "Checkout"}
              </button>
              {step < 3 ? (
                <button
                  onClick={() => setStep(Math.min(3, step + 1))}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors w-full sm:w-auto"
                >
                  {step === 1 ? "Process to Checkout" : "Save and Pay"}
                </button>
              ) : (
                <button className="px-4 sm:px-6 py-2 sm:py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors w-full sm:w-auto">
                  Confirm Order
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
