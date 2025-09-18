import express from "express";
import { authenticateUser} from "../middleware/authenticateUser.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";
import { QuizModel } from "../models/quizModel.js";
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


quizRouter.get("/courses", authenticateUser, async (req, res) => {
  try {
    const quizzes = await QuizModel.find().populate("course", "title");
    // Collect unique courses that have quizzes
    const courseMap = new Map();
    quizzes.forEach((quiz) => {
      if (quiz.course && !courseMap.has(quiz.course._id.toString())) {
        courseMap.set(quiz.course._id.toString(), {
          _id: quiz.course._id,
          title: quiz.course.title,
        });
      }
    });

    const coursesWithQuizzes = Array.from(courseMap.values());

    res.status(200).json({ success: true, data: coursesWithQuizzes });
  } catch (err) {
    console.error("Error in /api/quiz/courses:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

quizRouter.get("/:id", authenticateUser, async (req, res) => {
  try {
    console.log("Fetching quiz with ID:", req.params.id);
    const quiz = await QuizModel.findById(req.params.id);

    if (!quiz) {
      console.log("Quiz not found:", req.params.id);
      return res
        .status(404)
        .json({ success: false, message: "Quiz not found" });
    }

    console.log("Quiz found:", quiz.title);
    res.status(200).json({ success: true, quiz });
  } catch (err) {
    console.error("Error in GET /api/quiz/:id:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

quizRouter.get("/course/:courseId", authenticateUser, getQuizzesByCourse);



export default quizRouter;
