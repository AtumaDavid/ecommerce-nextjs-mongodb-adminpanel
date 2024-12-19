import axiosInstance from "@/lib/axiosInstance";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Detailed Product Details Interface
interface ProductDetails {
  _id: string;
  name: string;
  images: string[];
  sellingPrice: string;
  variations?: Array<{
    _id: string;
    color?: string;
    size?: string;
    price?: number;
    quantityAvailable?: number;
  }>;
}

// Cart Item Interface
interface CartItem {
  productId: ProductDetails;
  quantity: number;
  variationId?: string;
}

// API Response Interfaces
interface CartResponse {
  status: boolean;
  data: {
    items: CartItem[];
    total: number;
  };
  msg?: string;
}

// // Define types for cart item and store state
// interface CartItem {
//   productId: string;
//   quantity: number;
//   variationId?: string;
//   productDetails?: {
//     name: string;
//     images: string[];
//     sellingPrice: string;
//   };
// }

interface CartState {
  cart: CartItem[];
  total: number;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchCart: () => Promise<void>;
  addToCart: (
    productId: string,
    quantity: number,
    variationId?: string
  ) => Promise<void>;
  updateCartItemQuantity: (
    productId: string,
    quantity: number,
    variationId?: string
  ) => Promise<void>;
  removeFromCart: (productId: string, variationId?: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      total: 0,
      isLoading: false,
      error: null,

      fetchCart: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.get("/cart");
          if (response.data.status) {
            set({
              cart: response.data.data.items,
              total: response.data.total,
              isLoading: false,
            });
          }
        } catch (error: any) {
          set({
            error: error.response?.data?.msg || "Failed to fetch cart",
            isLoading: false,
          });
        }
      },

      addToCart: async (productId, quantity, variationId) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.post("/cart", {
            productId,
            quantity,
            variationId,
          });

          if (response.data.status) {
            // Refetch the entire cart to ensure consistency
            await get().fetchCart();
          }
        } catch (error: any) {
          set({
            error: error.response?.data?.msg || "Failed to add to cart",
            isLoading: false,
          });
        }
      },

      updateCartItemQuantity: async (productId, quantity, variationId) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.put(`/cart`, {
            productId,
            quantity,
            variationId,
          });

          if (response.data.status) {
            await get().fetchCart();
          }
        } catch (error: any) {
          set({
            error: error.response?.data?.msg || "Failed to update cart",
            isLoading: false,
          });
        }
      },

      removeFromCart: async (productId, variationId) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.delete(`/cart/${productId}`);

          if (response.data.status) {
            await get().fetchCart();
          }
        } catch (error: any) {
          set({
            error: error.response?.data?.msg || "Failed to remove from cart",
            isLoading: false,
          });
        }
      },

      clearCart: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.delete(`/cart/clear/userId`);

          if (response.data.status) {
            set({ cart: [], total: 0, isLoading: false });
          }
        } catch (error: any) {
          set({
            error: error.response?.data?.msg || "Failed to clear cart",
            isLoading: false,
          });
        }
      },
    }),
    {
      name: "cart-storage", // unique name
      // Optional: You can define which parts of the state to persist
      partialize: (state) => ({ cart: state.cart, total: state.total }),
    }
  )
);

export default useCartStore;
