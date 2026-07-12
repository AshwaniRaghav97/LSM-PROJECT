import Progress from "../models/Progress.js";
import Course from "../models/Course.js";

// ==========================
// Mark Lecture Complete
// ==========================
export const markLectureComplete = async (req, res) => {
  try {
    const { courseId, lectureId } = req.params;

    let progress = await Progress.findOne({
      user: req.user._id,
      course: courseId,
    });

    if (!progress) {
      progress = await Progress.create({
        user: req.user._id,
        course: courseId,
        completedLectures: [],
        lastLecture: lectureId,
      });
    }

    if (!progress.completedLectures.includes(lectureId)) {
      progress.completedLectures.push(lectureId);
    }

    // Save last watched lecture
    progress.lastLecture = lectureId;

    const course = await Course.findById(courseId).populate("lectures");

    const totalLectures = course.lectures.length;
    const completedLectures = progress.completedLectures.length;

    progress.percentage =
      totalLectures === 0
        ? 0
        : Math.floor((completedLectures / totalLectures) * 100);

    progress.completed = progress.percentage === 100;

    await progress.save();

    res.status(200).json({
      success: true,
      message: "Lecture marked as completed",
      progress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Get Progress
// ==========================
export const getProgress = async (req, res) => {
  try {
    const { courseId } = req.params;

    let progress = await Progress.findOne({
      user: req.user._id,
      course: courseId,
    }).populate("lastLecture");

    if (!progress) {
      progress = {
        completedLectures: [],
        percentage: 0,
        completed: false,
        lastLecture: null,
      };
    }

    res.status(200).json({
      success: true,
      progress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Reset Progress
// ==========================
export const resetProgress = async (req, res) => {
  try {
    const { courseId } = req.params;

    await Progress.findOneAndDelete({
      user: req.user._id,
      course: courseId,
    });

    res.status(200).json({
      success: true,
      message: "Progress reset successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};