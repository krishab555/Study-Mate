
import express from "express";
import multer from "multer";
import {
  getCoursesController,
  createCourseController,
  updateCourseController,
  deleteCourseController,
  getCourseByIdController,
} from "../controllers/courseController.js";
import { authenticateUser } from "../middleware/authenticateUser.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";
import { upload } from "../middleware/multipleStorage.js";
import { uploadPDF } from "../middleware/multerMiddleware.js"; // Your multer config for PDFs
import { uploadImage } from "../middleware/multerImage.js"; // Your multer config for images


// const courseUploads = upload.fields([
const courseUploads = upload.fields([
  { name: "pdf", maxCount: 1 },
  { name: "image", maxCount: 1 },
  { name: "video", maxCount: 1 },
]);

const courseRoutes = express.Router();

courseRoutes.get("/", authenticateUser, getCoursesController);

courseRoutes.post(
  "/",
  authenticateUser,
  authorizeRoles("Admin"),
  courseUploads, // ✅ multer runs first to parse FormData
  createCourseController // ✅ now req.body and req.files exist
);

courseRoutes.put(
  "/:id",
  authenticateUser,
  authorizeRoles("Instructor", "Admin"),
  
  updateCourseController
);

courseRoutes.delete(
  "/:id",
  authenticateUser,
  authorizeRoles("Instructor", "Admin"),
  deleteCourseController

);


courseRoutes.get("/:id", authenticateUser, getCourseByIdController);

export default courseRoutes;
