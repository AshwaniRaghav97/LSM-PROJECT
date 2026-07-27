import { Link } from "react-router-dom";
import {
  User,
  Users,
  Star,
  ArrowRight,
  BookOpen,
} from "lucide-react";

const CourseCard = ({ course }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">

      {/* Thumbnail */}

      <div className="relative overflow-hidden">

        <img
          src={
            course.thumbnail ||
            "https://placehold.co/600x350?text=CodeLearn+LMS"
          }
          alt={course.title}
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Category */}

        <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">

          {course.category || "Programming"}

        </span>

        {/* Price */}

        <span className="absolute bottom-4 right-4 bg-white text-blue-600 font-bold px-3 py-1 rounded-lg shadow-lg">

          ₹ {course.price}

        </span>

      </div>

      {/* Content */}

      <div className="p-6">

        <h2 className="text-xl font-bold text-gray-800 line-clamp-2 mb-3 group-hover:text-blue-600 transition">

          {course.title}

        </h2>

        <p className="text-gray-600 text-sm line-clamp-3 leading-6 mb-5">

          {course.description}

        </p>

        {/* Instructor */}

        <div className="flex items-center justify-between mb-5">

          <div className="flex items-center gap-2">

            <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center">

              <User
                size={18}
                className="text-blue-600"
              />

            </div>

            <div>

              <p className="text-xs text-gray-500">
                Instructor
              </p>

              <p className="font-semibold text-sm">

                {course.instructor?.name || "CodeLearn"}

              </p>

            </div>

          </div>

          <div className="flex items-center gap-1 text-yellow-500">

            <Star
              size={16}
              fill="currentColor"
            />

            <span className="text-sm font-semibold">

              4.8

            </span>

          </div>

        </div>

        {/* Bottom Info */}

        <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-4">

          <div className="flex items-center gap-2">

            <Users size={17} />

            <span>

              {course.students?.length || 0} Students

            </span>

          </div>

          <div className="flex items-center gap-2">

            <BookOpen size={17} />

            <span>Course</span>

          </div>

        </div>

        {/* Button */}

        <Link
          to={`/courses/${course._id}`}
          className="mt-6 flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
        >

          View Details

          <ArrowRight size={18} />

        </Link>

      </div>

    </div>
  );
};

export default CourseCard;