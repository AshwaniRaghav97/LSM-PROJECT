import Course from "../models/Course.js";
import Payment from "../models/Payment.js";
import Lecture from "../models/Lecture.js";
import Review from "../models/Review.js";

export const getInstructorDashboard = async (req, res) => {
  try {
    const instructorId = req.user._id;

    const courses = await Course.find({
      instructor: instructorId,
    });

    const courseIds = courses.map(
      (course) => course._id
    );

    // Basic Stats

    const totalCourses = courses.length;

    const publishedCourses = courses.filter(
      (course) => course.isPublished
    ).length;

    const unpublishedCourses =
      totalCourses - publishedCourses;


    let totalStudents = 0;

    courses.forEach((course) => {
      totalStudents += course.students.length;
    });


    const totalLectures =
      await Lecture.countDocuments({
        course: {
          $in: courseIds,
        },
      });


    // Payments

    const payments = await Payment.find({
      course: {
        $in: courseIds,
      },
      status: "paid",
    })
      .populate("course", "title")
      .populate("user", "name email")
      .sort({
        createdAt: -1,
      });


    const totalRevenue = payments.reduce(
      (sum, payment) =>
        sum + payment.amount,
      0
    );


    // Reviews

    const reviews = await Review.find({
      course: {
        $in: courseIds,
      },
    });


    const totalReviews = reviews.length;


    const averageRating =
      totalReviews > 0
        ? Number(
            (
              reviews.reduce(
                (sum, review) =>
                  sum + review.rating,
                0
              ) / totalReviews
            ).toFixed(1)
          )
        : 0;



    // Top Selling Courses

    const topCourses = courses
      .map((course) => ({
        title: course.title,
        students:
          course.students.length,
        revenue:
          payments
            .filter(
              (payment) =>
                payment.course._id.toString() ===
                course._id.toString()
            )
            .reduce(
              (sum, payment) =>
                sum + payment.amount,
              0
            ),
      }))
      .sort(
        (a, b) =>
          b.students - a.students
      )
      .slice(0, 5);



    res.status(200).json({
      success: true,

      dashboard: {
        totalCourses,

        publishedCourses,

        unpublishedCourses,

        totalStudents,

        totalLectures,

        totalRevenue,

        totalReviews,

        averageRating,

        topCourses,

        recentPayments: payments.slice(
          0,
          5
        ),
      },
    });


  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message:
        error.message,
    });

  }
};