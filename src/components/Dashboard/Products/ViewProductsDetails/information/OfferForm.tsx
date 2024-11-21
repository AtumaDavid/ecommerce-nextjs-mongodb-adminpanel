import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const OfferForm: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [discount, setDiscount] = useState<number>(0);
  const [isFlashSale, setIsFlashSale] = useState<boolean>(false);

  const handleSave = () => {
    if (!startDate || !endDate || discount <= 0) {
      alert("Please fill all required fields.");
      return;
    }

    // Simulate saving data
    console.log({
      startDate,
      endDate,
      discount,
      isFlashSale,
    });
    alert("Offer saved successfully!");
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full">
        <h2 className="text-xl font-semibold mb-6">Offer</h2>
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
            <FaCheck className="mr-2" /> Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferForm;
