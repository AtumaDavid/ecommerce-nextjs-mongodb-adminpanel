import React, { useState } from "react";
import InputField from "./ProductsForm/InputField";
import SelectField from "./ProductsForm/SelectField";
import RadioGroup from "./ProductsForm/RadioGroup";
import TagInput from "./ProductsForm/TagInput";
import TextArea from "./ProductsForm/TextArea";

interface FormData {
  name: string;
  sku: string;
  category: string;
  barcode: string;
  buyingPrice: string;
  sellingPrice: string;
  tax: string;
  status: string;
  canPurchasable: string;
  showStockOut: string;
  refundable: string;
  maxPurchaseQuantity: string;
  lowStockWarning: string;
  unit: string;
  weight?: string;
  tags: string[];
  description: string;
}

type Gender = "men" | "women" | "juniors";

interface AddProductFormProps {
  onSubmit: (data: FormData) => void; // Ensure proper type definition
}

interface Category {
  category: string;
  subcategories: string[];
}

const categories: Record<Gender, Category[]> = {
  men: [
    {
      category: "Shoes",
      subcategories: [
        "Basket Ball",
        "Running",
        "Sandals & Slides",
        "Sneakers",
        "Soccer",
      ],
    },
    {
      category: "Clothing",
      subcategories: [
        "Hoodies & Sweatshirts",
        "Jackets & Vests",
        "Pants & Tights",
        "Shorts",
        "Tops & T-shirts",
      ],
    },
    {
      category: "Accessories",
      subcategories: [
        "Bags & Backpacks",
        "Hats & Beanies",
        "Socks",
        "Underwear",
      ],
    },
  ],
  women: [
    {
      category: "Shoes",
      subcategories: ["Running", "Sneakers", "Training & Gym"],
    },
    {
      category: "Clothing",
      subcategories: [
        "Dresses & Skirts",
        "Hoodies & Sweatshirts",
        "Pants",
        "Tights & Leggings",
        "Tops & T-shirts",
      ],
    },
    {
      category: "Accessories",
      subcategories: ["Bags & Backpacks", "Hats", "Socks"],
    },
  ],
  juniors: [
    {
      category: "Shoes",
      subcategories: ["Running", "Sneakers", "Training & Gym"],
    },
    {
      category: "Clothing",
      subcategories: [
        "Dresses & Skirts",
        "Hoodies & Sweatshirts",
        "Pants",
        "Tights & Leggings",
        "Tops & T-shirts",
      ],
    },
    {
      category: "Accessories",
      subcategories: ["Bags & Backpacks", "Hats", "Socks"],
    },
  ],
};

