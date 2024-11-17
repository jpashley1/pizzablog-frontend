import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

export function ResultsPage() {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q");

  useEffect(() => {
    if (query) {
      axios
        .get(`http://localhost:3000/recipes_search.json?q=${query}`)
        .then((response) => {
          setResults(response.data);
        })
        .catch((error) => {
          setError("Failed to fetch results. Please try again.");
        });
    }
  }, [query]);

  return (
    <div className="p-6 py-20 mt-4">
      <h1 className="text-xl font-bold mb-4">Search Results</h1>
      {error && <p className="text-red-500">{error}</p>}
      {results.length > 0 ? (
        <div className="grid grid-cols-2 gap-1 lg:grid-cols-3">
        {results.map((recipe) => (
          <Link
            to={`/recipes/${recipe.id}`}
            key={recipe.id}
            className="max-w-xs mx-auto border p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="relative">
              <img
                src={`http://localhost:3000${recipe.image_url}`}
                alt={`${recipe.title} image`}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              
            </div>
            <h2 className="text-center text-xl font-semibold mb-2">{recipe.title}</h2>
            <p className="text-gray-700 text-sm mb-2">
              <strong>Ingredients:</strong> {recipe.ingredients}
            </p>
            <p className="text-gray-700 text-sm">
              <strong>Directions:</strong> {recipe.directions}
            </p>
          </Link>
        ))}
      </div>
      ) : (
        <p className="text-gray-600">No recipes found for "{query}".</p>
      )}
    </div>
  );
}

export default ResultsPage;
