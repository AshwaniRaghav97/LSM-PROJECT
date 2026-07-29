import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { getProfile } from "../services/authService";
import toast from "react-hot-toast";

import {
  User,
  Mail,
  Calendar,
  GraduationCap,
  Shield,
  Edit,
  BookOpen,
  Trophy,
} from "lucide-react";

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
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-3xl font-bold">
            Loading...
          </h1>
        </div>
      </MainLayout>
    );
  }

  if (!user) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-3xl font-bold text-red-500">
            User Not Found
          </h1>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">

        <div className="max-w-7xl mx-auto px-6 py-10">

          {/* Hero */}

          <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white p-10 shadow-2xl">

            <div className="flex flex-col lg:flex-row justify-between items-center gap-10">

              <div>

                <p className="text-blue-100 mb-2">
                  Welcome Back 👋
                </p>

                <h1 className="text-5xl font-bold">
                  {user.name}
                </h1>

                <p className="mt-5 text-lg text-blue-100 max-w-xl">
                  Manage your personal information,
                  learning progress and account
                  settings from one place.
                </p>

              </div>

              <div className="hidden lg:flex">

                <div className="h-44 w-44 rounded-full bg-white/10 backdrop-blur-lg flex items-center justify-center overflow-hidden">

                  <img
                    src={
                      user.avatar ||
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt=""
                    className="h-full w-full object-cover"
                  />

                </div>

              </div>

            </div>

          </div>

          {/* Main Card */}

          <div className="bg-white rounded-3xl shadow-2xl mt-10 p-10">

            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">

              <img
                src={
                  user.avatar ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt=""
                className="w-44 h-44 rounded-full border-4 border-blue-600 shadow-lg object-cover"
              />

              <div className="flex-1">

                <h2 className="text-4xl font-bold">
                  {user.name}
                </h2>

                <p className="text-gray-500 mt-3">
                  {user.email}
                </p>

                <span className="inline-block mt-5 bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-semibold capitalize">

                  {user.role}

                </span>

                <div className="mt-8">

                  <Link
                    to="/edit-profile"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-xl font-semibold transition"
                  >

                    <Edit size={20} />

                    Edit Profile

                  </Link>

                </div>

              </div>

            </div>

            {/* Stats */}

            <div className="grid md:grid-cols-3 gap-6 mt-12">

              <div className="bg-blue-50 rounded-2xl p-6">

                <BookOpen className="text-blue-600 mb-3" />

                <p className="text-gray-500">
                  Enrolled Courses
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  {user.enrolledCourses?.length || 0}
                </h2>

              </div>

              <div className="bg-green-50 rounded-2xl p-6">

                <GraduationCap className="text-green-600 mb-3" />

                <p className="text-gray-500">
                  Completed
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  0
                </h2>

              </div>

              <div className="bg-orange-50 rounded-2xl p-6">

                <Trophy className="text-orange-600 mb-3" />

                <p className="text-gray-500">
                  Certificates
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  0
                </h2>

              </div>

            </div>
                        {/* Personal Information */}

            <div className="grid md:grid-cols-2 gap-6 mt-12">

              <div className="bg-slate-50 rounded-2xl p-6 shadow-sm hover:shadow-lg transition">

                <div className="flex items-center gap-3 mb-4">

                  <User className="text-blue-600" />

                  <h3 className="text-xl font-bold">
                    Full Name
                  </h3>

                </div>

                <p className="text-lg text-gray-700">
                  {user.name}
                </p>

              </div>

              <div className="bg-slate-50 rounded-2xl p-6 shadow-sm hover:shadow-lg transition">

                <div className="flex items-center gap-3 mb-4">

                  <Mail className="text-green-600" />

                  <h3 className="text-xl font-bold">
                    Email Address
                  </h3>

                </div>

                <p className="text-lg text-gray-700 break-all">
                  {user.email}
                </p>

              </div>

              <div className="bg-slate-50 rounded-2xl p-6 shadow-sm hover:shadow-lg transition">

                <div className="flex items-center gap-3 mb-4">

                  <Shield className="text-purple-600" />

                  <h3 className="text-xl font-bold">
                    Account Role
                  </h3>

                </div>

                <span className="inline-flex px-4 py-2 rounded-full bg-purple-100 text-purple-700 font-semibold capitalize">

                  {user.role}

                </span>

              </div>

              <div className="bg-slate-50 rounded-2xl p-6 shadow-sm hover:shadow-lg transition">

                <div className="flex items-center gap-3 mb-4">

                  <Calendar className="text-orange-600" />

                  <h3 className="text-xl font-bold">
                    Member Since
                  </h3>

                </div>

                <p className="text-lg text-gray-700">

                  {new Date(user.createdAt).toLocaleDateString()}

                </p>

              </div>

            </div>

            {/* Account Status */}

            <div className="mt-12 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white p-8 shadow-xl">

              <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

                <div>

                  <h2 className="text-3xl font-bold">

                    Account Status

                  </h2>

                  <p className="mt-4 text-blue-100 max-w-xl leading-7">

                    Your CodeLearn account is active and
                    ready for learning. Keep completing
                    courses to unlock certificates and
                    achievements.

                  </p>

                </div>

                <div>

                  <span className="bg-green-500 px-6 py-3 rounded-full font-bold text-lg shadow-lg">

                    ✅ Active

                  </span>

                </div>

              </div>

            </div>

            {/* Bottom Buttons */}

            <div className="flex flex-wrap gap-5 mt-12">

              <Link
                to="/my-learning"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition"
              >
                My Learning
              </Link>

              <Link
                to="/courses"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold transition"
              >
                Browse Courses
              </Link>

              <Link
                to="/dashboard"
                className="bg-slate-800 hover:bg-black text-white px-8 py-3 rounded-xl font-semibold transition"
              >
                Dashboard
              </Link>

            </div>

          </div>

        </div>

      </div>

    </MainLayout>

  );

};

export default Profile;