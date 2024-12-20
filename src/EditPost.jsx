import { useState } from "react";
import axios from "axios";

export function EditPost({ id, caption: initialCaption, image: initialImage, onClose }) {
  const [caption, setCaption] = useState(initialCaption || "");
  const [image, setImage] = useState(initialImage);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set preview URL
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null); 
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const formData = new FormData();
    formData.append("caption", caption);
    if (image && typeof image !== "string") {
      formData.append("image", image);
    }

    try {
      const response = await axios.patch(
        `http://localhost:3000/posts/${id}.json`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Post updated:", response.data);
      onClose();
    } catch (error) {
      console.error("Error updating Post:", error);
      setError(error.response?.data?.errors || "An error occurred while updating the Post");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Edit Post</h2>
        {error && (
          <div className="mb-4 text-red-500 text-sm">{error}</div>
        )}
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block text-sm text-left font-medium mb-1">Caption</label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="border placeholder:text-blue-400 border-gray-300 p-2 w-full rounded"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Post Image</label>
            {image && typeof image === "string" && (
              <img
                src={`http://localhost:3000${image}`}
                alt="Post"
                className="w-full h-auto mb-2 rounded-md shadow-sm object-cover"
              />
            )}
            <input
              type="file"
              onChange={handleImageChange}
              className="border border-gray-300 p-2 w-full rounded"
              accept="image/*"
            />
                   {/* Image Preview */}
                   {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Selected"
                  className="w-full h-40 object-cover rounded-md border"
                />
              </div>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-black rounded hover:bg-indigo-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
