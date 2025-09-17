// backend/models/Visitor.js
import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  page: { type: String, default: "home" },
});


export const VisitorModel = mongoose.model("Visitor", visitorSchema);
