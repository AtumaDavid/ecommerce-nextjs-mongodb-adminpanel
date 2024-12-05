import axiosInstance from "@/lib/axiosInstance";
import React, { useState, ChangeEvent, KeyboardEvent, useEffect } from "react";
import { useToast } from "@/context/ToastContext"; // Assuming you have a toast context

interface SEOFormData {
  title: string;
  description: string;
  metaKeywords: string[];
  image?: string | null;
}

interface SeoProps {
  productId: string | null;
}

const SEOForm: React.FC<SeoProps> = ({ productId }) => {
  const { showToast } = useToast(); // Initialize toast

  const [formData, setFormData] = useState<SEOFormData>({
    title: "",
    description: "",
    metaKeywords: [],
    image: null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [currentKeyword, setCurrentKeyword] = useState<string>("");
  // const [existingSeo, setExistingSeo] = useState<SEOFormData | null>(null);
  const [hasSeoEntry, setHasSeoEntry] = useState<boolean>(false);

  useEffect(() => {
    if (productId) {
      fetchProductData();
    }
  }, [productId]);

  const fetchProductData = async () => {
    try {
      const response = await axiosInstance.get(`/products/${productId}`);

      if (response.data.data.seo) {
        const seoData = response.data.data.seo;
        const fetchedSeo = {
          title: seoData.metaTitle || "",
          description: seoData.metaDescription || "",
          metaKeywords: seoData.metaKeywords || [],
          image: seoData.metaImage || null,
        };

        // setExistingSeo(fetchedSeo);
        setFormData(fetchedSeo);
        setHasSeoEntry(true);

        if (seoData.metaImage) {
          setImagePreview(seoData.metaImage);
        }
      } else {
        setHasSeoEntry(true);
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
      showToast({
        type: "error",
        message: "Failed to fetch SEO data",
      });
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axiosInstance.post("/upload/image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setFormData((prevData) => ({
          ...prevData,
          image: response.data.url,
        }));

        setImagePreview(response.data.url);

        showToast({
          type: "success",
          message: "Image uploaded successfully",
        });
      } catch (error) {
        console.error("Image upload error:", error);
        showToast({
          type: "error",
          message: "Failed to upload image",
        });
      }
    }
  };

  const removeImage = () => {
    setFormData((prevData) => ({
      ...prevData,
      image: null,
    }));
    setImagePreview(null);
  };

  const handleKeywordInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentKeyword(e.target.value);
  };

  const addKeyword = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "," || e.key === " ") {
      e.preventDefault();
      const trimmedKeyword = currentKeyword.trim();
      if (trimmedKeyword && !formData.metaKeywords.includes(trimmedKeyword)) {
        setFormData((prevData) => ({
          ...prevData,
          metaKeywords: [...prevData.metaKeywords, trimmedKeyword],
        }));
        setCurrentKeyword("");
      }
    }
  };

  const removeKeyword = (keywordToRemove: string) => {
    setFormData((prevData) => ({
      ...prevData,
      metaKeywords: prevData.metaKeywords.filter(
        (keyword) => keyword !== keywordToRemove
      ),
    }));
  };

  const handleSave = async () => {
    // Validate form data
    if (
      !formData.title ||
      !formData.description ||
      formData.metaKeywords.length === 0
    ) {
      showToast({
        type: "error",
        message: "Please fill all required fields",
      });
      return;
    }

    try {
      const seoPayload = {
        seo: {
          metaTitle: formData.title,
          metaDescription: formData.description,
          metaKeywords: formData.metaKeywords,
          metaImage: formData.image,
        },
      };

      // Update product with SEO data
      await axiosInstance.put(`/products/${productId}`, seoPayload);

      // Update existing SEO state
      // hasSeoEntry(formData);

      showToast({
        type: "success",
        message: "SEO data saved successfully",
      });
    } catch (error) {
      console.error("Save error:", error);
      showToast({
        type: "error",
        message: "Failed to save SEO data",
      });
    }
  };

  const handleDelete = async () => {
    if (!hasSeoEntry) {
      showToast({
        type: "error",
        message: "No SEO entry to delete",
      });
      return;
    }

    try {
      // Remove SEO data by setting it to null
      await axiosInstance.put(`/products/${productId}`, { seo: null });

      // Reset states
      setHasSeoEntry(false);
      setFormData({
        title: "",
        description: "",
        metaKeywords: [],
        image: null,
      });
      setImagePreview(null);

      showToast({
        type: "success",
        message: "SEO entry deleted successfully",
      });
    } catch (error) {
      console.error("Delete error:", error);
      showToast({
        type: "error",
        message: "Failed to delete SEO entry",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <form>
        {/* Title input */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            TITLE <span className="text-red-500">*</span>
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Enter title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>

        {/* Description input */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            DESCRIPTION <span className="text-red-500">*</span>
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h- 32"
            id="description"
            placeholder="Enter description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>

        {/* Meta Keywords input */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="metaKeyword"
          >
            META KEYWORDS <span className="text-red-500">*</span>
          </label>
          <div className="border rounded p-2">
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.metaKeywords.map((keyword) => (
                <span
                  key={keyword}
                  className="bg-blue-100 px-2 py-1 rounded flex items-center"
                >
                  {keyword}
                  <button
                    type="button"
                    onClick={() => removeKeyword(keyword)}
                    className="ml-2 text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <input
              className="w-full py-1 px-2 focus:outline-none"
              type="text"
              placeholder="Enter keywords (Press Enter, Space, or Comma to add)"
              value={currentKeyword}
              onChange={handleKeywordInputChange}
              onKeyDown={addKeyword}
            />
          </div>
        </div>

        {/* Image input */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="image"
          >
            IMAGE
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="image"
            type="file"
            onChange={handleImageChange}
            accept="image/*"
          />
          {imagePreview && (
            <div className="mt-4 flex items-center">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-24 h-24 object-cover rounded mr-4"
              />
              <button
                type="button"
                onClick={removeImage}
                className="text-red-500 hover:text-red-700"
              >
                Remove Image
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSave}
          >
            Save
          </button>

          {hasSeoEntry && (
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleDelete}
            >
              Delete SEO
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SEOForm;
