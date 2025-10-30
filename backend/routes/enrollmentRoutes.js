import express from "express";
import { authenticateUser } from "../middleware/authenticateUser.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";
import {
  // enrollCourse,
  getMyEnrollments,
  getCourseStudents,
} from "../controllers/enrollmentController.js";

const enrollmentRoutes = express.Router();

// ✅ Student enrolls in course
enrollmentRoutes.post(
  "/",
  authenticateUser,
  authorizeRoles("Student")
  // enrollCourse
);

// ✅ Student gets their enrollments
enrollmentRoutes.get(
  "/my-courses/:id",
  authenticateUser,
  authorizeRoles("Student"),
  getMyEnrollments
);

// ✅ Instructor/Admin gets students in a course
enrollmentRoutes.get(
  "/course/:courseId/students",
  authenticateUser,
  authorizeRoles("Instructor", "Admin"),
  getCourseStudents
);

export default enrollmentRoutes;
