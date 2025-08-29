import mongoose from "mongoose";

const FAQMasterSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["System", "Course"], // Only two types allowed
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: function () {
        return this.type === "Course"; // Course required only if it's Course FAQ
      },
    },
  },
  { timestamps: true }
);

export const FAQMaster = mongoose.model("FAQMaster", FAQMasterSchema);
