import {  certificateModel } from "../models/certificateModel.js";
import { CourseModel } from "../models/courseModel.js";




// ✅ Get all certificates for logged-in user
export const getMyCertificates = async (req, res) => {
  try {
    const certificates = await certificateModel.find({ student: req.user.id })
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
    const certificate = await certificateModel.findOne({
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
//  Admin: Get all pending certificates
export const getPendingCertificates = async (req, res) => {
  try {
    const certificates = await certificateModel
      .find({ status: "PendingAdminApproval" })
      .populate("student", "name email")
      .populate("course", "title");

    res.status(200).json({ certificates });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching pending certificates",
      error: error.message,
    });
  }
};

//  Admin: Approve or reject a certificate
export const reviewCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminFeedback } = req.body;

    if (!["Issued", "Rejected"].includes(status)) {
      return res
        .status(400)
        .json({ message: "Status must be 'Issued' or 'Rejected'." });
    }

    const certificate = await certificateModel.findById(id);
    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    if (status === "Issued") {
      certificate.issuedAt = new Date(); 
    }

    certificate.status = status;
    certificate.adminFeedback = adminFeedback || "";
    await certificate.save();

    res.status(200).json({
      message: `Certificate ${status.toLowerCase()} successfully`,
      certificate,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error reviewing certificate",
      error: error.message,
    });
  }
};
