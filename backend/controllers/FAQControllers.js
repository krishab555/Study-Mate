// backend/controllers/FAQControllers.js
import FAQMaster from "../models/FAQMaster.js";
import FAQDetail from "../models/FAQDetail.js";
import { CourseModel } from "../models/courseModel.js";

// ---------------------------
// Add FAQ (System or Course)
// ---------------------------
export const addFAQ = async (req, res) => {
  try {
    const { type, courseId, question, answer } = req.body;

    if (!["System", "Course"].includes(type)) {
      return res.status(400).json({ message: "Invalid FAQ type" });
    }

    if (!question || !answer) {
      return res
        .status(400)
        .json({ message: "Question and Answer are required" });
    }

    // ✅ Validate courseId if type is Course
    if (type === "Course") {
      if (!courseId) {
        return res
          .status(400)
          .json({ message: "Course ID is required for Course FAQs" });
      }

      const course = await CourseModel.findById(courseId);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
    }

    // ✅ Find or create FAQMaster
    let faqMaster = await FAQMaster.findOne(
      type === "Course" ? { type, course: courseId } : { type }
    );

    if (!faqMaster) {
      faqMaster = await FAQMaster.create({
        type,
        course: type === "Course" ? courseId : undefined,
      });
    }

    // ✅ Create FAQDetail
    const faqDetail = await FAQDetail.create({
      faqMaster: faqMaster._id,
      question,
      answer,
    });

    res.status(201).json({
      message: `${type} FAQ added successfully`,
      faq: faqDetail,
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding FAQ", error: error.message });
  }
};

// ---------------------------
// Get FAQs (System or Course)
// ---------------------------
export const getFAQs = async (req, res) => {
  try {
    const { type, courseId } = req.query;

    if (!["System", "Course"].includes(type)) {
      return res.status(400).json({ message: "Invalid FAQ type" });
    }

    let filter = { type };
    if (type === "Course") {
      if (!courseId) {
        return res
          .status(400)
          .json({ message: "Course ID is required to fetch course FAQs" });
      }
      filter.course = courseId;
    }

    // ✅ Find FAQ Masters
    const faqMasters = await FAQMaster.find(filter).populate({
      path: "course",
      select: "title",
    });

    if (!faqMasters.length) {
      return res.status(404).json({ message: "No FAQs found" });
    }

    // ✅ Fetch all FAQ details
    const faqs = await FAQDetail.find({
      faqMaster: { $in: faqMasters.map((m) => m._id) },
    });

    res.status(200).json({ faqs });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching FAQs", error: error.message });
  }
};
