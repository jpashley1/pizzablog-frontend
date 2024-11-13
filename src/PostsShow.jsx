import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export function PostsShow() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/posts/${id}.json`)
      .then((response) => {
        console.log(response.data); // Check the data structure here
        setPost(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [id]);

  if (error) {
    return (
      <div className="p-4 text-center text-red-600 bg-red-100 rounded-md">
        Error: {error}
      </div>
    );
  }

  if (!post) {
    return <div className="p-4 text-center text-gray-600">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">{post.title}</h1>
      <p className="text-sm font-semibold text-gray-600 mb-2">
        Posted by {post.username || "Anonymous"}
      </p>

      {post.image_url && (
        <img
          src={`http://localhost:3000${post.image_url}`}
          alt={`${post.title} image`}
          className="w-full h-auto mb-4 rounded-md shadow-sm object-cover"
        />
      )}

      <div className="mb-6">
      
        <p className="text-gray-600">{post.caption}</p>
      </div>
    </div>
  );
}
