import express from "express";
import {
  getMyCertificates,
  getCertificateById,
  getPendingCertificates,
  reviewCertificate,
} from "../controllers/certificateController.js";
import { authenticateUser } from "../middleware/authenticateUser.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";

const certificateRoutes = express.Router();

// ✅ User views all their certificates
certificateRoutes.get(
  "/my-certificates",
  authenticateUser,
  authorizeRoles("Student"),
  getMyCertificates
);

// Admin routes
certificateRoutes.get(
  "/pending",
  authenticateUser,
  authorizeRoles("Admin"),
  getPendingCertificates
);
// ✅ View one certificate by ID
certificateRoutes.get(
  "/:id",
  authenticateUser,
  authorizeRoles("Student"),
  getCertificateById
);
certificateRoutes.put(
  "/review/:id",
  authenticateUser,
  authorizeRoles("Admin"),
  reviewCertificate
);
export default certificateRoutes;
