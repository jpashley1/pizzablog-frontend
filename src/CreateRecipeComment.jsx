import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export function CreateRecipeComent({ onClose, onCommentSubmit }) {
  const { id } = useParams();
  const [comment, setComment] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("comment", comment);

    axios
      .post(`http://localhost:3000/recipes/${id}/comments.json`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Comment created:", response.data);
        if (onCommentSubmit) {
          onCommentSubmit(); // Notify parent to refresh comments
        }
        onClose(); // Close the modal
      })
      .catch((error) => {
        console.error("Error creating comment:", error);
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
        <h2 className="text-xl text-left font-bold mb-4">Post Comment</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block text-sm text-left font-medium mb-1">Comment</label>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose} // Close modal on cancel
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
