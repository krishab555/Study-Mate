import { projectModel } from "../models/projectModel.js";
import { certificateModel} from "../models/certificateModel.js";
import { CourseModel } from "../models/courseModel.js";
import { createNotification } from "./notificationController.js";

// --------------------
// User submits a project
// --------------------
export const submitProjectController = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { gitLink } = req.body;

    if (!courseId || !req.file) {
      return res
        .status(400)
        .json({ message: "Course ID and PDF are required." });
    }
    const course = await CourseModel.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const newProject = await projectModel.create({
      course: courseId,
      student: req.user.id,
      projectFile: req.file.path,
      gitLink: gitLink || "",
      status: "Pending",
      submittedAt: new Date(),
    });
    await createNotification({
      userId: req.user._id,
      message: `You submitted your project for "${course.title}".`,
      type: "project_review",
    });

    // 🔔 Notify instructor
    await createNotification({
      userId: course.instructor,
      message: `A student submitted a project for "${course.title}".`,
      type: "project_review",
    });

    res.status(201).json({
      message: "Project submitted successfully",
      project: {
        _id: newProject._id,
        course: { _id: course._id, title: course.title },
        gitLink: newProject.gitLink,
        projectFile: newProject.projectFile,
        status: newProject.status,
        submittedAt: newProject.submittedAt,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error submitting project", error: error.message });
  }
};

// --------------------
// Instructor reviews project
// --------------------
export const reviewProjectController = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, feedback } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res
        .status(400)
        .json({ message: "Invalid status. Must be 'Approved' or 'Rejected'." });
    }

    const project = await projectModel.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.status = status;
    project.feedback = feedback || "";
    await project.save();

    // ✅ Auto-generate certificate if approved
    if (status === "Approved") {
      const certificateExists = await certificateModel.findOne({
        student: project.student,
        course: project.course,
        
      });

      if (!certificateExists) {
        await certificateModel.create({
          student: project.student,
          course: project.course,
          issuedAt: new Date(),
          certificateUrl: "", // optional: PDF URL
        });
      }
    }
     await createNotification({
       userId: project.student,
       message: `Your project for "${project.course.title}" was ${status}.`,
       type: "project_review",
     });

    res
      .status(200)
      .json({
        message: `Project ${status.toLowerCase()} successfully`,
        project,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error reviewing project", error: error.message });
  }
};

// --------------------
// Instructor gets all projects for their courses
// --------------------
export const getAllProjectsByInstructor = async (req, res) => {
  try {
    const courses = await CourseModel.find({ instructor: req.user.id }).select(
      "_id"
    );

    const projects = await projectModel
      .find({ course: { $in: courses.map((c) => c._id) } })

      .populate("student", "name email")
      .populate("course", "title");

    res.status(200).json({ projects });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching projects", error: error.message });
  }
};

// --------------------
// User gets all their submitted projects
// --------------------
export const getUserProjects = async (req, res) => {
  try {
    const projects = await projectModel.find({ student: req.user.id })
      .populate("course", "title")
      .sort({ submittedAt: -1 });

    res.status(200).json({ projects });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user projects", error: error.message });
  }
};
