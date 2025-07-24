import express from "express";
import {
  getCoursesController,
  createCourseController,
  updateCourseController,
  deleteCourseController,
} from "../controllers/courseController.js";

const courseRoutes = express.Router();

courseRoutes.get("/", getCoursesController); // GET all courses
courseRoutes.post("/", createCourseController); // CREATE a course
courseRoutes.put("/:id", updateCourseController); // UPDATE course by ID
courseRoutes.delete("/:id", deleteCourseController); // DELETE course by ID

export default courseRoutes;
