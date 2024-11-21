import React from "react";

interface InfoItemProps {
  label: string;
  value: string | number | null;
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => (
  <div className="flex justify-between mb-2">
    <span className="font-medium">{label}</span>
    <span>{value || "N/A"}</span>
  </div>
);

interface ProductDetailsProps {
  description: string;
  benefits: string[];
  productDetails: string[];
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  description,
  benefits,
  productDetails,
}) => (
  <div className="mt-8">
    <h2 className="text-sm font-medium text-gray-600 mb-2">Description</h2>
    <p className="text-sm text-gray-800 mb-4">{description}</p>
    <h3 className="text-sm font-medium text-gray-600 mb-2">Benefits</h3>
    <ul className="list-disc list-inside text-sm text-gray-800 mb-4">
      {benefits.map((benefit, index) => (
        <li key={index}>{benefit}</li>
      ))}
    </ul>
    <h3 className="text-sm font-medium text-gray-600 mb-2">Product Details</h3>
    <ul className="list-disc list-inside text-sm text-gray-800">
      {productDetails.map((detail, index) => (
        <li key={index}>{detail}</li>
      ))}
    </ul>
  </div>
);

const Information: React.FC = () => {
  const productInfoLeft = [
    { label: "Name", value: "Snapback Hat" },
    { label: "Category", value: "Hats" },
    { label: "Brand", value: "Puma" },
    { label: "Buying Price", value: "80.00" },
    { label: "Maximum Purchase Quantity", value: "100" },
    { label: "Weight", value: null },
    { label: "Purchasable", value: "Yes" },
    { label: "Refundable", value: "Yes" },
    { label: "Tags", value: "Hats" },
  ];

  const productInfoRight = [
    { label: "SKU", value: "5500656" },
    { label: "Barcode", value: "EAN-13" },
    { label: "Tax", value: "VAT-5, VAT-20" },
    { label: "Selling Price", value: "100.00" },
    { label: "Low Stock Quantity Warning", value: "2" },
    { label: "Unit", value: "Piece" },
    { label: "Show Stock Out", value: "Disable" },
    { label: "Status", value: "Active" },
  ];

  const description = `
    Step your Swoosh game up with this mid-depth, unstructured Club Cap. 
    Its curved bill and metal Swoosh logo give your look a clean finish while sweat-wicking tech helps you stay cool and comfortable.
  `;

  const benefits = [
    "Nike Dri-FIT technology moves sweat away from your skin for quicker evaporation, helping you stay dry and comfortable.",
    "Twill fabric has a lightweight, smooth feel.",
    "A mid-depth, 6-panel design makes for easy styling.",
    "The Swoosh branded metal tri-glide lets you adjust your fit with ease.",
  ];

  const productDetails = [
    "100% polyester",
    "A metal Swoosh Ingot logo",
    "An adjustable metal clamp closure with Embossed Swoosh",
    "Hand-wash",
    "Imported",
  ];

  return (
    <div className="p-4 md:p-8 bg-white text-gray-800">
      <h1 className="text-lg font-medium text-gray-600 mb-4">
        Product Information
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          {productInfoLeft.map((item, index) => (
            <InfoItem key={index} label={item.label} value={item.value} />
          ))}
        </div>
        <div>
          {productInfoRight.map((item, index) => (
            <InfoItem key={index} label={item.label} value={item.value} />
          ))}
        </div>
      </div>
      <ProductDetails
        description={description}
        benefits={benefits}
        productDetails={productDetails}
      />
    </div>
  );
};

export default Information;
