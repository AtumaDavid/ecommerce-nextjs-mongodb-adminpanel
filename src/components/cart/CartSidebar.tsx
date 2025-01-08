"use client";
import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { Transition } from "@headlessui/react";
import useCartStore, { CartItem } from "@/store/cartStore";
import { MdDelete } from "react-icons/md";

interface CartSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function CartSidebar({ isOpen, setIsOpen }: CartSidebarProps) {
  const { cart, total, fetchCart, updateCartItemQuantity, removeFromCart } =
    useCartStore();

  useEffect(() => {
    if (isOpen && cart.length === 0) {
      fetchCart();
    }
  }, [isOpen]); // Remove fetchCart from dependencies

  // const handleIncreaseQuantity = (item: CartItem) => {
  //   updateCartItemQuantity(
  //     item.productId._id,
  //     item.quantity + 1,
  //     item.variationId
  //   );
  // };
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

  // const handleDecreaseQuantity = (item: CartItem) => {
  //   if (item.quantity > 1) {
  //     updateCartItemQuantity(
  //       item.productId._id,
  //       item.quantity - 1,
  //       item.variationId
  //     );
  //   } else {
  //     // Remove item if quantity becomes 0
  //     removeFromCart(item.productId._id, item.variationId);
  //   }
  // };

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

  // Calculate discounted price for an item
  const getDisplayPrice = (item: CartItem) => {
    const basePrice = parseFloat(item.productId.sellingPrice.replace("₦", ""));

    if (
      item.productId.offer?.discountPercentage &&
      item.productId.offer.discountPercentage > 0
    ) {
      return basePrice * (1 - item.productId.offer.discountPercentage / 100);
    }

    return basePrice;
  };

  // Calculate total cart value with discounts
  const calculateTotal = () => {
    return (
      cart?.reduce((acc, item) => {
        const displayPrice = getDisplayPrice(item);
        return acc + displayPrice * item.quantity;
      }, 0) || 0
    );
  };

  return (
    <div
      className={`fixed inset-0 flex justify-end z-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      <Transition
        show={isOpen}
        enter="transform transition ease-in-out duration-300"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transform transition ease-in-out duration-300"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
      >
        <div className="w-96 bg-white h-full shadow-lg transform overflow-y-auto">
          {/* HEADER */}
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Your Cart</h2>
            <button
              className="text-gray-600 hover:text-gray-900"
              onClick={() => setIsOpen(false)}
            >
              <IoClose />
            </button>
          </div>

          {/* CART ITEMS */}
          <div className="p-4">
            <div className="flex flex-col">
              {cart?.length === 0 ? (
                <div className="text-center text-gray-500 py-4">
                  Your cart is empty
                </div>
              ) : (
                cart?.map((item, index) => {
                  const displayPrice = getDisplayPrice(item);
                  const originalPrice = parseFloat(
                    item.productId.sellingPrice.replace("₦", "")
                  );

                  return (
                    <div
                      key={`${item.productId._id}-${index}`}
                      className="flex items-center border-b pb-4 mb-4"
                    >
                      <img
                        // src=""
                        src={item.productId.images[0]}
                        // alt={item.productId.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="ml-4 flex-1">
                        <h3 className="text-sm font-semibold">
                          {item.productId.name}
                        </h3>
                        {/* Display Color and Size if variation details exist */}
                        {item.productId.variationDetails?.color &&
                          item.productId.variationDetails?.size && (
                            <p className="text-xs text-gray-500">
                              Color: {item.productId.variationDetails.color},
                              Size: {item.productId.variationDetails.size}
                            </p>
                          )}

                        {/* pricing */}
                        {item.productId.offer?.discountPercentage ? (
                          <div className="flex items-center gap-2">
                            <p className="text-green-600 text-sm">
                              ₦{displayPrice.toFixed(2)}
                            </p>
                            <span className="line-through text-gray-400 text-xs">
                              ₦{originalPrice.toFixed(2)}
                            </span>
                            <span className="text-red-500 text-xs">
                              {item.productId.offer.discountPercentage}% OFF
                            </span>
                          </div>
                        ) : (
                          <p className="text-green-600 text-sm">
                            ₦{displayPrice.toFixed(2)}
                          </p>
                        )}
                        <div className="flex items-center space-x-2 mt-1">
                          <button
                            onClick={() => handleDecreaseQuantity(item)}
                            className="text-gray-600 border border-gray-300 rounded-full w-6 h-6 flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleIncreaseQuantity(item)}
                            className="text-gray-600 border border-gray-300 rounded-full w-6 h-6 flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          removeFromCart(item.productId._id, item.variationId)
                        }
                        className="text-red-500 text-sm ml-2"
                      >
                        <MdDelete size={23} />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* FOOTER */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Total</span>
              <span className="font-bold">₦{calculateTotal().toFixed(2)}</span>
            </div>
            <button
              className="w-full bg-primary text-white p-3 rounded-lg hover:bg-primary-dark transition"
              disabled={cart?.length === 0}
            >
              Proceed to checkout
            </button>
            <button
              className="w-full bg-white border border-primary text-primary p-3 rounded-lg hover:bg-primary hover:text-white transition mt-5"
              // disabled={cart?.length === 0}
            >
              Clear Cart (not working yet)
            </button>
          </div>
        </div>
      </Transition>
    </div>
  );
}
