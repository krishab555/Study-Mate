
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: String,
    level: String,
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },

    isPaid: { type: Boolean, default: false },
    pdfUrl: { type: String, default: null },
    banner: { type: String, default: null },
    syllabus: [
      {
        level: { type: String },
        content: { type: String },
      },
    ],
    createdAt: { type: Date, default: Date.now },
    videos: [
      {
        title: { type: String },
        url: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export const CourseModel = mongoose.model("courses", courseSchema);
