"use client";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Transition } from "@headlessui/react";
// import axiosInstance from "@/lib/axiosInstance";
import useCartStore from "@/store/cartStore";

interface CartSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function CartSidebar({ isOpen, setIsOpen }: CartSidebarProps) {
  //   const [cart, setCart] = useState([]);
  const { cart, total, fetchCart, updateCartItemQuantity, removeFromCart } =
    useCartStore();

  //   // FETCH CART
  //   const fetchCart = async () => {
  //     axiosInstance.get("/cart").then((data) => {
  //       if (data?.data?.status) {
  //         setCart(data?.data?.data);
  //       }
  //     });
  //   };

  //   console.log(cart);

  //   useEffect(() => {
  //     fetchCart();
  //   }, []);

  useEffect(() => {
    if (isOpen) {
      fetchCart();
    }
  }, [isOpen, fetchCart]);

  const handleIncreaseQuantity = (item: any) => {
    updateCartItemQuantity(
      item.productId._id,
      item.quantity + 1,
      item.variationId
    );
  };

  const handleDecreaseQuantity = (item: any) => {
    if (item.quantity > 1) {
      updateCartItemQuantity(
        item.productId._id,
        item.quantity - 1,
        item.variationId
      );
    } else {
      // Remove item if quantity becomes 0
      removeFromCart(item.productId._id, item.variationId);
    }
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
                cart?.map((item, index) => (
                  <div
                    key={`${item.productId._id}-${index}`}
                    className="flex items-center border-b pb-4 mb-4"
                  >
                    <img
                      src={item.productId.images[0]}
                      alt={item.productId.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="ml-4 flex-1">
                      <h3 className="text-sm font-semibold">
                        {item.productId.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {/* Calculate price, considering variations if applicable */}
                        ₦{item.productId.sellingPrice}
                      </p>
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
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* FOOTER */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Total</span>
              <span className="font-bold">₦{total.toFixed(2)}</span>
            </div>
            <button
              className="w-full bg-primary text-white p-3 rounded-lg hover:bg-primary-dark transition"
              disabled={cart?.length === 0}
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      </Transition>
    </div>
  );
}
