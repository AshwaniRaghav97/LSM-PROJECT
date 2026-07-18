import express from "express";
import upload from "../middleware/uploadVideo.js";

import {
  addLecture,
  getCourseLectures,
  getCourseContent,
  updateLecture,
  deleteLecture,
} from "../controllers/lectureController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Add Lecture + Video Upload
router.post(
  "/:courseId",
  protect,
  upload.single("video"),
  addLecture
);

// Get All Lectures of a Course
router.get(
  "/:courseId",
  protect,
  getCourseLectures
);

router.post(
  "/:courseId",
  protect,
  upload.single("video"),
  addLecture
);

router.get("/:courseId", protect, getCourseLectures);
router.get("/course/:courseId", protect, getCourseContent);

router.put("/:id", protect, updateLecture);

router.delete("/:id", protect, deleteLecture);
export default router;