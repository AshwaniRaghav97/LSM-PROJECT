import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { getCourseById } from "../services/courseService";

const CourseDetails = () => {

  const { id } = useParams();

  const [course, setCourse] = useState(null);

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    try {
      const data = await getCourseById(id);
      setCourse(data.course);
    } catch (error) {
      console.log(error);
    }
  };

  if (!course) {
    return (
      <MainLayout>
        <h1 className="text-center text-3xl mt-20">
          Loading...
        </h1>
      </MainLayout>
    );
  }

  return (
    <MainLayout>

      <div className="max-w-5xl mx-auto py-16">

        <img
          src={
            course.thumbnail ||
            "https://placehold.co/1000x450?text=Course+Thumbnail"
          }
          alt={course.title}
          className="rounded-xl mb-8"
        />

        <h1 className="text-5xl font-bold">
          {course.title}
        </h1>

        <p className="mt-6 text-gray-600 text-lg">
          {course.description}
        </p>

        <div className="mt-8 space-y-3">

          <p>
            <strong>Instructor :</strong>{" "}
            {course.instructor.name}
          </p>

          <p>
            <strong>Category :</strong>{" "}
            {course.category}
          </p>

          <p>
            <strong>Price :</strong> ₹ {course.price}
          </p>

        </div>

        <button
          className="mt-10 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
        >
          Enroll Now
        </button>

      </div>

    </MainLayout>
  );
};

export default CourseDetails;