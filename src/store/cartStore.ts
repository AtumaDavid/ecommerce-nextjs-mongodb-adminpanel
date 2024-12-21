import axiosInstance from "@/lib/axiosInstance";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Cart Item Interface
export interface CartItem {
  productId: {
    _id: string;
    name: string;
    images: string[];
    sellingPrice: string;
    originalPrice?: string;
    offer?: {
      discountPercentage?: number;
      startDate?: string;
      endDate?: string;
    };
    variationDetails?: {
      color?: string;
      size?: string;
      price?: number;
      quantityAvailable?: number;
    };
  };
  quantity: number;
  variationId?: string;
  variationDetails?: {
    color?: string;
    size?: string;
    // price?: number;
  };
  finalPrice: number; // Calculated price considering variations and offers
}

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
    variationId?: string | null
  ) => Promise<void>;
  updateCartItemQuantity: (
    productId: string,
    quantity: number,
    variationId?: string | null
  ) => Promise<void>;
  removeFromCart: (
    productId: string,
    variationId?: string | null
  ) => Promise<void>;
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
          console.log(response.data);
        } catch (error: any) {
          set({
            error: error.response?.data?.msg || "Failed to fetch cart",
            isLoading: false,
          });
        }
      },

      // ADD TO CART
      addToCart: async (productId, quantity, variationId) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.post("/cart", {
            productId,
            quantity,
            variationId,
          });

          // console.log({ ...response });

          if (response.data.status) {
            // Refetch the entire cart to ensure consistency
            await get().fetchCart();
          }
        } catch (error) {
          set({
            error: "Failed to add to cart",
            isLoading: false,
          });
          throw error;
        }
      },

      // UPDATE CART
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

      // REMOVE FROM CART
      removeFromCart: async (
        productId: string,
        variationId?: string | null
      ) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.delete(`/cart/${productId}`, {
            params: {
              // Only include variationId if it exists
              ...(variationId ? { variationId } : {}),
            },
          });

          if (response.data.status) {
            await get().fetchCart();
          }
        } catch (error: any) {
          set({
            error: error.response?.data?.msg || "Failed to remove from cart",
            isLoading: false,
          });
          throw error;
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
