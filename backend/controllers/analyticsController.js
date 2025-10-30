import { VisitorModel } from "../models/VisitorModel.js";


// Get visitor stats by month
export const getVisitorStats = async (req, res) => {
  try {
    // Get all visitors
    const visitors = await VisitorModel.find();

    // Prepare months array
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    // Count visitors per month
    const data = Array(12).fill(0); // initialize 12 months with 0

    visitors.forEach(visitor => {
      const month = new Date(visitor.date).getMonth(); // 0–11
      data[month]++;
    });

    res.json({ months, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch visitor stats." });
  }
};
