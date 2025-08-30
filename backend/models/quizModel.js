import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  title: { type: String, required: true },
  questions: [
    {
      questionText: String,
      options: [String],
      correctAnswer: String,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export const QuizModel = mongoose.model("Quiz", quizSchema);
