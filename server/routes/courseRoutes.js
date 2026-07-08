import express from "express";
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/", getAllCourses);
router.get("/:id", getCourseById);

// Protected Routes
router.post("/", protect, createCourse);

router.put("/:id", protect, updateCourse);

router.delete("/:id", protect, deleteCourse);

export default router;