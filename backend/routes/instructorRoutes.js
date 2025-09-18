import { Router } from "express";
import { authenticateUser } from "../middleware/authenticateUser.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";
import { getInstructorStats, getInstructorCourses } from "../controllers/instructorController.js";

const instructorRoutes = Router();

instructorRoutes.get(
  "/stats",
  authenticateUser,
  authorizeRoles("Instructor"),
  getInstructorStats
  
);
instructorRoutes.get(
  "/courses",
  authenticateUser,
  authorizeRoles("Instructor"),
  getInstructorCourses
);

export default instructorRoutes;
