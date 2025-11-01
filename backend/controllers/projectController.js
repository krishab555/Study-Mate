import mongoose from "mongoose";
import { projectModel } from "../models/projectModel.js";
import { certificateModel} from "../models/certificateModel.js";
import { CourseModel } from "../models/courseModel.js";
import { createNotification } from "./notificationController.js";
import { addActivity } from "./activityController.js";
import { EnrollmentModel } from "../models/enrollmentModel.js";


export const submitProjectController = async (req, res) => {
  try {
   

    const { courseId } = req.params;
    const studentId = req.user._id;

    console.log("req.user:", req.user);
    console.log("req.file:", req.file);
    console.log("req.body:", req.body);
    console.log("Enrollment check:", studentId, courseId);
    // console.log("Enrollment result:", enrollment);

     

    const pdfFile = req.file?.filename;
    const gitLink = req.body.gitLink;

    if (!pdfFile || !gitLink)
      return res.status(400).json({ message: "Both PDF and Git link are required" });
    const course = await CourseModel.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const newProject = await projectModel.create({
      course: courseId,
      student:  studentId,
      instructor: course.instructor,
      projectFile: pdfFile,
      gitLink,
      status: "Pending",
      submittedAt: new Date(),
    });
    const enrollment = await EnrollmentModel.findOne({
      student: studentId,
      course: courseId,
      isActive: true,
    });

    if (!enrollment) {
      return res.status(403).json({
        success: false,
        message: "You must be enrolled to submit a project",
      });
    }
    await createNotification({
      userId: req.user._id,
      message: `You submitted your project for "${course.title}".`,
      type: "project_review",
    });

   
    await createNotification({
      userId: course.instructor,
      message: `A student submitted a project for "${course.title}".`,
      type: "project_review",
    });
    await addActivity(
      `${req.user.name} submitted a project for "${course.title}"`,
      "project"
    );

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
    console.error("Error in submitProjectController:", error);
    res

      .status(500)
      .json({ message: "Error submitting project", error: error.message });
  }
};

export const reviewProjectController = async (req, res) => {
  try {
    console.log(" Incoming project review request:", req.params, req.body);

    const { id } = req.params;
    const { status, feedback } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res
        .status(400)
        .json({ message: "Invalid status. Must be 'Approved' or 'Rejected'." });
    }
if (!mongoose.Types.ObjectId.isValid(id)) {
  return res.status(400).json({ message: "Invalid project ID" });
}

    const project = await projectModel
      .findById(id)
      .populate("student", "name email")
      .populate("instructor", "name email")
      .populate("course", "title instructor");
;
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.status = status;
    project.feedback = feedback || "";
    await project.save();

   
    if (status === "Approved") {
     
      const studentId = project.student._id || project.student;
      const courseId = project.course._id || project.course;
      const instructorId = project.course.instructor._id || project.instructor;

      console.log("🧾 Checking existing certificate for:", {
        studentId,
        courseId,
        instructorId,
      });
      const certificateExists = await certificateModel.findOne({
        student: studentId,
        course: courseId,
        instructor: instructorId,
      });

      if (!certificateExists) {
        try {
          console.log(" Creating new certificate...");
          await certificateModel.create({
            student: project.student._id,
            course: project.course._id,
            instructor: project.course.instructor._id,
            // issuedAt: new Date(),
            status: "PendingAdminApproval",
            certificateUrl: "",
          });
          console.log(" Certificate created!");
        } catch (err) {
          console.error(" Error creating certificate:", err);
        }
      } else {
        console.log(" Certificate already exists.");
      }
    }
     await createNotification({
       userId: project.student._id,
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
    console.error("Error in reviewProjectController:", error);
    res
      .status(500)
      .json({ message: "Error reviewing project", error: error.message });
  }
};


export const getAllProjectsByInstructor = async (req, res) => {
  try {
    const courses = await CourseModel.find({ instructor: req.user.id }).select(
      "_id"
    );
console.log("Instructor's courses:", courses);
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
