import PaymentModel from "../models/Payment.js";

export const checkPurchase = async (req, res, next) => {
  const userId = req.user._id;
  const courseId = req.params.courseId || req.body.courseId;

  const payment = await PaymentModel.findOne({
    user: userId,
    course: courseId,
    status: "paid",
  });

  if (!payment) {
    return res.status(403).json({
      success: false,
      message: "You need to purchase this course first",
    });
  }
  next();
};
