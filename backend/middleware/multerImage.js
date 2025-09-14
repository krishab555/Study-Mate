import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure folder exists
const uploadPath = "uploads/images";
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});

// Only allow images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Only image files are allowed (jpg, jpeg, png)"));
};

export const uploadImage = multer({ storage, fileFilter });
