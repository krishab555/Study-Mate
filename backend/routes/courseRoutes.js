
import express from "express";
import multer from "multer";
import {
  getCoursesController,
  createCourseController,
  updateCourseController,
  deleteCourseController,
  getCourseByIdController,
} from "../controllers/courseController.js";
import { authenticateUser } from "../middleware/authenticateUser.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";
import { uploadPDF } from "../middleware/multerMiddleware.js"; // Your multer config for PDFs
import { uploadImage } from "../middleware/multerImage.js"; // Your multer config for images

const upload = multer().fields([
  { name: "pdf", maxCount: 1 },
  { name: "image", maxCount: 1 },
]);

const courseRoutes = express.Router();

courseRoutes.get("/", authenticateUser, getCoursesController);

courseRoutes.post(
  "/",
  authenticateUser,
  authorizeRoles("Instructor"),
  (req, res, next) => {
    const uploadPdfMiddleware = uploadPDF.single("pdf");
    uploadPdfMiddleware(req, res, function (err) {
      if (err) return next(err);
      const uploadImgMiddleware = uploadImage.single("image");
      uploadImgMiddleware(req, res, function (err) {
        if (err) return next(err);
        next();
      });
    });
  },
  createCourseController
);

courseRoutes.put(
  "/:id",
  authenticateUser,
  authorizeRoles("Instructor", "Admin"),
  updateCourseController
);

courseRoutes.delete(
  "/:id",
  authenticateUser,
  authorizeRoles("Instructor", "Admin"),
  deleteCourseController
);

courseRoutes.get("/:id", authenticateUser, getCourseByIdController);

export default courseRoutes;
