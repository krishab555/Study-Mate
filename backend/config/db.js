
import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    const response = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `✅ MongoDB connected successfully: ${response.connection.name}`
    );
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};
