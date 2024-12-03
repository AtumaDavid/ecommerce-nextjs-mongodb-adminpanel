import React from "react";
import { ProductTabName } from "./types";
import Information from "./information/Information";
import ProductGallery from "./information/ProductGallery";
import Variations from "./information/Variation";
import OfferForm from "./information/OfferForm";
import ShippingAndReturn from "./information/ShippingAndReturn";
import SEOForm from "./SEOForm";
// import Offers from "@/app/offers/page";

interface TabContentProps {
  activeTab: ProductTabName;
  productId: string | null;
}

const TabContent: React.FC<TabContentProps> = ({ activeTab, productId }) => {
  const renderDefaultContent = () => {
    switch (activeTab) {
      case "Information":
        return <Information productId={productId} />;
      case "Images":
        return <ProductGallery productId={productId} />;
      case "Variation":
        return <Variations />;
      case "Offer":
        return <OfferForm productId={productId} />;
      case "Shipping & Return":
        return <ShippingAndReturn productId={productId} />;
      case "SEO":
        return <SEOForm />;
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
