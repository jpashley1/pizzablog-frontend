import { useState, useEffect } from "react";
import axios from "axios";



export function Home() {
  const [recipes, setRecipes] = useState([]);

  const handleIndex = () => {
    console.log("handleIndex");
    axios.get("https://pizzablog-api.onrender.com/recipes.json").then((response) => {
      console.log(response.data);
      setRecipes(response.data);
    });
  };

  useEffect(handleIndex, []);
  return (
    <main>
      <h1>PizzaDreams Recipes</h1>
    </main>
  )
}