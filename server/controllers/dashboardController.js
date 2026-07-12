import Course from "../models/Course.js";
import Payment from "../models/Payment.js";
import Lecture from "../models/Lecture.js";

export const getInstructorDashboard = async (req, res) => {
  try {
    const instructorId = req.user._id;

    const courses = await Course.find({
      instructor: instructorId,
    });

    const courseIds = courses.map((course) => course._id);

    const totalCourses = courses.length;

    let totalStudents = 0;

    courses.forEach((course) => {
      totalStudents += course.students.length;
    });

    const totalLectures = await Lecture.countDocuments({
      course: { $in: courseIds },
    });

    const payments = await Payment.find({
      course: { $in: courseIds },
      status: "paid",
    })
      .populate("course", "title")
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    const totalRevenue = payments.reduce(
      (sum, payment) => sum + payment.amount,
      0
    );

    res.status(200).json({
      success: true,
      dashboard: {
        totalCourses,
        totalStudents,
        totalLectures,
        totalRevenue,
        recentPayments: payments,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};