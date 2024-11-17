import React from "react";

const DeleteModal = ({ onClose, onConfirm }: any) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <h3 className="text-lg font-semibold">Confirm Deletion</h3>
        <p>Are you sure you want to delete this address?</p>
        <div className="flex justify-end space-x-4 mt-6">
          <button onClick={onClose} className="text-gray-600">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
