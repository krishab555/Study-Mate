import express from "express";
import { authenticateUser } from "../middleware/authenticateUser.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";
import {
  createStripeSession,getLatestPaymentForCourse
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
  
);
paymentRoutes.get("/latest/:courseId", authenticateUser, authorizeRoles("Student"),getLatestPaymentForCourse );
 

export default paymentRoutes;
