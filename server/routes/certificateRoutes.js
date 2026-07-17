import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
  downloadCertificate,
  verifyCertificate,
} from "../controllers/certificateController.js";

const router = express.Router();

// Download Certificate
router.get(
  "/:courseId",
  protect,
  downloadCertificate
);

// Public Certificate Verification
router.get(
  "/verify/:certificateId",
  verifyCertificate
);

export default router;