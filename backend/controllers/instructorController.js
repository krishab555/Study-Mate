import { EnrollmentModel } from "../models/enrollmentModel.js";
import { projectModel } from "../models/projectModel.js";
import { UserQuizModel } from "../models/userQuizModel.js";
import { CourseModel } from "../models/courseModel.js";
import { QuizModel } from "../models/quizModel.js";

export const getInstructorStats = async (req, res) => {
  try {
    const instructorId = req.user.id;

    // ✅ Find all courses by this instructor
    const courses = await CourseModel.find({ instructor: instructorId }).select(
      "_id"
    );
    const courseIds = courses.map((c) => c._id);

    // ✅ Count students enrolled
    const studentsEnrolled = await EnrollmentModel.countDocuments({
      course: { $in: courseIds },
    });

    // ✅ Count projects submitted
    const projectsSubmitted = await projectModel.countDocuments({
      course: { $in: courseIds },
    });

    // ✅ Find quizzes that belong to instructor’s courses
    const quizIds = await QuizModel.find({
      course: { $in: courseIds },
    }).distinct("_id");

    // ✅ Count quiz attempts
    const quizzesAttempted = await UserQuizModel.countDocuments({
      quiz: { $in: quizIds },
    });

    // ✅ Active students (students who enrolled + attempted something)
    const activeStudents = await UserQuizModel.distinct("student", {
      quiz: { $in: quizIds },
    });

    res.json({
      studentsEnrolled,
      projectsSubmitted,
      quizzesAttempted,
      activeStudents: activeStudents.length,
    });
  } catch (error) {
    console.error("Error fetching instructor stats:", error);
    res.status(500).json({
      message: "Error fetching instructor stats",
      error: error.message,
    });
  }
};

