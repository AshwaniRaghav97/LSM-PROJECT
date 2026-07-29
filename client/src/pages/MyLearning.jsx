import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import MainLayout from "../layouts/MainLayout";
import { getMyLearning } from "../services/enrollmentService";

import {
  GraduationCap,
  Search,
  PlayCircle,
  BookOpen,
  Trophy,
} from "lucide-react";

const MyLearning = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await getMyLearning();
      setCourses(response.courses);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load courses");
    }
  };

  const filteredCourses = useMemo(() => {
    return courses.filter((course) =>
      course.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [courses, search]);

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">

        <div className="max-w-7xl mx-auto px-6 py-10">

          {/* Hero */}

          <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white p-10 shadow-2xl">

            <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

              <div>

                <p className="text-blue-100 mb-2">
                  Welcome Back 👋
                </p>

                <h1 className="text-5xl font-bold">
                  My Learning
                </h1>

                <p className="mt-5 text-lg text-blue-100 max-w-2xl">
                  Continue learning from where you left
                  off and complete your enrolled
                  courses.
                </p>

              </div>

              <div className="hidden lg:flex">

                <div className="h-40 w-40 rounded-full bg-white/10 backdrop-blur-lg flex items-center justify-center">

                  <GraduationCap size={80} />

                </div>

              </div>

            </div>

          </div>

          {/* Stats */}

          <div className="grid md:grid-cols-3 gap-6 mt-10">

            <div className="bg-white rounded-2xl shadow-lg p-6">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500">
                    Enrolled Courses
                  </p>

                  <h2 className="text-4xl font-bold mt-2">
                    {courses.length}
                  </h2>

                </div>

                <BookOpen className="text-blue-600" size={40} />

              </div>

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500">
                    In Progress
                  </p>

                  <h2 className="text-4xl font-bold mt-2">
                    {courses.length}
                  </h2>

                </div>

                <PlayCircle className="text-green-600" size={40} />

              </div>

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500">
                    Certificates
                  </p>

                  <h2 className="text-4xl font-bold mt-2">
                    0
                  </h2>

                </div>

                <Trophy className="text-orange-500" size={40} />

              </div>

            </div>

          </div>

          {/* Search */}

          <div className="mt-10 relative">

            <Search
              className="absolute left-5 top-4 text-gray-400"
              size={20}
            />

            <input
              type="text"
              placeholder="Search your enrolled courses..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full pl-14 pr-5 py-4 rounded-2xl border bg-white shadow-md focus:ring-2 focus:ring-blue-500 outline-none"
            />

          </div>
                    {/* Courses */}

          <div className="mt-10">

            {filteredCourses.length === 0 ? (

              <div className="bg-white rounded-3xl shadow-xl py-20 text-center">

                <BookOpen
                  size={70}
                  className="mx-auto text-blue-600"
                />

                <h2 className="text-3xl font-bold mt-6">

                  No Courses Found

                </h2>

                <p className="text-gray-500 mt-3">

                  You haven't enrolled in any courses
                  yet or no course matches your search.

                </p>

                <Link
                  to="/courses"
                  className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition"
                >

                  Explore Courses

                </Link>

              </div>

            ) : (

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

                {filteredCourses.map((course) => (

                  <div
                    key={course._id}
                    className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300"
                  >

                    {/* Thumbnail */}

                    <div className="relative overflow-hidden">

                      <img
                        src={
                          course.thumbnail ||
                          "https://placehold.co/600x350?text=CodeLearn"
                        }
                        alt={course.title}
                        className="h-56 w-full object-cover group-hover:scale-110 transition duration-500"
                      />

                      <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">

                        Enrolled

                      </div>

                    </div>

                    {/* Content */}

                    <div className="p-6">

                      <h2 className="text-2xl font-bold line-clamp-1">

                        {course.title}

                      </h2>

                      <p className="text-gray-600 mt-3 line-clamp-3 leading-7">

                        {course.description}

                      </p>

                      <div className="flex items-center justify-between mt-6">

                        <div>

                          <p className="text-sm text-gray-500">

                            Instructor

                          </p>

                          <p className="font-semibold">

                            {course.instructor?.name}

                          </p>

                        </div>

                        <div className="bg-blue-50 px-4 py-2 rounded-xl">

                          <span className="font-bold text-blue-600">

                            FREE

                          </span>

                        </div>

                      </div>

                      {/* Fake Progress */}

                      <div className="mt-6">

                        <div className="flex justify-between text-sm mb-2">

                          <span>Progress</span>

                          <span>60%</span>

                        </div>

                        <div className="w-full h-2 rounded-full bg-gray-200">

                          <div className="h-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 w-3/5"></div>

                        </div>

                      </div>

                      <Link
                        to={`/learn/${course._id}`}
                        className="mt-7 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-xl font-semibold transition"
                      >

                        <PlayCircle size={20} />

                        Continue Learning

                      </Link>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>

      </div>

    </MainLayout>

  );

};

export default MyLearning;