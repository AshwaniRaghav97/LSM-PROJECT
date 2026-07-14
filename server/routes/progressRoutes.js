import express from "express";
import {
  markLectureComplete,
  getProgress,
  resetProgress,
} from "../controllers/progressController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.put(
  "/:courseId/:lectureId",
  protect,
  markLectureComplete
);

router.get(
  "/:courseId",
  protect,
  getProgress
);

router.delete(
  "/:courseId",
  protect,
  resetProgress
);

export default router;