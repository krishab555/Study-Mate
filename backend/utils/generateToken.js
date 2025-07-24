import jwt from "jsonwebtoken";
import { UserModel } from "../models/UserModel.js";

export const generateToken = async (user) => {
  try {
    // Sign the token with user data and secret key
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );
    return token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const decodeJWT = async (token) => {
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded || !decoded._id) {
      console.log("Invalid Token Detected!!!");
      return null;
    }

    const userId = decoded._id;

    const foundUser = await UserModel.findById(userId);

    return foundUser;
  } catch (error) {
    console.log(error);
    return null;
  }
};
