import Review from "../models/Review.js";
import Course from "../models/Course.js";

// Add Review
export const addReview = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { rating, comment } = req.body;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const isEnrolled = course.students.some(
      (studentId) =>
        studentId.toString() === req.user._id.toString()
    );

    if (!isEnrolled) {
      return res.status(403).json({
        success: false,
        message: "Enroll in this course before reviewing",
      });
    }

    const existingReview = await Review.findOne({
      course: courseId,
      user: req.user._id,
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this course",
      });
    }

    const review = await Review.create({
      course: courseId,
      user: req.user._id,
      rating,
      comment,
    });

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      review,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Reviews
export const getCourseReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      course: req.params.courseId,
    })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    const totalReviews = reviews.length;

    const averageRating =
      totalReviews > 0
        ? Number(
            (
              reviews.reduce(
                (sum, review) => sum + review.rating,
                0
              ) / totalReviews
            ).toFixed(1)
          )
        : 0;

    res.status(200).json({
      success: true,
      averageRating,
      totalReviews,
      reviews,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};