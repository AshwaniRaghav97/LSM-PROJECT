import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import {
  getMyCourses,
  deleteCourse,
} from "../services/courseService";
import toast from "react-hot-toast";

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
        error.response?.data?.message || "Delete Failed"
      );
    }
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto mt-10 px-4">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">
            My Courses
          </h1>

          <Link
            to="/create-course"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + Create Course
          </Link>
        </div>

        {courses.length === 0 ? (
          <h2 className="text-center text-gray-500 text-xl">
            No Courses Found
          </h2>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-white shadow-lg rounded-xl p-5 border"
              >

                {course.thumbnail && (
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}

                <h2 className="text-2xl font-bold">
                  {course.title}
                </h2>

                <p className="text-gray-600 mt-3">
                  {course.description}
                </p>

                <p className="mt-3 font-semibold text-lg">
                  ₹ {course.price}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  {course.category}
                </p>

                <div className="grid grid-cols-3 gap-2 mt-6">

                  <Link
                    to={`/edit-course/${course._id}`}
                    className="text-center bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(course._id)}
                    className="bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>

                  <Link
  to={`/manage-lectures/${course._id}`}
  className="text-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
>
  Manage
</Link>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </MainLayout>
  );
};

export default MyCourses;