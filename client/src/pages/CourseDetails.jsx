import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Star,
  Users,
  BookOpen,
  Clock,
  Award,
  PlayCircle,
  User,
  BadgeCheck,
} from "lucide-react";

import MainLayout from "../layouts/MainLayout";
import { getCourseById } from "../services/courseService";
import { enrollCourse } from "../services/enrollmentService";
import {
  createOrder,
  verifyPayment,
} from "../services/paymentService";
import ReviewSection from "../components/ReviewSection";

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

        setEnrolled(
          data.course.students.includes(userId)
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load course");
    }
  };

  const handleEnroll = async () => {
    try {
      setLoading(true);

      if (course.price === 0) {
        const response = await enrollCourse(course._id);

        toast.success(response.message);

        setEnrolled(true);

        return;
      }

      const data = await createOrder(course._id);

      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "CodeLearn LMS",
        description: course.title,
        order_id: data.order.id,

        handler: async function (response) {
          try {
            await verifyPayment({
              razorpay_order_id:
                response.razorpay_order_id,
              razorpay_payment_id:
                response.razorpay_payment_id,
              razorpay_signature:
                response.razorpay_signature,
              courseId: course._id,
            });

            toast.success("Payment Successful");

            setEnrolled(true);
          } catch (error) {
            console.log(error);

            toast.error(
              "Payment Verification Failed"
            );
          }
        },

        prefill: {
          name:
            JSON.parse(
              localStorage.getItem("user")
            )?.name || "",

          email:
            JSON.parse(
              localStorage.getItem("user")
            )?.email || "",
        },

        theme: {
          color: "#2563eb",
        },
      };

      const razor = new window.Razorpay(options);

      razor.open();
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Enrollment Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!course) {
    return (
      <MainLayout>

        <div className="min-h-[60vh] flex items-center justify-center">

          <h1 className="text-3xl font-bold">
            Loading Course...
          </h1>

        </div>

      </MainLayout>
    );
  }

  return (
    <MainLayout>

      {/* ================= HERO ================= */}

      <section className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white">

        <div className="max-w-7xl mx-auto px-6 py-14">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* LEFT */}

            <div>

              <span className="inline-block bg-white/20 px-4 py-2 rounded-full text-sm font-semibold mb-5">

                {course.category}

              </span>

              <h1 className="text-5xl font-extrabold leading-tight">

                {course.title}

              </h1>

              <p className="mt-6 text-lg text-blue-100 leading-8">

                {course.description}

              </p>

              {/* Rating */}

              <div className="flex flex-wrap gap-6 mt-8">

                <div className="flex items-center gap-2">

                  <Star
                    size={20}
                    className="text-yellow-400"
                    fill="currentColor"
                  />

                  <span className="font-semibold">
                    4.9 Rating
                  </span>

                </div>

                <div className="flex items-center gap-2">

                  <Users size={20} />

                  <span>

                    {course.students?.length || 0}
                    + Students

                  </span>

                </div>

                <div className="flex items-center gap-2">

                  <BookOpen size={20} />

                  <span>

                    {course.lectures?.length || 0}
                    {" "}Lectures

                  </span>

                </div>

              </div>

              {/* Instructor */}

              <div className="flex items-center gap-4 mt-10">

                <div className="h-16 w-16 rounded-full bg-white text-blue-700 flex items-center justify-center">

                  <User size={28} />

                </div>

                <div>

                  <p className="text-blue-100">

                    Instructor

                  </p>

                  <h3 className="text-xl font-bold">

                    {course.instructor?.name}

                  </h3>

                  <p className="text-blue-200">

                    Full Stack Developer

                  </p>

                </div>

              </div>

            </div>

            {/* RIGHT */}

            <div>

              <img
                src={
                  course.thumbnail ||
                  "https://placehold.co/1000x600?text=CodeLearn+Course"
                }
                alt={course.title}
                className="rounded-3xl shadow-2xl w-full object-cover"
              />

            </div>

          </div>

        </div>

      </section>
            {/* ================= MAIN CONTENT ================= */}

      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid lg:grid-cols-3 gap-10">

          {/* LEFT CONTENT */}

          <div className="lg:col-span-2 space-y-10">

            {/* Description */}

            <div className="bg-white rounded-2xl shadow-lg p-8">

              <h2 className="text-3xl font-bold mb-6">
                About this Course
              </h2>

              <p className="text-gray-600 leading-8 text-lg">
                {course.description}
              </p>

            </div>

            {/* Instructor */}

            <div className="bg-white rounded-2xl shadow-lg p-8">

              <h2 className="text-3xl font-bold mb-8">
                Instructor
              </h2>

              <div className="flex items-center gap-6">

                <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center">

                  <User
                    size={42}
                    className="text-blue-600"
                  />

                </div>

                <div>

                  <h3 className="text-2xl font-bold">

                    {course.instructor?.name}

                  </h3>

                  <p className="text-gray-500 mt-1">

                    Full Stack Developer

                  </p>

                  <div className="flex gap-6 mt-4">

                    <div>

                      <p className="font-bold text-xl">
                        {course.students?.length || 0}
                      </p>

                      <p className="text-gray-500 text-sm">
                        Students
                      </p>

                    </div>

                    <div>

                      <p className="font-bold text-xl">
                        {course.lectures?.length || 0}
                      </p>

                      <p className="text-gray-500 text-sm">
                        Lectures
                      </p>

                    </div>

                    <div>

                      <p className="font-bold text-xl">
                        4.9
                      </p>

                      <p className="text-gray-500 text-sm">
                        Rating
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* Course Details */}

            <div className="bg-white rounded-2xl shadow-lg p-8">

              <h2 className="text-3xl font-bold mb-8">

                Course Information

              </h2>

              <div className="grid md:grid-cols-2 gap-6">

                <div className="flex items-center gap-4">

                  <BookOpen
                    className="text-blue-600"
                    size={24}
                  />

                  <div>

                    <p className="font-semibold">
                      Category
                    </p>

                    <p className="text-gray-500">
                      {course.category}
                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-4">

                  <Clock
                    className="text-blue-600"
                    size={24}
                  />

                  <div>

                    <p className="font-semibold">
                      Duration
                    </p>

                    <p className="text-gray-500">
                      Lifetime Access
                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-4">

                  <Award
                    className="text-blue-600"
                    size={24}
                  />

                  <div>

                    <p className="font-semibold">
                      Certificate
                    </p>

                    <p className="text-gray-500">
                      Included
                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-4">

                  <BadgeCheck
                    className="text-blue-600"
                    size={24}
                  />

                  <div>

                    <p className="font-semibold">
                      Level
                    </p>

                    <p className="text-gray-500">
                      Beginner to Advanced
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT SIDEBAR */}

          <div>

            <div className="sticky top-24 bg-white rounded-3xl shadow-2xl p-8 border">

              <h2 className="text-4xl font-bold text-blue-600">

                ₹ {course.price}

              </h2>

              <p className="text-gray-500 mt-2">

                One Time Payment

              </p>

              {enrolled ? (

                <Link
                  to={`/learn/${course._id}`}
                  className="mt-8 flex items-center justify-center gap-2 bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-green-700 transition"
                >

                  <PlayCircle size={22} />

                  Start Learning

                </Link>

              ) : (

                <button
                  onClick={handleEnroll}
                  disabled={loading}
                  className="mt-8 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition"
                >

                  {loading
                    ? "Processing..."
                    : "Enroll Now"}

                </button>

              )}

              <div className="mt-8 space-y-5">

                <div className="flex items-center gap-3">

                  <BookOpen
                    className="text-blue-600"
                    size={20}
                  />

                  <span>
                    {course.lectures?.length || 0}
                    {" "}Lectures
                  </span>

                </div>

                <div className="flex items-center gap-3">

                  <Clock
                    className="text-blue-600"
                    size={20}
                  />

                  <span>
                    Lifetime Access
                  </span>

                </div>

                <div className="flex items-center gap-3">

                  <Award
                    className="text-blue-600"
                    size={20}
                  />

                  <span>
                    Certificate Included
                  </span>

                </div>

                <div className="flex items-center gap-3">

                  <Users
                    className="text-blue-600"
                    size={20}
                  />

                  <span>

                    {course.students?.length || 0}
                    {" "}Students

                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>
            {/* ================= CURRICULUM ================= */}

      <section className="max-w-7xl mx-auto px-6 pb-16">

        <div className="bg-white rounded-3xl shadow-xl p-8">

          <h2 className="text-3xl font-bold mb-8">

            Course Curriculum

          </h2>

          {course.lectures && course.lectures.length > 0 ? (

            <div className="space-y-4">

              {course.lectures.map((lecture, index) => (

                <div
                  key={lecture._id}
                  className="border rounded-xl p-5 hover:bg-gray-50 transition flex justify-between items-center"
                >

                  <div className="flex items-center gap-4">

                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">

                      <PlayCircle
                        className="text-blue-600"
                        size={20}
                      />

                    </div>

                    <div>

                      <h3 className="font-semibold">

                        Lecture {index + 1}

                      </h3>

                      <p className="text-gray-500 text-sm">

                        {lecture.title}

                      </p>

                    </div>

                  </div>

                  <span className="text-sm text-gray-400">

                    Preview

                  </span>

                </div>

              ))}

            </div>

          ) : (

            <div className="text-center py-10">

              <BookOpen
                size={60}
                className="mx-auto text-blue-500 mb-4"
              />

              <h3 className="text-2xl font-semibold">

                No Lectures Available

              </h3>

              <p className="text-gray-500 mt-2">

                Lectures will be added soon.

              </p>

            </div>

          )}

        </div>

      </section>

      {/* ================= REVIEW SECTION ================= */}

      <section className="max-w-7xl mx-auto px-6 pb-16">

        <div className="bg-white rounded-3xl shadow-xl p-8">

          <div className="flex items-center justify-between mb-8">

            <h2 className="text-3xl font-bold">

              Student Reviews

            </h2>

            <div className="flex items-center gap-2">

              <Star
                className="text-yellow-500"
                fill="currentColor"
                size={22}
              />

              <span className="font-bold">

                4.9 / 5

              </span>

            </div>

          </div>

          <ReviewSection
            courseId={course._id}
          />

        </div>

      </section>

      {/* ================= RELATED ================= */}

      <section className="max-w-7xl mx-auto px-6 pb-20">

        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-12 text-white text-center">

          <h2 className="text-4xl font-bold mb-4">

            Ready to Start Learning?

          </h2>

          <p className="text-blue-100 text-lg">

            Learn practical skills, build amazing
            projects and grow your career with
            CodeLearn LMS.

          </p>

          {enrolled ? (

            <Link
              to={`/learn/${course._id}`}
              className="inline-block mt-8 bg-white text-blue-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition"
            >

              Continue Learning

            </Link>

          ) : (

            <button
              onClick={handleEnroll}
              disabled={loading}
              className="mt-8 bg-white text-blue-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition"
            >

              {loading
                ? "Processing..."
                : "Enroll Now"}

            </button>

          )}

        </div>

      </section>

    </MainLayout>
  );
};

export default CourseDetails;