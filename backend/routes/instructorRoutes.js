import { Router } from "express";
import { authenticateUser } from "../middleware/authenticateUser.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";
// import { getInstructorStats } from "../controllers/instructorController.js";

const instructorRoutes = Router();

instructorRoutes.get(
  "/stats",
  authenticateUser,
  authorizeRoles("Instructor"),
  // getInstructorStats
  () => {}
);

export default instructorRoutes;
