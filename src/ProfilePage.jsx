import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { CreatePost } from "./CreatePost";
import { CreateRecipe } from "./CreateRecipe";
import { EditProfile } from "./EditProfile";
import LogoutIcon from '@mui/icons-material/Logout';

export function ProfilePage({ setIsLoggedIn }) {
  const [user, setUser] = useState(null);
  
  const [isHovered, setIsHovered] = useState(false);
  const [isEditHovered, setIsEditHovered] = useState(false);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleMouseEditEnter = () => setIsEditHovered(true);
  const handleMouseEditLeave = () => setIsEditHovered(false);

  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [isCreateRecipeModalOpen, setIsCreateRecipeModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
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
      const sortedPosts = response.data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
      setUserPosts(sortedPosts);
    });
  };

  const handleUserRecipesData = () => {
    axios.get("http://localhost:3000/my_recipes.json").then((response) => {
      const sortedRecipes = response.data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
      setUserRecipes(sortedRecipes);
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

  const handleNewPostClick = () => {
    setIsCreatePostModalOpen(true);
  };
  const handleNewRecipeClick = () => {
    setIsCreateRecipeModalOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfileModalOpen(true);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div id="ProfilePage" className="p-2 py-20 relative">
      <div className="flex items-start mb-6">
        {/* Profile Picture */}
        <div className="p-2 bg-white rounded-full shadow-lg border border-red-600 border-y-4">
          <div className="w-36 h-36 rounded-full overflow-hidden">
            <img
              src={`http://localhost:3000${user.profile_pic_url}`}
              alt={`${user.username} profile`}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* User Information */}
        <div className="flex flex-col ml-6 w-full">
          <div className="flex items-center space-x-2">
            {/* Username */}
            <h1 className="text-2xl font-semibold text-gray-800 whitespace-nowrap">{user.username}</h1>

            {/* Edit Button */}
            <div className="relative mt-1">
              <button
                onClick={handleEditProfileClick}
                onMouseEnter={handleMouseEditEnter}
                onMouseLeave={handleMouseEditLeave}
                className="text-gray-500 hover:text-gray-800 transition"
                aria-label="Edit profile"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-black"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L6 11.172V14h2.828l8.586-8.586a2 2 0 000-2.828z" />
                  <path
                    fillRule="evenodd"
                    d="M4 16a2 2 0 100 4h12a2 2 0 100-4H4zm0 2h12a1 1 0 000-2H4a1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {isEditHovered && (
                <div
                  className="absolute top-full right-0 mt-1 bg-slate-600 text-white px-1 py-1 rounded-md text-xs whitespace-nowrap z-10"
                >
                  Edit Profile?
                </div>
              )}
            </div>

            {/* Logout Button */}
            <div className="relative">
              <LogoutIcon
                onClick={handleLogout}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="bg-black text-white text-sm px-1 py-1 rounded-lg shadow hover:bg-red-600 transition cursor-pointer"
              />
              {isHovered && (
                <div
                  className="absolute top-full right-0 mt-1 bg-slate-600 text-white px-1 py-1 rounded-md text-xs whitespace-nowrap z-10"
                >
                  Logout?
                </div>
              )}
            </div>
          </div>

          {/* Bio */}
          <p className="text-blue-700 text-sm mt-2">{user.bio}</p>

          {/* Toggle Button */}
          <div className="flex justify-left">
            <button
              onClick={toggleContent}
              className="bg-black text-white p-1 mt-4 rounded border-6 transition-shadow shadow-sm align-left text-lg hover:bg-violet-600"
            >
              {showRecipes ? "Posts" : "My Recipes"}
            </button>
          </div>
        </div>
      </div>

      <div className="text-center space-x-12">
        {!showRecipes && (
          <button
            onClick={handleNewPostClick}
            className="mt-4 text-sm bg-black text-white px-4 py-2 rounded shadow-md border border-black hover:bg-violet-600 transition-shadow"
          >
            + Post
          </button>
        )}
        {showRecipes && (
          <button
            onClick={handleNewRecipeClick}
            className="mt-4 text-sm bg-black text-white px-4 py-2 rounded shadow-md border border-black hover:bg-violet-600 transition-shadow"
          >
            + Recipe
          </button>
        )}

        {isCreatePostModalOpen && <CreatePost onClose={() => setIsCreatePostModalOpen(false)} />}
        {isCreateRecipeModalOpen && <CreateRecipe onClose={() => setIsCreateRecipeModalOpen(false)} />}
        {isEditProfileModalOpen && (
          <EditProfile 
          username={user.username} 
          bio={user.bio} 
          id={user.id} 
          profile_pic={user.profile_pic_url}
          onClose={() => setIsEditProfileModalOpen(false)} />
        )}
      </div>

      {/* Content Index */}
      <div id="ContentIndex">
        <div className="grid grid-cols-2 gap-1 lg:grid-cols-3 mt-4">
          {showRecipes
            ? recipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="w-full h-80 border p-1 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <Link to={`/recipes/${recipe.id}`}>
                    <img
                      src={`http://localhost:3000${recipe.image_url}`}
                      alt={`${recipe.title} image`}
                      className="w-full h-56 object-cover rounded-md mb-4"
                    />
                  </Link>
                  <p className="text-left text-sm font-semibold text-gray-600 mb-2">
                    Created by {recipe.username}
                  </p>
                  <h2 className="text-left text-xl mb-2">{recipe.title}</h2>
                </div>
              ))
            : posts.map((post) => (
                <div
                  key={post.id}
                  className="w-full h-80 border p-1 rounded-lg shadow-md hover:shadow-lg transition-shadow"
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
                  <h2 className="text-left text-xl mb-2">{post.caption}</h2>
                </div>
              ))}
        </div>
      </div>
    </div>

  );
}