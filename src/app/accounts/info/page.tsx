"use client";
import React, { useRef, useState } from "react";

export default function AccountInfo() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = () => {
    if (fileInputRef.current) {
      const fileName =
        fileInputRef.current.files?.[0]?.name || "No file chosen";
      // Update the displayed file name or handle the file as needed
      setFileName(fileName);
    }
  };

  const [fileName, setFileName] = useState("No file chosen");

  return (
    <div className="p-6 w-full max-w-4xl">
      <h1 className="text-2xl font-semibold text-red-500 mb-6">
        Account Information
      </h1>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-medium mb-6">Personal Info</h2>

        <form className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                defaultValue="Will Smith"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                defaultValue="customer@example.com"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Phone <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <select className="px-3 py-2 border rounded-l-lg border-r-0">
                  <option>BD +880</option>
                </select>
                <input
                  type="tel"
                  defaultValue="125333344"
                  className="w-full px-4 py-2 border rounded-r-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Upload Image
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  type="button"
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Choose File
                </button>
                <span className="text-gray-500">{fileName}</span>
              </div>
            </div>
          </div>

          <div>
            <button className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
