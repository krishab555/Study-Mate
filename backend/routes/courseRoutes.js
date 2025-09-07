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
import { uploadPDF } from "../middleware/multerMiddleware.js";
import { uploadImage } from "../middleware/multerImage.js";

const upload = multer().fields([
  { name: "pdf", maxCount: 1 },
  { name: "image", maxCount: 1 },
]);
const courseRoutes = express.Router();


courseRoutes.get("/", authenticateUser, getCoursesController); // GET all courses
courseRoutes.post(
  "/",
  authenticateUser,
  authorizeRoles("Instructor"),
  (req, res, next) => {
    // upload PDF first
    const uploadPdfMiddleware = uploadPDF.single("pdf");
    uploadPdfMiddleware(req, res, function (err) {
      if (err) return next(err);

      // then upload Image
      const uploadImgMiddleware = uploadImage.single("image");
      uploadImgMiddleware(req, res, function (err) {
        if (err) return next(err);
        next();
      });
    });
  },
  createCourseController
); // CREATE a course
courseRoutes.put(
  "/:id",
  authenticateUser,
  authorizeRoles("Instructor", "Admin"),
  updateCourseController
); // UPDATE course by ID
courseRoutes.delete(
  "/:id",
  authenticateUser,
  authorizeRoles("Instructor", "Admin"),
  deleteCourseController
); // DELETE course by ID


courseRoutes.get("/:id", authenticateUser, getCourseByIdController);

export default courseRoutes;
