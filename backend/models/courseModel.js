
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
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
  createdAt: { type: Date, default: Date.now },
  video: { type: String, default: null },

});

export const CourseModel = mongoose.model("courses", courseSchema);
