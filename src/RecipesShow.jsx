import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export function RecipesShow() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Fetch recipe data
    axios
      .get(`http://localhost:3000/recipes/${id}.json`)
      .then((response) => {
        console.log("Recipe data:", response.data);
        setRecipe(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });

    // Fetch current user data separately
    axios
      .get("http://localhost:3000/my_profile.json")
      .then((response) => {
        console.log("Current user data:", response.data);
        setCurrentUser(response.data);
      })
      .catch((error) => {
        console.log("Error fetching current user:", error);
      });
  }, [id]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      axios
        .delete(`http://localhost:3000/recipes/${id}.json`)
        .then(() => {
          navigate("/profile");
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

  if (!recipe || !currentUser) {
    return <div className="p-4 text-center text-gray-600">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">{recipe.title}</h1>
        {currentUser.username === recipe.username && (
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white text-sm px-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Delete Recipe
          </button>
        )}
      </div>

      {recipe.image_url && (
        <img
          src={`http://localhost:3000${recipe.image_url}`}
          alt={`${recipe.title} image`}
          className="w-full h-auto mb-4 rounded-md shadow-sm object-cover"
        />
      )}

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