// middleware/verifyPayment.js
export const verifyPaymentSecret = (req, res, next) => {
  const secretKey = process.env.PAYMENT_SECRET_KEY; // set in .env
  const paymentKey = req.headers["x-payment-key"];

  if (!paymentKey || paymentKey !== secretKey) {
    return res
      .status(403)
      .json({ success: false, message: "Forbidden: Invalid secret" });
  }

  next();
};


// import express from "express";
// import { verifyPayment } from "../controllers/paymentController.js";
// import { verifyEsewaSecret } from "../middleware/verifyEsewa.js";

// const paymentRoutes = express.Router();

// // eSewa callback endpoint
// paymentRoutes.post("/verify", verifyEsewaSecret, verifyPayment);

// export default paymentRoutes;

