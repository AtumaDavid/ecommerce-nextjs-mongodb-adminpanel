import React, { useState } from "react";
import { FaPlus, FaPen, FaTrash } from "react-icons/fa";

type Variation = {
  id: number;
  color: string;
  size: string;
  price: string;
};

// interface VariationsProps {
//   productSku: string; // Accept product SKU as a prop
// }

const Variations: React.FC = () => {
  const [variations, setVariations] = useState<Variation[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<Variation | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const sizeOptions = ["S", "M", "L", "XL", "XXL"];

  const handleDelete = (id: number) => {
    setVariations((prevVariations) =>
      prevVariations.filter((v) => v.id !== id)
    );
  };

  const handleEdit = (variation: Variation) => {
    setIsEditMode(true);
    setModalData(variation);
    setShowModal(true);
  };

  const handleAdd = () => {
    setIsEditMode(false);
    setModalData({ id: Date.now(), color: "", size: "S", price: "" });
    setShowModal(true);
  };

  const handleSave = () => {
    if (modalData && modalData.color && modalData.size && modalData.price) {
      if (isEditMode) {
        setVariations((prevVariations) =>
          prevVariations.map((v) => (v.id === modalData.id ? modalData : v))
        );
      } else {
        setVariations((prevVariations) => [...prevVariations, modalData]);
      }
      setShowModal(false);
      setModalData(null);
    } else {
      alert("Please fill all fields.");
    }
  };

  const formatPrice = (price: string) => `₦${price}`;

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
          variations.map((variation) => (
            <div
              key={variation.id}
              className="flex flex-col md:flex-row justify-between items-center border-b border-gray-200 p-4"
            >
              <span className="text-gray-700 mb-2 md:mb-0 text-xl">
                Color :: {variation.color} &gt; Size :: {variation.size} &gt;
                Price :: {formatPrice(variation.price)}
              </span>
              <div className="flex space-x-2">
                <button
                  className="bg-green-100 text-green-500 p-2 rounded"
                  onClick={() => handleEdit(variation)}
                >
                  <FaPen />
                </button>
                <button
                  className="bg-red-100 text-red-500 p-2 rounded"
                  onClick={() => handleDelete(variation.id)}
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
                  value={modalData?.price || ""}
                  onChange={(e) =>
                    setModalData((prev) =>
                      prev ? { ...prev, price: e.target.value } : null
                    )
                  }
                  className="w-full px-3 py-2 border rounded"
                  min="0"
                  step="0.01"
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
