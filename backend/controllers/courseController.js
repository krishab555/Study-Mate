import { CourseModel } from "../models/courseModel.js";
import { decodeJWT } from "../utils/generateToken.js";

// Get all courses
export const getCoursesController = async (req, res) => {
  try {
    const user = req.user;
    const courses = await CourseModel.find().populate("instructor");

    return res.status(200).json({
      success: true,
      data: courses,
      userInfo: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create a course
export const createCourseController = async (req, res) => {
  try {
    const reqBody = req.body;

    const course = await CourseModel.create(reqBody);

    res.status(201).json({
      success: true,
      data: course,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update a course
export const updateCourseController = async (req, res) => {
  try {
    const { id } = req.params;
    const reqBody = req.body;

    const updatedCourse = await CourseModel.findByIdAndUpdate(id, reqBody, {
      new: true,
    });
    if (!updatedCourse) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    res.status(200).json({ success: true, data: updatedCourse });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCourseController = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCourse = await CourseModel.findByIdAndDelete(id);
    if (!deletedCourse) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Course deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

