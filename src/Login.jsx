import axios from "axios";
import { useState } from "react";

const jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}

export function Login({ setIsLoggedIn }) {
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/sessions.json", params)
      .then((response) => {
        console.log(response.data);
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
        localStorage.setItem("jwt", response.data.jwt);
        setIsLoggedIn(true);
        event.target.reset();
        window.location.href = "/"; // Change this to hide a modal, redirect to a specific page, etc.
      })
      .catch((error) => {
        console.log(error.response);
        setErrors(["Invalid email or password"]);
      });
  };

  return (
    <div id="login" className="p-4 py-14">
      <h1 className="text-2xl font-medium mt-6 mb-5 ml-10">Login</h1>
      <ul className="text-red-500">
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="ml-10">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Email:</label>
          <input
            name="email"
            type="email"
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Password:</label>
          <input
            name="password"
            type="password"
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-black text-white p-2 rounded hover:bg-violet-600"
          >
          Login
          </button>
        </div>
      </form>
    </div>
  );
}