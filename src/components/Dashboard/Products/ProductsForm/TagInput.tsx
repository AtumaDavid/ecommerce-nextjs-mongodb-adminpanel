import React from "react";

interface TagInputProps {
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
  tagInput: string;
  setTagInput: (value: string) => void;
}

const TagInput: React.FC<TagInputProps> = ({
  tags,
  onAddTag,
  onRemoveTag,
  tagInput,
  setTagInput,
}) => (
  <div className="sm:col-span-2">
    <label className="block text-gray-700 font-bold mb-2">TAGS</label>
    <div className="flex items-center space-x-2">
      <input
        type="text"
        className="w-full border border-gray-300 p-2 rounded focus:outline-blue-500"
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onAddTag(tagInput);
            setTagInput(""); // Clear the input after adding
          }
        }}
        placeholder="Add a tag and press Enter"
      />
      <button
        type="button"
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
        onClick={() => {
          onAddTag(tagInput);
          setTagInput(""); // Clear the input after adding
        }}
      >
        Add
      </button>
    </div>
    <div className="mt-2">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded-full mr-2"
        >
          {tag}
          <button
            type="button"
            className="ml-2 text-red-500"
            onClick={() => onRemoveTag(tag)}
          >
            &times;
          </button>
        </span>
      ))}
    </div>
  </div>
);

export default TagInput;
