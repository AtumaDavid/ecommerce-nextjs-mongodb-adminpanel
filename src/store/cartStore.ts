import axiosInstance from "@/lib/axiosInstance";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";

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
  variationId?: string | null;
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

interface LocalCartItem {
  productId: string;
  quantity: number;
  variationId?: string | null;
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
          // const response = await axiosInstance.get("/cart");
          // if (response.data.status) {
          //   set({
          //     cart: response.data.data.items,
          //     total: response.data.total,
          //     isLoading: false,
          //   });
          // }
          // console.log(response.data);
          const isLoggedIn = !!Cookies.get("token"); // Check if user is logged in using cookies

          if (isLoggedIn) {
            const response = await axiosInstance.get("/cart");
            if (response.data.status) {
              set({
                cart: response.data.data.items,
                total: response.data.total,
                isLoading: false,
              });
            }
          } else {
            // Fetch cart from cookies if not logged in
            const localCart = JSON.parse(Cookies.get("cart") || "[]");
            set({ cart: localCart, isLoading: false });
          }
        } catch (error) {
          set({
            error: "Failed to fetch cart",
            isLoading: false,
          });
        }
      },

      // ADD TO CART
      addToCart: async (productId, quantity, variationId) => {
        set({ isLoading: true, error: null });
        try {
          const isLoggedIn = !!Cookies.get("token");
          if (isLoggedIn) {
            const response = await axiosInstance.post("/cart", {
              productId,
              quantity,
              variationId,
            });
            if (response.data.status) {
              await get().fetchCart();
            }
          } else {
            // Fetch product details from the server
            const productResponse = await axiosInstance.get(
              `/products/${productId}`
            );
            const productDetails = productResponse.data.data;

            // Check if the item already exists in the cart
            const existingItemIndex = get().cart.findIndex(
              (item) =>
                item.productId._id === productId &&
                item.variationId === variationId
            );

            if (existingItemIndex !== -1) {
              // If item exists, update its quantity directly
              const updatedCart = [...get().cart];
              updatedCart[existingItemIndex] = {
                ...updatedCart[existingItemIndex],
                quantity: quantity, // Set to the new quantity, not add
              };

              set({ cart: updatedCart });
              Cookies.set("cart", JSON.stringify(updatedCart));
            } else {
              // Add new item to cart
              const newItem: CartItem = {
                productId: {
                  _id: productDetails._id,
                  name: productDetails.name,
                  images: productDetails.images,
                  sellingPrice: productDetails.sellingPrice,
                  offer: productDetails.offer,
                  variationDetails: variationId
                    ? productDetails.variations?.find(
                        (variation: {
                          _id?: string;
                          color?: string;
                          size?: string;
                          // price?: number;
                          quantityAvailable?: number;
                        }) => variation._id === variationId
                      )
                    : undefined,
                },
                quantity,
                variationId,
                finalPrice: parseFloat(
                  productDetails.sellingPrice.replace("₦", "")
                ),
              };

              // Update the cart in state and cookies
              const updatedCart = [...get().cart, newItem];
              set({ cart: updatedCart });
              Cookies.set("cart", JSON.stringify(updatedCart));
            }
          }
        } catch (error) {
          console.error("Error in addToCart:", error);
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
          const isLoggedIn = !!Cookies.get("token");
          // // Equivalent to:
          // const isLoggedIn = Cookies.get("token") ? true : false;

          if (isLoggedIn) {
            const response = await axiosInstance.put("/cart", {
              productId,
              quantity,
              variationId,
            });
            if (response.data.status) {
              await get().fetchCart();
            }
          } else {
            // update local cart with cookies if not logged in
            const updatedCart = get().cart.map((item) =>
              item.productId._id === productId &&
              item.variationId === variationId
                ? { ...item, quantity }
                : item
            );
            set({ cart: updatedCart });
            Cookies.set("cart", JSON.stringify(updatedCart)); //update cookies
          }
        } catch (error) {
          set({
            error: "Failed to update cart",
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
          // const response = await axiosInstance.delete(`/cart/${productId}`, {
          //   params: {
          //     // Only include variationId if it exists
          //     ...(variationId ? { variationId } : {}),
          //   },
          // });

          // if (response.data.status) {
          //   await get().fetchCart();
          // }
          const isLoggedIn = !!Cookies.get("token");
          if (isLoggedIn) {
            const response = await axiosInstance.delete(`/cart/${productId}`, {
              params: {
                // Only include variationId if it exists
                ...(variationId ? { variationId } : {}),
              },
            });
            if (response.data.status) {
              await get().fetchCart();
            }
          } else {
            // Remove from local cart in cookies if not logged in
            const updatedCart = get().cart.filter(
              (item) =>
                !(
                  item.productId._id === productId &&
                  item.variationId === variationId
                )
            );
            set({ cart: updatedCart });
            Cookies.set("cart", JSON.stringify(updatedCart));
          }
        } catch (error) {
          set({
            error: "Failed to remove from cart",
            isLoading: false,
          });
          throw error;
        }
      },

      // CLEAR CART
      clearCart: async () => {
        set({ isLoading: true, error: null });
        try {
          // const response = await axiosInstance.delete(`/cart/clear/userId`);
          // if (response.data.status) {
          //   set({ cart: [], total: 0, isLoading: false });
          // }
          const isLoggedIn = !!Cookies.get("token"); // Check if user is logged in using cookies

          if (isLoggedIn) {
            const response = await axiosInstance.delete(`/cart/clear/userId`);

            if (response.data.status) {
              set({ cart: [], total: 0, isLoading: false });
            }
          } else {
            // Clear local cart in cookies if not logged in
            set({ cart: [], total: 0, isLoading: false });
            Cookies.remove("cart"); // Remove cart from cookies
          }
        } catch (error) {
          set({
            error: "Failed to clear cart",
            isLoading: false,
          });
        }
      },

      // SYNC CART WITH SERVER
      syncCartWithServer: async () => {
        const isLoggedIn = !!Cookies.get("token");
        if (isLoggedIn) {
          const localCart: LocalCartItem[] = JSON.parse(
            Cookies.get("cart") || "[]"
          );
          if (localCart.length > 0) {
            // Sync local cart with server
            await Promise.all(
              localCart.map((item) => axiosInstance.post("/cart", item))
            );
            Cookies.remove("cart"); // Clear local cart after syncing
            await get().fetchCart();
          }
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
