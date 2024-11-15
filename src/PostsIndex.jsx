import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


export function PostsIndex() {
  const [posts, setPosts] = useState([]);

  const handleIndex = () => {
    console.log("handleIndex");
    axios.get("http://localhost:3000/posts.json").then((response) => {
      console.log(response.data);
     
      const sortePosts = response.data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
      setPosts(sortePosts);
    });
  };

  useEffect(handleIndex, []);

  return (
    <div id="PostsIndex" className="p-6">
      <div>
        {posts.map((post) => (
          <div
            key={post.id}
            className="max-w-xs mx-auto border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <Link to={`/posts/${post.id}`}>
              <img
                src={`http://localhost:3000${post.image_url}`}
                alt={`${post.caption} image`}
                className="w-full h-60 object-cover rounded-md mb-4"
              />
            </Link>

            < Link to={`/users/${post.user_id}`}>
            <p className="text-left text-sm font-semibold text-gray-600 mb-2">
              Posted by {post.username}
            </p>
            </Link>
          
            <h2 className="text-left text-xl mb-2">
              {post.caption}
            </h2>
          </div>
        ))}
      </div>
    </div>
  )
}