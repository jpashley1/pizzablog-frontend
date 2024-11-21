import ReactDOM from "react-dom"; // Ensure this is imported for the modal
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BackspaceIcon from '@mui/icons-material/Backspace';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { RecipeNotes } from "./RecipeNotes";

export function RecipeBoxShow() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/recipe_box/${id}.json`)
      .then((response) => {
        console.log("Recipe data:", response.data);
        setRecipe(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [id]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this recipe from your Recipe Box?")) {
      axios
        .delete(`http://localhost:3000/recipe_box/${id}.json`)
        .then(() => {
          navigate("/recipe_box");
        })
        .catch((error) => {
          setError("Failed to delete recipe: " + error.message);
        });
    }
  };

  const handleNotesSave = (notes) => {
    // Update notes in the recipe state after saving
    setRecipe((prev) => ({ ...prev, notes }));
    setIsModalOpen(false); // Close modal after saving
  };

  if (error) {
    return (
      <div className="p-4 text-center text-red-600 bg-red-100 rounded-md">
        Error: {error}
      </div>
    );
  }

  if (!recipe) {
    return <div className="p-4 text-center text-gray-600">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800">{recipe.title}</h1>
      </div>

      <div className="relative">
        {recipe.image_url && (
          <img
            src={`http://localhost:3000${recipe.image_url}`}
            alt={`${recipe.title} image`}
            className="w-full h-auto mb-4 rounded-md shadow-sm object-cover"
          />
        )}
        <BackspaceIcon
          onClick={handleDelete}
          className="absolute bottom-2 right-2 cursor-pointer text-red-200 hover:text-red-800"
          fontSize="large"
        />
      </div>

      <Link to={`/users/${recipe.user_id}`}>
        <p className="text-sm text-right mr-2 font-semibold text-gray-600 mb-2">
          Recipe by {recipe.username || "Anonymous"}
        </p>
      </Link>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Ingredients</h2>
        <p className="text-gray-600">{recipe.ingredients}</p>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Directions</h2>
        <p className="text-gray-600">{recipe.directions}</p>
      </div>

      <div className="flex justify-center max-w-40 rounded mt-6 p-1 py- ">
        <LibraryAddIcon
          className="mr-2 text-blue-700 cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        />
        <h2 className="text-sm font-semibold text-blue-700">My Recipe Notes:</h2>
      </div>
        <p className="shadow-lg border rounded-lg p-3 mt-2 border-orange-200 text-xs text-black">{recipe.notes || "No notes yet."}</p>

      {isModalOpen &&
        ReactDOM.createPortal(
          <RecipeNotes
            recipeId={recipe.id}
            existingNotes={recipe.notes}
            onSave={handleNotesSave}
            onClose={() => setIsModalOpen(false)}
          />,
          document.body
        )}
    </div>
  );
}
