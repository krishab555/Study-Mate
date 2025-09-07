// backend/routes/faqRoutes.js
import express from "express";
import { addFAQ, getFAQs } from "../controllers/FAQControllers.js";
import { authenticateUser } from "../middleware/authenticateUser.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";
import FAQMaster from "../models/FAQMaster.js";
import FAQDetail from "../models/FAQDetail.js";
import { CourseModel } from "../models/courseModel.js";

const router = express.Router();

router.post(
  "/",
  authenticateUser,
  authorizeRoles("Admin", "Instructor"),
  addFAQ
);

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
// GET /api/faqs/:faqMasterId
router.get("/:faqMasterId", async (req, res) => {
  try {
    const { faqMasterId } = req.params;
    const faqs = await FAQDetail.find({ faqMaster: faqMasterId }).sort({ createdAt: -1 });
    res.json({ success: true, data: faqs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


export default router;
