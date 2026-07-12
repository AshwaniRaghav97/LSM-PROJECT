import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  enrollCourse,
  getMyLearning,
} from "../controllers/enrollmentController.js";

const router = express.Router();

// Enroll in Course
router.post("/:courseId", protect, enrollCourse);

// My Learning
router.get("/my-learning", protect, getMyLearning);

export default router;