import React from "react";
import { IoClose } from "react-icons/io5";
import { Transition } from "@headlessui/react";

interface CartSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function CartSidebar({ isOpen, setIsOpen }: CartSidebarProps) {
  return (
    <div
      className={`fixed inset-0 flex justify-end z-50 translate-x-100 ${
        isOpen ? "block translate-x-100" : "hidden translate-x-0"
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
        leaveFrom="translate-x-full"
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
              <div className="flex items-center border-b pb-4">
                <img
                  src="https://picsum.photos/200/300"
                  alt="cart item"
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="ml-4 flex-1">
                  <h3 className="text-sm font-semibold">Product Name</h3>
                  <p className="text-gray-600 text-sm">Price</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <button className="text-gray-600 border-gray-300 rounded-full w-6 h-6 flex items-center justify-center">
                      -
                    </button>
                    <span className="text-sm font-medium">0</span>
                    <button className="text-gray-600 border-gray-300 rounded-full w-6 h-6 flex items-center justify-center">
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-gray-200 ">
            <button className="w-full bg-primary text-white p-3 rounded-lg hover:bg-primary-dark transition">
              Proceed to checkout
            </button>
          </div>
        </div>
      </Transition>
    </div>
  );
}
