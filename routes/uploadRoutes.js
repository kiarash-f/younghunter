const express = require('express');
const multer = require('multer');
const path = require('path');

app.use(express.static('public'));
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

router.post('/', upload.single('image'), (req, res) => {
  console.log('Received file:', req.file); // Debugging
  console.log('Received body:', req.body); // Debugging

  if (!req.file) {
    return res
      .status(400)
      .json({ status: 'fail', message: 'No file uploaded' });
  }

  res.status(201).json({
    status: 'success',
    message: 'File uploaded successfully',
    file: req.file,
  });
});

module.exports = router;
