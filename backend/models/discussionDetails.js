import mongoose from "mongoose";

const DiscussionDetailSchema = new mongoose.Schema(
  {
    discussionMaster: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DiscussionMaster",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    content: { type: String, required: true },
    likes: { type: Number, default: 0 },
    replies: [
      { type: mongoose.Schema.Types.ObjectId, ref: "DiscussionDetail" },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("DiscussionDetail", DiscussionDetailSchema);
