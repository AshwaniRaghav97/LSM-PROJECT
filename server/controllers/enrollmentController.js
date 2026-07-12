import User from "../models/User.js";
import Course from "../models/Course.js";

// ======================
// Enroll Course
// ======================
export const enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user._id;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const user = await User.findById(userId);

    if (user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({
        success: false,
        message: "Already enrolled",
      });
    }

    user.enrolledCourses.push(courseId);
    course.students.push(userId);

    await user.save();
    await course.save();

    res.status(200).json({
      success: true,
      message: "Course enrolled successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================
// My Learning
// ======================
export const getMyLearning = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: "enrolledCourses",
      populate: {
        path: "instructor",
        select: "name email",
      },
    });

    res.status(200).json({
      success: true,
      courses: user.enrolledCourses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};