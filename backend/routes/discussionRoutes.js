import express from "express";
import {
  createDiscussion,
  getAllDiscussion,
  deleteDiscussion,
  pinDiscussion,
} from "../controllers/discussionControllers.js";
import { authenticateUser } from "../middleware/authenticateUser.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";

const discussionRouter = express.Router();

discussionRouter.get("/", getAllDiscussion); 
discussionRouter.post("/", authenticateUser, createDiscussion);
discussionRouter.delete(
  "/:id",
  authenticateUser,
  authorizeRoles("Admin"),
  deleteDiscussion
);
discussionRouter.patch(
  "/:id/pin",
  authenticateUser,
  authorizeRoles("Instructor"),
  pinDiscussion
);

export default discussionRouter;
