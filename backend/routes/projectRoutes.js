import express from "express";
import {
  submitProjectController,
  reviewProjectController,
  getAllProjectsByInstructor,
  getUserProjects,
} from "../controllers/projectController.js";
import { authenticateUser } from "../middleware/authenticateUser.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";
import { uploadProjectPDF } from "../middleware/multerProject.js";


const projectRoutes = express.Router();

// ✅ User submits project
projectRoutes.post(
  "/:courseId",
  authenticateUser,
  authorizeRoles("Student"),
  uploadProjectPDF.single("pdf"),
  submitProjectController
);

// ✅ Instructor reviews project
projectRoutes.put(
  "/:id/review",
  authenticateUser,
  authorizeRoles("Instructor"),
  reviewProjectController
);

// ✅ Instructor sees all projects (optional)
projectRoutes.get(
  "/instructor/all",
  authenticateUser,
  authorizeRoles("Instructor"),
  getAllProjectsByInstructor
);

// ✅ User sees their submitted projects
projectRoutes.get(
  "/my-projects",
  authenticateUser,
  authorizeRoles("User"),
  getUserProjects
);

export default projectRoutes;
