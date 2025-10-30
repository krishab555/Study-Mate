// backend/routes/analyticsRoutes.js
import express from "express";
import { getVisitorStats } from "../controllers/analyticsController.js";
import { VisitorModel } from "../models/VisitorModel.js";


const  analyticRoutes = express.Router();

// Log a visitor
analyticRoutes.post("/visitors/log", async (req, res) => {
  const { page } = req.body;
  try {
    
    const visitor = new VisitorModel({ page });
    await visitor.save();
    res.json({ message: "Visitor logged!" });
  } catch (err) {
    res.status(500).json({ message: "Failed to log visitor." });
  }
});
analyticRoutes.get("/visitors/stats", getVisitorStats);

export default analyticRoutes;
