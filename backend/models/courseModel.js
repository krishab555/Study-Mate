import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {type:String, required:true},
  description: String,
  category: String,
  level: String,
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", 
  },
  price: Number,
  isPaid: Boolean,
  pdfUrl: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const CourseModel = mongoose.model("courses", courseSchema);

