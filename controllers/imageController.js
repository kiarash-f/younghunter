const Image = require('../models/imageModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');
const upload = require('./uploadController');
const mongoose = require('mongoose');

exports.getAllImages = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Image.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const images = await features.query;

  res.status(200).json({
    status: 'success',
    results: images.length,
    data: { images },
  });
  console.log('route hits');
});

exports.getImage = catchAsync(async (req, res, next) => {
  const image = await Image.findById(req.params.id);

  if (!image) {
    return next(new AppError('No image found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { image },
  });
});

exports.createImage = [
  upload.single('image'),
  catchAsync(async (req, res, next) => {
    const { title, location, isFeaturedCarousel, dateTaken, image, position } =
      req.body;

    // const imagePath = req.file ? req.file.path : null;
    const imagePath = `${req.protocol}://${req.get('host')}/public/image/${
      req.file.filename
    }`;

    const newImage = await Image.create({
      ...req.body,
      url: imagePath,
    });

    res.status(201).json({
      status: 'success',
      data: { image: newImage },
    });
  }),
];

exports.updateImage = catchAsync(async (req, res, next) => {
  const updatedImage = await Image.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedImage) {
    return next(new AppError('No image found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { image: updatedImage },
  });
});

exports.updateImage = catchAsync(async (req, res, next) => {
  const updatedImage = await Image.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedImage) {
    return next(new AppError('No image found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { image: updatedImage },
  });
});

exports.deleteImage = catchAsync(async (req, res, next) => {
  const image = await Image.findByIdAndDelete(req.params.id);

  if (!image) {
    return next(new AppError('No image found with that ID', 404));
  }

  res.status(204).json({ status: 'success', data: null });
});
