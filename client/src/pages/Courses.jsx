import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getCourses } from "../services/courseService";
import CourseCard from "../components/CourseCard";

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

  {courses.map((course) => (
    <CourseCard
      key={course._id}
      course={course}
    />
  ))}

</div>

      </div>

    </MainLayout>
  );
};

export default Courses;