import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";  
// import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';

export function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const title = "Recipes";

  const handleIndex = () => {
    console.log("handleIndex");
    axios.get("http://localhost:3000/recipes.json").then((response) => {
      console.log(response.data);
      const sortedRecipes = response.data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
      setRecipes(sortedRecipes);
    });
  };

  useEffect(handleIndex, []);

  // const handleBookmark = (e, recipeId) => {
  //   e.preventDefault(); 
  //   console.log("Bookmarked recipe:", recipeId);
  // };

  return (
    <div id="RecipesIndex" className="p-4">
      <h1 className="text-5xl text-center p-6 animate-fade-in">
        {title.split("").map((char, index) => (
          <span
            key={index}
            className="inline-block animate-bounce-once"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {char}
          </span>
        ))}
      </h1>
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <Link
            to={`/recipes/${recipe.id}`}
            key={recipe.id}
            className="max-w-xs mx-auto border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="relative">
              <img
                src={`http://localhost:3000${recipe.image_url}`}
                alt={`${recipe.title} image`}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              {/* <button
                onClick={(e) => handleBookmark(e, recipe.id)}
                className="absolute bottom-2 right-2 bg-white p-1 rounded-full shadow-md hover:bg-gray-100 transition-colors"
              >
                <BookmarkAddIcon className="text-gray-600 hover:text-gray-800" />
              </button> */}
            </div>
            <h2 className="text-center text-xl font-semibold mb-2">{recipe.title}</h2>
            <p className="text-gray-700 mb-2">
              <strong>Ingredients:</strong> {recipe.ingredients}
            </p>
            <p className="text-gray-700">
              <strong>Directions:</strong> {recipe.directions}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}