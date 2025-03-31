const Image = require('../models/imageModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');

exports.uploadFormData = catchAsync(async (req, res, next) => {
  // if (!req.file) {
  //   return res.status(400).json({ message: 'No file uploaded!' });
  // }

  // Get form data from request body
  // const {
  //   enTitle,
  //   faTitle,
  //   enLocation,
  //   faLocation,
  //   dateTaken,
  //   position,
  //   isFeaturedCarousel,
  // } = req.body;

  // // Validate required fields
  // if (
  //   !enTitle ||
  //   !faTitle ||
  //   !enLocation ||
  //   !faLocation ||
  //   !dateTaken ||
  //   !position
  // ) {
  //   return res.status(400).json({ message: 'Missing required fields!' });
  // }

  // Create new image document in MongoDB
  // const newImage = new Image({
  //   title: {
  //     en: enTitle,
  //     fa: faTitle,
  //   },
  //   url: `/public/image/${req.file.filename}`, // URL to access the file
  //   width: req.file.width || null, // Width (if extracted)
  //   height: req.file.height || null, // Height (if extracted)
  //   size: Math.round(req.file.size / 1024), // Convert bytes to KB
  //   location: {
  //     name: {
  //       en: enLocation,
  //       fa: faLocation,
  //     },
  //   },
  //   dateTaken: dateTaken,
  //   position: position,
  //   isFeaturedCarousel: isFeaturedCarousel === 'true', // Convert string to boolean
  // });
  // await newImage.save(); // Save to database
  const newImage = await Image.create(req.body);
  res
    .status(201)
    .json({ message: 'File uploaded and saved!', image: newImage });
});
