import mongoose from "mongoose";

const userQuizSchema = new mongoose.Schema({
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  answers: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz.questions",
        required: true,
      },
      answer: { type: String, required: true },
      correct: { type: Boolean, required: true }, // true if correct
    },
  ],
  score: { type: Number, required: true },
  submittedAt: { type: Date, default: Date.now },
});

export const UserQuizModel = mongoose.model("userQuiz", userQuizSchema);
