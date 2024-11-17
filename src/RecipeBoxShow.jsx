import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BackspaceIcon from '@mui/icons-material/Backspace';

export function RecipeBoxShow() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
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
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200">
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
    </div>
  );
}
