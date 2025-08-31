import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  enrolledAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
});

export const EnrollmentModel = mongoose.model("Enrollment", enrollmentSchema);
