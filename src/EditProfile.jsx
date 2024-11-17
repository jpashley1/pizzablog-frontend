import { useState } from "react";
import axios from "axios";

export function EditProfile({ id, username: initialUsername, bio: initialBio, profile_pic: initialProfilePic, onClose }) {
  const [username, setUsername] = useState(initialUsername || "");
  const [bio, setBio] = useState(initialBio || "");
  const [profile_pic, setProfilePic] = useState(initialProfilePic);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    setProfilePic(file);

    // Generate a preview URL for the selected image
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set preview URL
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null); // Clear preview if no file is selected
    }
  };

  const handleFormSubmit = async (event) => {
  event.preventDefault();
  setError("");

  const formData = new FormData();
  formData.append("username", username);
  formData.append("bio", bio);

  // Only append `profile_pic` if it's a File object
  if (profile_pic && !(typeof profile_pic === "string")) {
    formData.append("profile_pic", profile_pic); 
  }

  try {
    const response = await axios.patch(
      `http://localhost:3000/users/${id}.json`,
      formData, // Send formData
      {
        headers: {
          "Content-Type": "multipart/form-data", // Set the correct content type
        },
      }
    );
    console.log("Profile updated:", response.data);
    onClose();
  } catch (error) {
    console.error("Error updating profile:", error);
    setError(error.response?.data?.errors || "An error occurred while updating the profile");
  }
};

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
        {error && (
          <div className="mb-4 text-red-500 text-sm">{error}</div>
        )}
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block text-sm text-left font-medium mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border placeholder:text-blue-400 border-gray-300 p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-left font-medium mb-1">Bio</label>
            <input
              type="text"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Profile Pic</label>
            {profile_pic && typeof profile_pic === "string" && (
              <img
                src={`http://localhost:3000${profile_pic}`}
                alt="Post"
                className="w-full h-48 mb-2 rounded-md shadow-sm object-cover"
              />
            )}
            <input
              type="file"
              onChange={handleProfilePicChange}
              className="border border-gray-300 p-2 w-full rounded"
              accept="image/*"
            />
            {/* Image Preview */}
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Selected"
                  className="w-full h-40 object-cover rounded-md border"
                />
              </div>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-black rounded hover:bg-indigo-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}