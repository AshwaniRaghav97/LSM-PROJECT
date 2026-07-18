import Progress from "../models/Progress.js";
import Course from "../models/Course.js";
import sendEmail from "../utils/sendEmail.js";

// ==========================
// Mark Lecture Complete
// ==========================
export const markLectureComplete = async (req, res) => {
  try {
    const { courseId, lectureId } = req.params;

    const course = await Course.findById(courseId)
      .populate("lectures")
      .populate("instructor", "name");

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

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
        percentage: 0,
        completed: false,
        emailSent: false,
      });
    }

    const alreadyCompleted = progress.completedLectures.some((id) =>
      id.equals(lectureId)
    );

    if (!alreadyCompleted) {
      progress.completedLectures.push(lectureId);
    }

    progress.lastLecture = lectureId;

    const totalLectures = course.lectures.length;
    const completedLectures = progress.completedLectures.length;

    progress.percentage =
      totalLectures === 0
        ? 0
        : Math.round((completedLectures / totalLectures) * 100);

    progress.completed = progress.percentage === 100;

    await progress.save();

    // ==========================
    // Send Completion Email Once
    // ==========================
    if (progress.completed && !progress.emailSent) {
      const message = `
      <div style="font-family:Arial;padding:30px">

        <h1 style="color:#16a34a">
          🎉 Congratulations ${req.user.name}
        </h1>

        <p style="font-size:18px">
          You have successfully completed
          <strong>${course.title}</strong>.
        </p>

        <p>
          <strong>Instructor:</strong>
          ${course.instructor?.name || "CodeLearn"}
        </p>

        <p>
          <strong>Completion Date:</strong>
          ${new Date().toLocaleDateString()}
        </p>

        <hr>

        <p>
          Your certificate is now available inside your LMS account.
        </p>

        <p>
          Keep learning and keep growing 🚀
        </p>

        <br>

        <h3>
          Team CodeLearn ❤️
        </h3>

      </div>
      `;

      try {
        await sendEmail({
          email: req.user.email,
          subject: "🎉 Congratulations! Course Completed",
          message,
        });

        progress.emailSent = true;
        await progress.save();

        console.log("Completion email sent.");
      } catch (emailError) {
        console.log(
          "Email Error:",
          emailError.message
        );
      }
    }

    res.status(200).json({
      success: true,
      message: "Lecture marked as completed",
      progress,
    });
  } catch (error) {
    console.log(error);

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

    const progress = await Progress.findOne({
      user: req.user._id,
      course: courseId,
    })
      .populate("completedLectures")
      .populate("lastLecture");

    if (!progress) {
      return res.status(200).json({
        success: true,
        progress: {
          completedLectures: [],
          percentage: 0,
          completed: false,
          lastLecture: null,
          emailSent: false,
        },
      });
    }

    res.status(200).json({
      success: true,
      progress,
    });
  } catch (error) {
    console.log(error);

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
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};