import mongoose from "mongoose";

const DiscussionMasterSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courses",
      required: true,
    },
    title: { type: String, required: true },
    pinned: { type: Boolean, default: false },
  },
  { timestamps: true }
);
DiscussionMasterSchema.virtual("details", {
  ref: "DiscussionDetail", // model to populate
  localField: "_id", // field in DiscussionMaster
  foreignField: "discussionMaster", // field in DiscussionDetail
});

DiscussionMasterSchema.set("toObject", { virtuals: true });
DiscussionMasterSchema.set("toJSON", { virtuals: true });

export default mongoose.model("DiscussionMaster", DiscussionMasterSchema);
