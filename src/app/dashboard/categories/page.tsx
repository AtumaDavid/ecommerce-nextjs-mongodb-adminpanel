"use client";
import React, { useState, ChangeEvent, useRef, useEffect } from "react";

// Types
interface Gender {
  id: string;
  name: "Men" | "Women" | "Juniors";
  image: string;
}

interface Category {
  id: string;
  name: string;
  genderId: string;
  image: string;
  subcategories: Subcategory[]; // Added to store subcategories directly
}

interface Subcategory {
  id: string;
  name: string;
  categoryId: string;
  genderId: string;
}

const CategoryManagement: React.FC = () => {
  // Predefined genders with placeholder images
  const initialGenders: Gender[] = [
    { id: "1", name: "Men", image: "/men-cover.png" },
    { id: "2", name: "Women", image: "/women-cover.png" },
    { id: "3", name: "Juniors", image: "/juniors-cover.png" },
  ];

  // Load persisted data from local storage
  const [genders] = useState<Gender[]>(initialGenders);
  const [categories, setCategories] = useState<Category[]>([]);

  // Form state
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [newCategoryImage, setNewCategoryImage] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [newSubcategoryName, setNewSubcategoryName] = useState<string>("");

  // Edit mode states
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingSubcategory, setEditingSubcategory] =
    useState<Subcategory | null>(null);

  // Delete confirmation states
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const [subcategoryToDelete, setSubcategoryToDelete] = useState<{
    categoryId: string;
    subcategoryId: string;
  } | null>(null);

  // Ref for file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update local storage when categories change
  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  // Reset state when gender changes
  useEffect(() => {
    setSelectedCategory("");
    setNewSubcategoryName("");
    setNewCategoryName("");
    setNewCategoryImage("");
    setEditingCategory(null);
    setEditingSubcategory(null);
  }, [selectedGender]);

  // Image upload handler
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Convert image to base64 string
        const base64String = reader.result as string;
        setNewCategoryImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Add Category
  const handleAddCategory = () => {
    if (selectedGender && newCategoryName && newCategoryImage) {
      const newCategory: Category = {
        id: `cat-${Date.now()}`, // Use timestamp to ensure unique ID
        name: newCategoryName,
        genderId: selectedGender,
        image: newCategoryImage,
        subcategories: [], // Initialize with empty subcategories array
      };

      setCategories([...categories, newCategory]);

      // Reset form
      setNewCategoryName("");
      setNewCategoryImage("");
    }
  };

  // Edit Category Handler
  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setNewCategoryName(category.name);
    setNewCategoryImage(category.image);
  };

  // Update Category Handler
  const handleUpdateCategory = () => {
    if (editingCategory && newCategoryName && newCategoryImage) {
      const updatedCategories = categories.map((cat) =>
        cat.id === editingCategory.id
          ? { ...cat, name: newCategoryName, image: newCategoryImage }
          : cat
      );

      setCategories(updatedCategories);
      setEditingCategory(null);
      setNewCategoryName("");
      setNewCategoryImage("");
    }
  };

  // Delete Category Confirmation
  const confirmDeleteCategory = (categoryId: string) => {
    setCategoryToDelete(categoryId);
  };

  // Delete Category Handler
  const handleDeleteCategory = () => {
    if (categoryToDelete) {
      const updatedCategories = categories.filter(
        (cat) => cat.id !== categoryToDelete
      );
      setCategories(updatedCategories);
      setSelectedCategory("");
      setCategoryToDelete(null);
    }
  };

  // Add Subcategory
  const handleAddSubcategory = () => {
    if (selectedCategory && newSubcategoryName) {
      // Find the category to update
      const updatedCategories = categories.map((category) => {
        if (category.id === selectedCategory) {
          // Check for duplicate subcategory
          const isDuplicate = category.subcategories.some(
            (subcat) =>
              subcat.name.toLowerCase() === newSubcategoryName.toLowerCase()
          );

          if (isDuplicate) {
            alert("This subcategory already exists for the selected category!");
            return category;
          }

          // Create new subcategory
          const newSubcategory: Subcategory = {
            id: `subcat-${Date.now()}`,
            name: newSubcategoryName,
            categoryId: selectedCategory,
            genderId: selectedGender,
          };

          // Return updated category with new subcategory
          return {
            ...category,
            subcategories: [...category.subcategories, newSubcategory],
          };
        }
        return category;
      });

      // Update categories state
      setCategories(updatedCategories);

      // Reset form
      setNewSubcategoryName("");
    }
  };

  // Edit Subcategory Handler
  const handleEditSubcategory = (
    category: Category,
    subcategory: Subcategory
  ) => {
    setEditingCategory(category);
    setEditingSubcategory(subcategory);
    setNewSubcategoryName(subcategory.name);
  };

  // Update Subcategory Handler
  const handleUpdateSubcategory = () => {
    if (editingCategory && editingSubcategory && newSubcategoryName) {
      const updatedCategories = categories.map((cat) => {
        if (cat.id === editingCategory.id) {
          return {
            ...cat,
            subcategories: cat.subcategories.map((subcat) =>
              subcat.id === editingSubcategory.id
                ? { ...subcat, name: newSubcategoryName }
                : subcat
            ),
          };
        }
        return cat;
      });

      setCategories(updatedCategories);
      setEditingCategory(null);
      setEditingSubcategory(null);
      setNewSubcategoryName("");
    }
  };

  // Delete Subcategory Confirmation
  const confirmDeleteSubcategory = (
    categoryId: string,
    subcategoryId: string
  ) => {
    setSubcategoryToDelete({ categoryId, subcategoryId });
  };

  // Delete Subcategory Handler
  const handleDeleteSubcategory = () => {
    if (subcategoryToDelete) {
      const updatedCategories = categories.map((cat) => {
        if (cat.id === subcategoryToDelete.categoryId) {
          return {
            ...cat,
            subcategories: cat.subcategories.filter(
              (subcat) => subcat.id !== subcategoryToDelete.subcategoryId
            ),
          };
        }
        return cat;
      });

      setCategories(updatedCategories);
      setSubcategoryToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Category Management
        </h1>

        {/* Gender Selection */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {genders.map((gender) => (
            <div
              key={gender.id}
              onClick={() => setSelectedGender(gender.id)}
              className={`
                relative cursor-pointer rounded-lg overflow-hidden shadow-lg
                transition-all duration-300 transform hover:scale-105
                ${selectedGender === gender.id ? "ring-4 ring-blue-500" : ""}
              `}
            >
              <img
                src={gender.image}
                alt={gender.name}
                className="w-full h-64 object-cover"
              />
              <div className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white text-center py-2">
                {gender.name}
              </div>
            </div>
          ))}
        </div>

        {/* Category and Subcategory Creation */}
        {selectedGender && (
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <div className="grid grid-cols-2 gap-6">
              {/* Category Creation Section */}
              <div>
                <h2 className="text-2xl font-semibold mb-4">Create Category</h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Category Name"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="w-full border rounded p-2"
                  />
                  <div className="relative">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      onClick={triggerFileInput}
                      className="w-full bg-gray-200 text-gray-700 rounded p-2 hover:bg-gray-300"
                    >
                      {newCategoryImage ? "Image Selected" : "Upload Image"}
                    </button>
                  </div>
                  <button
                    onClick={handleAddCategory}
                    className="w-full bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
                    disabled={!newCategoryName || !newCategoryImage}
                  >
                    Add Category
                  </button>
                </div>
                {newCategoryImage && (
                  <div className="mt-4 flex justify-center">
                    <img
                      src={newCategoryImage}
                      alt="Preview"
                      className="max-w-full h-48 object-cover rounded"
                    />
                  </div>
                )}
              </div>

              {/* Subcategory Creation Section */}
              <div>
                <h2 className="text-2xl font-semibold mb-4">
                  Create Subcategory
                </h2>
                {categories.filter((cat) => cat.genderId === selectedGender)
                  .length > 0 ? (
                  <div className="space-y-4">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full border rounded p-2"
                    >
                      <option value="">Select Category</option>
                      {categories
                        .filter((cat) => cat.genderId === selectedGender)
                        .map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                    </select>
                    <input
                      type="text"
                      placeholder="Subcategory Name"
                      value={newSubcategoryName}
                      onChange={(e) => setNewSubcategoryName(e.target.value)}
                      className="w-full border rounded p-2"
                    />
                    <button
                      onClick={handleAddSubcategory}
                      className="w-full bg-green-500 text-white rounded p-2 hover:bg-green-600"
                      disabled={!selectedCategory || !newSubcategoryName}
                    >
                      Add Subcategory
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center">
                    Please create a category first
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Categories and Subcategories List */}
        {selectedGender && (
          <div className="grid grid-cols-4 gap-6 mb-8">
            {categories
              .filter((cat) => cat.genderId === selectedGender)
              .map((category) => (
                <div
                  key={category.id}
                  className={`
                    relative rounded-lg overflow-hidden shadow-lg
                    ${
                      selectedCategory === category.id
                        ? "ring-4 ring-green-500"
                        : ""
                    }
                  `}
                >
                  {/* Edit and Delete Buttons for Category */}
                  <div className="absolute top-2 right-2 flex space-x-2 z-10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditCategory(category);
                      }}
                      className="bg-yellow-500 text-white p-1 rounded text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        confirmDeleteCategory(category.id);
                      }}
                      className="bg-red-500 text-white p-1 rounded text-xs"
                    >
                      Delete
                    </button>
                  </div>

                  {/* Category Edit Mode */}
                  {editingCategory && editingCategory.id === category.id && (
                    <div className="absolute inset-0 bg-white bg-opacity-90 p-4 z-20">
                      <input
                        type="text"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        className="w-full border rounded p-2 mb-2"
                        placeholder="Category Name"
                      />
                      <div className="relative mb-2">
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleImageUpload}
                          accept="image/*"
                          className="hidden"
                        />
                        <button
                          onClick={triggerFileInput}
                          className="w-full bg-gray-200 text-gray-700 rounded p-2 hover:bg-gray-300"
                        >
                          {newCategoryImage
                            ? "Change Image"
                            : "Upload New Image"}
                        </button>
                      </div>
                      {newCategoryImage && (
                        <div className="flex justify-center mb-2">
                          <img
                            src={newCategoryImage}
                            alt="Preview"
                            className="max-w-full h-32 object-cover rounded"
                          />
                        </div>
                      )}
                      <div className="flex space-x-2">
                        <button
                          onClick={handleUpdateCategory}
                          className="w-full bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
                        >
                          Save Changes
                        </button>
                        <button
                          onClick={() => {
                            setEditingCategory(null);
                            setNewCategoryName("");
                            setNewCategoryImage("");
                          }}
                          className="w-full bg-gray-500 text-white rounded p-2 hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Category Delete Confirmation */}
                  {categoryToDelete === category.id && (
                    <div className="absolute inset-0 bg-white bg-opacity-90 p-4 z-20 flex flex-col justify-center items-center">
                      <p className="mb-4 text-center">
                        Are you sure you want to delete the category "
                        {category.name}"?
                      </p>
                      <div className="flex space-x-2">
                        <button
                          onClick={handleDeleteCategory}
                          className="bg-red-500 text-white rounded p-2 hover:bg-red-600"
                        >
                          Confirm Delete
                        </button>
                        <button
                          onClick={() => setCategoryToDelete(null)}
                          className="bg-gray-500 text-white rounded p-2 hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  <div
                    onClick={() => setSelectedCategory(category.id)}
                    className="cursor-pointer"
                  >
                    <div className="absolute top-0 w-full bg-black bg-opacity-50 text-white text-center py-2">
                      {category.name}
                    </div>
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-48 object-cover mt-8"
                    />
                  </div>

                  {/* Subcategories List */}
                  {category.subcategories.length > 0 && (
                    <div className="p-2 bg-white">
                      <h3 className="font-semibold mb-2">Subcategories:</h3>
                      <ul className="space-y-1">
                        {category.subcategories.map((subcategory) => (
                          <li
                            key={subcategory.id}
                            className="bg-gray-100 rounded px-2 py-1 text-sm flex justify-between items-center relative"
                          >
                            {/* Subcategory Name */}
                            <span>{subcategory.name}</span>

                            {/* Subcategory Edit and Delete Buttons */}
                            <div className="flex space-x-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditSubcategory(category, subcategory);
                                }}
                                className="text-yellow-500 text-xs"
                              >
                                Edit
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  confirmDeleteSubcategory(
                                    category.id,
                                    subcategory.id
                                  );
                                }}
                                className="text-red-500 text-xs"
                              >
                                Delete
                              </button>
                            </div>

                            {/* Subcategory Edit Mode */}
                            {editingCategory &&
                              editingSubcategory &&
                              editingCategory.id === category.id &&
                              editingSubcategory.id === subcategory.id && (
                                <div className="absolute inset-0 bg-white bg-opacity-95 p-2 z-30 flex items-center">
                                  <input
                                    type="text"
                                    value={newSubcategoryName}
                                    onChange={(e) =>
                                      setNewSubcategoryName(e.target.value)
                                    }
                                    className="flex-grow border rounded p-1 mr-2"
                                    placeholder="Subcategory Name"
                                  />
                                  <div className="flex space-x-1">
                                    <button
                                      onClick={handleUpdateSubcategory}
                                      className="bg-blue-500 text-white rounded p-1 text-xs"
                                    >
                                      Save
                                    </button>
                                    <button
                                      onClick={() => {
                                        setEditingCategory(null);
                                        setEditingSubcategory(null);
                                        setNewSubcategoryName("");
                                      }}
                                      className="bg-gray-500 text-white rounded p-1 text-xs"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              )}

                            {/* Subcategory Delete Confirmation */}
                            {subcategoryToDelete &&
                              subcategoryToDelete.categoryId === category.id &&
                              subcategoryToDelete.subcategoryId ===
                                subcategory.id && (
                                <div className="absolute inset-0 bg-white bg-opacity-95 p-2 z-30 flex flex-col justify-center items-center">
                                  <p className="mb-2 text-sm text-center">
                                    Delete "{subcategory.name}"?
                                  </p>
                                  <div className="flex space-x-2">
                                    <button
                                      onClick={handleDeleteSubcategory}
                                      className="bg-red-500 text-white rounded p-1 text-xs"
                                    >
                                      Confirm
                                    </button>
                                    <button
                                      onClick={() =>
                                        setSubcategoryToDelete(null)
                                      }
                                      className="bg-gray-500 text-white rounded p-1 text-xs"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryManagement;
