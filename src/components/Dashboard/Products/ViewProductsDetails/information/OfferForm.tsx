import React, { useEffect, useState } from "react";
import { FaCheck, FaTrash } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axiosInstance from "@/lib/axiosInstance";
import { useToast } from "@/context/ToastContext";

// Define an interface for the Offer
interface Offer {
  id: number;
  startDate: Date;
  endDate: Date;
  discount: number;
  isFlashSale: boolean;
}

interface OfferFormProps {
  productId: string | null;
}

const OfferForm: React.FC<OfferFormProps> = ({ productId }) => {
  // const [offers, setOffers] = useState<Offer | null>(null);
  const { showToast } = useToast();
  const [currentOffer, setCurrentOffer] = useState<Offer | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(
    (() => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 7);
      return futureDate;
    })()
  );
  // const [discount, setDiscount] = useState<number>(20);
  const [discount, setDiscount] = useState<number | "">("");
  const [isFlashSale, setIsFlashSale] = useState<boolean>(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axiosInstance.get(`/products/${productId}`);
        // console.log(response);
        // console.log(response.data.data.offer);

        // if (response.data.data.offer && response.data.data.offer.length > 0) {
        //   // console.log(response.status);
        //   console.log(response.data.data.offer);
        //   setCurrentOffer(response.data.data.offer);
        // }
        if (response.data.data.offer) {
          // setCurrentOffer(response.data.data.offer);
          // console.log(response.data.data.offer);
          const offer = response.data.data.offer;
          setCurrentOffer({
            ...offer,
            startDate: new Date(offer.startDate),
            endDate: new Date(offer.endDate),
            discount: Number(offer.discountPercentage || offer.discount || 0),
            isFlashSale:
              offer.flashSale !== undefined ? Boolean(offer.flashSale) : false,
          });
          // showToast({
          //   type: "success",
          //   message: "Offer fetched successfully",
          // });
        }
      } catch (error) {
        console.error("error fetching data", error);
        showToast({
          type: "error",
          message: "Failed to fetch offer details",
        });
      }
    };
    if (productId) {
      fetchOffers();
    }
  }, [productId]);

  const handleSave = async () => {
    if (!startDate || !endDate || discount === "" || discount <= 0) {
      showToast({
        type: "error",
        message: "Please fill all required fields",
      });

      // alert("Please fill all required fields.");
      return;
    }

    try {
      const offerPayload = {
        offer: {
          startDate,
          endDate,
          discountPercentage: Number(discount),
          flashSale: isFlashSale,
        },
      };

      await axiosInstance.put(`/products/${productId}`, offerPayload);

      const newOffer: Offer = {
        id: Date.now(),
        startDate,
        endDate,
        discount: Number(discount),
        isFlashSale,
      };

      // Replace the existing offer with the new one
      setCurrentOffer(newOffer);

      showToast({
        type: "success",
        message: "Offer saved successfully",
      });

      // Reset form after saving
      setStartDate(new Date());
      const resetFutureDate = new Date();
      resetFutureDate.setDate(resetFutureDate.getDate() + 7);
      setEndDate(resetFutureDate);
      setDiscount("");
      setIsFlashSale(true);
    } catch (error) {
      console.error("Error saving offer:", error);
      // alert("There was an error saving the offer. Please try again.");
      showToast({
        type: "error",
        message: "There was an error saving the offer",
      });
    }
  };

  // const handleDeleteOffer = () => {
  //   setCurrentOffer(null);
  // };
  const handleDeleteOffer = async () => {
    try {
      // Send a request to remove only the offer
      await axiosInstance.put(`/products/${productId}`, {
        offer: null, // or you can use an empty object {}
      });

      // Clear the current offer state
      setCurrentOffer(null);

      // Show a success message
      // alert("Offer deleted successfully!");
      showToast({
        type: "success",
        message: "Offer deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting offer:", error);
      // alert("There was an error deleting the offer. Please try again.");
      showToast({
        type: "error",
        message: "There was an error deleting the offer",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-6">Create New Offer</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Offer Start Date */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              OFFER START DATE <span className="text-red-500">*</span>
            </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              showTimeSelect
              dateFormat="MM/dd/yyyy, h:mm aa"
            />
          </div>

          {/* Offer End Date */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              OFFER END DATE <span className="text-red-500">*</span>
            </label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              showTimeSelect
              dateFormat="MM/dd/yyyy, h:mm aa"
            />
          </div>

          {/* Discount Percentage */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              DISCOUNT PERCENTAGE <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              min="0"
              max="100"
            />
          </div>

          {/* Flash Sale */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              DO YOU WANT TO ADD IN THE FLASH SALE?{" "}
              <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center">
              <input
                type="radio"
                id="flash-sale-yes"
                name="flash-sale"
                className="mr-2"
                checked={isFlashSale}
                onChange={() => setIsFlashSale(true)}
              />
              <label htmlFor="flash-sale-yes" className="mr-4">
                Yes
              </label>
              <input
                type="radio"
                id="flash-sale-no"
                name="flash-sale"
                className="mr-2"
                checked={!isFlashSale}
                onChange={() => setIsFlashSale(false)}
              />
              <label htmlFor="flash-sale-no">No</label>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6">
          <button
            onClick={handleSave}
            className="bg-primary text-white font-bold py-2 px-4 rounded-full flex items-center"
          >
            <FaCheck className="mr-2" /> Save Offer
          </button>
        </div>

        {/* Offers List */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Existing Offers</h3>
          {!currentOffer ? (
            <p className="text-gray-500">No offers created yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-2">Start Date</th>
                    <th className="border p-2">End Date</th>
                    <th className="border p-2">Discount %</th>
                    <th className="border p-2">Flash Sale</th>
                    <th className="border p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={currentOffer.id} className="hover:bg-gray-100">
                    <td className="border p-2">
                      {currentOffer.startDate instanceof Date
                        ? currentOffer.startDate.toLocaleDateString()
                        : new Date(currentOffer.startDate).toLocaleDateString()}
                    </td>
                    <td className="border p-2">
                      {currentOffer.endDate instanceof Date
                        ? currentOffer.endDate.toLocaleDateString()
                        : new Date(currentOffer.endDate).toLocaleDateString()}
                    </td>
                    <td className="border p-2">
                      {typeof currentOffer.discount === "number"
                        ? `${currentOffer.discount}%`
                        : "0%"}
                    </td>
                    <td className="border p-2">
                      {currentOffer.isFlashSale ? "Yes" : "No"}
                    </td>
                    <td className="border p-2">
                      <button
                        onClick={handleDeleteOffer}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfferForm;
