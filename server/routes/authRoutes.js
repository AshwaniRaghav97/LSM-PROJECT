import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);

router.get("/profile", protect, getProfile);
router.post("/logout", logoutUser);

export default router;