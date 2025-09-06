import mongoose from "mongoose";

const DiscussionMasterSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courses",
      required: true,
    },
    title: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("DiscussionMaster", DiscussionMasterSchema);
