import { certificateModel } from "../models/certificateModel.js";
import { CourseModel } from "../models/courseModel.js";




// ✅ Get all certificates for logged-in user
export const getMyCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find({ student: req.user.id })
      .populate("course", "title")
      .sort({ issuedAt: -1 });

    res.status(200).json({ certificates });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching certificates", error: error.message });
  }
};

// ✅ Get one certificate by ID
export const getCertificateById = async (req, res) => {
  try {
    const certificate = await Certificate.findOne({
      _id: req.params.id,
      student: req.user.id,
    }).populate("course", "title");

    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    res.status(200).json({ certificate });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching certificate", error: error.message });
  }
};
