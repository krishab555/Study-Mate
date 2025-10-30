import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["course", "project", "user", "payment"],
      default: "user",
    },
  },
  { timestamps: true }
);

export const ActivityModel = mongoose.model("Activity", activitySchema);
