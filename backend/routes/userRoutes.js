import express from "express";

import {
  loginUser,
  registerUser,
  updateUser,
  deleteUser,
  updatePassword,
  getProfile,
  getAllUsers, // ✅ Make sure these are defined in userController.js
  getSingleUserById,
} from "../controllers/userController.js";

import { authenticateUser } from "../middleware/authenticateUser.js"; 
import { authorizeRoles }  from "../middleware/authorizeRoles.js"; 
 

const router = express.Router();

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Authenticated user profile
router.get("/profile", authenticateUser, getProfile);

// Routes for user to update or delete their account
router
  .route("/:userId")
  .put(authenticateUser, updateUser)
  .patch(authenticateUser, updatePassword)
  .delete(authenticateUser, deleteUser);

// Admin-only: Get all users
router.get("/", authenticateUser, authorizeRoles("Admin"), getAllUsers);

// Admin or Teacher: Get specific user
router.get(
  "/user/:id",
  authenticateUser,
  authorizeRoles("Admin", "Teacher"),
  getSingleUserById
);

export default router;
