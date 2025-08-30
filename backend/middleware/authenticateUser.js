import jwt from "jsonwebtoken";
import { UserModel } from "../models/UserModel.js";
import { authorizeRoles } from "./authorizeRoles.js";

export const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded?._id) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: Invalid token" });
    }

    const user = await UserModel.findById(decoded._id)
      .populate("role", "name")
      .select("-password");

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: User not found" });
    }

    req.user = user; // attach user to request for later use
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: Token error" });
  }
};
