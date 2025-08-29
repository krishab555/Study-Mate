// backend/models/FAQMaster.js
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
        return this.type === "Course"; // Required only for Course FAQs
      },
    },
  },
  { timestamps: true }
);

const FAQMaster = mongoose.model("FAQMaster", FAQMasterSchema);
export default FAQMaster;
