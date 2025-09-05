import express from "express";
import {
  getCoursesController,
  createCourseController,
  updateCourseController,
  deleteCourseController,
  getCourseByIdController,
} from "../controllers/courseController.js";
import { authenticateUser } from "../middleware/authenticateUser.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";
import { uploadPDF } from "../middleware/multerMiddleware.js";
import { uploadImage } from "../middleware/multerImage.js";

const courseRoutes = express.Router();

courseRoutes.get("/", authenticateUser, getCoursesController); // GET all courses
courseRoutes.post(
  "/",
  authenticateUser,
  authorizeRoles("Instructor"),
  uploadPDF.single("pdf"),
  uploadImage.single("image"),
  createCourseController
); // CREATE a course
courseRoutes.put(
  "/:id",
  authenticateUser,
  authorizeRoles("Instructor", "Admin"),
  updateCourseController
); // UPDATE course by ID
courseRoutes.delete(
  "/:id",
  authenticateUser,
  authorizeRoles("Instructor", "Admin"),
  deleteCourseController
); // DELETE course by ID


courseRoutes.get("/:id", authenticateUser, getCourseByIdController);

export default courseRoutes;
