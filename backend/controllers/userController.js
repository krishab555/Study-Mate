import { UserModel, validateUserSchema } from "../models/UserModel.js";
import { RoleModel } from "../models/RoleModel.js";
import { generateToken } from "../utils/generateToken.js";

// Register User
export const registerUser = async (req, res) => {
  try {
    const reqBody = req.body;

    const validatedUser = validateUserSchema.validate(reqBody);
    if (validatedUser.error) {
      return res.json({ success: false, message: validatedUser.error.message });
    }

    const foundUser = await UserModel.findOne({ email: reqBody.email });
    if (foundUser) {
      return res.json({
        success: false,
        message: `User with email: ${reqBody.email} already exists`,
      });
    }

    const role = await RoleModel.findOne({ name: reqBody.role || "Student" });
    if (!role) {
      return res.json({ success: false, message: "Invalid role specified" });
    }

    const newUserData = {
      ...validatedUser.value,
      role: role._id,
    };

    const newUser = await UserModel.create(newUserData);

    return res.json({
      success: true,
      data: newUser,
      message: `Dear ${newUser.name}, welcome to Study Mate!`,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundUser = await UserModel.findOne({ email }).populate("role");
    if (!foundUser) {
      return res.json({ success: false, message: "Invalid credentials!" });
    }

    const isMatch = await foundUser.isPasswordValid(password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials!" });
    }

    const token = await generateToken({ _id: foundUser._id });
    if (!token) {
      return res.json({ success: false, message: "Token generation failed!" });
    }

    const userData = {
      _id: foundUser._id,
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role?.name,
      address: foundUser.address,
      token,
    };

    return res.json({
      success: true,
      data: userData,
      message: `Welcome back, ${foundUser.name}!`,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get Logged-In User Profile
export const getProfile = async (req, res) => {
  try {
    const user = req.user.toObject();
    delete user.password;

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update User
export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const reqBody = req.body;

    const foundUser = await UserModel.findById(userId);
    if (!foundUser) {
      return res.json({ success: false, message: "User not found" });
    }

    // Only owner or Admin can update
    if (
      foundUser._id.toString() !== req.user._id.toString() &&
      req.user.role.name !== "Admin"
    ) {
      return res.json({
        success: false,
        message: "You are not allowed to update this user!",
      });
    }

    const updatedUser = await UserModel.findByIdAndUpdate(userId, reqBody, {
      new: true,
    });

    return res.json({
      success: true,
      data: updatedUser,
      message: "User updated successfully!",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update Password
export const updatePassword = async (req, res) => {
  try {
    const { userId } = req.params;
    const { oldPassword, newPassword } = req.body;

    const foundUser = await UserModel.findById(userId);
    if (!foundUser) {
      return res.json({ success: false, message: "User not found!" });
    }

    if (
      foundUser._id.toString() !== req.user._id.toString() &&
      req.user.role.name !== "Admin"
    ) {
      return res.json({
        success: false,
        message: "You are not allowed to update this password!",
      });
    }

    const isMatch = await foundUser.isPasswordValid(oldPassword);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Old password does not match!",
      });
    }

    foundUser.password = newPassword;
    await foundUser.save();

    res.json({ success: true, message: "Password updated successfully!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Delete User
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const foundUser = await UserModel.findById(userId);
    if (!foundUser) {
      return res.json({ success: false, message: "User not found!" });
    }

    await UserModel.findByIdAndDelete(userId);

    return res.json({
      success: true,
      message: `${foundUser.name} deleted successfully.`,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
