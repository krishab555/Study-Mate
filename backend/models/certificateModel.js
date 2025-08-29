import mongoose from "mongoose";
const certificateSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // References the User collection
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course", // References the Course collection
    required: true,
  },
  issuedAt: {
    type: Date,
    default: Date.now,
  },
  certificateUrl: String, // Optional: PDF or image
});
export const certificateModel = mongoose.model("certificate", certificateSchema);


