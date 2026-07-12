import express from "express";
import {
  addReview,
  getCourseReviews,
} from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:courseId", protect, addReview);
router.get("/:courseId", getCourseReviews);

export default router;