import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courses",
      required: true,
    },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    transactionId: {
      type: String,
      unique: true, // prevent duplicate transactions
      sparse: true, // allows null values
    },
  },
  { timestamps: true } // adds createdAt + updatedAt automatically
);

// Index for faster queries
paymentSchema.index({ student: 1, course: 1 });

export const PaymentModel = mongoose.model("Payment", paymentSchema);
