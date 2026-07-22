import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
  forgotPassword,
  resetPassword,
  updateProfile,
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/forgot-password", forgotPassword);

router.put("/reset-password/:token", resetPassword);

router.get("/profile", protect, getProfile);

router.put(
  "/update-profile",
  protect,
  upload.single("avatar"),
  updateProfile
);

router.post("/logout", logoutUser);

export default router;