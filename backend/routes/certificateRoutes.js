import express from "express";
import {
  getMyCertificates,
  getCertificateById,
} from "../controllers/certificateController.js";
import { authenticateUser } from "../middleware/authenticateUser.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";

const certificateRoutes = express.Router();

// ✅ User views all their certificates
certificateRoutes.get(
  "/my-certificates",
  authenticateUser,
  authorizeRoles("User"),
  getMyCertificates
);

// ✅ View one certificate by ID
certificateRoutes.get(
  "/:id",
  authenticateUser,
  authorizeRoles("User"),
  getCertificateById
);

export default certificateRoutes;
