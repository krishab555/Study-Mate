import express from "express";
import { authenticateUser } from "../middleware/authenticateUser.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";
import {
  submitQuiz,
  getUserQuizResults,
} from "../controllers/userQuizController.js";

const userQuizRouter = express.Router();

userQuizRouter.post("/", authenticateUser, authorizeRoles("Student"), submitQuiz);
userQuizRouter.get(
  "/results",
  authenticateUser,
  authorizeRoles("Student"),
  getUserQuizResults
);

export default userQuizRouter;
