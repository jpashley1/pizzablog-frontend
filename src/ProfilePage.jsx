import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export function ProfilePage() {
  const [users, setUser] = useState([]);

  const handleUserData = () => {
    console.log("handleUserData");
    axios.get("http://localhost:3000/my_profile.json").then((response) => {
      console.log(response.data);
      setUser(response.data);
    });
  };

  useEffect(handleUserData, []);

  return (
    <div id="ProfilePage" className="p-4">
    <div>
      {users.map((user) => (
        <Link
          to={`/user/${user.id}`}
          key={user.id}
          className="max-w-xs mx-auto border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <img
            src={`http://localhost:3000${user.profile_pic_url}`}
            alt={`${user.caption} image`}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <p>{user.bio}</p>
        </Link>
      ))}
    </div>
  </div>
  )
}