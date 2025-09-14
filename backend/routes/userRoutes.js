 import express from "express";
 import { uploadImage } from "../middleware/multerImage.js";
 import { uploadProfileImage } from "../controllers/userController.js";
 

import {
  loginUser,
  registerUser,
  updateUser,
  deleteUser,
  updatePassword,
  getProfile,
  getAllUsers,
  getSingleUserById,
} from "../controllers/userController.js";

import { authenticateUser } from "../middleware/authenticateUser.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";

const router = express.Router();


router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", authenticateUser, getProfile);

router.post(
  "/upload-profile",
  authenticateUser,
  uploadImage.single("image"),
  uploadProfileImage
);

router
  .route("/:userId")
  .put(authenticateUser, updateUser)
  .patch(authenticateUser, updatePassword)
  .delete(authenticateUser, deleteUser);


router.get("/", authenticateUser, authorizeRoles("Admin"), getAllUsers);


router.get(
  "/user/:id",
  authenticateUser,
  authorizeRoles("Admin", "Teacher"),
  getSingleUserById
);

export default router;
