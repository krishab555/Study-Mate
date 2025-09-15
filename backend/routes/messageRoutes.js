import express from "express";
import {
  sendMessage,
  getAdminMessages,
} from "../controllers/messageController.js";

const messageRouter = express.Router();

messageRouter.post("/", sendMessage);
messageRouter.get("/admin", getAdminMessages); // for admin dashboard

export default messageRouter;
