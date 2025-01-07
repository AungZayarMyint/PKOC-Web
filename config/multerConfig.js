const multer = require("multer");
const path = require("path");

const storageConfigure = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const fileFilterConfigure = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storageConfigure,
  fileFilter: fileFilterConfigure,
}).array("photos", 15);

// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const { v4: uuidv4 } = require('uuid');  // To generate unique filenames

// class Helper {

//   // Function to handle file upload
//   async uploadFile(folderName, file) {
//     try {
//       // Define storage location and filename for uploaded files
//       const storage = multer.diskStorage({
//         destination: (req, file, cb) => {
//           const uploadPath = path.join(__dirname, 'uploads', folderName); // e.g. uploads/banners
          
//           // Ensure the directory exists
//           if (!fs.existsSync(uploadPath)) {
//             fs.mkdirSync(uploadPath, { recursive: true });
//           }

//           cb(null, uploadPath);
//         },
//         filename: (req, file, cb) => {
//           // Generate a unique filename based on UUID and the original file extension
//           const uniqueSuffix = uuidv4();
//           const extension = path.extname(file.originalname); // Get the file extension
//           const fileName = `${uniqueSuffix}${extension}`;
//           cb(null, fileName);
//         }
//       });

//       // Initialize multer with the storage configuration
//       const upload = multer({ storage }).single('photo'); // 'photo' is the field name in the form

//       // Return a promise to handle asynchronous file upload
//       return new Promise((resolve, reject) => {
//         upload({ file }, (err) => {
//           if (err) {
//             reject({ status: 'error', message: 'File upload failed', error: err });
//           } else {
//             const filePath = path.join('uploads', folderName, file.filename);
//             resolve(filePath); // Return the relative file path
//           }
//         });
//       });
//     } catch (error) {
//       throw new Error(`File upload error: ${error.message}`);
//     }
//   }
// }

module.exports = Helper;


module.exports = upload;
