import axiosInstance from "@/lib/axiosInstance";
import React, { useEffect, useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";

type ImageProps = {
  id: string;
  src: string;
  alt: string;
};

interface ProductGalleryProps {
  productId: string | null;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ productId }) => {
  const [images, setImages] = useState<ImageProps[]>([]);
  const [selectedImage, setSelectedImage] = useState<ImageProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        if (!productId) {
          throw new Error("No product ID provided");
        }

        const response = await axiosInstance.get(`/products/${productId}`);
        console.log(response.data.data.images);

        // setImages(response.data.data.images);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching images:", err);
        setError("Failed to load images.");
        setLoading(false);
      }
    };

    fetchImages();
  }, [productId]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (images.length < 4) {
        const newImage: ImageProps = {
          id: Date.now().toString(),
          src: URL.createObjectURL(file),
          alt: file.name,
        };
        setImages((prevImages) => [...prevImages, newImage]);
        if (!selectedImage) setSelectedImage(newImage); // Set as the main image if it's the first one
      } else {
        alert("You can only upload up to 4 images.");
      }
    }
  };

  const handleImageDelete = (id: string) => {
    setImages((prevImages) => {
      const updatedImages = prevImages.filter((image) => image.id !== id);
      if (selectedImage?.id === id) {
        setSelectedImage(updatedImages[0] || null); // Update selected image
      }
      return updatedImages;
    });
  };

  const handleImageClick = (image: ImageProps) => {
    setSelectedImage(image);
  };

  if (loading) {
    return <div>Loading images...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg flex">
        {/* Side Panel */}
        <div className="flex flex-col space-y-4">
          {/* Image Upload */}
          {Array.from({ length: 4 }, (_, index) => (
            <div
              key={index}
              className="w-16 h-16 bg-gray-200 rounded-lg flex justify-center items-center relative"
            >
              {images[index] ? (
                <>
                  <img
                    src={images[index].src}
                    alt={images[index].alt}
                    className="w-full h-full rounded-lg cursor-pointer object-cover"
                    onClick={() => handleImageClick(images[index])}
                  />
                  <button
                    className="absolute top-0 right-0 bg-white rounded-full p-1 shadow-md"
                    onClick={() => handleImageDelete(images[index].id)}
                  >
                    <FaTimes className="text-red-500" />
                  </button>
                </>
              ) : (
                <label
                  htmlFor={`image-upload-${index}`}
                  className="cursor-pointer"
                >
                  <FaPlus className="text-2xl text-gray-500" />
                  <input
                    id={`image-upload-${index}`}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>
          ))}
        </div>
        {/* Main Image */}
        <div className="ml-4">
          {selectedImage ? (
            <img
              src={selectedImage.src}
              alt="Main view"
              className="w-96 h-96 rounded-lg object-cover"
            />
          ) : (
            <div className="w-96 h-96 bg-gray-200 rounded-lg flex justify-center items-center">
              <p className="text-gray-500">No image selected</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
