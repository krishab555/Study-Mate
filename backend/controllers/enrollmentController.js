import { EnrollmentModel } from "../models/enrollmentModel.js";
import { CourseModel } from "../models/courseModel.js";
import { PaymentModel } from "../models/paymentModel.js";

// ✅ Enroll a student after payment success
export const enrollCourse = async (req, res) => {
  try {
    const { courseId, paymentId } = req.body;

    if (!courseId || !paymentId) {
      return res
        .status(400)
        .json({ message: "Course ID and Payment ID are required" });
    }
    // check if course exists
    const course = await CourseModel.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    // Check if payment exists and is completed
    const payment = await PaymentModel.findById(paymentId);
    if (!payment || payment.status !== "completed") {
      return res.status(400).json({ message: "Invalid or incomplete payment" });
    }

    // prevent duplicate enrollment
    const existing = await EnrollmentModel.findOne({
      student: req.user.id,
      course: courseId,
    });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Already enrolled in this course" });
    }

    // create enrollment
    const enrollment = await EnrollmentModel.create({
      student: req.user.id,
      course: courseId,
      payment: paymentId,
    });

    res.status(201).json({
      message: "Enrolled successfully",
      enrollment,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error enrolling course", error: error.message });
  }
};

// ✅ Get student’s enrolled courses
export const getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await EnrollmentModel.find({ student: req.user.id })
      .populate("course", "title description price")
      .populate("payment", "amount status")
      .sort({ enrolledAt: -1 });

    res.status(200).json({ enrollments });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching enrollments", error: error.message });
  }
};

// ✅ Get all students in a course (for Instructor/Admin)
export const getCourseStudents = async (req, res) => {
  try {
    const { courseId } = req.params;
    const enrollments = await EnrollmentModel.find({ course: courseId })
      .populate("student", "name email")
      .populate("payment", "amount status")
      .sort({ enrolledAt: -1 });

    res.status(200).json({ enrollments });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching course students",
        error: error.message,
      });
  }
};
