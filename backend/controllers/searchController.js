// backend/controllers/searchController.js
import { CourseModel } from "../models/courseModel.js";
import { UserModel } from "../models/UserModel.js";

export const searchController = async (req, res) => {
  try {
    const query = req.query.q || "";
    const regex = new RegExp(query, "i");
    if (!query)
      return res.json({
        success: true,
        data: { courses: [], instructors: [] },
      });

       
    const courses = await CourseModel.find({
      $or: [{ title: regex }, { description: regex }, { category: regex }],
    }).populate("instructor", "name");

      const allUsers = await UserModel.find({ name: regex }).populate(
        "role",
        "name"
      );
      const instructors = allUsers.filter(
        (user) => user.role?.name === "Instructor"
      );

    res.status(200).json({ success: true, data: { courses, instructors } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
