import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { getProfile } from "../services/authService";
import toast from "react-hot-toast";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await getProfile();
      setUser(res.user);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-[70vh]">
          <h1 className="text-3xl font-bold">Loading...</h1>
        </div>
      </MainLayout>
    );
  }

  if (!user) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-[70vh]">
          <h1 className="text-3xl font-bold text-red-500">
            User Not Found
          </h1>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-10 px-5">
        <div className="bg-white rounded-xl shadow-lg p-8">

          <div className="flex flex-col items-center">

            <img
              src={
                user.avatar
                  ? user.avatar
                  : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="avatar"
              className="w-36 h-36 rounded-full object-cover border-4 border-blue-500 shadow-md"
            />

            <h1 className="text-3xl font-bold mt-5">
              {user.name}
            </h1>

            <p className="text-gray-500 mt-1">
              {user.email}
            </p>

            <span className="mt-3 bg-blue-100 text-blue-700 px-4 py-2 rounded-full capitalize font-semibold">
              {user.role}
            </span>

            <Link
              to="/edit-profile"
              className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Edit Profile
            </Link>

          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-10">

            <div className="bg-gray-100 p-5 rounded-lg">
              <h3 className="font-semibold text-gray-700">
                Full Name
              </h3>

              <p className="mt-2 text-lg">
                {user.name}
              </p>
            </div>

            <div className="bg-gray-100 p-5 rounded-lg">
              <h3 className="font-semibold text-gray-700">
                Email
              </h3>

              <p className="mt-2 text-lg break-all">
                {user.email}
              </p>
            </div>

            <div className="bg-gray-100 p-5 rounded-lg">
              <h3 className="font-semibold text-gray-700">
                Role
              </h3>

              <p className="capitalize mt-2 text-lg">
                {user.role}
              </p>
            </div>

            <div className="bg-gray-100 p-5 rounded-lg">
              <h3 className="font-semibold text-gray-700">
                Joined
              </h3>

              <p className="mt-2 text-lg">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="bg-gray-100 p-5 rounded-lg md:col-span-2">
              <h3 className="font-semibold text-gray-700">
                Enrolled Courses
              </h3>

              <p className="mt-2 text-lg">
                {user.enrolledCourses
                  ? user.enrolledCourses.length
                  : 0}
              </p>
            </div>

          </div>

        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;