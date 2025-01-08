import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem } from "@/store/cartStore";

interface CartProps {
  cartItems: CartItem[];
  handleIncreaseQuantity: (item: CartItem) => void;
  handleDecreaseQuantity: (item: CartItem) => void;
  handleRemoveItem: (item: CartItem) => Promise<void>;
}

const Cart: React.FC<CartProps> = ({
  cartItems,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
  handleRemoveItem,
}) => {
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

  return (
    <div className="bg-white p-3 sm:p-4 md:p-6 rounded-lg mb-6 shadow-md">
      <div className="space-y-4">
        {cartItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row gap-4 pb-4 border-b border-gray-100 last:border-0"
          >
            {/* Image container with aspect ratio */}
            <div className="relative w-full sm:w-24 md:w-32 aspect-square shrink-0">
              <img
                src={item.productId.images[0]}
                alt={item.productId.name}
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Content container */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start gap-2">
                <div className="space-y-1 flex-1">
                  <h3 className="font-semibold text-sm sm:text-base line-clamp-2">
                    {item.productId.name}
                  </h3>

                  {/* Variation details */}
                  {item.productId.variationDetails?.color &&
                    item.productId.variationDetails?.size && (
                      <p className="text-xs text-gray-500">
                        Color: {item.productId.variationDetails.color}, Size:{" "}
                        {item.productId.variationDetails.size}
                      </p>
                    )}

                  {/* Price section */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-green-600 font-medium">
                      ₦{getDisplayPrice(item).toFixed(2)}
                    </span>

                    {item.productId.offer?.discountPercentage && (
                      <>
                        <span className="text-gray-400 text-xs line-through">
                          ₦
                          {parseFloat(
                            item.productId.sellingPrice.replace("₦", "")
                          ).toFixed(2)}
                        </span>
                        <span className="text-red-500 text-xs">
                          {item.productId.offer.discountPercentage}% OFF
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Delete button */}
                <button
                  onClick={() => handleRemoveItem(item)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              {/* Quantity controls */}
              <div className="flex items-center mt-3 gap-1">
                <button
                  onClick={() => handleDecreaseQuantity(item)}
                  className="p-1.5 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-medium text-sm">
                  {item.quantity}
                </span>
                <button
                  onClick={() => handleIncreaseQuantity(item)}
                  className="p-1.5 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
