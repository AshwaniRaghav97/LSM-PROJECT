import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getProfile } from "../services/authService";
import toast from "react-hot-toast";

const Profile = () => {
  const [user, setUser] = useState(null);

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
    }
  };

  if (!user) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-[70vh]">
          <h1 className="text-3xl font-bold">
            Loading...
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
                user.avatar ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="avatar"
              className="w-36 h-36 rounded-full object-cover border-4 border-blue-500"
            />

            <h1 className="text-3xl font-bold mt-5">
              {user.name}
            </h1>

            <p className="text-gray-500">
              {user.email}
            </p>

            <span className="mt-3 bg-blue-100 text-blue-700 px-4 py-2 rounded-full capitalize">
              {user.role}
            </span>

          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-10">

            <div className="bg-gray-100 p-5 rounded-lg">
              <h3 className="font-semibold">
                Full Name
              </h3>

              <p>{user.name}</p>
            </div>

            <div className="bg-gray-100 p-5 rounded-lg">
              <h3 className="font-semibold">
                Email
              </h3>

              <p>{user.email}</p>
            </div>

            <div className="bg-gray-100 p-5 rounded-lg">
              <h3 className="font-semibold">
                Role
              </h3>

              <p className="capitalize">
                {user.role}
              </p>
            </div>

            <div className="bg-gray-100 p-5 rounded-lg">
              <h3 className="font-semibold">
                Joined
              </h3>

              <p>
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>

          </div>

        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;