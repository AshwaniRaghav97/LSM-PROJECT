import MainLayout from "../layouts/MainLayout";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  BookOpen,
  GraduationCap,
  Trophy,
  User,
} from "lucide-react";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">

        <div className="max-w-7xl mx-auto px-6 py-12">

          {/* Hero Section */}

          <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 rounded-3xl shadow-2xl text-white p-10">

            <div className="flex flex-col lg:flex-row justify-between items-center gap-10">

              <div>

                <p className="text-blue-100 text-lg">
                  Welcome Back 👋
                </p>

                <h1 className="text-5xl font-bold mt-2">
                  {user?.name}
                </h1>

                <p className="mt-6 text-lg text-blue-100 max-w-xl leading-8">
                  Keep learning every day, complete
                  amazing courses and become a better
                  developer with CodeLearn LMS.
                </p>

                <div className="flex gap-4 mt-8">

                  <Link
                    to="/courses"
                    className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
                  >
                    Explore Courses
                  </Link>

                  <Link
                    to="/my-learning"
                    className="border border-white px-6 py-3 rounded-xl hover:bg-white hover:text-blue-700 transition"
                  >
                    My Learning
                  </Link>

                </div>

              </div>

              <div className="hidden lg:flex">

                <div className="h-48 w-48 rounded-full bg-white/10 backdrop-blur-lg flex items-center justify-center">

                  <User size={90} />

                </div>

              </div>

            </div>

          </div>

          {/* Statistics */}

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">

            <div className="bg-white rounded-2xl shadow-lg p-6 hover:-translate-y-2 transition">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500">
                    Total Courses
                  </p>

                  <h2 className="text-4xl font-bold mt-3">
                    12
                  </h2>

                </div>

                <div className="h-16 w-16 rounded-2xl bg-blue-100 flex items-center justify-center">

                  <BookOpen
                    className="text-blue-600"
                    size={30}
                  />

                </div>

              </div>

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 hover:-translate-y-2 transition">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500">
                    Enrolled
                  </p>

                  <h2 className="text-4xl font-bold mt-3">
                    4
                  </h2>

                </div>

                <div className="h-16 w-16 rounded-2xl bg-green-100 flex items-center justify-center">

                  <GraduationCap
                    className="text-green-600"
                    size={30}
                  />

                </div>

              </div>

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 hover:-translate-y-2 transition">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500">
                    Completed
                  </p>

                  <h2 className="text-4xl font-bold mt-3">
                    2
                  </h2>

                </div>

                <div className="h-16 w-16 rounded-2xl bg-purple-100 flex items-center justify-center">

                  <Trophy
                    className="text-purple-600"
                    size={30}
                  />

                </div>

              </div>

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 hover:-translate-y-2 transition">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500">
                    Certificates
                  </p>

                  <h2 className="text-4xl font-bold mt-3">
                    1
                  </h2>

                </div>

                <div className="h-16 w-16 rounded-2xl bg-orange-100 flex items-center justify-center">

                  🏆

                </div>

              </div>

            </div>

          </div>
                    {/* ================= QUICK ACTIONS ================= */}

          <div className="mt-12">

            <div className="flex items-center justify-between mb-6">

              <h2 className="text-3xl font-bold">
                Quick Actions
              </h2>

              <Link
                to="/courses"
                className="text-blue-600 font-semibold hover:text-blue-700"
              >
                View All →
              </Link>

            </div>

            <div className="grid md:grid-cols-3 gap-6">

              <Link
                to="/courses"
                className="bg-white rounded-2xl shadow-lg p-8 hover:-translate-y-2 transition duration-300"
              >

                <BookOpen
                  size={45}
                  className="text-blue-600"
                />

                <h3 className="text-2xl font-bold mt-5">
                  Browse Courses
                </h3>

                <p className="text-gray-500 mt-3 leading-7">
                  Explore hundreds of premium
                  programming courses.
                </p>

              </Link>

              <Link
                to="/my-learning"
                className="bg-white rounded-2xl shadow-lg p-8 hover:-translate-y-2 transition duration-300"
              >

                📚

                <h3 className="text-2xl font-bold mt-5">
                  Continue Learning
                </h3>

                <p className="text-gray-500 mt-3 leading-7">
                  Continue your enrolled courses
                  from where you stopped.
                </p>

              </Link>

              <Link
                to="/profile"
                className="bg-white rounded-2xl shadow-lg p-8 hover:-translate-y-2 transition duration-300"
              >

                <User
                  size={45}
                  className="text-purple-600"
                />

                <h3 className="text-2xl font-bold mt-5">
                  My Profile
                </h3>

                <p className="text-gray-500 mt-3 leading-7">
                  Manage your personal profile
                  and account settings.
                </p>

              </Link>

            </div>

          </div>

          {/* ================= Learning Progress ================= */}

          <div className="mt-14 grid lg:grid-cols-3 gap-8">

            <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-8">

              <h2 className="text-3xl font-bold mb-8">
                Continue Learning
              </h2>

              <div className="space-y-8">

                <div>

                  <div className="flex justify-between mb-2">

                    <span>MERN Stack Development</span>

                    <span className="font-bold text-blue-600">
                      70%
                    </span>

                  </div>

                  <div className="w-full h-3 bg-gray-200 rounded-full">

                    <div
                      className="h-3 rounded-full bg-blue-600"
                      style={{ width: "70%" }}
                    />

                  </div>

                </div>

                <div>

                  <div className="flex justify-between mb-2">

                    <span>Java DSA</span>

                    <span className="font-bold text-green-600">
                      45%
                    </span>

                  </div>

                  <div className="w-full h-3 bg-gray-200 rounded-full">

                    <div
                      className="h-3 rounded-full bg-green-600"
                      style={{ width: "45%" }}
                    />

                  </div>

                </div>

                <div>

                  <div className="flex justify-between mb-2">

                    <span>React Advanced</span>

                    <span className="font-bold text-purple-600">
                      90%
                    </span>

                  </div>

                  <div className="w-full h-3 bg-gray-200 rounded-full">

                    <div
                      className="h-3 rounded-full bg-purple-600"
                      style={{ width: "90%" }}
                    />

                  </div>

                </div>

              </div>

            </div>

            {/* Motivation Card */}

            <div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-blue-700 text-white shadow-2xl p-8">

              <h2 className="text-3xl font-bold">
                🚀 Keep Growing
              </h2>

              <p className="mt-5 text-blue-100 leading-7">

                Complete more courses,
                earn certificates and
                build your developer portfolio.

              </p>

              <Link
                to="/courses"
                className="inline-block mt-8 bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
              >

                Explore Courses

              </Link>

            </div>

          </div>

          {/* ================= Recent Courses ================= */}

          <div className="mt-14 bg-white rounded-3xl shadow-xl p-8">

            <h2 className="text-3xl font-bold mb-8">
              Recent Courses
            </h2>

            <div className="space-y-5">

              <div className="border rounded-2xl p-5 hover:bg-gray-50 transition">
                🚀 Complete MERN Stack Development
              </div>

              <div className="border rounded-2xl p-5 hover:bg-gray-50 transition">
                ☕ Java DSA Masterclass
              </div>

              <div className="border rounded-2xl p-5 hover:bg-gray-50 transition">
                ⚛ React Beginner to Advanced
              </div>

            </div>

          </div>

        </div>

      </div>

    </MainLayout>
  );
};

export default Dashboard;