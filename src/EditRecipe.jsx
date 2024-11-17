import { useState } from "react";
import axios from "axios";

export function EditRecipe({ id, title: initialTitle, ingredients: initialIngredients, directions: initialDirections, image: initialImage, onClose }) {
  const [title, setTitle] = useState(initialTitle || "");
  const [ingredients, setIngredients] = useState(initialIngredients || "");
  const [directions, setDirections] = useState(initialDirections || "");
  const [image, setImage] = useState(initialImage);
  const [imagePreview, setImagePreview] = useState(null);

  const [error, setError] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);

    // Generate a preview URL for the selected image
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set preview URL
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null); // Clear preview if no file is selected
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("ingredients", ingredients);
    formData.append("directions", directions);

    if (image && typeof image !== "string") {
      formData.append("image", image);
    }

    try {
      const response = await axios.patch(
        `http://localhost:3000/recipes/${id}.json`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Recipe updated:", response.data);
      onClose();
    } catch (error) {
      console.error("Error updating Recipe:", error);
      setError(error.response?.data?.errors || "An error occurred while updating the Recipe");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Edit Recipe</h2>
        {error && (
          <div className="mb-4 text-red-500 text-sm">{error}</div>
        )}
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block text-sm text-left font-medium mb-1">title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border placeholder:text-blue-400 border-gray-300 p-2 w-full rounded"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm text-left font-medium mb-1">Ingredients</label>
            <input
              type="text"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="border placeholder:text-blue-400 border-gray-300 p-2 w-full rounded"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm text-left font-medium mb-1">Directions</label>
            <input
              type="text"
              value={directions}
              onChange={(e) => setDirections(e.target.value)}
              className="border placeholder:text-blue-400 border-gray-300 p-2 w-full rounded"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Recipe Image</label>
            {image && typeof image === "string" && (
              <img
                src={`http://localhost:3000${image}`}
                alt="Post"
                className="w-full h-48 mb-2 rounded-md shadow-sm object-cover"
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
