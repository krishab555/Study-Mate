// backend/routes/analyticsRoutes.js
import express from "express";
import Visitor from "../models/Visitor.js";

const  analyticsRoutes = express.Router();

// Log a visitor
analyticsRoutes.post("/visitors/log", async (req, res) => {
  try {
    const { page } = req.body;
    const visitor = new Visitor({ page });
    await visitor.save();
    res.json({ message: "Visitor logged!" });
  } catch (err) {
    res.status(500).json({ message: "Failed to log visitor." });
  }
});

export default analyticsRoutes;
