import mongoose from "mongoose";
const certificateSchema = new mongoose.Schema(
{
  student: ObjectId,
  course: ObjectId,
  issuedAt: Date,
  certificateUrl: String  // Optional: PDF or image
});
export const certificateModel = mongoose.model("certificate", certificateSchema);





//   student: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   course: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Course",
//     required: true,
//   },
//   issuedAt: {
//     type: Date,
//     default: Date.now,
//   },
//   certificateUrl: {
//     type: String, // Optional: path or link to PDF/image
//   },
// });
