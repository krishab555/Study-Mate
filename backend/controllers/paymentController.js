import { PaymentModel } from "../models/paymentModel.js";
import { EnrollmentModel } from "../models/enrollmentModel.js";

// 💳 Process Payment
export const processPayment = async (req, res) => {
  try {
    const { courseId, amount, transactionId } = req.body;

    // 1️⃣ Validate input
    if (!courseId || !amount || !transactionId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2️⃣ Check if user is already enrolled
    const alreadyEnrolled = await EnrollmentModel.findOne({
      student: req.user.id,
      course: courseId,
    });

    if (alreadyEnrolled) {
      return res
        .status(400)
        .json({ message: "You are already enrolled in this course" });
    }

    // 3️⃣ Check for duplicate transactionId
    const existingPayment = await PaymentModel.findOne({ transactionId });
    if (existingPayment) {
      return res
        .status(400)
        .json({ message: "This transaction has already been processed" });
    }

    // 4️⃣ (In production) verify payment with payment gateway API (Razorpay/eSewa/etc.)
    // If verified → continue. If not → return error.

    // 5️⃣ Save payment
    const payment = await PaymentModel.create({
      student: req.user.id,
      course: courseId,
      amount,
      status: "completed", // 👉 after gateway verification
      transactionId,
    });

    // 6️⃣ Create enrollment
    const enrollment = await EnrollmentModel.create({
      student: req.user.id,
      course: courseId,
      payment: payment._id,
    });

    return res.status(201).json({
      success: true,
      message: "Payment successful, you are enrolled in this course",
      payment,
      enrollment,
    });
  } catch (error) {
    console.error("Payment error:", error);
    return res.status(500).json({
      success: false,
      message: "Payment error",
      error: error.message,
    });
  }
};

// 🔑 Verify Payment (webhook/secret key based)
export const verifyPayment = async (req, res) => {
  try {
    const secretKey = process.env.PAYMENT_SECRET_KEY;
    const providedKey = req.headers["x-payment-key"];

    if (!providedKey || providedKey !== secretKey) {
      return res
        .status(403)
        .json({ success: false, message: "Forbidden: Invalid secret" });
    }

    const { transactionId } = req.body;
    if (!transactionId) {
      return res
        .status(400)
        .json({ success: false, message: "Transaction ID is required" });
    }

    // Optionally verify with provider API here

    const payment = await PaymentModel.findOne({ transactionId });
    if (!payment) {
      return res
        .status(404)
        .json({ success: false, message: "Payment not found" });
    }

    return res
      .status(200)
      .json({
        success: true,
        message: "Payment verified successfully",
        payment,
      });
  } catch (error) {
    console.error("Verify error:", error);
    return res.status(500).json({
      success: false,
      message: "Error verifying payment",
      error: error.message,
    });
  }
};
