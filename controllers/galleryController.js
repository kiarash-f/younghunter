const Gallery = require('../models/gallerymodel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllImages = catchAsync(async (req, res) => {
  const features = new APIFeatures(Gallery.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const gallery = await features.query;
  res.status(200).json({
    status: 'success',
    result: gallery.length,
    data: {
      gallery,
    },
  });
});
exports.getImage = catchAsync(async (req, res) => {
  const image = await Gallery.findById(req.params.id);

  if (!image) {
    return next(new AppError('No image found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      image,
    },
  });
});
exports.createImage = catchAsync(async (req, res) => {
  //   console.log(req.body);

  const newImage = await Gallery.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      image: newImage,
    },
  });
});
exports.updateImage = catchAsync(async (req, res) => {
  const image = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!image) {
    return next(new AppError('No image found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      image,
    },
  });
});
exports.deleteImage = catchAsync(async (req, res) => {
  await Gallery.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
