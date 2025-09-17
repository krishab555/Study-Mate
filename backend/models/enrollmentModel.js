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
  payment: { type: mongoose.Schema.Types.ObjectId, ref: "Payment" },
  enrolledAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
});

enrollmentSchema.index({ student: 1, course: 1 }, { unique: true }); // prevents duplicate enrollment in same course

export const EnrollmentModel = mongoose.model("Enrollment", enrollmentSchema);
