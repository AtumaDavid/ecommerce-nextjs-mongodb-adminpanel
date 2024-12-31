"use client";
import React, { useState } from "react";
import MultirangeSlider, { ChangeResult } from "multi-range-slider-react";

export default function ProductFilter() {
  const [sortBy, setSortBy] = useState<string>("");
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);

  const handleMultiRRangeChange = ({
    min,
    max,
  }: {
    min: number;
    max: number;
  }) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  const handleSizeChange = (value: string) => {
    setSizes((prev) => {
      if (prev.includes(value)) {
        return prev.filter((size) => size !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const handleColorChange = (value: string) => {
    setColors((prev) => {
      if (prev.includes(value)) {
        return prev.filter((color) => color !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const applyFilters = () => {
    const filters = {
      sortBy,
      priceRange: { min: minPrice, max: maxPrice },
      selectedSizes: sizes,
      selectedColors: colors,
    };

    // console.log("Applied Filters:", filters);
    // You can add your filter logic here or pass the filters to a parent component
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Sort By</h3>
        <div>
          <label className="flex items-center mb-2 gap-3">
            <input
              type="radio"
              name="sort"
              value="newest"
              checked={sortBy === "newest"}
              onChange={(e) => setSortBy(e.target.value)}
            />
            Newest
          </label>
          <label className="flex items-center mb-2 gap-3">
            <input
              type="radio"
              name="sort"
              value="price-low-to-high"
              checked={sortBy === "price-low-to-high"}
              onChange={(e) => setSortBy(e.target.value)}
            />
            Price: Low to High
          </label>
          <label className="flex items-center mb-2 gap-3">
            <input
              type="radio"
              name="sort"
              value="price-high-to-low"
              checked={sortBy === "price-high-to-low"}
              onChange={(e) => setSortBy(e.target.value)}
            />
            Price: High to Low
          </label>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Price</h3>
        <div className="flex items-center gap-3 mb-2">
          <input
            type="text"
            value={`$${minPrice}`}
            readOnly
            className="w-1/2 p-1 border rounded mr-2"
          />
          <input
            type="text"
            value={`$${maxPrice}`}
            readOnly
            className="w-1/2 p-1 border rounded mr-2"
          />
        </div>
        <MultirangeSlider
          min={0}
          max={100000}
          step={10}
          ruler={false}
          label={true}
          preventWheel={false}
          minValue={minPrice}
          maxValue={maxPrice}
          className="!shadow-none !border-none bg-white"
          barLeftColor="white"
          barRightColor="white"
          thumbLeftColor="#004d40"
          thumbRightColor="#004d40"
          barInnerColor="white"
          onInput={(e: ChangeResult) => {
            handleMultiRRangeChange(e);
          }}
        />
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Color</h3>
        <div>
          {["blue", "white", "black"].map((colorOption) => (
            <label key={colorOption} className="flex items-center mb-2 gap-3">
              <input
                type="checkbox"
                name="color"
                value={colorOption}
                checked={colors.includes(colorOption)}
                onChange={() => handleColorChange(colorOption)}
              />
              {colorOption.charAt(0).toUpperCase() + colorOption.slice(1)}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Size</h3>
        <div>
          {["s", "m", "l"].map((sizeOption) => (
            <label key={sizeOption} className="flex items-center mb-2 gap-3">
              <input
                type="checkbox"
                name="size"
                value={sizeOption}
                checked={sizes.includes(sizeOption)}
                onChange={() => handleSizeChange(sizeOption)}
              />
              {sizeOption.toUpperCase()}
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={applyFilters}
        className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors duration-200"
      >
        Apply Filters
      </button>
    </div>
  );
}
