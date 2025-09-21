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

    console.log("Role from req body:", reqBody.role);
    console.log("Using role name:", reqBody.role || "Student");
    const role = await RoleModel.findOne({ name: reqBody.role || "Student" });
    console.log("Role found in DB:", role);
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

// User Profile
export const getProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id)
      .select("-password")
      .populate("role", "name"); 

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });


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

// Get All Users (Admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find().select("-password").populate("role","name").populate("enrolledCourses","title");
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Single User by ID (Admin or Teacher)
export const getSingleUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId)
      .select("-password")
      .populate("role");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Upload user profile image
export const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const user = await UserModel.findByIdAndUpdate(
      req.user.id,
      { image: `/uploads/images/${req.file.filename}` }, // store relative path
      { new: true }
    );

    res.json({ message: "Profile image uploaded successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Create Instructor (Admin only)
export const createInstructor = async (req, res) => {
  try {
    const { name, email, password, subjects } = req.body;

    const existing = await UserModel.findOne({ email });
    if (existing)
      return res.json({ success: false, message: "Email already exists" });

    const role = await RoleModel.findOne({ name: "Instructor" });
    if (!role)
      return res.json({ success: false, message: "Instructor role not found" });

    const newInstructor = await UserModel.create({
      name,
      email,
      password,
      subjects,
      role: role._id,
    });
    const populatedInstructor = await UserModel.findById(
      newInstructor._id
    ).populate("role", "name");

    res.json({ success: true, data: populatedInstructor });
  } catch (err) {
    console.error("Create instructor error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
export const getAllInstructors = async (req, res) => {
  try {
    // Find role ID for Instructor
    const instructorRole = await RoleModel.findOne({ name: "Instructor" });
    if (!instructorRole) {
      return res
        .status(404)
        .json({ success: false, message: "Instructor role not found" });
    }

    const instructors = await UserModel.find({
      role: instructorRole._id,
    }).select("_id name email");

    res.status(200).json({ success: true, data: instructors });
  } catch (err) {
    console.error("Error fetching instructors:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch instructors" });
  }
};

