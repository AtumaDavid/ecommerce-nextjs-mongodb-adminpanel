import { useToast } from "@/context/ToastContext";
import axiosInstance from "@/lib/axiosInstance";
import React, { useEffect, useState } from "react";

interface ShippingFormData {
  shippingType: "free" | "Flat Rate";
  shippingCost: number;
  isProductQuantity: boolean;
  returnPolicy?: string;
}

interface ShippingAndReturnProps {
  productId: string | null;
}

const ShippingAndReturn: React.FC<ShippingAndReturnProps> = ({ productId }) => {
  const { showToast } = useToast();
  const [shippingType, setShippingType] =
    useState<ShippingFormData["shippingType"]>("Flat Rate");
  const [shippingCost, setShippingCost] = useState<string>("");
  const [isProductQuantity, setIsProductQuantity] = useState<boolean>(false);
  const [returnPolicy, setReturnPolicy] = useState<string>("");
  const [submittedData, setSubmittedData] = useState<ShippingFormData | null>(
    null
  );

  // Effect to handle shipping cost when shipping type changes
  useEffect(() => {
    if (shippingType === "free") {
      setShippingCost("0");
    }
  }, [shippingType]);

  // Fetch existing shipping details when component mounts
  useEffect(() => {
    const fetchShippingDetails = async () => {
      try {
        const response = await axiosInstance.get(`/products/${productId}`);
        const shippingData = response.data.data.shippingReturn;
        // console.log(response.data.data.shippingReturn);

        if (shippingData) {
          setShippingType(shippingData.shippingType || "Flat Rate");
          setShippingCost(shippingData.shippingCost?.toString() || "");
          setIsProductQuantity(shippingData.isProductQuantity || false);
          setReturnPolicy(shippingData.returnPolicy || "");

          setSubmittedData({
            shippingType: shippingData.shippingType || "Flat Rate",
            shippingCost: shippingData.shippingCost || 0,
            isProductQuantity: shippingData.isProductQuantity || false,
            returnPolicy: shippingData.returnPolicy || "",
          });
        }
      } catch (error) {
        console.error("Error fetching shipping details:", error);
        showToast({
          type: "error",
          message: "Failed to fetch shipping details",
        });
      }
    };

    if (productId) {
      fetchShippingDetails();
    }
  }, [productId]);

  const resetForm = () => {
    setShippingType("Flat Rate");
    setShippingCost("");
    setIsProductQuantity(false);
    setReturnPolicy("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const formData: ShippingFormData = {
    //   // shippingReturn{

    //   // }
    //   shippingType,
    //   shippingCost: parseFloat(shippingCost),
    //   isProductQuantity,
    //   returnPolicy: returnPolicy.trim() || undefined,
    // };

    const formData = {
      shippingReturn: {
        // Wrap shipping details in a specific object
        shippingType,
        shippingCost: parseFloat(shippingCost),
        isProductQuantity,
        returnPolicy: returnPolicy.trim() || undefined,
      },
    };

    // if (!formData.shippingCost) {
    //   alert("Shipping cost is required");
    //   return;
    // }

    try {
      // Use a specific shipping update endpoint
      const response = await axiosInstance.put(
        `/products/${productId}`,
        formData
      );
      // console.log(formData);
      // console.log(response);

      // if (response.data && response.data.data) {
      //   console.log("Updated Product Data:", response.data.data);
      // }

      // Update submitted data with response
      // setSubmittedData(formData);
      setSubmittedData({
        shippingType,
        // shippingCost: parseFloat(shippingCost),
        shippingCost: shippingType === "free" ? 0 : parseFloat(shippingCost),
        isProductQuantity,
        returnPolicy: returnPolicy.trim() || undefined,
      });
      if (response.data && response.data.data) {
        showToast({
          type: "success",
          message: "Shipping and return saved successfully",
        });
      }

      resetForm();
    } catch (error) {
      console.error("Error saving shipping details:", error);
    }
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
                checked={shippingType === "Flat Rate"}
                onChange={() => setShippingType("Flat Rate")}
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
              disabled={shippingType === "free"}
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
              checked={isProductQuantity === true}
              onChange={() => setIsProductQuantity(true)}
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
              checked={isProductQuantity === false}
              onChange={() => setIsProductQuantity(false)}
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
            value={returnPolicy}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setReturnPolicy(e.target.value)
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
          <h2 className="text-lg font-semibold mb-4">
            Submitted Shipping Details
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Shipping Type:</p>
              <p>{submittedData.shippingType}</p>
            </div>
            <div>
              <p className="font-medium">Shipping Cost:</p>
              <p>₦{submittedData.shippingCost}</p>
            </div>
            <div>
              <p className="font-medium">Quantity Multiply:</p>
              <p>{submittedData.isProductQuantity ? "Yes" : "No"}</p>
            </div>
            <div>
              <p className="font-medium">Shipping & Return Policy:</p>
              <p className="text-sm">{submittedData.returnPolicy}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShippingAndReturn;
