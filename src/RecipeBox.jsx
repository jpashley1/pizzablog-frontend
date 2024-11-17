import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export function RecipeBox() {
  const [recipeBox, setRecipeBox] = useState([]);
  const title = "RecipeBox";

  const handleRecipeBoxData = () => {
    console.log("handleRecipeBoxData");
    axios.get("http://localhost:3000/recipe_box.json").then((response) => {
      console.log(response.data);
      setRecipeBox(response.data);
    });
  };

  useEffect(handleRecipeBoxData, []);

  return (
    <div className="py-16">
      <h1 className="text-4xl text-center p-6 animate-fade-in">
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

      {recipeBox.length === 0 ? (
        <div className="text-center text-gray-600 text-xl">
          Your Recipe Box is empty
        </div>
      ) : (
        <div className="p-1 grid grid-cols-3 gap-1">
          {recipeBox.map((recipe) => (
            <div
              key={recipe.id}
              className="mb-4 p-1 bg-white rounded-md shadow-md border border-gray-200"
            >
              <Link to={`/recipe_box/${recipe.id}`}>
                {recipe.image_url && (
                  <img
                    src={`http://localhost:3000${recipe.image_url}`}
                    alt={`${recipe.title} image`}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                )}
                <h2 className="text-center text-lg font-semibold mb-2">
                  {recipe.title}
                </h2>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
