import { EnrollmentModel } from "../models/enrollmentModel.js";
import { projectModel } from "../models/projectModel.js";
import { UserQuizModel } from "../models/userQuizModel.js";
import { CourseModel } from "../models/courseModel.js";
import { QuizModel } from "../models/quizModel.js";


export const getInstructorCourses = async (req, res) => {
  try {
    const instructorId = req.user.id;

    // Fetch courses added by this instructor
    const courses = await CourseModel.find({ instructor: instructorId });

    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    console.error("Error fetching instructor courses:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getInstructorStats = async (req, res) => {
  try {
    const instructorId = req.user.id;

    const courses = await CourseModel.find({ instructor: instructorId }).select(
      "_id"
    );
    const courseIds = courses.map((c) => c._id);

    
    const studentsEnrolled = await EnrollmentModel.countDocuments({
      course: { $in: courseIds },
    });

    
    const projectsSubmitted = await projectModel.countDocuments({
      course: { $in: courseIds },
      status: { $in: ["submitted", "approved", "rejected"] },
    });

   
    const quizIds = await QuizModel.find({
      course: { $in: courseIds },
    }).distinct("_id");

    // // Count quiz attempts
    // const quizzesAttempted = await UserQuizModel.countDocuments({
    //   quiz: { $in: quizIds },
    // });

    // //  Active students (students who enrolled + attempted something)
    // const activeStudents = await UserQuizModel.distinct("student", {
    //   quiz: { $in: quizIds },
    // });

    res.json({
      studentsEnrolled,
      projectsSubmitted,
      // quizzesAttempted,
      // activeStudents: activeStudents.length,
    });
  } catch (error) {
    console.error("Error fetching instructor stats:", error);
    res.status(500).json({
      message: "Error fetching instructor stats",
      error: error.message,
    });
  }
};

