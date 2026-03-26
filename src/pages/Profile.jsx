import React, { useEffect, useState } from "react";
import API from "../api/axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [skillsInput, setSkillsInput] = useState("");

  const fetchUserProfile = async () => {
    try {
      const res = await API.get("/auth/profile");
      setUser(res.data);
      setEditedUser(res.data);
      setSkillsInput(res.data.skills ? res.data.skills.join(", ") : "");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setSkillsInput(editedUser.skills ? editedUser.skills.join(", ") : "");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser(user);
    setProfileImage(null);
    setSkillsInput(user.skills ? user.skills.join(", ") : "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSkillsChange = (e) => {
    const value = e.target.value;
    setSkillsInput(value);
    const skills = value
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill);
    setEditedUser({ ...editedUser, skills });
  };

  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("username", editedUser.username || "");
      formData.append("phone", editedUser.phone || "");
      formData.append("location", editedUser.location || "");
      formData.append("bio", editedUser.bio || "");
      formData.append("skills", JSON.stringify(editedUser.skills || []));

      if (profileImage) {
        formData.append("profilePic", profileImage);
      }

      await API.put("/auth/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await fetchUserProfile();
      setIsEditing(false);
      setProfileImage(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gray-800 text-white p-6">
          <h1 className="text-3xl font-bold">User Profile</h1>
        </div>

        {user ? (
          <div className="p-6">
            {!isEditing ? (
              <>
                <div className="flex flex-col md:flex-row items-center md:items-start mb-6">
                  {user.profilePic && (
                    <img
                      src={user.profilePic}
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover border-4 border-green-600 mb-4 md:mb-0 md:mr-6"
                    />
                  )}

                  <div className="text-center md:text-left">
                    <h2 className="text-2xl font-semibold text-gray-800">
                      {user.username}
                    </h2>
                    <p className="text-gray-600">{user.email}</p>
                    {user.location && (
                      <p className="text-gray-600">{user.location}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      Personal Information
                    </h3>

                    <div className="space-y-2">
                      <p>
                        <strong>Username:</strong> {user.username}
                      </p>

                      <p>
                        <strong>Email:</strong> {user.email}
                      </p>

                      {user.phone && (
                        <p>
                          <strong>Phone:</strong> {user.phone}
                        </p>
                      )}

                      {user.location && (
                        <p>
                          <strong>Location:</strong> {user.location}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      About
                    </h3>

                    {user.bio && (
                      <p>
                        <strong>Bio:</strong> {user.bio}
                      </p>
                    )}

                    {user.skills && user.skills.length > 0 && (
                      <div className="mt-2">
                        <strong>Skills:</strong>

                        <div className="flex flex-wrap gap-2 mt-2">
                          {user.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <button
                    onClick={handleEdit}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700"
                  >
                    Update Profile
                  </button>
                </div>
              </>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <div>
                    <label className="block text-gray-700">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={editedUser.username || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={editedUser.phone || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={editedUser.location || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700">
                      Profile Picture
                    </label>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full px-3 py-2 border rounded-lg"
                    />

                    {profileImage && (
                      <img
                        src={URL.createObjectURL(profileImage)}
                        alt="preview"
                        className="w-20 h-20 rounded-full mt-2"
                      />
                    )}
                  </div>

                </div>

                <div>
                  <label className="block text-gray-700">Bio</label>
                  <textarea
                    name="bio"
                    value={editedUser.bio || ""}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-gray-700">
                    Skills (comma separated)
                  </label>

                  <input
                    type="text"
                    value={skillsInput}
                    onChange={handleSkillsChange}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                <div className="text-center space-x-4">
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-2 rounded-lg"
                  >
                    Save Changes
                  </button>

                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-gray-500 text-white px-6 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>

              </form>
            )}
          </div>
        ) : (
          <div className="p-6 text-center">
            <p>Loading profile...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;