const express = require('express');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/public/image');
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });
const router = express.Router();

router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded!' });
    }

    // Get form data from request body
    const {
      enTitle,
      faTitle,
      enLocation,
      faLocation,
      dateTaken,
      position,
      isFeaturedCarousel,
    } = req.body;

    // Create new image document in MongoDB
    const newImage = new Image({
      title: {
        en: enTitle,
        fa: faTitle,
      },
      url: `/uploads/${req.file.filename}`, // URL to access the file
      width: req.file.width || null, // Width (if extracted)
      height: req.file.height || null, // Height (if extracted)
      size: Math.round(req.file.size / 1024), // Convert bytes to KB
      location: {
        name: {
          en: enLocation,
          fa: faLocation,
        },
      },
      dateTaken: dateTaken,
      position: position,
      isFeaturedCarousel: isFeaturedCarousel === 'true', // Convert string to boolean
    });

    await newImage.save(); // Save to database

    res
      .status(201)
      .json({ message: 'File uploaded and saved!', image: newImage });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
