import express from "express";
import { addFAQ, getFAQs } from "../controllers/FAQControllers.js";
import { authenticateUser } from "../middleware/authenticateUser.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";
import FAQMaster from "../models/FAQMaster.js"; // default export
import FAQDetail from "../models/FAQDetail.js"; // default export
import { CourseModel } from "../models/courseModel.js"; // named export

const router = express.Router();

// Add FAQ
router.post(
  "/",
  authenticateUser,
  authorizeRoles("Admin", "Instructor"),
  addFAQ
);

// Get all subjects
router.get("/subjects", async (req, res) => {
  try {
    const subjects = await FAQMaster.find()
      .populate({ path: "course", model: "courses", select: "title" })
      .sort({ createdAt: -1 });
    res.json({ success: true, data: subjects });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get FAQ by master ID
router.get("/:faqMasterId", async (req, res) => {
  try {
    const { faqMasterId } = req.params;
    const faqs = await FAQDetail.find({ faqMaster: faqMasterId }).sort({
      createdAt: -1,
    });
    res.json({ success: true, data: faqs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
