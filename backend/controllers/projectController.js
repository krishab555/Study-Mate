
// projectcontrooler and certificateController baki xa





// import { projectModel } from "../models/projectModel";



// // User submits a project
// export const submitProjectController = async (req, res) => {
//   try {
//     const { course, projectFile } = req.body;
//     const student = req.user._id; // from auth middleware

//     const newProject = await Project.create({
//       course,
//       student,
//       projectFile,
//       status: "Pending",
//     });

//     res.status(201).json({ success: true, data: newProject });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Instructor reviews a project (approve/reject)
// export const reviewProjectController = async (req, res) => {
//   try {
//     const { id } = req.params; // project ID
//     const { status, feedback } = req.body; // expect status: "Approved" or "Rejected"

//     if (!["Approved", "Rejected"].includes(status)) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid status" });
//     }

//     const project = await Project.findById(id);
//     if (!project) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Project not found" });
//     }

//     project.status = status;
//     project.feedback = feedback || "";
//     await project.save();

//     // Optionally: generate certificate on approval (implement separately)

//     res.status(200).json({ success: true, data: project });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Instructor gets all projects for their courses (optional)
// export const getAllProjectsByInstructor = async (req, res) => {
//   try {
//     // Assuming instructor ID is req.user._id
//     // You may need to populate or filter projects linked to instructor's courses
//     const instructorId = req.user._id;

//     // Simplest: get all projects (advanced: filter projects by courses taught by instructor)
//     const projects = await Project.find().populate("student course");

//     res.status(200).json({ success: true, data: projects });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // User gets all their own submitted projects
// export const getUserProjects = async (req, res) => {
//   try {
//     const studentId = req.user._id;
//     const projects = await Project.find({ student: studentId }).populate(
//       "course"
//     );

//     res.status(200).json({ success: true, data: projects });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
