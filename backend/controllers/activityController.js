import { ActivityModel } from "../models/activityModel.js";

// ✅ Add new activity
export const addActivity = async (message, type = "user") => {
  try {
    const newActivity = new ActivityModel({ message, type });
    await newActivity.save();
  } catch (err) {
    console.error("Failed to log activity:", err.message);
  }
};

// ✅ Get all recent activities
export const getRecentActivities = async (req, res) => {
  try {
    const activities = await ActivityModel.find()
      .sort({ createdAt: -1 })
      .limit(10);
    res.json(activities);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch activities." });
  }
};
