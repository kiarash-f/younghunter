const Image = require('../models/imageModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');
const multer = require('multer');
const path = require('path');

// Set up storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/image'); // Save files in the "uploads" folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  },
});
// Initialize Multer
const upload = multer({
  storage: storage,
});

module.exports = upload;
