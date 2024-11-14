import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export function PostsShow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
   
    axios
      .get(`http://localhost:3000/posts/${id}.json`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });

   
    axios
      .get("http://localhost:3000/my_profile.json")
      .then((response) => {
        setCurrentUser(response.data);
      })
      .catch((error) => {
        console.log("Error fetching user data:", error);
      });
  }, [id]);

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
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-2xl font-bold text-gray-800">{post.title} 
        </h1>
        {currentUser.username === post.username && (
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-1 rounded-lg hover:bg-red-600 transition-colors"
          >
            Delete Post
          </button>
        )}
      </div>

    

      {post.image_url && (
        <img
          src={`http://localhost:3000${post.image_url}`}
          alt={`${post.title} image`}
          className="w-full h-auto mb-4 rounded-md shadow-sm object-cover"
        />
      )}
        <Link to={`/users/${post.user_id}`}>
        <p className="text-xs4 text-right font-semibold text-black mb-2">
          Posted by {post.username || "Anonymous"}
        </p>
      </Link>

      <div className="mb-6">
        <p className="text-gray-600 text-xl">{post.caption}</p>
      </div>
    </div>
  );
}