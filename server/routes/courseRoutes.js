import express from "express";
import upload from "../middleware/uploadVideo.js";
import {
  createCourse,
  getAllCourses,
  getCourseById,
  getMyCourses,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/", getAllCourses);

// Protected Route
router.get("/my-courses", protect, getMyCourses);

// Single Course
router.get("/:id", getCourseById);

// CRUD
router.post(
  "/",
  protect,
  upload.single("thumbnail"),
  createCourse
);
router.put("/:id", protect, updateCourse);
router.delete("/:id", protect, deleteCourse);

export default router;