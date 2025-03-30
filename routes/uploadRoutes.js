const express = require('express');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/image');
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });
const router = express.Router();

router.post('/',upload.single('image'), (req, res) => {
  res.status(201).json({
    status: 'success',
    message: 'file uploaded',
    file: req.file,
  });
});

module.exports = router;
