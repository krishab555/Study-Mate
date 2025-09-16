// import mongoose from "mongoose";

// const paymentSchema = new mongoose.Schema({
//   student: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   course: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Course",
//     required: true,
//   },
//   amount: { type: Number, required: true },
//   status: {
//     type: String,
//     enum: ["pending", "completed", "failed"],
//     default: "pending",
//   },
//   transactionId: { type: String , unique: true },
  
//   createdAt: { type: Date, default: Date.now },
// });

// export const PaymentModel = mongoose.model("Payment", paymentSchema);
import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
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
