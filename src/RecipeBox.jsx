
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";



export function RecipeBox() {

  const [recipeBox, setRecipeBox] = useState([]);

  const handleRecipeBoxData = () => {
    console.log("handleRecipeBoxData");
    axios.get("http://localhost:3000/recipe_box.json").then((response) => {
      console.log(response.data);
      setRecipeBox(response.data);
    });
  };

  useEffect(handleRecipeBoxData, []);
  return (
<div className="grid grid-cols-3 gap-1 lg:grid-cols-3 mt-4 p-4">
          {recipeBox.map((recipe) => (
            <Link
              to={`/recipes/${recipe.recipe_id}`}
              key={recipe.id}
              className="max-w-sm mx-auto border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={`http://localhost:3000${recipe.image_url}`}
                alt={`${recipe.title} image`}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-center text-lg font-semibold mb-2">{recipe.title}</h2>
              {/* <p className="text-gray-700 mb-2">
                <strong>Ingredients:</strong> {recipe.ingredients}
              </p>
              <p className="text-gray-700">
                <strong>Directions:</strong> {recipe.directions}
              </p> */}
             
            </Link>
          ))}
        </div>
    

  )
}


