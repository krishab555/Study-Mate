import express from "express";
import { UserModel } from "../models/User.js";

const router = express.Router();

// Middleware to check if logged-in user is admin
function isAdmin(req, res, next) {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ error: "Access denied. Admin only." });
  }
  next();
}

// Admin creates an Instructor
router.post("/create-instructor", isAdmin, async (req, res) => {
  try {
    const { name, email, password, address, subjects } = req.body;

    // Ensure unique email
    const existing = await UserModel.findOne({ email });
    if (existing)
      return res.status(400).json({ error: "Email already exists" });

    const newInstructor = new UserModel({
      name,
      email,
      password,
      address,
      role: "instructor", // ✅ force instructor role
      subjects, // optional
    });

    await newInstructor.save();
    res.json({
      message: "Instructor created successfully",
      instructor: newInstructor,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
