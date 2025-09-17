import { EnrollmentModel } from "../models/enrollmentModel.js";
import { ProjectModel } from "../models/projectModel.js";
import { QuizAttemptModel } from "../models/quizAttemptModel.js"; // assuming you store attempts
import { CourseModel } from "../models/courseModel.js";

export const getInstructorStats = async (req, res) => {
  try {
    const instructorId = req.user.id;

    // ✅ Find all courses by this instructor
    const courses = await CourseModel.find({ instructor: instructorId }).select(
      "_id"
    );
    const courseIds = courses.map((c) => c._id);

    // ✅ Count students enrolled across instructor’s courses
    const studentsEnrolled = await EnrollmentModel.countDocuments({
      course: { $in: courseIds },
    });

    // ✅ Count projects submitted in instructor’s courses
    const projectsSubmitted = await ProjectModel.countDocuments({
      course: { $in: courseIds },
    });

    // ✅ Count quizzes attempted for instructor’s courses
    const quizzesAttempted = await QuizAttemptModel.countDocuments({
      course: { $in: courseIds },
    });

    // ✅ Active students = distinct enrolled students
    const activeStudents = await EnrollmentModel.distinct("student", {
      course: { $in: courseIds },
    });

    res.json({
      studentsEnrolled,
      projectsSubmitted,
      quizzesAttempted,
      activeStudents: activeStudents.length,
    });
  } catch (error) {
    console.error("Error fetching instructor stats:", error);
    res
      .status(500)
      .json({
        message: "Error fetching instructor stats",
        error: error.message,
      });
  }
};
