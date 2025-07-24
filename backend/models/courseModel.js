import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  level: String, // e.g., Beginner, Intermediate, Advanced
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Instructor", // or "instructors" depending on your collection name
  },
  price: Number,
  isPaid: Boolean,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const CourseModel = mongoose.model("courses", courseSchema);

