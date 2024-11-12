import { useParams } from "react-router-dom";

export function RecipesShow() {
  const { id } = useParams();  // Access the recipe ID from the URL

  // Fetch the recipe data based on the ID
  // You can use useEffect to fetch the recipe details based on the ID
  // and display it in this component.

  return (
    <div>
      <h1>Recipe Details for Recipe {id}</h1>
      {/* Render recipe details here */}
    </div>
  );
}
