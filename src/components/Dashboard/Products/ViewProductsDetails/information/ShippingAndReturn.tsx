import React, { useState } from "react";

interface ShippingFormData {
  shippingType: "free" | "flatRate";
  shippingCost: string;
  isQuantityMultiply: "yes" | "no";
  shippingAndReturn: string;
}

const ShippingAndReturn: React.FC = () => {
  const [shippingType, setShippingType] =
    useState<ShippingFormData["shippingType"]>("flatRate");
  const [shippingCost, setShippingCost] = useState<string>("");
  const [isQuantityMultiply, setIsQuantityMultiply] =
    useState<ShippingFormData["isQuantityMultiply"]>("no");
  const [shippingAndReturn, setShippingAndReturn] = useState<string>("");
  const [submittedData, setSubmittedData] = useState<ShippingFormData | null>(
    null
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData: ShippingFormData = {
      shippingType,
      shippingCost: shippingCost.trim(),
      isQuantityMultiply,
      shippingAndReturn: shippingAndReturn.trim(),
    };

    if (!formData.shippingCost) {
      alert("Shipping cost is required");
      return;
    }

    setSubmittedData(formData);
  };

  return (
    <div className="p-8 bg-gray-100">
      <h1 className="text-2xl font-semibold text-gray-700 mb-6">
        Shipping & Return
      </h1>
      <form onSubmit={handleSubmit} className=" w-1/2 mx-auto">
        <div className="flex justify-between ">
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              SHIPPING TYPE *
            </label>
            <div className="flex items-center mb-4">
              <input
                type="radio"
                id="free"
                name="shippingType"
                value="free"
                className="mr-2"
                checked={shippingType === "free"}
                onChange={() => setShippingType("free")}
              />
              <label htmlFor="free" className="mr-4">
                Free
              </label>
              <input
                type="radio"
                id="flatRate"
                name="shippingType"
                value="flatRate"
                className="mr-2"
                checked={shippingType === "flatRate"}
                onChange={() => setShippingType("flatRate")}
              />
              <label htmlFor="flatRate">Flat Rate</label>
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              SHIPPING COST *
            </label>
            <input
              type="number"
              className="border border-gray-300 rounded p-2 w-full"
              value={shippingCost}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setShippingCost(e.target.value)
              }
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            IS PRODUCT QUANTITY MULTIPLY *
          </label>
          <div className="flex items-center mb-4">
            <input
              type="radio"
              id="yes"
              name="quantityMultiply"
              value="yes"
              className="mr-2"
              checked={isQuantityMultiply === "yes"}
              onChange={() => setIsQuantityMultiply("yes")}
            />
            <label htmlFor="yes" className="mr-4">
              Yes
            </label>
            <input
              type="radio"
              id="no"
              name="quantityMultiply"
              value="no"
              className="mr-2"
              checked={isQuantityMultiply === "no"}
              onChange={() => setIsQuantityMultiply("no")}
            />
            <label htmlFor="no">No</label>
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            SHIPPING & RETURN *
          </label>
          <textarea
            className="border border-gray-300 rounded p-2 w-full"
            style={{ minHeight: "150px", backgroundColor: "#fff" }}
            value={shippingAndReturn}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setShippingAndReturn(e.target.value)
            }
            required
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
        >
          Save
        </button>
      </form>
      {submittedData && (
        <div className="mt-8 p-4 bg-white shadow rounded">
          <h2 className="text-lg font-semibold mb-4">Submitted Data</h2>
          <pre className="text-sm bg-gray-100 p-2 rounded overflow-x-auto">
            {JSON.stringify(submittedData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ShippingAndReturn;
