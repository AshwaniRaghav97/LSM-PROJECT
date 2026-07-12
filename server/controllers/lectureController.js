import Lecture from "../models/Lecture.js";
import Course from "../models/Course.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

// ======================
// Add Lecture
// ======================
export const addLecture = async (req, res) => {
  try {
    const { title, description } = req.body;
    const { courseId } = req.params;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Lecture title is required",
      });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    let videoUrl = "";
    let publicId = "";
    let duration = 0;

    if (req.file) {
      const uploadVideo = () =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "codelearn-lectures",
              resource_type: "video",
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          );

          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });

      const result = await uploadVideo();

      videoUrl = result.secure_url;
      publicId = result.public_id;
      duration = result.duration;
    }

    const lecture = await Lecture.create({
      title,
      description,
      videoUrl,
      publicId,
      duration,
      course: courseId,
    });

    course.lectures.push(lecture._id);
    await course.save();

    res.status(201).json({
      success: true,
      message: "Lecture added successfully",
      lecture,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================
// Get Course Lectures
// ======================
export const getCourseLectures = async (req, res) => {
  try {
    const lectures = await Lecture.find({
      course: req.params.courseId,
    }).sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      count: lectures.length,
      lectures,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// dlete lecture
export const deleteLecture = async (req, res) => {
  try {
    const lecture = await Lecture.findById(req.params.id);

    if (!lecture) {
      return res.status(404).json({
        success: false,
        message: "Lecture not found",
      });
    }

    if (lecture.publicId) {
      await cloudinary.uploader.destroy(lecture.publicId, {
        resource_type: "video",
      });
    }

    await Course.findByIdAndUpdate(lecture.course, {
      $pull: {
        lectures: lecture._id,
      },
    });

    await Lecture.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Lecture deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================
// Update Lecture
// ======================
export const updateLecture = async (req, res) => {
  try {
    const lecture = await Lecture.findById(req.params.id);

    if (!lecture) {
      return res.status(404).json({
        success: false,
        message: "Lecture not found",
      });
    }

    lecture.title = req.body.title || lecture.title;
    lecture.description =
      req.body.description || lecture.description;

    await lecture.save();

    res.status(200).json({
      success: true,
      message: "Lecture updated successfully",
      lecture,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================
// Get Course With Lectures
// ======================
export const getCourseContent = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId)
      .populate("instructor", "name email")
      .populate("lectures");

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};