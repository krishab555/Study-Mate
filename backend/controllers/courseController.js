import { CourseModel } from "../models/courseModel.js";
import { decodeJWT } from "../utils/generateToken.js";
import { UserModel } from "../models/UserModel.js";



// Get all courses
export const getCoursesController = async (req, res) => {
  try {
    const user = req.user;
    const courses = await CourseModel.find().populate({path:"instructor",selsect:"name email"}).lean();

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
    const { title, description, instructor, price, isPaid, category, level } =
      req.body;
    const pdfFile =
      req.files?.pdf || req.file?.fieldname === "pdf" ? req.file : null;
    const imageFile =
      req.files?.image || req.file?.fieldname === "image" ? req.file : null;

    const pdfUrl = pdfFile ? `/uploads/pdfs/${pdfFile.filename}` : null;
    const imageUrl = imageFile ? `/uploads/images/${imageFile.filename}` : null;

    const course = await CourseModel.create({
      title,
      description,
      instructor: req.user._id,
      price,
      isPaid,
      category,
      level,
      pdfUrl,
    });

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
// in controllers/courseController.js
export const getCourseByIdController = async (req, res) => {
  try {
    const course = await CourseModel.findById(req.params.id).populate(
      "instructor",
      "name email"
    );
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }
    res.status(200).json({ success: true, data: course });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


