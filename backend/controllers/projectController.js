import { projectModel } from "../models/projectModel.js";
import { certificateModel} from "../models/certificateModel.js";
import { CourseModel } from "../models/courseModel.js";

// --------------------
// User submits a project
// --------------------
export const submitProjectController = async (req, res) => {
  try {
    const { courseId, projectFile } = req.body;

    if (!courseId || !projectFile) {
      return res
        .status(400)
        .json({ message: "Course ID and project file are required." });
    }

    const newProject = await Project.create({
      course: courseId,
      student: req.user.id,
      projectFile,
    });

    res
      .status(201)
      .json({ message: "Project submitted successfully", project: newProject });
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

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.status = status;
    project.feedback = feedback || "";
    await project.save();

    // ✅ Auto-generate certificate if approved
    if (status === "Approved") {
      const certificateExists = await Certificate.findOne({
        student: project.student,
        course: project.course,
      });

      if (!certificateExists) {
        await Certificate.create({
          student: project.student,
          course: project.course,
          issuedAt: new Date(),
          certificateUrl: "", // optional: PDF URL
        });
      }
    }

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
    const courses = await Course.find({ instructor: req.user.id }).select(
      "_id"
    );

    const projects = await Project.find({ course: { $in: courses } })
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
    const projects = await Project.find({ student: req.user.id })
      .populate("course", "title")
      .sort({ submittedAt: -1 });

    res.status(200).json({ projects });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user projects", error: error.message });
  }
};
