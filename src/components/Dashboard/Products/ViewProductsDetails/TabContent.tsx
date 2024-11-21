import React from "react";
import { ProductTabName } from "./types";
import Information from "./information/Information";
import ProductGallery from "./information/ProductGallery";
import Variations from "./information/Variation";
import OfferForm from "./information/OfferForm";
import ShippingAndReturn from "./information/ShippingAndReturn";
// import Offers from "@/app/offers/page";

interface TabContentProps {
  activeTab: ProductTabName;
}

const TabContent: React.FC<TabContentProps> = ({ activeTab }) => {
  const renderDefaultContent = () => {
    switch (activeTab) {
      case "Information":
        return <Information />;
      case "Images":
        return <ProductGallery />;
      case "Variation":
        return <Variations />;
      case "Offer":
        return <OfferForm />;
      case "Shipping & Return":
        return <ShippingAndReturn />;
      default:
        return (
          <p className="text-gray-500">{activeTab} content goes here...</p>
        );
    }
  };

  return (
    <div className="mt-4 w-full">
      <h2 className="text-gray-600 text-lg font-semibold">{activeTab}</h2>
      {renderDefaultContent()}
    </div>
  );
};

export default TabContent;