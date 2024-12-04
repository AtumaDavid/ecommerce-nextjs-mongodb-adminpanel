import React, { useState, ChangeEvent, KeyboardEvent } from "react";

interface SEOFormData {
  title: string;
  description: string;
  metaKeywords: string[];
  image?: File | null;
}

const SEOForm: React.FC = () => {
  const [formData, setFormData] = useState<SEOFormData>({
    title: "",
    description: "",
    metaKeywords: [],
    image: null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [currentKeyword, setCurrentKeyword] = useState<string>("");
  const [submittedData, setSubmittedData] = useState<SEOFormData[]>([]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        image: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
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

  // const handleSave = () => {
  //   // Implement save logic here
  //   console.log("Saving SEO data:", formData);
  // };
  const handleSave = () => {
    // Validate form data before saving
    if (
      !formData.title ||
      !formData.description ||
      formData.metaKeywords.length === 0
    ) {
      alert("Please fill in all required fields");
      return;
    }

    // Add the current form data to submitted data
    setSubmittedData((prevData) => [...prevData, { ...formData }]);

    // Optional: Reset form after submission
    setFormData({
      title: "",
      description: "",
      metaKeywords: [],
      image: null,
    });
    setImagePreview(null);
    setCurrentKeyword("");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      {/* <h2 className="text-xl font-semibold mb-4">SEO</h2> */}
      <form>
        {/* Title input remains the same */}
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

        {/* Description input remains the same */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            DESCRIPTION <span className="text-red-500">*</span>
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
            id="description"
            placeholder="Enter description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>

        {/* Meta Keywords with tag-like input */}
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

        {/* Image input with remove option */}
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
        </div>
      </form>
      {/* Submitted SEO Entries Section */}
      {submittedData.length > 0 && (
        <div className="mt-8 border-t pt-6">
          <h3 className="text-xl font-bold mb-4">Submitted SEO Entries</h3>
          {submittedData.map((entry, index) => (
            <div
              key={index}
              className="bg-gray-50 p-4 rounded-lg mb-4 shadow-sm"
            >
              <div className="mb-2">
                <h4 className="font-semibold text-lg">Title:</h4>
                <p>{entry.title}</p>
              </div>

              <div className="mb-2">
                <h4 className="font-semibold">Description:</h4>
                <p>{entry.description}</p>
              </div>

              <div className="mb-2">
                <h4 className="font-semibold">Meta Keywords:</h4>
                <div className="flex flex-wrap gap-2">
                  {entry.metaKeywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="bg-blue-100 px-2 py-1 rounded text-sm"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {entry.image && (
                <div>
                  <h4 className="font-semibold">Image:</h4>
                  <img
                    src={URL.createObjectURL(entry.image)}
                    alt="Uploaded"
                    className="w-32 h-32 object-cover rounded"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SEOForm;
