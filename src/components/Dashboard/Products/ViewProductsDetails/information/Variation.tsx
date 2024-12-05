import axiosInstance from "@/lib/axiosInstance";
import React, { useEffect, useState } from "react";
import { FaPlus, FaPen, FaTrash } from "react-icons/fa";
import { useToast } from "@/context/ToastContext";

type Variation = {
  // id: number;
  color: string;
  size: string;
  price: number;
  quantityAvailable: number;
};

// interface VariationsProps {
//   productSku: string; // Accept product SKU as a prop
// }
interface VariationProps {
  productId: string | null;
}

const Variations: React.FC<VariationProps> = ({ productId }) => {
  const { showToast } = useToast();
  const [variations, setVariations] = useState<Variation[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<Variation | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // console.log(productId);

  const sizeOptions = ["S", "M", "L", "XL", "XXL"];

  // Fetch existing variations when component mounts or productId changes
  useEffect(() => {
    const fetchVariations = async () => {
      if (!productId) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await axiosInstance.get(`/products/${productId}`);

        // Check if variations exist in the response
        if (response.data.data.variations) {
          setVariations(response.data.data.variations);
        }
      } catch (error) {
        console.error("Error fetching variations:", error);
        setError("Failed to fetch variations. Please try again.");
        showToast({
          type: "error",
          message: "Failed to fetch data",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchVariations();
  }, [productId]);

  const handleDelete = async (index: number) => {
    try {
      const updatedVariations = variations.filter((_, i) => i !== index);

      const payload = {
        variations: updatedVariations,
      };

      const response = await axiosInstance.put(
        `/products/${productId}`,
        payload
      );

      setVariations(response.data.data.variations || updatedVariations);

      // alert("Variation deleted successfully");
      showToast({
        type: "success",
        message: "deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting variation:", error);
      alert("Failed to delete variation. Please try again.");
    }
  };

  const handleEdit = (variation: Variation, index: number) => {
    setIsEditMode(true);
    // setModalData(variation);
    setModalData({ ...variation });
    setEditIndex(index);
    setShowModal(true);
  };

  const handleAdd = () => {
    setIsEditMode(false);
    setModalData({
      // id: Date.now(),
      color: "",
      size: "S",
      price: 0,
      quantityAvailable: 0,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (
      !productId ||
      !modalData ||
      !modalData.color ||
      !modalData.size ||
      modalData.price === undefined ||
      modalData.quantityAvailable === undefined
    ) {
      // alert("Please fill all fields");
      showToast({
        type: "error",
        message: "Please fill all fields",
      });
      return;
    }

    try {
      // Create a copy of variations
      const updatedVariations = [...variations];

      // If in edit mode, update the existing variation
      if (isEditMode && editIndex !== null) {
        updatedVariations[editIndex] = {
          color: modalData.color,
          size: modalData.size,
          price: Number(modalData.price),
          quantityAvailable: Number(modalData.quantityAvailable),
        };
      } else {
        // Add new variation
        updatedVariations.push({
          color: modalData.color,
          size: modalData.size,
          price: Number(modalData.price),
          quantityAvailable: Number(modalData.quantityAvailable),
        });
      }

      // Prepare the payload
      const payload = {
        variations: updatedVariations,
      };

      // Send update request to the product endpoint
      const response = await axiosInstance.put(
        `/products/${productId}`,
        payload
      );

      // Update local state with the response data
      setVariations(response.data.data.variations || updatedVariations);

      // Close the modal and reset modal data
      setShowModal(false);
      setModalData(null);
      setEditIndex(null);

      // alert("Variation saved successfully");
      showToast({
        type: "success",
        message: "saved successfully",
      });
    } catch (error) {
      console.error("Error saving variation:", error);
      // alert("Failed to save variation. Please check your inputs.");
      showToast({
        type: "error",
        message: "failed to save variations",
      });
    }
  };

  const formatPrice = (price: number) => `₦${price.toFixed(2)}`;

  // Add loading and error states
  if (isLoading) {
    return (
      <div className="p-4 text-center">
        <p>Loading variations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4 md:mb-0">
          Variation
        </h1>
        <button
          onClick={handleAdd}
          className="bg-primary text-white px-4 py-2 rounded flex items-center"
        >
          <FaPlus className="mr-2" /> Add Variation
        </button>
      </div>
      <div className="bg-white shadow rounded-lg">
        {variations.length > 0 ? (
          variations.map((variation, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row justify-between items-center border-b border-gray-200 p-4"
            >
              <span className="text-gray-700 mb-2 md:mb-0 text-xl">
                Color :: {variation.color} &gt; Size :: {variation.size} &gt;
                Price :: {formatPrice(variation.price)} &gt; Quantity ::
                {variation.quantityAvailable}
              </span>
              <div className="flex space-x-2">
                <button
                  className="bg-green-100 text-green-500 p-2 rounded"
                  onClick={() => handleEdit(variation, index)}
                >
                  <FaPen />
                </button>
                <button
                  className="bg-red-100 text-red-500 p-2 rounded"
                  onClick={() => handleDelete(index)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 p-4">
            No variations available. Add a new variation to get started.
          </p>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">
              {isEditMode ? "Edit Variation" : "Add Variation"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Color</label>
                <input
                  type="text"
                  value={modalData?.color || ""}
                  onChange={(e) =>
                    setModalData((prev) =>
                      prev ? { ...prev, color: e.target.value } : null
                    )
                  }
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Size</label>
                <select
                  value={modalData?.size || ""}
                  onChange={(e) =>
                    setModalData((prev) =>
                      prev ? { ...prev, size: e.target.value } : null
                    )
                  }
                  className="w-full px-3 py-2 border rounded"
                >
                  {sizeOptions.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Price (₦)</label>
                <input
                  type="number"
                  value={modalData?.price || 0}
                  onChange={(e) =>
                    setModalData((prev) =>
                      prev ? { ...prev, price: Number(e.target.value) } : null
                    )
                  }
                  className="w-full px-3 py-2 border rounded"
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">
                  Quantity Available
                </label>
                <input
                  type="number"
                  value={modalData?.quantityAvailable || 0}
                  onChange={(e) =>
                    setModalData((prev) =>
                      prev
                        ? {
                            ...prev,
                            quantityAvailable: parseInt(e.target.value, 10),
                          }
                        : null
                    )
                  }
                  className="w-full px-3 py-2 border rounded"
                  min="0"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                onClick={() => {
                  setShowModal(false);
                  setModalData(null);
                }}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Variations;
