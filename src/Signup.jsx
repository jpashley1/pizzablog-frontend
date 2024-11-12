import axios from "axios";
import { useState } from "react";

export function Signup() {
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/users.json", params)
      .then((response) => {
        console.log(response.data);
        event.target.reset();
        window.location.href = "/"; // Change this to hide a modal, redirect to a specific page, etc.
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      });
  };

  return (
    <div id="signup" className="p-4">
      <h1 className="text-2xl font-medium mt-2 mb-4 ml-10">Signup</h1>
      <ul className="text-red-500">
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="ml-10">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Name:</label>
          <input
            name="name"
            type="text"
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>
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
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Password confirmation:</label>
          <input
            name="password_confirmation"
            type="password"
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-black text-white p-2 rounded hover:bg-violet-600"
          >Signup
          </button>
        </div>
      </form>
    </div>
  );
}