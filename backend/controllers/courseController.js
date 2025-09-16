
import { CourseModel } from "../models/courseModel.js";

// Get all courses
export const getCoursesController = async (req, res) => {
  try {
    const user = req.user; // from auth middleware
    const courses = await CourseModel.find({ instructor: user._id })
      .populate("instructor", "name")
      .lean();

    return res.status(200).json({
      success: true,
      data: courses,
      userInfo: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create a new course
export const createCourseController = async (req, res) => {
  try {

    const { title, description, instructor, price, isPaid, category, level } =
      req.body;
     const pdfFile = req.files?.pdf?.[0];
     const imageFile = req.files?.image?.[0];
     const videoFile = req.files?.video?.[0];



    const pdfUrl = pdfFile ? `/uploads/pdfs/${pdfFile.filename}` : null;
    const imageUrl = imageFile ? `/uploads/images/${imageFile.filename}` : null;
    const videoUrl = videoFile ? `/uploads/videos/${videoFile.filename}` : null;


    

    const course = await CourseModel.create({
      title,
      description,
      instructor: req.user._id, // user from auth middleware
      price,
      isPaid,
      category,
      level,
      pdfUrl,
      banner: imageUrl,

      videoUrl,
    });

    res.status(201).json({ success: true, data: course });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a course by id
export const updateCourseController = async (req, res) => {
  try {
    const { id } = req.params;
    const reqBody = req.body;

    // If howToComplete is in body, handle parsing like above
    if (reqBody.howToComplete) {
      if (typeof reqBody.howToComplete === "string") {
        try {
          reqBody.howToComplete = JSON.parse(reqBody.howToComplete);
          if (!Array.isArray(reqBody.howToComplete)) {
            reqBody.howToComplete = [reqBody.howToComplete];
          }
        } catch {
          reqBody.howToComplete = reqBody.howToComplete
            .split(",")
            .map((s) => s.trim());
        }
      }
    }

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

// Delete a course by id
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

// Get a course by id
export const getCourseByIdController = async (req, res) => {
  try {
    const course = await CourseModel.findById(req.params.id).populate(
      "instructor",
      "name email"
    );
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }
    res.status(200).json({ success: true, data: course });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
