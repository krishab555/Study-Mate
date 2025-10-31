import mongoose from "mongoose";
const certificateSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // References the User collection
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "courses", // References the Course collection
    required: true,
  },
  issuedAt: {
    type: Date,
    default: Date.now,
  },
  certificateUrl: String,
  status: {
    type: String,
    enum: ["PendingAdminApproval", "Issued", "Rejected"],
    default: "PendingAdminApproval",
  },
  adminFeedback: { type: String }, 
});
export const certificateModel = mongoose.model("Certificate", certificateSchema);


