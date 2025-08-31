import express from "express";
import { authenticateUser} from "../middleware/authenticateUser.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";
import {
  createQuiz,
  updateQuiz,
  deleteQuiz,
  getQuizzesByCourse,
} from "../controllers/quizController.js";

const quizRouter = express.Router();

quizRouter.post("/", authenticateUser, authorizeRoles("Instructor"), createQuiz);
quizRouter.put(
  "/:id",
  authenticateUser,
  authorizeRoles("Instructor"),
  updateQuiz
);
quizRouter.delete(
  "/:id",
  authenticateUser,
  authorizeRoles("Instructor"),
  deleteQuiz
);
quizRouter.get("/course/:courseId", authenticateUser, getQuizzesByCourse);

export default quizRouter;
