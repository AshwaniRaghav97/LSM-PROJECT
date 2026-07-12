import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";

import MainLayout from "../layouts/MainLayout";
import { getCourseById } from "../services/courseService";
import { enrollCourse } from "../services/enrollmentService";

const CourseDetails = () => {
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    try {
      const data = await getCourseById(id);

      setCourse(data.course);

      const user = JSON.parse(localStorage.getItem("user"));

      if (user && data.course.students) {
        const userId = user._id || user.id;

        setEnrolled(data.course.students.includes(userId));
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load course");
    }
  };

  const handleEnroll = async () => {
    try {
      setLoading(true);

      const response = await enrollCourse(id);

      toast.success(response.message);

      setEnrolled(true);

      fetchCourse();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Enrollment Failed"
      );
    } finally {
      setLoading(false);
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
      <div className="max-w-5xl mx-auto py-16 px-5">

        <img
          src={
            course.thumbnail ||
            "https://placehold.co/1000x450?text=Course+Thumbnail"
          }
          alt={course.title}
          className="rounded-xl mb-8 w-full"
        />

        <h1 className="text-5xl font-bold">
          {course.title}
        </h1>

        <p className="mt-6 text-gray-600 text-lg">
          {course.description}
        </p>

        <div className="mt-8 space-y-3">
          <p>
            <strong>Instructor :</strong> {course.instructor.name}
          </p>

          <p>
            <strong>Category :</strong> {course.category}
          </p>

          <p>
            <strong>Price :</strong> ₹ {course.price}
          </p>

          <p>
            <strong>Total Lectures :</strong>{" "}
            {course.lectures ? course.lectures.length : 0}
          </p>
        </div>

        {enrolled ? (
          <Link
            to={`/learn/${course._id}`}
            className="inline-block mt-10 bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700"
          >
            ▶ Start Learning
          </Link>
        ) : (
          <button
            onClick={handleEnroll}
            disabled={loading}
            className="mt-10 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
          >
            {loading ? "Enrolling..." : "Enroll Now"}
          </button>
        )}

      </div>
    </MainLayout>
  );
};

export default CourseDetails;