const ProductForm: React.FC<AddProductFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    sku: Math.floor(Math.random() * 100000).toString(),
    category: "",
    barcode: "",
    buyingPrice: "",
    sellingPrice: "",
    tax: "No Vat",
    status: "",
    canPurchasable: "",
    showStockOut: "",
    refundable: "",
    maxPurchaseQuantity: "",
    lowStockWarning: "",
    unit: "piece(pc)",
    weight: "",
    tags: [],
    description: "",
  });

  const [errors, setErrors] = useState<{ [key in keyof FormData]?: string }>(
    {}
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [selectedGender, setSelectedGender] = useState<Gender | "">("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");

  // Function to handle gender change
  const handleGenderChange = (gender: string) => {
    if (gender === "men" || gender === "women" || gender === "juniors") {
      setSelectedGender(gender as Gender);
      setSelectedCategory(""); // Reset category when gender changes
      setSelectedSubcategory(""); // Reset subcategory when gender changes
    }
  };

  const categoryOptions = selectedGender
    ? categories[selectedGender].map((cat) => ({
        value: cat.category,
        label: cat.category,
      }))
    : [];

  // Function to handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory(""); // Reset subcategory when category changes
  };

  // const handleGenderChange = (gender: string) => {
  //   if (gender === "men" || gender === "women" || gender === "juniors") {
  //     setSelectedGender(gender as Gender);
  //     setSelectedCategory(""); // Reset category when gender changes
  //     setSelectedSubcategory(""); // Reset subcategory when gender changes
  //   }
  // };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (isSubmitted) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: { [key in keyof FormData]?: string } = {};
    const requiredFields: (keyof FormData)[] = [
      "name",
      "sku",
      "category",
      "barcode",
      "buyingPrice",
      "sellingPrice",
      "status",
      "canPurchasable",
      "showStockOut",
      "refundable",
      "maxPurchaseQuantity",
      "lowStockWarning",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      }
    });

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", formData);
      onSubmit(formData); // Pass data to parent
    }
  };

  const handleAddTag = (tag: string) => {
    if (tag && formData.tags.length < 10) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tag],
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  return (
    <div className="p-4">
      <form
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        onSubmit={handleSubmit}
      >
        {/* NAME */}
        <InputField
          label="NAME"
          value={formData.name}
          onChange={(value) => handleChange("name", value)}
          error={isSubmitted && errors.name ? errors.name : undefined}
        />
        {/* SKU */}
        <InputField
          label="SKU"
          value={formData.sku}
          onChange={(value) => handleChange("sku", value)}
          error={isSubmitted && errors.sku ? errors.sku : undefined}
        />
        {/* CATEGORY */}
        <RadioGroup
          label="GENDER"
          value={selectedGender}
          onChange={handleGenderChange}
          options={[
            { value: "men", label: "Men" },
            { value: "women", label: "Women" },
            { value: "juniors", label: "Juniors" },
          ]}
        />

        <SelectField
          label="CATEGORY"
          value={selectedCategory}
          onChange={handleCategoryChange}
          options={
            selectedGender
              ? categories[selectedGender].map((cat) => ({
                  value: cat.category,
                  label: cat.category,
                }))
              : []
          }
        />

        <SelectField
          label="SUBCATEGORY"
          value={selectedSubcategory}
          onChange={(value) => {
            setSelectedSubcategory(value); // Update selectedSubcategory state
            handleChange("category", value); // Keep this to update formData
          }}
          options={
            selectedCategory && selectedGender // Ensure selectedGender is not an empty string
              ? categories[selectedGender]
                  .find((cat) => cat.category === selectedCategory)
                  ?.subcategories.map((subCat) => ({
                    value: subCat,
                    label: subCat,
                  })) || []
              : []
          }
        />

        {/* BARCODE */}
        <SelectField
          label="BARCODE"
          value={formData.barcode}
          onChange={(value) => handleChange("barcode", value)}
          options={[
            { value: "", label: "-- Select Barcode --" },
            { value: "EAN-13", label: "EAN-13" },
            { value: "UPC-A", label: "UPC-A" },
          ]}
          error={isSubmitted && errors.barcode ? errors.barcode : undefined}
        />
        {/* BUYING PRICE */}
        <InputField
          label="BUYING PRICE"
          value={formData.buyingPrice}
          onChange={(value) => handleChange("buyingPrice", value)}
          error={
            isSubmitted && errors.buyingPrice ? errors.buyingPrice : undefined
          }
          type="number"
        />
        {/* SELLING PRICE */}
        <InputField
          label="SELLING PRICE"
          value={formData.sellingPrice}
          onChange={(value) => handleChange("sellingPrice", value)}
          error={
            isSubmitted && errors.sellingPrice ? errors.sellingPrice : undefined
          }
          type="number"
        />
        {/* STATUS */}
        <RadioGroup
          label="STATUS"
          value={formData.status}
          onChange={(value) => handleChange("status", value)}
          options={[
            { value: "Active", label: "Active" },
            { value: "Inactive", label: "Inactive" },
          ]}
        />
        {/* CAN PURCHASABLE */}
        <RadioGroup
          label="CAN PURCHASABLE"
          value={formData.canPurchasable}
          onChange={(value) => handleChange("canPurchasable", value)}
          options={[
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ]}
        />
        {/* SHOW STOCK OUT */}
        <RadioGroup
          label="SHOW STOCK OUT"
          value={formData.showStockOut}
          onChange={(value) => handleChange("showStockOut", value)}
          options={[
            { value: "Enable", label: "Enable" },
            { value: "Disable", label: "Disable" },
          ]}
        />
        {/* REFUNDABLE */}
        <RadioGroup
          label="REFUNDABLE"
          value={formData.refundable}
          onChange={(value) => handleChange("refundable", value)}
          options={[
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ]}
        />
        {/* MAXIMUM PURCHASE QUANTITY */}
        <InputField
          label="MAXIMUM PURCHASE QUANTITY"
          value={formData.maxPurchaseQuantity}
          onChange={(value) => handleChange("maxPurchaseQuantity", value)}
          error={
            isSubmitted && errors.maxPurchaseQuantity
              ? errors.maxPurchaseQuantity
              : undefined
          }
          type="number"
        />
        {/* LOW STOCK QUANTITY WARNING */}
        <InputField
          label="LOW STOCK QUANTITY WARNING"
          value={formData.lowStockWarning}
          onChange={(value) => handleChange("lowStockWarning", value)}
          error={
            isSubmitted && errors.lowStockWarning
              ? errors.lowStockWarning
              : undefined
          }
          type="number"
        />
        {/* UNIT */}
        <SelectField
          label="UNIT"
          value={formData.unit}
          onChange={(value) => handleChange("unit", value)}
          options={[
            { value: "piece(pc)", label: "Piece (pc)" },
            { value: "Gram", label: "Gram" },
            { value: "Litre", label: "Litre" },
            { value: "Milliliter", label: "Milliliter" },
          ]}
          error={isSubmitted && errors.unit ? errors.unit : undefined}
        />
        {/* TAX */}
        <SelectField
          label="TAX"
          value={formData.tax}
          onChange={(value) => handleChange("tax", value)}
          options={[
            { value: "No Vat", label: "No Vat" },
            { value: "Vat-5", label: "Vat-5" },
            { value: "Vat-10", label: "Vat-10" },
            { value: "Vat-20", label: "Vat-20" },
          ]}
          error={isSubmitted && errors.tax ? errors.tax : undefined}
        />
        {/* TAGS */}
        <TagInput
          tags={formData.tags}
          onAddTag={handleAddTag}
          onRemoveTag={handleRemoveTag}
          tagInput={tagInput}
          setTagInput={setTagInput}
        />
        {/* DESCRIPTION */}
        <TextArea
          label="DESCRIPTION"
          value={formData.description}
          onChange={(value) => handleChange("description", value)}
        />
        {/* SUBMIT */}
        <div className="">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
