import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export function EditRecipeComment({ onClose, onCommentSubmit, commentToEdit }) {
  const { id } = useParams();
  const [comment, setComment] = useState("");

  // Pre-fill the comment input if editing an existing comment
  useEffect(() => {
    if (commentToEdit) {
      setComment(commentToEdit.content);
    }
  }, [commentToEdit]);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Determine if we're creating a new comment or editing an existing one
    const url = commentToEdit
      ? `http://localhost:3000/comments/${commentToEdit.id}.json`
      : `http://localhost:3000/recipes/${id}/comments.json`;

    const method = commentToEdit ? 'patch' : 'post';

    const formData = new FormData();
    formData.append("comment", comment);

    axios[method](url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log(commentToEdit ? "Comment updated:" : "Comment created:", response.data);
        if (onCommentSubmit) {
          onCommentSubmit(); // Notify parent to refresh comments
        }
        onClose(); // Close the modal
      })
      .catch((error) => {
        console.error(commentToEdit ? "Error updating comment:" : "Error creating comment:", error);
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
        <h2 className="text-xl text-left font-bold mb-4">
          {commentToEdit ? "Edit Comment" : "Add Comment"}
        </h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block text-sm text-left font-medium mb-1">Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded"
              required
              rows="4"
            />
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
              {commentToEdit ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}