import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import MainLayout from "../layouts/MainLayout";
import { getMyLearning } from "../services/enrollmentService";

const MyLearning = () => {
  const [courses, setCourses] = useState([]);

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

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto mt-10 px-4">

        <h1 className="text-4xl font-bold mb-8">
          My Learning
        </h1>

        {courses.length === 0 ? (
          <h2 className="text-center text-gray-500">
            No Enrolled Courses
          </h2>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-xl shadow-lg p-5 border"
              >

                <img
                  src={
                    course.thumbnail ||
                    "https://placehold.co/600x300?text=Course"
                  }
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-lg"
                />

                <h2 className="text-2xl font-bold mt-4">
                  {course.title}
                </h2>

                <p className="text-gray-600 mt-2">
                  {course.description}
                </p>

                <p className="mt-3 font-semibold">
                  Instructor: {course.instructor.name}
                </p>

                <Link
                  to={`/learn/${course._id}`}
                  className="block mt-5 bg-blue-600 text-white text-center py-2 rounded-lg"
                >
                  Continue Learning
                </Link>

              </div>
            ))}

          </div>
        )}

      </div>
    </MainLayout>
  );
};

export default MyLearning;