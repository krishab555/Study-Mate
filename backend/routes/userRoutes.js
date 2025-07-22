import express from "express";
import {
  loginUser,
  registerUser,
  updateUser,
  deleteUser,
  updatePassword,
  getProfile,
//   getAllUsers, // Optional: Admin only
//   getSingleUserById, // Optional: Admin/Teacher
} from "../controllers/userController.js";

import { authenticateUser } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Authenticated user profile route
router.post("/profile", authenticateUser, getProfile);

// Protected User Routes (for own account only)
router
  .route("/:userId")
  .put(authenticateUser, updateUser)
  .patch(authenticateUser, updatePassword)
  .delete(authenticateUser, deleteUser);

// Admin-only route to view all users
router.get("/", authenticateUser, authorizeRoles("Admin"), getAllUsers);

// Admin and Teacher can view specific user profile
router.get(
  "/user/:id",
  authenticateUser,
  authorizeRoles("Admin", "Teacher"),
  getSingleUserById
);

export default router;
