import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
  markLectureComplete,
  getProgress,
  resetProgress,
} from "../controllers/progressController.js";

const router = express.Router();

router.get("/:courseId", protect, getProgress);

router.post(
  "/:courseId/:lectureId",
  protect,
  markLectureComplete
);

router.delete("/:courseId", protect, resetProgress);

export default router;