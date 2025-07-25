import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Joi from "joi";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  address: String,

  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "roles",
    required: true,
  },

  // Optional: role-specific data
  subjects: [String], // For Teachers
  enrolledCourses: [String], // For Students
});

// Password methods
userSchema.method("isPasswordValid", async function (password) {
  return await bcrypt.compare(password, this.password);
});

// Hash password before save
userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export const UserModel = mongoose.model("users", userSchema);

// Joi validation schema for input validation
export const validateUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  address: Joi.string().optional(),
  role: Joi.string().optional(), // adjust based on how role is sent from client
  subjects: Joi.array().items(Joi.string()).optional(),
  enrolledCourses: Joi.array().items(Joi.string()).optional(),
});
