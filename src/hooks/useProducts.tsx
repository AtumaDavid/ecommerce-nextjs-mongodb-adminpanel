"use client";
import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { Product } from "@/components/Dashboard/Products/types/product";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<Product[]>("/products");
      setProducts(Array.isArray(response.data) ? response.data : []);
      setError(null);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to fetch products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (product: Omit<Product, "id">) => {
    try {
      const response = await axiosInstance.post<Product>("/products", product);
      setProducts((prevProducts) => [...prevProducts, response.data]);
      return response.data;
    } catch (err) {
      console.error("Error adding product:", err);
      throw err;
    }
  };

  const updateProduct = async (
    productId: number,
    updatedProduct: Partial<Product>
  ) => {
    try {
      const response = await axiosInstance.put<Product>(
        `/products/${productId}`,
        updatedProduct
      );
      setProducts((prevProducts) =>
        prevProducts.map((p) => (p._id === productId ? response.data : p))
      );
      return response.data;
    } catch (err) {
      console.error("Error updating product:", err);
      throw err;
    }
  };

  const deleteProduct = async (productId: number) => {
    try {
      await axiosInstance.delete(`/products/${productId}`);
      setProducts((prevProducts) =>
        prevProducts.filter((p) => p._id !== productId)
      );
    } catch (err) {
      console.error("Error deleting product:", err);
      throw err;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  };
};
