import { UserQuizModel } from "../models/userQuizModel.js";
import { QuizModel } from "../models/quizModel.js";

// ✅ Submit a quiz
export const submitQuiz = async (req, res) => {
  try {
    const { quizId, answers } = req.body;

    if (!quizId || !answers || !answers.length) {
      return res
        .status(400)
        .json({ message: "Quiz ID and answers are required" });
    }

    // Fetch the quiz
    const quiz = await QuizModel.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    // Transform answers to match UserQuizModel schema
    const userAnswers = answers.map((ans) => {
      const question = quiz.questions.id(ans.questionId);
      return {
        questionId: ans.questionId,
        answer: ans.selectedOption,
        correct: question && question.correctAnswer === ans.selectedOption,
      };
    });

    // Calculate score
    const score = userAnswers.filter((a) => a.correct).length;

    // Save to UserQuizModel
    const userQuiz = await UserQuizModel.create({
      quiz: quizId,
      student: req.user.id,
      answers: userAnswers,
      score,
    });

    res.status(201).json({
      message: "Quiz submitted successfully",
      userQuiz,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error submitting quiz", error: error.message });
  }
};

// ✅ Get student quiz results
export const getUserQuizResults = async (req, res) => {
  try {
    const results = await UserQuizModel.find({ student: req.user.id })
      .populate("quiz", "title")
      .sort({ submittedAt: -1 });

    res.status(200).json({ results });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching results", error: error.message });
  }
};
