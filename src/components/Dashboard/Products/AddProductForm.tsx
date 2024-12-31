import React, { useEffect, useRef, useState } from "react";
import InputField from "./ProductsForm/InputField";
import SelectField from "./ProductsForm/SelectField";
import RadioGroup from "./ProductsForm/RadioGroup";
import TagInput from "./ProductsForm/TagInput";
import TextArea from "./ProductsForm/TextArea";
import { Product, ProductFormData } from "./types/product";
import axiosInstance from "@/lib/axiosInstance";

type Gender = "men" | "women" | "juniors";

interface AddProductFormProps {
  onSubmit: (data: ProductFormData) => void;
  initialData?: Product;
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

const ProductForm: React.FC<AddProductFormProps> = ({
  onSubmit,
  initialData,
}) => {
  const [errors, setErrors] = useState<{
    [key in keyof ProductFormData]?: string;
  }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [tagInput, setTagInput] = useState("");

  // avatar placeholder
  const generateInitialsAvatar = (name: string, bgColor?: string) => {
    // Ensure name is a string and has a value
    const safeName = name || "Product";

    // Extract initials
    const initials = safeName
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join("");

    // Generate a background color if not provided
    const generateColor = () => {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    const backgroundColor = bgColor || generateColor();

    // Create SVG directly (more reliable than canvas)
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
      <rect width="100%" height="100%" fill="${backgroundColor}"/>
      <text 
        x="50%" 
        y="50%" 
        dominant-baseline="middle" 
        text-anchor="middle" 
        fill="white" 
        font-size="80" 
        font-family="Arial, sans-serif"
      >
        ${initials}
      </text>
    </svg>
  `;

    // Convert to base64
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  };

  // console.log("Initial data received:", initialData);
  const [formData, setFormData] = useState<ProductFormData>({
    _id: initialData?._id || undefined, // Add this line
    name: initialData?.name || "",
    images: (() => {
      // Handle different possible image input types
      const image = initialData?.images;

      if (typeof image === "string") {
        return image;
      }

      if (Array.isArray(image) && image.length > 0) {
        return image[0]; // Take first image if array
      }

      // Fallback to generated avatar
      return initialData?.name
        ? generateInitialsAvatar(initialData.name)
        : generateInitialsAvatar("Product");
    })(),
    // sku: initialData
    //   ? initialData.id.toString()
    //   : Math.floor(Math.random() * 100000).toString(),
    categoryInfo: {
      gender: initialData?.categoryInfo?.gender || "",
      category: initialData?.categoryInfo?.category || "",
      subcategory: initialData?.categoryInfo?.subcategory || "",
    },
    barcode: initialData?.barcode || "",
    buyingPrice: initialData?.buyingPrice?.toString() || "",
    sellingPrice: initialData?.sellingPrice?.toString() || "",
    tax: initialData?.tax || "No Vat",
    status: initialData?.status || "Active", // Default to Active
    canPurchasable: initialData?.canPurchasable || "Yes", // Default to Yes
    showStockOut: initialData?.showStockOut || "Enable", // Default to Enable
    refundable: initialData?.refundable || "Yes", // Default to Yes
    maxPurchaseQuantity: initialData?.maxPurchaseQuantity || "1",
    lowStockWarning: initialData?.lowStockWarning || "0",
    unit: initialData?.unit || "piece(pc)",
    weight: initialData?.weight || "",
    tags: initialData?.tags || [],
    description: initialData?.description || "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        _id: initialData?._id || undefined, // Add this line
        name: initialData.name || "",
        // images: initialData.images || "",
        // images:
        //   initialData?.images ||
        //   (initialData?.name
        //     ? generateInitialsAvatar(initialData.name)
        //     : generateInitialsAvatar("Product")),
        images: (() => {
          const image = initialData.images;

          if (typeof image === "string") {
            return image;
          }

          if (Array.isArray(image) && image.length > 0) {
            return image[0]; // Take first image if array
          }

          // Fallback to generated avatar
          return initialData?.name
            ? generateInitialsAvatar(initialData.name)
            : generateInitialsAvatar("Product");
        })(),
        categoryInfo: {
          gender: initialData.categoryInfo.gender || "",
          category: initialData.categoryInfo.category || "",
          subcategory: initialData.categoryInfo.subcategory || "",
        },
        barcode: initialData.barcode || "",
        buyingPrice: initialData.buyingPrice?.toString() || "",
        sellingPrice: initialData.sellingPrice?.toString() || "",
        tax: initialData?.tax || "No Vat",
        status: initialData?.status || "Active", // Default to Active
        canPurchasable: initialData?.canPurchasable || "Yes", // Default to Yes
        showStockOut: initialData?.showStockOut || "Enable", // Default to Enable
        refundable: initialData?.refundable || "Yes", // Default to Yes
        maxPurchaseQuantity: initialData?.maxPurchaseQuantity || "1",
        lowStockWarning: initialData?.lowStockWarning || "0",
        unit: initialData?.unit || "piece(pc)",
        weight: initialData?.weight || "",
        tags: initialData?.tags || [],
        description: initialData?.description || "",
      });
    }
  }, [initialData]); // Only run when initialData changes

  // console.log("initial data:", initialData);
  const [selectedGender, setSelectedGender] = useState<string>(
    initialData?.categoryInfo?.gender || ""
  );
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialData?.categoryInfo?.category || ""
  );
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>(
    initialData?.categoryInfo?.subcategory || ""
  );

  // HANDLE GENDER CHANGE
  const handleGenderChange = (gender: string) => {
    if (gender === "men" || gender === "women" || gender === "juniors") {
      setSelectedGender(gender as Gender);
      setFormData((prev) => ({
        ...prev,
        categoryInfo: {
          ...prev.categoryInfo,
          gender,
        },
      }));
      setSelectedCategory(""); // Reset category when gender changes
      setSelectedSubcategory(""); // Reset subcategory when gender changes
    }
  };

  // Function to handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setFormData((prev) => ({
      ...prev,
      categoryInfo: {
        ...prev.categoryInfo,
        category,
      },
    }));
    setSelectedSubcategory(""); // Reset subcategory when category changes
  };

  // HANDLE SUB-CATEGORY CHANGE
  const handleSubcategoryChange = (subcategory: string) => {
    setSelectedSubcategory(subcategory);

    // Update subcategory in formData
    setFormData((prev) => ({
      ...prev,
      categoryInfo: {
        ...prev.categoryInfo,
        subcategory,
      },
    }));

    // Return the selected values for additional flexibility
    return {
      gender: selectedGender,
      category: selectedCategory,
      subcategory: subcategory,
    };
  };

  // HANDLE CHANGE
  const handleChange = (field: keyof ProductFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (isSubmitted) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // VALIDATE FORM
  const validateForm = () => {
    const newErrors: { [key in keyof ProductFormData]?: string } = {};
    const requiredFields: (keyof ProductFormData)[] = [
      "name",
      // "sku",
      "categoryInfo",
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

    // return newErrors;
    requiredFields.forEach((field) => {
      if (field === "categoryInfo") {
        const { gender, category, subcategory } = formData.categoryInfo;
        if (!gender) newErrors.categoryInfo = "Gender is required";
        else if (!category) newErrors.categoryInfo = "Category is required";
        else if (!subcategory)
          newErrors.categoryInfo = "Subcategory is required";
      } else if (!formData[field]) {
        newErrors[field] = "This field is required";
      }
    });

    return newErrors;
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

  // Image upload ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Image upload handler
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      // Check if files exist
      if (!event.target.files || event.target.files.length === 0) {
        console.error("No file selected");
        return;
      }

      // Create FormData and append the file
      const formData = new FormData();
      formData.append("file", event.target.files[0]);

      const response = await axiosInstance.post("/upload/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // console.log(response.data);

      // Always set as a single image
      setFormData((prev) => ({
        ...prev,
        images: response.data.url,
      }));
    } catch (error) {
      console.error("Image upload error:", error);
      // Fallback to initials avatar if upload fails
      setFormData((prev) => ({
        ...prev,
        images: generateInitialsAvatar(prev.name || "Product"),
      }));
    }
  };

  // Image removal handler
  // const handleRemoveImage = () => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     images: "",
  //   }));
  //   // Reset file input
  //   if (fileInputRef.current) {
  //     fileInputRef.current.value = "";
  //   }
  // };
  // Add these helper functions
  // Remove image handler
  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      images: "",
    }));
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // const handleRemoveSpecificImage = (indexToRemove: number) => {
  //   setFormData((prev) => {
  //     if (!Array.isArray(prev.images)) return prev;

  //     const updatedImages = prev.images.filter(
  //       (_, index) => index !== indexToRemove
  //     );

  //     return {
  //       ...prev,
  //       images:
  //         updatedImages.length > 1 ? updatedImages : updatedImages[0] || "",
  //     };
  //   });
  // };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // console.log("Form submission initiated."); // Debugging log
    // console.log("Product _id:", formData._id); // Add this line to debug
    setIsSubmitted(true); // Set the submitted state to true

    // Log full form data for debugging
    // console.log("Full Form Data:", formData);

    // Validate the form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      // console.log("Validation errors found:", validationErrors); // Debugging log
      setErrors(validationErrors); // Set errors if validation fails
      return; // Stop the submission process
    }

    // Log the data being submitted
    // console.log("Submitting product data:", {
    //   ...formData,
    //   _id: initialData?._id, // Include the ID if available
    // });

    // Prepare product data for submission
    const productData: ProductFormData = {
      ...formData,
      // Generate initials avatar if no image is provided
      images:
        formData.images || generateInitialsAvatar(formData.name || "Product"),
      createdAt: new Date(),
    };

    // Call the onSubmit prop function with the product data
    onSubmit(productData);

    // Optionally, you can reset the form or show a success message
    // console.log("Product data submitted:", productData);
  };

  return (
    <div className="p-4">
      <form
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        onSubmit={handleSubmit}
      >
        {/* IMAGES */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            PRODUCT IMAGE
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/jpeg,image/png,image/gif,image/webp"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
            >
              Upload Image
            </label>

            {formData.images && (
              <div className="relative inline-block">
                <img
                  src={formData.images}
                  alt="Product"
                  className="h-20 w-20 object-cover rounded"
                />
                {typeof formData.images === "string" &&
                  !formData.images.startsWith("data:image/svg+xml") && (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                    >
                      X
                    </button>
                  )}
              </div>
            )}
          </div>
          {isSubmitted && errors.images && (
            <p className="mt-2 text-sm text-red-600">{errors.images}</p>
          )}
        </div>

        {/* NAME */}
        <InputField
          label="NAME"
          value={formData.name}
          onChange={(value) => handleChange("name", value)}
          error={isSubmitted && errors.name ? errors.name : undefined}
        />
        {/* SKU */}
        {/* <InputField
          label="SKU"
          value={formData.sku}
          onChange={(value) => handleChange("sku", value)}
          error={isSubmitted && errors.sku ? errors.sku : undefined}
        /> */}
        {/* CATEGORY INFO: GENDER*/}
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

        {/* CATEGORY INFO: CATEGORY */}
        <SelectField
          label="CATEGORY"
          value={selectedCategory}
          onChange={handleCategoryChange}
          options={
            selectedGender
              ? (categories[selectedGender as Gender] || []).map((cat) => ({
                  value: cat.category,
                  label: cat.category,
                }))
              : []
          }
        />

        {/* CATEGORY INFO: SUB-CATEGORY */}
        <SelectField
          label="SUBCATEGORY"
          value={selectedSubcategory}
          onChange={(value) => handleSubcategoryChange(value)}
          options={
            selectedCategory && selectedGender
              ? categories[selectedGender as Gender]
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
            {initialData ? "Update Product" : "Submit Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
