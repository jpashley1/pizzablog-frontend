import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';

export function RecipesShow() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkError, setBookmarkError] = useState(null);

  useEffect(() => {
    
    axios
      .get(`http://localhost:3000/recipes/${id}.json`)
      .then((response) => {
        console.log("Recipe data:", response.data);
        setRecipe(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });

    
    axios
      .get("http://localhost:3000/my_profile.json")
      .then((response) => {
        console.log("Current user data:", response.data);
        setCurrentUser(response.data);
      })
      .catch((error) => {
        console.log("Error fetching current user:", error);
      });

    // Check if recipe is already saved
    axios
      .get("http://localhost:3000/recipe_boxes.json")
      .then((response) => {
        const isInRecipeBox = response.data.some(
          (item) => item.recipe_id === parseInt(id)
        );
        setIsBookmarked(isInRecipeBox);
      })
      .catch((error) => {
        console.log("Error checking recipe box:", error);
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

  const handleBookmark = async () => {
    try {
      if (!currentUser) {
        setBookmarkError("Please log in to save recipes");
        return;
      }

      setBookmarkError(null);
      const response = await axios.post("http://localhost:3000/recipe_box.json", {
        recipe_id: id
      });

      if (response.data) {
        setIsBookmarked(true);
        // Show success message (you can add a toast notification here)
        console.log("Recipe saved to recipe box!");
      }
    } catch (error) {
      setBookmarkError(error.response?.data?.errors?.[0] || "Failed to save recipe");
      console.error("Error saving recipe:", error);
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
    <div className="max-w-3xl mx-auto p-6 bg-white       rounded-lg shadow-md border border-gray-200">
        <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">{recipe.title}</h1>
        {currentUser.username === recipe.username && (
          <button
            onClick={handleDelete}
            className="bg-red-500 text-xs text-white px-1 rounded-lg hover:bg-red-600 transition-colors ml-auto"
          >
            Delete Recipe
          </button>
        )}
      </div>

      <div className="relative">
        {recipe.image_url && (
          <img
            src={`http://localhost:3000${recipe.image_url}`}
            alt={`${recipe.title} image`}
            className="w-full h-auto mb-4 rounded-md shadow-sm object-cover"
          />
        )}
        <button 
          onClick={handleBookmark}
          className={`absolute bottom-2 right-2 p-2 rounded-full shadow-md transition-colors ${
            isBookmarked 
              ? "bg-blue-500 hover:bg-blue-600" 
              : "bg-white hover:bg-gray-100"
          }`}
        >
          <BookmarkAddIcon 
            className={`w-6 h-6 ${
              isBookmarked ? "text-white" : "text-gray-600"
            }`} 
          />
        </button>
      </div>

      {bookmarkError && (
        <div className="mt-2 text-red-600 text-sm">
          {bookmarkError}
        </div>
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