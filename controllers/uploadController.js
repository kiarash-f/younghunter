const Image = require('../models/imageModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');

exports.uploadFormData = catchAsync(async (req, res, next) => {
  req.body.url = `/public/image/${req.file.filename}`;
  const newImage = await Image.create(req.body);
  console.log(newImage);
  res
    .status(201)
    .json({ message: 'File uploaded and saved!', image: newImage });
});
