import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { getInstructorDashboard } from "../services/dashboardService";
import toast from "react-hot-toast";

import {
  BookOpen,
  Users,
  FileVideo,
  IndianRupee,
  Star,
  MessageSquare,
  CheckCircle,
  Clock,
  Plus,
  LayoutDashboard,
  GraduationCap,
} from "lucide-react";

const InstructorDashboard = () => {

  const [dashboard, setDashboard] = useState({
    totalCourses: 0,
    publishedCourses: 0,
    unpublishedCourses: 0,
    totalStudents: 0,
    totalLectures: 0,
    totalRevenue: 0,
    totalReviews: 0,
    averageRating: 0,
    topCourses: [],
    recentPayments: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await getInstructorDashboard();
      setDashboard(response.dashboard);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-3xl font-bold">
            Loading Dashboard...
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
                  Instructor Panel
                </p>

                <h1 className="text-5xl font-bold">
                  Dashboard
                </h1>

                <p className="mt-5 text-lg text-blue-100 max-w-2xl">
                  Monitor courses, students, revenue,
                  reviews and manage your complete
                  learning platform from one place.
                </p>

                <div className="flex flex-wrap gap-4 mt-8">

                  <Link
                    to="/create-course"
                    className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition flex items-center gap-2"
                  >
                    <Plus size={20} />
                    Create Course
                  </Link>

                  <Link
                    to="/my-courses"
                    className="border border-white px-6 py-3 rounded-xl hover:bg-white hover:text-blue-700 transition flex items-center gap-2"
                  >
                    <LayoutDashboard size={20} />
                    My Courses
                  </Link>

                </div>

              </div>

              <div className="hidden lg:flex">

                <div className="h-44 w-44 rounded-full bg-white/10 backdrop-blur-lg flex items-center justify-center">

                  <GraduationCap size={90} />

                </div>

              </div>

            </div>

          </div>

          {/* Stats */}

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-10">

            <div className="bg-white rounded-2xl shadow-lg p-6 hover:-translate-y-2 transition">

              <div className="flex justify-between">

                <div>

                  <p className="text-gray-500">
                    Total Courses
                  </p>

                  <h2 className="text-4xl font-bold mt-3">
                    {dashboard.totalCourses}
                  </h2>

                </div>

                <div className="h-14 w-14 rounded-xl bg-blue-100 flex items-center justify-center">

                  <BookOpen className="text-blue-600"/>

                </div>

              </div>

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 hover:-translate-y-2 transition">

              <div className="flex justify-between">

                <div>

                  <p className="text-gray-500">
                    Students
                  </p>

                  <h2 className="text-4xl font-bold mt-3">
                    {dashboard.totalStudents}
                  </h2>

                </div>

                <div className="h-14 w-14 rounded-xl bg-green-100 flex items-center justify-center">

                  <Users className="text-green-600"/>

                </div>

              </div>

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 hover:-translate-y-2 transition">

              <div className="flex justify-between">

                <div>

                  <p className="text-gray-500">
                    Lectures
                  </p>

                  <h2 className="text-4xl font-bold mt-3">
                    {dashboard.totalLectures}
                  </h2>

                </div>

                <div className="h-14 w-14 rounded-xl bg-purple-100 flex items-center justify-center">

                  <FileVideo className="text-purple-600"/>

                </div>

              </div>

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 hover:-translate-y-2 transition">

              <div className="flex justify-between">

                <div>

                  <p className="text-gray-500">
                    Revenue
                  </p>

                  <h2 className="text-4xl font-bold mt-3">
                    ₹ {dashboard.totalRevenue}
                  </h2>

                </div>

                <div className="h-14 w-14 rounded-xl bg-red-100 flex items-center justify-center">

                  <IndianRupee className="text-red-600"/>

                </div>

              </div>

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 hover:-translate-y-2 transition">

              <div className="flex justify-between">

                <div>

                  <p className="text-gray-500">
                    Rating
                  </p>

                  <h2 className="text-4xl font-bold mt-3">
                    {dashboard.averageRating}
                  </h2>

                </div>

                <div className="h-14 w-14 rounded-xl bg-yellow-100 flex items-center justify-center">

                  <Star className="text-yellow-500"/>

                </div>

              </div>

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 hover:-translate-y-2 transition">

              <div className="flex justify-between">

                <div>

                  <p className="text-gray-500">
                    Reviews
                  </p>

                  <h2 className="text-4xl font-bold mt-3">
                    {dashboard.totalReviews}
                  </h2>

                </div>

                <div className="h-14 w-14 rounded-xl bg-indigo-100 flex items-center justify-center">

                  <MessageSquare className="text-indigo-600"/>

                </div>

              </div>

            </div>

          </div>
                    {/* Published & Unpublished */}

          <div className="grid md:grid-cols-2 gap-8 mt-10">

            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-3xl shadow-xl p-8 hover:scale-[1.02] transition">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-green-100">
                    Published Courses
                  </p>

                  <h2 className="text-5xl font-bold mt-3">
                    {dashboard.publishedCourses}
                  </h2>

                  <p className="mt-4 text-green-100">
                    Live courses available for students.
                  </p>

                </div>

                <div className="h-20 w-20 rounded-2xl bg-white/20 flex items-center justify-center">

                  <CheckCircle size={42} />

                </div>

              </div>

            </div>

            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-3xl shadow-xl p-8 hover:scale-[1.02] transition">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-orange-100">
                    Draft Courses
                  </p>

                  <h2 className="text-5xl font-bold mt-3">
                    {dashboard.unpublishedCourses}
                  </h2>

                  <p className="mt-4 text-orange-100">
                    Complete and publish these courses.
                  </p>

                </div>

                <div className="h-20 w-20 rounded-2xl bg-white/20 flex items-center justify-center">

                  <Clock size={42} />

                </div>

              </div>

            </div>

          </div>

          {/* Top Courses */}

          <div className="mt-14">

            <div className="flex justify-between items-center mb-8">

              <h2 className="text-3xl font-bold">
                Top Performing Courses
              </h2>

              <Link
                to="/my-courses"
                className="text-blue-600 font-semibold hover:text-blue-700"
              >
                View All →
              </Link>

            </div>

            {dashboard.topCourses?.length > 0 ? (

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

                {dashboard.topCourses.map((course, index) => (

                  <div
                    key={index}
                    className="bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition overflow-hidden"
                  >

                    <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

                    <div className="p-7">

                      <h3 className="text-2xl font-bold line-clamp-2">

                        {course.title}

                      </h3>

                      <div className="mt-7 space-y-4">

                        <div className="flex justify-between">

                          <span className="text-gray-500">
                            Students
                          </span>

                          <span className="font-bold text-green-600">
                            👨‍🎓 {course.students}
                          </span>

                        </div>

                        <div className="flex justify-between">

                          <span className="text-gray-500">
                            Revenue
                          </span>

                          <span className="font-bold text-blue-600">
                            ₹ {course.revenue}
                          </span>

                        </div>

                      </div>

                      <div className="mt-8">

                        <div className="flex justify-between text-sm mb-2">

                          <span>Performance</span>

                          <span>Excellent</span>

                        </div>

                        <div className="w-full h-3 rounded-full bg-gray-200">

                          <div className="h-3 w-4/5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"></div>

                        </div>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            ) : (

              <div className="bg-white rounded-3xl shadow-xl py-20 text-center">

                <BookOpen
                  size={70}
                  className="mx-auto text-blue-600"
                />

                <h2 className="text-3xl font-bold mt-6">

                  No Courses Yet

                </h2>

                <p className="text-gray-500 mt-3">

                  Start by creating your first course.

                </p>

                <Link
                  to="/create-course"
                  className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition"
                >

                  Create Course

                </Link>

              </div>

            )}
          </div>
                    {/* ================= RECENT PAYMENTS ================= */}

          <div className="mt-14">

            <div className="flex justify-between items-center mb-8">

              <h2 className="text-3xl font-bold">
                Recent Payments
              </h2>

              <span className="text-gray-500">
                {dashboard.recentPayments?.length} Transactions
              </span>

            </div>

            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead className="bg-slate-100">

                    <tr>

                      <th className="text-left p-5 font-semibold">
                        Student
                      </th>

                      <th className="text-left p-5 font-semibold">
                        Email
                      </th>

                      <th className="text-left p-5 font-semibold">
                        Course
                      </th>

                      <th className="text-left p-5 font-semibold">
                        Amount
                      </th>

                      <th className="text-left p-5 font-semibold">
                        Status
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {dashboard.recentPayments?.length > 0 ? (

                      dashboard.recentPayments.map((payment) => (

                        <tr
                          key={payment._id}
                          className="border-b hover:bg-blue-50 transition"
                        >

                          <td className="p-5 font-semibold">

                            {payment.user?.name || "N/A"}

                          </td>

                          <td className="p-5 text-gray-600">

                            {payment.user?.email || "N/A"}

                          </td>

                          <td className="p-5">

                            {payment.course?.title || "N/A"}

                          </td>

                          <td className="p-5 font-bold text-green-600">

                            ₹ {payment.amount}

                          </td>

                          <td className="p-5">

                            <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold text-sm">

                              {payment.status}

                            </span>

                          </td>

                        </tr>

                      ))

                    ) : (

                      <tr>

                        <td
                          colSpan="5"
                          className="py-20 text-center"
                        >

                          <div className="flex flex-col items-center">

                            <IndianRupee
                              size={60}
                              className="text-gray-300"
                            />

                            <h3 className="text-2xl font-bold mt-5">

                              No Payments Yet

                            </h3>

                            <p className="text-gray-500 mt-2">

                              Your recent transactions will appear here.

                            </p>

                          </div>

                        </td>

                      </tr>

                    )}

                  </tbody>

                </table>

              </div>

            </div>

          </div>

        </div>

      </div>

    </MainLayout>

  );

};

export default InstructorDashboard;