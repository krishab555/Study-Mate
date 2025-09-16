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
quizRouter.get("/courses", authenticateUser, async (req, res) => {
  try {
    const quizzes = await QuizModel.find().populate("course", "title");
    const coursesWithQuizzes = [
      ...new Map(
        quizzes
          .filter((q) => q.course) // <-- add this line
          .map((q) => [q.course._id, q.course])
      ).values(),
    ];
    res.status(200).json({ success: true, data: coursesWithQuizzes });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


export default quizRouter;
