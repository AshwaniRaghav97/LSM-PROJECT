import { useEffect, useState } from "react";
import {
  Search,
  BookOpen,
  Users,
  Star,
  Filter,
} from "lucide-react";

import MainLayout from "../layouts/MainLayout";
import CourseCard from "../components/CourseCard";
import { getCourses } from "../services/courseService";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("latest");
  const [maxPrice, setMaxPrice] = useState(100000);

  useEffect(() => {
    fetchCourses();
  }, [search, category, sort, maxPrice]);

  const fetchCourses = async () => {
    try {
      setLoading(true);

      const data = await getCourses({
        search,
        category,
        sort,
        maxPrice,
      });

      setCourses(data.courses || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>

      {/* ================= HERO ================= */}

      <section className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white py-16">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center">

            <h1 className="text-5xl font-extrabold mb-5">

              Explore Our Courses

            </h1>

            <p className="text-lg text-blue-100 max-w-2xl mx-auto">

              Learn from industry experts and build
              real-world skills to accelerate your career.

            </p>

          </div>

          {/* Stats */}

          <div className="grid md:grid-cols-3 gap-6 mt-14">

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center">

              <BookOpen
                size={36}
                className="mx-auto mb-3"
              />

              <h2 className="text-3xl font-bold">

                {courses.length}

              </h2>

              <p className="text-blue-100">

                Courses

              </p>

            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center">

              <Users
                size={36}
                className="mx-auto mb-3"
              />

              <h2 className="text-3xl font-bold">

                10K+

              </h2>

              <p className="text-blue-100">

                Students

              </p>

            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center">

              <Star
                size={36}
                className="mx-auto mb-3 text-yellow-300"
                fill="currentColor"
              />

              <h2 className="text-3xl font-bold">

                4.9

              </h2>

              <p className="text-blue-100">

                Average Rating

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ================= FILTERS ================= */}

      <div className="max-w-7xl mx-auto px-6 mt-12">

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">

          <div className="flex items-center gap-3 mb-8">

            <Filter
              className="text-blue-600"
              size={28}
            />

            <h2 className="text-2xl font-bold">

              Search & Filters

            </h2>

          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

            {/* Search */}

            <div className="relative">

              <Search
                size={18}
                className="absolute left-4 top-4 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search Courses..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full border rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

            </div>

            {/* Category */}

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            >

              <option value="">
                All Categories
              </option>

              <option value="Web Development">
                Web Development
              </option>

              <option value="Java">
                Java
              </option>

              <option value="Python">
                Python
              </option>

              <option value="DSA">
                DSA
              </option>

              <option value="Full Stack Development">
                Full Stack Development
              </option>

            </select>

            {/* Sort */}

            <select
              value={sort}
              onChange={(e) =>
                setSort(e.target.value)
              }
              className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            >

              <option value="latest">
                Latest
              </option>

              <option value="oldest">
                Oldest
              </option>

              <option value="priceLow">
                Price Low → High
              </option>

              <option value="priceHigh">
                Price High → Low
              </option>

            </select>

            {/* Price */}

            <div>

              <label className="font-semibold">

                Max Price :
                <span className="text-blue-600 ml-2">

                  ₹{maxPrice}

                </span>

              </label>

              <input
                type="range"
                min="0"
                max="100000"
                step="500"
                value={maxPrice}
                onChange={(e) =>
                  setMaxPrice(Number(e.target.value))
                }
                className="w-full mt-3 accent-blue-600"
              />

            </div>

          </div>

        </div>

      </div>
            {/* ================= COURSES ================= */}

      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="flex items-center justify-between mb-8">

          <h2 className="text-3xl font-bold text-gray-800">
            Available Courses
          </h2>

          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
            {courses.length} Courses
          </span>

        </div>

        {/* Loading */}

        {loading ? (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {[...Array(6)].map((_, index) => (

              <div
                key={index}
                className="animate-pulse bg-white rounded-2xl shadow-md overflow-hidden"
              >

                <div className="h-56 bg-gray-300"></div>

                <div className="p-5 space-y-4">

                  <div className="h-6 bg-gray-300 rounded"></div>

                  <div className="h-4 bg-gray-200 rounded"></div>

                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>

                  <div className="flex justify-between mt-5">

                    <div className="h-5 w-24 bg-gray-300 rounded"></div>

                    <div className="h-5 w-20 bg-gray-300 rounded"></div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        ) : courses.length > 0 ? (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {courses.map((course) => (

              <CourseCard
                key={course._id}
                course={course}
              />

            ))}

          </div>

        ) : (

          <div className="bg-white rounded-3xl shadow-lg py-20 text-center">

            <div className="text-7xl mb-6">
              📚
            </div>

            <h2 className="text-3xl font-bold text-gray-700">

              No Courses Found

            </h2>

            <p className="mt-4 text-gray-500">

              Try changing your search or filters.

            </p>

          </div>

        )}

        {/* Pagination UI */}

        {courses.length > 0 && (

          <div className="flex justify-center mt-14">

            <div className="flex gap-3">

              <button
                className="px-5 py-2 rounded-xl border hover:bg-blue-600 hover:text-white transition"
              >
                Previous
              </button>

              <button
                className="px-5 py-2 rounded-xl bg-blue-600 text-white"
              >
                1
              </button>

              <button
                className="px-5 py-2 rounded-xl border hover:bg-blue-600 hover:text-white transition"
              >
                Next
              </button>

            </div>

          </div>

        )}

      </div>

    </MainLayout>
  );
};

export default Courses;