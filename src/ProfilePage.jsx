import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export function ProfilePage({ setIsLoggedIn }) {
  const [user, setUser] = useState(null);
  const [posts, setUserPosts] = useState([]);
  const [recipes, setUserRecipes] = useState([]);
  const [showRecipes, setShowRecipes] = useState(false);
  const navigate = useNavigate();

  const handleUserData = () => {
    axios.get("http://localhost:3000/my_profile.json").then((response) => {
      setUser(response.data);
    });
  };

  const handleUserPostsData = () => {
    axios.get("http://localhost:3000/my_posts.json").then((response) => {
      setUserPosts(response.data);
    });
  };

  const handleUserRecipesData = () => {
    axios.get("http://localhost:3000/my_recipes.json").then((response) => {
      setUserRecipes(response.data);
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    navigate("/");
  };

  const toggleContent = () => {
    setShowRecipes(!showRecipes);
  };

  useEffect(handleUserData, []);
  useEffect(handleUserPostsData, []);
  useEffect(handleUserRecipesData, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div id="ProfilePage" className="p-6 relative">
      <button
        onClick={handleLogout}
        className="absolute top-3 right-6 bg-red-500 text-white text-xs px-1 py-1 rounded-lg shadow hover:bg-red-600 transition"
      >
        Logout
      </button>

      <div className="flex items-start mb-6">
        <div className="p-2 bg-white rounded-full shadow-lg border border-red-600 border-y-4">
          <div className="w-36 h-36 rounded-full overflow-hidden">
            <img
              src={`http://localhost:3000${user.profile_pic_url}`}
              alt={`${user.username} profile`}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        <div className="flex flex-col ml-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            {user.username}
          </h1>
          <p className="text-blue-600 text-sm mt-2">{user.bio}</p>
          <div className="flex justify-left">
            <button
              onClick={toggleContent}
              className="bg-black text-white p-1 mt-4 rounded border-6 transition-shadow shadow-sm align-left text-sm hover:bg-violet-600"
            >
              {showRecipes ? "Posts" : "My Recipes"}
            </button>
          </div>
        </div>
      </div>

      <div id="ContentIndex">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-3 p-4 mt-4">
          {showRecipes
            ? recipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="max-w-xs mx-auto border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <Link to={`/recipes/${recipe.id}`}>
                    <img
                      src={`http://localhost:3000${recipe.image_url}`}
                      alt={`${recipe.title} image`}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                  </Link>
                  <p className="text-left text-sm font-semibold text-gray-600 mb-2">
                    Created by {recipe.username}
                  </p>
                  <h2 className="text-left text-xl mb-2">
                    {recipe.title}
                  </h2>
                </div>
              ))
            : posts.map((post) => (
                <div
                  key={post.id}
                  className="max-w-xs mx-auto border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <Link to={`/posts/${post.id}`}>
                    <img
                      src={`http://localhost:3000${post.image_url}`}
                      alt={`${post.caption} image`}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                  </Link>
                  <p className="text-left text-sm font-semibold text-gray-600 mb-2">
                    Posted by {post.username}
                  </p>
                  <h2 className="text-left text-xl mb-2">
                    {post.caption}
                  </h2>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}