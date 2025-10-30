
import { CourseModel } from "../models/courseModel.js";
import { EnrollmentModel } from "../models/enrollmentModel.js";
import { createNotification } from "./notificationController.js";

// Get all courses
export const getCoursesController = async (req, res) => {
  try {
    const user = req.user; // from auth middleware
    const courses = await CourseModel.find()
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
     if (!req.user?.role || String(req.user.role).toLowerCase() !== "Admin") {
       return res
         .status(403)
         .json({ success: false, message: "Only admin can create courses" });
     }

    const { title, description, instructorId, price, isPaid, category, level } =
      req.body;
     const pdfFile = req.files?.pdf?.[0];
     const imageFile = req.files?.image?.[0];
     const videoFile = req.files?.video?.[0];

    //  console.log(pdfFile,imageFile,videoFile);
    // console.log(req.files)
    const pdfUrl = pdfFile ? `/uploads/pdfs/${pdfFile.filename}` : null;
    const imageUrl = imageFile ? `/uploads/images/${imageFile.filename}` : null;
    const videoUrl = videoFile ? `/uploads/videos/${videoFile.filename}` : null;

     let finalPrice = 0;
     let paidStatus = false;
     if (category.toLowerCase() === "advanced") {
       finalPrice = price || 100; // default price if none provided
       paidStatus = true;
     }


    const course = await CourseModel.create({
      title,
      description,
      instructor:  instructorId,
      createdBy: req.user._id,
      price: finalPrice,
      isPaid: paidStatus,
      category,
      level,
      pdfUrl,
      banner: imageUrl,

      videoUrl,
    });
    await createNotification({
      userId: instructorId,
      message: `Your course "${course.title}" has been created successfully.`,
      type: "course_update",
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
    const reqBody = req.body || {};

    const course = await CourseModel.findById(id);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    // ✅ Only the assigned instructor or admin can edit
    if (
      req.user.role !== "Admin" &&
      course.instructor.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({
          success: false,
          message: "Not authorized to edit this course",
        });
    }
    
    const pdfFile = req.files?.pdf?.[0];
    const imageFile = req.files?.image?.[0];
    const videoFile = req.files?.video?.[0];

    if (pdfFile) reqBody.pdfUrl = `/uploads/pdfs/${pdfFile.filename}`;
    if (imageFile) reqBody.banner = `/uploads/images/${imageFile.filename}`;
    if (videoFile) reqBody.videoUrl = `/uploads/videos/${videoFile.filename}`;



    if (reqBody.category) {
      if (reqBody.category.toLowerCase() === "basic") {
        reqBody.price = 0;
        reqBody.isPaid = false;
      } else if (reqBody.category.toLowerCase() === "advanced") {
        reqBody.isPaid = true;
        reqBody.price = reqBody.price ? Number(reqBody.price) : 100; // default
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
    await createNotification({
      userId: updatedCourse.instructor,
      message: `Your course "${updatedCourse.title}" has been updated.`,
      type: "course_update",
    });

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
      await createNotification({
        userId: deletedCourse.instructor,
        message: `Your course "${deletedCourse.title}" has been deleted.`,
        type: "course_update",
      });
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

    // Check if student is enrolled
    let isEnrolled = false;
    if (req.user) {
      const enrollment = await EnrollmentModel.findOne({
        student: req.user.id,
        course: course._id,
        isActive:true,
      });
      isEnrolled = !!enrollment;
    }

    res.status(200).json({
      success: true,
      data: { ...course.toObject(), isEnrolled }, // include isEnrolled
    });
  } catch (error) {
    console.error("error fetching the course",error);
    res.status(500).json({ success: false, message: error.message });
  }
};