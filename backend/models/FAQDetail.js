import mongoose from "mongoose";

const FAQDetailSchema = new mongoose.Schema(
  {
    faqMaster: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FAQMaster",
      required: true,
    },
    question: { type: String, required: true },
    answer: { type: String, required: true },
  },
  { timestamps: true }
);

export const FAQDetail = mongoose.model("FAQDetail", FAQDetailSchema);
