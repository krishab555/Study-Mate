// backend/routes/searchRoutes.js
import express from "express";
import { searchController } from "../controllers/searchController.js";

import { authenticateUser } from "../middleware/authenticateUser.js";

const searchRouter = express.Router();

searchRouter.get("/", authenticateUser, searchController);

export default searchRouter;
