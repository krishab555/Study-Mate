import { NotificationModel } from "../models/notificationModel.js";

// Get all notifications for logged-in user
export const getUserNotifications = async (req, res) => {
  try {
    const notifications = await NotificationModel.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json({ success: true, data: notifications });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching notifications" });
  }
};

// Mark notification as read
export const markAsRead = async (req, res) => {
  try {
    const notification = await NotificationModel.findById(req.params.id);
    if (!notification)
      return res.status(404).json({ success: false, message: "Not found" });

    if (notification.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    notification.isRead = true;
    await notification.save();

    res.json({ success: true, message: "Notification marked as read" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error updating notification" });
  }
};

// Helper to create a notification (call this in other controllers)
export const createNotification = async ({ userId, message, type }) => {
  try {
    const notification = new NotificationModel({ user: userId, message, type });
    await notification.save();
  } catch (error) {
    console.error("Error creating notification:", error);
  }
};
