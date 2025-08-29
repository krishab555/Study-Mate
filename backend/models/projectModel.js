import mongoose from "mongoose";
const projectSchema = new mongoose.Schema(
{
  course: ObjectId,       // Course ref
  student: ObjectId,      // User ref
  projectFile: String,    // URL to PDF or upload path
  status: "Pending" | "Approved" | "Rejected",
  feedback: String,
  submittedAt: Date
});
export const projectModel = mongoose.model("projectSubmitted", projectSchema);


//   course: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Course",
//     required: true,
//   },
//   student: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   projectFile: {
//     type: String, // Could be a URL to file or uploaded filename
//     required: true,
//   },
//   status: {
//     type: String,
//     enum: ["Pending", "Approved", "Rejected"],
//     default: "Pending",
//   },
//   feedback: {
//     type: String,
//     default: "",
//   },
//   submittedAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

