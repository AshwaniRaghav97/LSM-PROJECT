import express from "express";
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/", getAllCourses);
router.get("/:id", getCourseById);

// Protected Routes
router.post("/", protect, authorize("instructor", "admin"), createCourse);

router.put("/:id", protect, authorize("instructor", "admin"), updateCourse);

router.delete("/:id", protect, authorize("instructor", "admin"), deleteCourse);

export default router;