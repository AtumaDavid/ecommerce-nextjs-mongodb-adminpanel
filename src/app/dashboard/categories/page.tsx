"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";

// Interfaces
interface Subcategory {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
  image: File | null;
  subcategories: Subcategory[];
}

type Gender = "men" | "women" | "juniors";

export default function CategoryManagementPage() {
  const [activeTab, setActiveTab] = useState<Gender>("men");
  // const [isEditingCategory, setIsEditingCategory] = useState(false);
  // const [isEditingSubcategory, setIsEditingSubcategory] = useState(false);
  const [genderImages, setGenderImages] = useState<{
    men: File | null;
    women: File | null;
    juniors: File | null;
  }>({
    men: null,
    women: null,
    juniors: null,
  });

  const [categories, setCategories] = useState<{
    men: Category[];
    women: Category[];
    juniors: Category[];
  }>({
    men: [],
    women: [],
    juniors: [],
  });

  const [newCategory, setNewCategory] = useState({
    name: "",
    image: null as File | null,
  });

  const [editingCategory, setEditingCategory] = useState<{
    id: string | null;
    name: string;
    image: File | null;
  }>({
    id: null,
    name: "",
    image: null,
  });

  const [editingSubcategory, setEditingSubcategory] = useState<{
    categoryId: string | null;
    subcategoryId: string | null;
    name: string;
  }>({
    categoryId: null,
    subcategoryId: null,
    name: "",
  });

  const [newSubcategory, setNewSubcategory] = useState({
    categoryId: "",
    name: "",
  });

  // Refs for file inputs
  const genderImageInputRef = useRef<HTMLInputElement>(null);
  const categoryImageInputRef = useRef<HTMLInputElement>(null);

  // Gender Image Upload Handler
  const handleGenderImageUpload = (gender: Gender, file: File) => {
    setGenderImages((prev) => ({
      ...prev,
      [gender]: file,
    }));
  };

  // Category Image Upload Handler
  const handleCategoryImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewCategory((prev) => ({
        ...prev,
        image: file,
      }));
      setEditingCategory((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  // Add Category Handler
  const handleAddCategory = () => {
    if (!newCategory.name || !newCategory.image) {
      alert("Please enter category name and upload image");
      return;
    }

    const newCategoryItem = {
      id: Date.now().toString(),
      name: newCategory.name,
      image: newCategory.image,
      subcategories: [],
    };

    setCategories((prev) => ({
      ...prev,
      [activeTab]: [...prev[activeTab], newCategoryItem],
    }));

    // Reset form
    setNewCategory({
      name: "",
      image: null,
    });
    if (categoryImageInputRef.current) {
      categoryImageInputRef.current.value = "";
    }
  };

  // Edit Category Handler
  const handleEditCategory = () => {
    if (!editingCategory.id || !editingCategory.name) {
      alert("Please enter category name");
      return;
    }

    const updatedCategories = categories[activeTab].map((category) =>
      category.id === editingCategory.id
        ? {
            ...category,
            name: editingCategory.name,
            image: editingCategory.image || category.image,
          }
        : category
    );

    setCategories((prev) => ({
      ...prev,
      [activeTab]: updatedCategories,
    }));

    // Reset editing state
    setEditingCategory({
      id: null,
      name: "",
      image: null,
    });
  };

  // Add Subcategory Handler
  const handleAddSubcategory = () => {
    if (!newSubcategory.categoryId || !newSubcategory.name) {
      alert("Please select a category and enter subcategory name");
      return;
    }

    const updatedCategories = categories[activeTab].map((category) => {
      if (category.id === newSubcategory.categoryId) {
        return {
          ...category,
          subcategories: [
            ...category.subcategories,
            {
              id: Date.now().toString(),
              name: newSubcategory.name,
            },
          ],
        };
      }
      return category;
    });

    setCategories((prev) => ({
      ...prev,
      [activeTab]: updatedCategories,
    }));

    // Reset subcategory form
    setNewSubcategory({
      categoryId: "",
      name: "",
    });
  };

  // Edit Subcategory Handler
  const handleEditSubcategory = () => {
    if (
      !editingSubcategory.categoryId ||
      !editingSubcategory.subcategoryId ||
      !editingSubcategory.name
    ) {
      alert("Please select a category, subcategory, and enter a name");
      return;
    }

    const updatedCategories = categories[activeTab].map((category) => {
      if (category.id === editingSubcategory.categoryId) {
        return {
          ...category,
          subcategories: category.subcategories.map((subcategory) =>
            subcategory.id === editingSubcategory.subcategoryId
              ? { ...subcategory, name: editingSubcategory.name }
              : subcategory
          ),
        };
      }
      return category;
    });

    setCategories((prev) => ({
      ...prev,
      [activeTab]: updatedCategories,
    }));

    // Reset editing state
    setEditingSubcategory({
      categoryId: null,
      subcategoryId: null,
      name: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Category Management
        </h1>

        {/* Gender Tabs */}
        <div className="flex justify-center mb-6 space-x-4">
          {(["men", "women", "juniors"] as Gender[]).map((gender) => (
            <button
              key={gender}
              className={`
                px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 w-full
                ${
                  activeTab === gender
                    ? "bg-primary text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }
              `}
              onClick={() => setActiveTab(gender)}
            >
              {gender.charAt(0).toUpperCase() + gender.slice(1)}
            </button>
          ))}
        </div>

        {/* Gender Image Upload */}
        <div className="mb-6 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Upload {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}{" "}
            Gender Image
          </h2>
          <div className="flex items-center space-x-4">
            <input
              ref={genderImageInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleGenderImageUpload(activeTab, file);
              }}
              className="text-sm text-gray-500 
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-primary-light file:text-primary-dark"
            />
            {genderImages[activeTab] && (
              <Image
                src={URL.createObjectURL(genderImages[activeTab]!)}
                alt={`${activeTab} Gender`}
                width={100}
                height={100}
                className="rounded-lg shadow-md"
              />
            )}
          </div>
        </div>

        {/* Add Category Section */}
        <div className="mb-6 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Add New {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}{" "}
            Category
          </h2>
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Category Name"
              value={newCategory.name}
              onChange={(e) =>
                setNewCategory((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
            />
            <input
              ref={categoryImageInputRef}
              type="file"
              accept="image/*"
              onChange={handleCategoryImageUpload}
              className="text-sm text-gray-500 
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-primary-light file:text-primary-dark"
            />
            <button
              onClick={handleAddCategory}
              className="bg-primary text-white px-6 py-2 rounded-xl hover:bg-primary-dark transition-colors"
            >
              Add Category
            </button>
          </div>
          {newCategory.image && (
            <Image
              src={URL.createObjectURL(newCategory.image)}
              alt="Category Preview"
              width={100}
              height={100}
              className="rounded-lg shadow-md mt-4"
            />
          )}
        </div>

        {/* Add Subcategory Section */}
        <div className="mb-6 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Add Subcategory
          </h2>
          <div className="flex space-x-4">
            <select
              value={newSubcategory.categoryId}
              onChange={(e) =>
                setNewSubcategory((prev) => ({
                  ...prev,
                  categoryId: e.target.value,
                }))
              }
              className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="">Select Category</option>
              {categories[activeTab].map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Subcategory Name"
              value={newSubcategory.name}
              onChange={(e) =>
                setNewSubcategory((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <button
              onClick={handleAddSubcategory}
              className="bg-primary text-white px-6 py-2 rounded-xl hover:bg-primary-dark transition-colors"
            >
              Add Subcategory
            </button>
          </div>
        </div>

        {/* Categories Display Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Categories
          </h2>
          {categories[activeTab].map((category) => (
            <div
              key={category.id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-4 flex flex-col"
            >
              {editingCategory.id === category.id ? (
                // Edit Category Mode
                <div className="flex items-center space-x-4">
                  <input
                    type="text"
                    value={editingCategory.name}
                    onChange={(e) =>
                      setEditingCategory((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-md"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCategoryImageUpload}
                    className="text-sm text-gray-500 
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-indigo-50 file:text-indigo-700
                      hover:file:bg-indigo-100"
                  />
                  <div className="flex space-x-2">
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600"
                      onClick={() => {
                        handleEditCategory();
                        setEditingCategory({ id: null, name: "", image: null });
                      }}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-400"
                      onClick={() =>
                        setEditingCategory({ id: null, name: "", image: null })
                      }
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // Normal Category Display
                <div className="flex items-center space-x-4">
                  {category.image && (
                    <Image
                      src={URL.createObjectURL(category.image)}
                      alt={category.name}
                      width={60}
                      height={60}
                      className="rounded-lg shadow-md"
                    />
                  )}
                  <div className="flex-grow">
                    <h3 className="text-lg font-medium text-gray-800">
                      {category.name}
                    </h3>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
                      onClick={() =>
                        setEditingCategory({
                          id: category.id,
                          name: category.name,
                          image: category.image,
                        })
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors"
                      onClick={() => {
                        setCategories((prev) => ({
                          ...prev,
                          [activeTab]: prev[activeTab].filter(
                            (cat) => cat.id !== category.id
                          ),
                        }));
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}

              {/* Subcategories Display */}
              {category.subcategories.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h4 className="text-md font-semibold text-gray-700">
                    Subcategories:
                  </h4>
                  {category.subcategories.map((subcategory) => (
                    <div
                      key={subcategory.id}
                      className="flex justify-between items-center bg-gray-100 p-2 rounded-md"
                    >
                      {editingSubcategory.subcategoryId === subcategory.id ? (
                        // Edit Subcategory Mode
                        <div className="flex w-full items-center space-x-2">
                          <input
                            type="text"
                            value={editingSubcategory.name}
                            onChange={(e) =>
                              setEditingSubcategory((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                            className="flex-grow px-2 py-1 border border-gray-300 rounded-md"
                          />
                          <button
                            className="bg-green-500 text-white px-3 py-1 rounded-full text-sm hover:bg-green-600"
                            onClick={() => {
                              handleEditSubcategory();
                              setEditingSubcategory({
                                categoryId: null,
                                subcategoryId: null,
                                name: "",
                              });
                            }}
                          >
                            Save
                          </button>
                          <button
                            className="bg-gray-300 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-400"
                            onClick={() =>
                              setEditingSubcategory({
                                categoryId: null,
                                subcategoryId: null,
                                name: "",
                              })
                            }
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        // Normal Subcategory Display
                        <>
                          <span className="text-gray-800">
                            {subcategory.name}
                          </span>
                          <div className="flex space-x-2">
                            <button
                              className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-600 transition-colors"
                              onClick={() =>
                                setEditingSubcategory({
                                  categoryId: category.id,
                                  subcategoryId: subcategory.id,
                                  name: subcategory.name,
                                })
                              }
                            >
                              Edit
                            </button>
                            <button
                              className="bg-red-500 text-white px-3 py-1 rounded-full text-sm hover:bg-red-600 transition-colors"
                              onClick={() => {
                                const updatedCategories = categories[
                                  activeTab
                                ].map((cat) => {
                                  if (cat.id === category.id) {
                                    return {
                                      ...cat,
                                      subcategories: cat.subcategories.filter(
                                        (sub) => sub.id !== subcategory.id
                                      ),
                                    };
                                  }
                                  return cat;
                                });
                                setCategories((prev) => ({
                                  ...prev,
                                  [activeTab]: updatedCategories,
                                }));
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
