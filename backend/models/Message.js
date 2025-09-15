import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    recipient: { type: String, default: "admin" },
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
