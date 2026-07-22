import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import MainLayout from "../layouts/MainLayout";
import {
  getProfile,
  updateProfile,
} from "../services/authService";

const EditProfile = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await getProfile();

      setName(res.user.name);
      setPreview(
        res.user.avatar ||
          "https://cdn-icons-png.flaticon.com/512/149/149071.png"
      );
    } catch (error) {
      console.log(error);
      toast.error("Failed to load profile");
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setAvatar(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);

      if (avatar) {
        formData.append("avatar", avatar);
      }

      await updateProfile(formData);

      toast.success("Profile Updated Successfully");

      navigate("/profile");
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Update Failed"
      );
    }
  };

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto py-10 px-5">
        <div className="bg-white shadow-lg rounded-xl p-8">

          <h1 className="text-3xl font-bold text-center mb-8">
            Edit Profile
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="flex justify-center">
              <img
                src={preview}
                alt="avatar"
                className="w-36 h-36 rounded-full object-cover border-4 border-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Profile Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="w-full"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Full Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default EditProfile;