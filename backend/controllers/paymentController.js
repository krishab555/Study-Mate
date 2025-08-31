import { PaymentModel } from "../models/paymentModel.js";
import { EnrollmentModel } from "../models/enrollmentModel.js";

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

    // 3️⃣ In real-world, verify payment with payment gateway
    // Example: call eSewa/Stripe/Khalti API to confirm transactionId

    // Save payment
    const payment = await PaymentModel.create({
      student: req.user.id,
      course: courseId,
      amount,
      status: "completed", // In real flow: verify with eSewa/Stripe/Khalti first
      transactionId,
    });

    // Create enrollment
    const enrollment = await EnrollmentModel.create({
      student: req.user.id,
      course: courseId,
      payment: payment._id,
    });

    res.status(201).json({
      message: "Payment successful, you are enrolled in this course",
      payment,
      enrollment,
    });
  } catch (error) {
    res.status(500).json({ message: "Payment error", error: error.message });
  }
};

// ✅ Verify Payment (for payment gateway webhook/secret key)
export const verifyPayment = async (req, res) => {
  try {
    const secretKey = process.env.PAYMENT_SECRET_KEY; // in .env
    const providedKey = req.headers["x-payment-key"];

    if (!providedKey || providedKey !== secretKey) {
      return res.status(403).json({ success: false, message: "Forbidden: Invalid secret" });
    }

    const { transactionId } = req.body;
    if (!transactionId) {
      return res.status(400).json({ message: "Transaction ID is required" });
    }

    // Here, verify with the payment provider if needed
    // Example: fetch transaction status via API

    res.status(200).json({ message: "Payment verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error verifying payment", error: error.message });
  }
};
