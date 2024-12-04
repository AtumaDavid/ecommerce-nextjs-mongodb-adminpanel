import axiosInstance from "@/lib/axiosInstance";
import React, { useEffect, useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";

type ImageProps = {
  id: string;
  src: string;
  alt: string;
  isInitial?: boolean;
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
        // console.log(response.data.data.images);

        // Convert the initial product image to ImageProps
        // const initialImage: ImageProps = {
        //   id: "initial-image",
        //   src: response.data.data.images,
        //   alt: response.data.data.name || "Product Image",
        //   isInitial: true,
        // };

        // Ensure images is always an array
        const productImages = Array.isArray(response.data.data.images)
          ? response.data.data.images
          : response.data.data.images
          ? [response.data.data.images]
          : [];

        // Convert images to ImageProps
        const formattedImages = productImages.map(
          (src: string, index: number) => ({
            id: `image-${index}`,
            src,
            alt: `Product Image ${index + 1}`,
            isInitial: index === 0,
          })
        );

        // // Set the initial image
        // setImages([initialImage]);
        // setSelectedImage(initialImage);
        // setLoading(false);
        setImages(formattedImages);
        setSelectedImage(formattedImages[0] || null);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching images:", err);
        setError("Failed to load images.");
        setLoading(false);
      }
    };

    fetchImages();
  }, [productId]);

  const updateProductImages = async (newImages: string[]) => {
    try {
      await axiosInstance.put(`/products/${productId}`, {
        images: newImages,
      });
    } catch (error) {
      console.error("Error updating product images:", error);
    }
  };

  // const handleImageUpload = async (
  //   event: React.ChangeEvent<HTMLInputElement>,
  //   replaceInitial: boolean = false
  // ) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     if (images.length < 4 || replaceInitial) {
  //       try {
  //         // Create FormData and append the file
  //         const formData = new FormData();
  //         formData.append("file", file);

  //         const response = await axiosInstance.post("/upload/image", formData, {
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //           },
  //         });

  //         const newImage: ImageProps = {
  //           id: Date.now().toString(),
  //           src: response.data.url,
  //           alt: file.name,
  //         };

  //         if (replaceInitial) {
  //           // Replace the initial image
  //           setImages((prevImages) =>
  //             prevImages.map((img) =>
  //               img.isInitial ? { ...newImage, isInitial: true } : img
  //             )
  //           );
  //           setSelectedImage({ ...newImage, isInitial: true });
  //         } else {
  //           // Add new image
  //           setImages((prevImages) => [...prevImages, newImage]);
  //           if (!selectedImage) setSelectedImage(newImage);
  //         }

  //         // Update product image in backend
  //         await updateProductMainImage(newImage.src);
  //       } catch (error) {
  //         console.error("Image upload error:", error);
  //         alert("Failed to upload image");
  //       }
  //     } else {
  //       alert("You can only upload up to 4 images.");
  //     }
  //   }
  // };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    replaceInitial: boolean = false
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (images.length < 4 || replaceInitial) {
        try {
          const formData = new FormData();
          formData.append("file", file);

          const response = await axiosInstance.post("/upload/image", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          const newImage: ImageProps = {
            id: Date.now().toString(),
            src: response.data.url,
            alt: file.name,
          };

          let updatedImages: ImageProps[];
          if (replaceInitial) {
            // Replace the initial image
            updatedImages = images.map((img) =>
              img.isInitial ? { ...newImage, isInitial: true } : img
            );
          } else {
            // Add new image
            updatedImages = [...images, newImage];
          }

          // Limit to 4 images
          updatedImages = updatedImages.slice(0, 4);

          setImages(updatedImages);
          setSelectedImage(newImage);

          // Update product images in backend
          await updateProductImages(updatedImages.map((img) => img.src));
        } catch (error) {
          console.error("Image upload error:", error);
          alert("Failed to upload image");
        }
      } else {
        alert("You can only upload up to 4 images.");
      }
    }
  };

  // const updateProductMainImage = async (newImageUrl: string) => {
  //   try {
  //     await axiosInstance.put(`/products/${productId}`, {
  //       images: newImageUrl,
  //     });
  //   } catch (error) {
  //     console.error("Error updating main product image:", error);
  //   }
  // };

  const removeImageFromCloudinary = async (imageUrl: string) => {
    try {
      await axiosInstance.delete("/upload/image", {
        data: { imageUrl },
      });
    } catch (error) {
      console.error("Error removing image from Cloudinary:", error);
    }
  };

  // const handleImageDelete = async (id: string) => {
  //   try {
  //     // Find the image to be deleted
  //     const imageToDelete = images.find((image) => image.id === id);

  //     if (imageToDelete && !imageToDelete.isInitial) {
  //       // Remove from Cloudinary
  //       await removeImageFromCloudinary(imageToDelete.src);

  //       // Update state
  //       setImages((prevImages) => {
  //         const updatedImages = prevImages.filter((image) => image.id !== id);

  //         // If deleting the selected image
  //         if (selectedImage?.id === id) {
  //           // Select the first image or null
  //           setSelectedImage(updatedImages[0] || null);
  //         }

  //         return updatedImages;
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error deleting image:", error);
  //     alert("Failed to delete image");
  //   }
  // };

  const handleImageDelete = async (id: string) => {
    try {
      const imageToDelete = images.find((image) => image.id === id);

      if (imageToDelete && !imageToDelete.isInitial) {
        // Remove from Cloudinary (you'll need to implement this)
        await removeImageFromCloudinary(imageToDelete.src);

        // Update state and backend
        const updatedImages = images.filter((image) => image.id !== id);

        setImages(updatedImages);
        setSelectedImage(updatedImages[0] || null);

        // Update product images in backend
        await updateProductImages(updatedImages.map((img) => img.src));
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      alert("Failed to delete image");
    }
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
                  {images[index].isInitial ? (
                    <label
                      htmlFor="replace-initial-image"
                      className="absolute top-0 right-0 bg-white rounded-full p-1 shadow-md cursor-pointer"
                    >
                      <FaPlus className="text-green-500" />
                      <input
                        id="replace-initial-image"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e, true)}
                      />
                    </label>
                  ) : (
                    <button
                      className="absolute top-0 right-0 bg-white rounded-full p-1 shadow-md"
                      onClick={() => handleImageDelete(images[index].id)}
                    >
                      <FaTimes className="text-red-500" />
                    </button>
                  )}
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
