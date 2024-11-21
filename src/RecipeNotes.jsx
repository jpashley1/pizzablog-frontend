import { useState } from "react";
import axios from "axios";

export function RecipeNotes({ recipeId, existingNotes, onSave, onClose }) {
  const [notes, setNotes] = useState(existingNotes || "");
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .patch(`http://localhost:3000/recipe_box/${recipeId}.json`, { notes })
      .then((response) => {
        onSave(response.data.notes); // Pass the updated notes back to the parent
      })
      .catch((error) => {
        setError("Failed to save notes: " + error.message);
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-base text-blue-700 font-semibold mb-4">Edit Recipe Notes</h2>
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <form onSubmit={handleSubmit}>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-2 border rounded-md mb-4"
            rows="4"
            placeholder="Write your notes here..."
          ></textarea>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
