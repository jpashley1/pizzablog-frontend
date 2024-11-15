import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { EditPost } from "./EditPost";

export function PostsShow() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    // Fetch post data
    axios
      .get(`http://localhost:3000/posts/${id}.json`)
      .then((response) => {
        console.log("Post data:", response.data);
        setPost(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });

    // Fetch current user data separately
    axios
      .get("http://localhost:3000/my_profile.json")
      .then((response) => {
        console.log("Current user data:", response.data);
        setCurrentUser(response.data);
      })
      .catch((error) => {
        console.log("Error fetching current user:", error);
      });
  }, [id]);

  const handleEdit = () => {
    setShowEditModal(true);
  };
  
  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      axios
        .delete(`http://localhost:3000/posts/${id}.json`)
        .then(() => {
          navigate("/profile");
        })
        .catch((error) => {
          setError("Failed to delete post: " + error.message);
        });
    }
  };


  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  if (error) {
    return (
      <div className="p-4 text-center text-red-600 bg-red-100 rounded-md">
        Error: {error}
      </div>
    );
  }

  if (!post || !currentUser) {
    return <div className="p-4 text-center text-gray-600">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200">
    

    <div className="relative">
  {post.image_url && (
    <img
      src={`http://localhost:3000${post.image_url}`}
      alt={`${post.title} image`}
      className="w-full h-auto mb-4 rounded-md shadow-sm object-cover"
    />
  )}

  {currentUser.username === post.username && (
    <>
      <ArrowDropDownCircleIcon
        onClick={handleOpenMenu}
        className="absolute top-2 right-2 cursor-pointer text-gray-500 hover:text-gray-800"
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
        <EditPost
          id={post.id}
          caption={post.caption}
          image={post.image_url}
          onClose={handleCloseEditModal}
        />
      </div>
    )}
    </>
  )}
</div>

      <Link to={`/users/${post.user_id}`}>
        <p className="text-sm text-right mr-2 font-semibold text-gray-600 mb-2">
          Post by {post.username || "Anonymous"}
        </p>
      </Link>   

      <div className="mb-6">
        <p className="text-gray-600">{post.caption}</p>
      </div>
    </div>
  );
}