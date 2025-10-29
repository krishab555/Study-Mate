import express from "express";
import { authenticateUser } from "../middleware/authenticateUser.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";
import {
  createStripeSession,
  // processPayment,
  // verifyPayment,
} from "../controllers/paymentController.js";

const paymentRoutes = express.Router();

// Only students can pay
paymentRoutes.post(
  "/session",
  authenticateUser,
  authorizeRoles("Student"),
  createStripeSession
  // processPayment
);
 
// paymentRoutes.post(
//   "/verify",
//   authenticateUser,
//   authorizeRoles("Student"),
//   verifyPayment
// );

export default paymentRoutes;
