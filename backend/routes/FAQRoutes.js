// backend/routes/faqRoutes.js
import express from "express";
import { addFAQ, getFAQs } from "../controllers/FAQControllers.js";
import { authenticateUser } from "../middleware/authenticateUser.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";

const router = express.Router();

// Admin/Instructor adds FAQ
router.post(
  "/",
  authenticateUser,
  authorizeRoles("Admin", "Instructor"),
  addFAQ
);

// Anyone can view FAQs
router.get("/", getFAQs);

export default router;
