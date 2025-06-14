import multer from "multer";
// import path from "path"; // ✅ Import path for file extension checks

// Configure Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "productImages/"); // Folder where images will be saved
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  },
});

// File Upload Filter & Limits
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit: 5MB
  //   fileFilter: (req, file, cb) => {
  //     const allowedTypes = /jpeg|jpg|png/;
  //     const extname = allowedTypes.test(
  //       path.extname(file.originalname).toLowerCase()
  //     );
  //     const mimetype = allowedTypes.test(file.mimetype);

  //     if (extname && mimetype) {
  //       cb(null, true); // ✅ File is valid
  //     } else {
  //       cb(new Error("Invalid file type. Only JPG, JPEG, and PNG are allowed.")); // ❌ Reject invalid files
  //     }
  //   },
});

// Export Middleware for Uploading Images
export const productImage = upload.array("images", 5); // ✅ Allows up to 5 images
