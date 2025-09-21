import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    type: {
      type: String,
      enum: [
        "course_update",
        "quiz_result",
        "project_review",
        "enrollment",
        "announcement",
      ],
      required: true,
    },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const NotificationModel = mongoose.model("Notification", notificationSchema);

