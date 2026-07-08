import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">

      <img
        src={
          course.thumbnail ||
          "https://placehold.co/600x350?text=CodeLearn+LMS"
        }
        alt={course.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-5">

        <h2 className="text-xl font-bold mb-2">
          {course.title}
        </h2>

        <p className="text-gray-600 text-sm line-clamp-2">
          {course.description}
        </p>

        <div className="mt-4 flex justify-between items-center">

          <span className="font-semibold text-blue-600">
            ₹ {course.price}
          </span>

          <span className="text-sm text-gray-500">
            👨 {course.instructor?.name}
          </span>

        </div>

        <Link
          to={`/courses/${course._id}`}
          className="block mt-5 bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700"
        >
          View Details
        </Link>

      </div>

    </div>
  );
};

export default CourseCard;