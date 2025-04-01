// const express = require('express');
// const uploadController = require('../controllers/uploadController');
// const authController = require('../controllers/authController');
// const multer = require('multer');
// const path = require('path');

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/image');
//   },
//   filename: (req, file, cb) => {
//     console.log(file);
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });
// const upload = multer({ storage });

// const router = express.Router();

// // Upload route
// router.post('/', upload.single('image'), uploadController.uploadFormData);

// module.exports = router;


