import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { EditRecipe } from "./EditRecipe";
import { CreateRecipeComent } from "./CreateRecipeComment";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export function RecipesShow() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkError, setBookmarkError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [showEditModal, setShowEditModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);


  const fetchComments = () => {
    axios
      .get(`http://localhost:3000/recipes/${id}.json`)
      .then((response) => {
        setComments(response.data.comments || []);
      })
      .catch((error) => console.error("Error fetching comments:", error));
  };

  const handleNewCommentClick = () => {
    setIsCommentModalOpen(true); // Make sure the state is updated correctly
  };

  const handleCloseCommentModal = () => {
    setIsCommentModalOpen(false); // Close the modal when needed
  };

  const handleCommentSubmit = () => {
    fetchComments();
    handleCloseCommentModal();
  };

  const handleDeleteComment = async (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        await axios.delete(`http://localhost:3000/comments/${commentId}.json`);
        fetchComments();
      } catch (error) {
        console.error("Error deleting comment:", error);
        alert("Failed to delete comment");
      }
    }
  };

  const handleEditComment = (comment) => {
    setEditingCommentId(comment.id);
    setIsCommentModalOpen(true);
  };

  useEffect(() => {
    // Fetch recipe first
    axios
      .get(`http://localhost:3000/recipes/${id}.json`)
      .then((response) => {
        setRecipe(response.data);
        setComments(response.data.comments || []);
      })
      .catch((error) => {
        setError(error.message);
      });
  
    // Fetch user profile and recipe box separately
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      axios
        .get("http://localhost:3000/my_profile.json")
        .then((response) => {
          setCurrentUser(response.data);
        })
        .catch((error) => {
          console.log("Error fetching user profile:", error);
        });
  
      axios
        .get("http://localhost:3000/recipe_box.json")
        .then((response) => {
          const isInRecipeBox = response.data.some(
            (item) => item.recipe_id === parseInt(id)
          );
          setIsBookmarked(isInRecipeBox);
        })
        .catch((error) => {
          console.log("Error checking recipe box:", error);
        });
    }
  }, [id]);

  const handleEdit = () => {
    setShowEditModal(true);
  };
  
  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

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

  if (!recipe) {
    return <div className="p-4 text-center text-gray-600">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 py-20 bg-white rounded-lg shadow-md border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">{recipe.title}</h1>
      </div>

      <div className="relative">
        {recipe.image_url && (
          <img
            src={`http://localhost:3000${recipe.image_url}`}
            alt={`${recipe.title} image`}
            className="w-full h-80 mb-4 rounded-md shadow-sm object-cover"
          />
        )}
        
        {currentUser && currentUser.username === recipe.username && (
          <>
            <ArrowDropDownCircleIcon
              onClick={handleOpenMenu}
              className="absolute top-2 right-2 cursor-pointer text-slate-200 hover:text-gray-800"
              fontSize="large"
            />
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleCloseMenu}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem
                onClick={() => {
                  handleEdit();
                  handleCloseMenu();
                }}
              >
                Edit
              </MenuItem>
              <MenuItem 
                onClick={() => {
                  handleDelete();
                  handleCloseMenu();
                }}
                style={{ color: 'red' }}
              >
                Delete
              </MenuItem>
            </Menu>
            
            {showEditModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <EditRecipe
                  id={id}
                  title={recipe.title}
                  ingredients={recipe.ingredients}
                  directions={recipe.directions}
                  image={recipe.image_url}
                  onClose={handleCloseEditModal}
                />
              </div>
            )}
          </>
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
    
      <button 
        className="bg-blue-700 text-white p-1 mt-4 text-sm rounded-md"
        onClick={handleNewCommentClick}
      >
        + Comment
      </button>
      {/* Ensure that the modal opens correctly when isCommentModalOpen is true */}
      {isCommentModalOpen && (
        <CreateRecipeComent 
          onClose={handleCloseCommentModal} // Pass close function to modal
          onCommentSubmit={handleCommentSubmit}
          commentToEdit={editingCommentId 
            ? comments.find(comment => comment.id === editingCommentId) 
            : null
          }
        />
      )}
      <div className="mt-4">
        <h3 className="text-lg font-bold mb-2">Comments</h3>
        {comments.length > 0 ? (
          <div className="space-y-4">
            {comments
              .slice()
              .map((comment) => (
                <div key={comment.id} className="bg-gray-50 p-4 rounded-lg relative">
                  <Link to={`/users/${comment.user_id}`}>
                    <p className="font-medium text-blue-700">{comment.username || "Anonymous"}</p>
                  </Link>
                  <p>{comment.content}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(comment.created_at).toLocaleDateString()}
                  </p>
                  {currentUser && currentUser.username === recipe.username &&  (
                    <div className="absolute top-2 right-2 flex space-x-2">
                      <button 
                        onClick={() => handleEditComment(comment)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <EditIcon fontSize="small" />
                      </button>
                      <button 
                        onClick={() => handleDeleteComment(comment.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <DeleteIcon fontSize="small" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
          </div>
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
}
