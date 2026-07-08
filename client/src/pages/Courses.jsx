import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getCourses } from "../services/courseService";

const Courses = () => {

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data.courses);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout>

      <div className="max-w-6xl mx-auto py-12">

        <h1 className="text-4xl font-bold mb-8">
          All Courses
        </h1>

        <div className="grid grid-cols-3 gap-6">

          {courses.map((course) => (

            <div
              key={course._id}
              className="border rounded-xl p-5 shadow hover:shadow-lg"
            >
              <h2 className="text-2xl font-bold">
                {course.title}
              </h2>

              <p className="mt-3">
                {course.description}
              </p>

              <p className="mt-4 font-semibold text-blue-600">
                ₹ {course.price}
              </p>

            </div>

          ))}

        </div>

      </div>

    </MainLayout>
  );
};

export default Courses;