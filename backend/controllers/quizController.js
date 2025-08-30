import { QuizModel } from "../models/quizModel.js";

// ✅ Create a quiz
export const createQuiz = async (req, res) => {
  try {
    const { courseId, title, questions } = req.body;

    if (!courseId || !title || !questions || !questions.length) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const quiz = await QuizModel.create({
      course: courseId,
      title,
      questions,
    });

    res.status(201).json({ message: "Quiz created successfully", quiz });
  } catch (error) {
    res.status(500).json({ message: "Error creating quiz", error: error.message });
  }
};

// ✅ Update a quiz
export const updateQuiz = async (req, res) => {
  try {
    const quiz = await QuizModel.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    const { title, questions } = req.body;
    if (title) quiz.title = title;
    if (questions) quiz.questions = questions;

    await quiz.save();
    res.status(200).json({ message: "Quiz updated successfully", quiz });
  } catch (error) {
    res.status(500).json({ message: "Error updating quiz", error: error.message });
  }
};

// ✅ Delete a quiz
export const deleteQuiz = async (req, res) => {
  try {
    const quiz = await QuizModel.findByIdAndDelete(req.params.id);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting quiz", error: error.message });
  }
};

// ✅ Get quizzes for a course
export const getQuizzesByCourse = async (req, res) => {
  try {
    const quizzes = await QuizModel.find({ course: req.params.courseId });
    res.status(200).json({ quizzes });
  } catch (error) {
    res.status(500).json({ message: "Error fetching quizzes", error: error.message });
  }
};