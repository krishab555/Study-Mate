
import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ["Admin", "Teacher", "Student"],
    unique: true,
  },
  permissions: [String], 
});

export const RoleModel = mongoose.model("roles", roleSchema);
