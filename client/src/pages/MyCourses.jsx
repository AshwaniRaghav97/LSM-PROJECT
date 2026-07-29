import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import {
  getMyCourses,
  deleteCourse,
} from "../services/courseService";
import toast from "react-hot-toast";

import {
  BookOpen,
  Plus,
  Pencil,
  Users,
  CheckCircle,
  Clock,
  GraduationCap,
} from "lucide-react";

const MyCourses = () => {

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await getMyCourses();
      setCourses(response.courses);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch courses");
    }
  };

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmDelete) return;

    try {

      const response = await deleteCourse(id);

      toast.success(response.message);

      fetchCourses();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Delete Failed"
      );

    }

  };

  const publishedCourses = courses.filter(
    (course) => course.isPublished
  ).length;

  const draftCourses =
    courses.length - publishedCourses;

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
                  My Courses
                </h1>

                <p className="mt-5 text-lg text-blue-100 max-w-2xl">

                  Manage your published and draft
                  courses, edit content and keep
                  everything updated.

                </p>

                <Link
                  to="/create-course"
                  className="inline-flex items-center gap-3 mt-8 bg-white text-blue-700 px-7 py-3 rounded-xl font-semibold hover:scale-105 transition"
                >

                  <Plus size={22} />

                  Create New Course

                </Link>

              </div>

              <div className="hidden lg:flex">

                <div className="h-44 w-44 rounded-full bg-white/10 backdrop-blur-lg flex items-center justify-center">

                  <GraduationCap size={90} />

                </div>

              </div>

            </div>

          </div>

          {/* Stats */}

          <div className="grid md:grid-cols-3 gap-7 mt-10">

            <div className="bg-white rounded-2xl shadow-lg p-7 hover:-translate-y-2 transition">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500">
                    Total Courses
                  </p>

                  <h2 className="text-5xl font-bold mt-3">

                    {courses.length}

                  </h2>

                </div>

                <div className="h-16 w-16 rounded-2xl bg-blue-100 flex items-center justify-center">

                  <BookOpen className="text-blue-600" />

                </div>

              </div>

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-7 hover:-translate-y-2 transition">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500">
                    Published
                  </p>

                  <h2 className="text-5xl font-bold mt-3 text-green-600">

                    {publishedCourses}

                  </h2>

                </div>

                <div className="h-16 w-16 rounded-2xl bg-green-100 flex items-center justify-center">

                  <CheckCircle className="text-green-600" />

                </div>

              </div>

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-7 hover:-translate-y-2 transition">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500">
                    Draft Courses
                  </p>

                  <h2 className="text-5xl font-bold mt-3 text-orange-500">

                    {draftCourses}

                  </h2>

                </div>

                <div className="h-16 w-16 rounded-2xl bg-orange-100 flex items-center justify-center">

                  <Clock className="text-orange-600" />

                </div>

              </div>

            </div>

          </div>
                    {/* ================= MY COURSES ================= */}

          <div className="mt-14">

            <div className="flex items-center justify-between mb-8">

              <h2 className="text-3xl font-bold">
                Your Courses
              </h2>

              <span className="text-gray-500">
                {courses.length} Course{courses.length !== 1 && "s"}
              </span>

            </div>

            {courses.length > 0 ? (

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

                {courses.map((course) => (

                  <div
                    key={course._id}
                    className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition duration-300"
                  >

                    {/* Thumbnail */}

                    <div className="relative">

                      <img
                        src={
                          course.thumbnail ||
                          "https://placehold.co/600x350?text=CodeLearn+LMS"
                        }
                        alt={course.title}
                        className="w-full h-56 object-cover"
                      />

                      <div className="absolute top-4 left-4">

                        <span
                          className={`px-4 py-1 rounded-full text-sm font-semibold ${
                            course.isPublished
                              ? "bg-green-500 text-white"
                              : "bg-orange-500 text-white"
                          }`}
                        >
                          {course.isPublished
                            ? "Published"
                            : "Draft"}
                        </span>

                      </div>

                      <div className="absolute top-4 right-4">

                        <span className="bg-white text-blue-700 px-4 py-1 rounded-full font-bold shadow">

                          ₹ {course.price}

                        </span>

                      </div>

                    </div>

                    {/* Body */}

                    <div className="p-6">

                      <h2 className="text-2xl font-bold line-clamp-2">

                        {course.title}

                      </h2>

                      <p className="text-gray-600 mt-3 line-clamp-3">

                        {course.description}

                      </p>

                      <div className="flex items-center justify-between mt-6">

                        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">

                          {course.category}

                        </span>

                        <span className="flex items-center gap-2 text-gray-500">

                          <Users size={18} />

                          {course.students?.length || 0}

                        </span>

                      </div>

                      {/* Buttons */}

                      <div className="grid grid-cols-3 gap-3 mt-8">

                        <Link
                          to={`/edit-course/${course._id}`}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition"
                        >

                          <Pencil size={18} />

                          Edit

                        </Link>

                        <button
                          onClick={() =>
                            handleDelete(course._id)
                          }
                          className="bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition"
                        >

                          Delete

                        </button>

                        <Link
                          to={`/manage-lectures/${course._id}`}
                          className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-center transition"
                        >

                          Manage

                        </Link>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            ) : (
                            <div className="col-span-full">

                <div className="bg-white rounded-3xl shadow-xl py-20 text-center">

                  <BookOpen
                    size={80}
                    className="mx-auto text-blue-600"
                  />

                  <h2 className="text-3xl font-bold mt-6">

                    No Courses Yet

                  </h2>

                  <p className="text-gray-500 mt-4 max-w-lg mx-auto">

                    You haven't created any courses yet.
                    Start creating your first course and
                    begin teaching thousands of students.

                  </p>

                  <Link
                    to="/create-course"
                    className="inline-flex items-center gap-3 mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition hover:scale-105"
                  >

                    <Plus size={22} />

                    Create Your First Course

                  </Link>

                </div>

              </div>

            )}

          </div>

        </div>

      </div>

    </MainLayout>

  );

};

export default MyCourses;