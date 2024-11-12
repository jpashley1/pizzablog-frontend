import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


export function PostsIndex() {
  const [posts, setPosts] = useState([]);

  const handleIndex = () => {
    console.log("handlePostIndex");
    axios.get("http://localhost:3000/posts.json").then((response) => {
      console.log(response.data);
      setPosts(response.data);
    });
  };

  useEffect(handleIndex, []);

  return (
    <div id="PostsIndex" className="p-4">
      <div>
        {posts.map((post) => (
          <Link
            to={`/posts/${post.id}`}
            key={post.id}
            className="max-w-xs mx-auto border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <img
              src={`http://localhost:3000${post.image_url}`}
              alt={`${post.caption} image`}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <p className="text-center text-sm text-gray-600 mb-2">
              Posted by {post.username}
            </p>
            <h2 className="text-center text-xl font-semibold mb-2">
              {post.caption}</h2>
          </Link>
        ))}
      </div>
    </div>
  )
}