import express from "express";
import { authenticateUser } from "../middleware/authenticateUser.js";
import {
  getUserNotifications,
  markAsRead,
} from "../controllers/notificationController.js";

const NotificationRouter = express.Router();

NotificationRouter.get("/", authenticateUser, getUserNotifications);
NotificationRouter.patch("/:id/read", authenticateUser, markAsRead);

export default NotificationRouter;
