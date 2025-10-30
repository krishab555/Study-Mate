import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
import { PaymentModel } from "../models/paymentModel.js";
import { EnrollmentModel } from "../models/enrollmentModel.js";
import { CourseModel } from "../models/courseModel.js";
import { createNotification } from "./notificationController.js";
import { addActivity } from "./activityController.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create Stripe session (test mode)
export const createStripeSession = async (req, res) => {
  try {
    const { courseId, amount } = req.body;
    if (!courseId || !amount) {
      return res
        .status(400)
        .json({ success: false, message: "Course ID and amount are required" });
    }
    // 1️⃣ Create payment record in MongoDB
    const payment = await PaymentModel.create({
      student: req.user._id,
      course: courseId,
      amount,
      status: "pending",
    });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: `Course ${courseId}` },
            unit_amount: amount * 100, // Stripe expects amount in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata: {
        courseId,
        userId: req.user.id,
        paymentId: payment._id.toString(),
        // Ensure req.user is populated via auth middleware
      },
      success_url: `http://localhost:5173/courses/${courseId}?success=true`,
      cancel_url: `http://localhost:5173/courses/${courseId}`,
    });

    res.json({ success: true, sessionId: session.id, paymentId: payment._id,  }); //ya url garne seeion ma
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};
export const getLatestPaymentForCourse = async (req, res) => {
  try {
    const payment = await PaymentModel.findOne({
      student: req.user._id,
      course: req.params.courseId,
      status: "completed",
    }).sort({ createdAt: -1 });

    if (!payment) {
      return res.status(404).json({ message: "No completed payment found" });
    }

    res.json({ payment });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching payment", error: err.message });
  }
};
// ....

// Optional: handle webhook to mark payment completed
export const handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, process.env.STRIPE_WEBHOOK_SECRET, sig);
  } catch (err) {
    console.log("Webhook signature verification failed.", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    // Here you can create Payment and Enrollment records
    await PaymentModel.findOneAndUpdate(
      { _id: session.metadata.paymentId },
      { status: "completed" },
      { new: true }
    );
    const { courseId, userId } = session.metadata;

    try {
      // Prevent duplicate payment
      let existingPayment = await PaymentModel.findOne({
        transactionId: session.id,
      });
      if (!existingPayment) {
        // 1️⃣ Create payment record
        const payment = await PaymentModel.create({
          student: userId,
          course: courseId,
          payment: payment._id,
        
        });

        // 2️⃣ Create enrollment record
        const enrollment = await EnrollmentModel.create({
          student: userId,
          course: courseId,
          payment: payment._id,
        });

        // 3️⃣ Add student to course's students array
        await CourseModel.findByIdAndUpdate(courseId, {
          $addToSet: { students: userId },
        });
        // 4️⃣ Notifications
        const course = await CourseModel.findById(courseId);
        await createNotification({
          userId,
          message: `You enrolled in "${course.title}".`,
          type: "enrollment",
        });
        await createNotification({
          userId: course.instructor,
          message: `A new student enrolled in your course "${course.title}".`,
          type: "enrollment",
        });

        const user = await UserModel.findById(userId);
        await addActivity(
          `${user.name} enrolled in "${course.title}"`,
          "payment"
        );

        console.log(
          `Payment processed and user enrolled: ${userId} -> ${courseId}`
        );
      }
    } catch (err) {
      console.error("Error processing webhook:", err);
      return res.status(500).send("Webhook handling failed");
    }
  }

  res.status(200).json({ received: true });
};
// paymentController.js
export const createPayment = async (req, res) => {
  try {
    const { courseId, amount } = req.body;

    const payment = await PaymentModel.create({
      student: req.user._id,
      course: req.params.courseId,

      status: "completed",
    }).sort({ createdAt: -1 });

     if (!payment) {
      return res.status(404).json({ message: "No completed payment found" });
    }

    res.json({ payment });
  } catch (err) {
    res.status(500).json({ message: "Error fetching payment", error: err.message });
  
  } 
};
