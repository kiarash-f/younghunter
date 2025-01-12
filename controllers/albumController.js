const Album = require('../models/albumModel');
const Image = require('../models/imageModel'); // Assuming images are stored in a separate collection
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');

// Get all albums
exports.getAllAlbums = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Album.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const albums = await features.query;

  res.status(200).json({
    status: 'success',
    results: albums.length,
    data: { albums },
  });
});

// Get a single album with sub-albums and images populated
exports.getAlbum = catchAsync(async (req, res, next) => {
  const album = await Album.findById(req.params.id)
    .populate('subAlbums')
    .populate('images');

  if (!album) {
    return next(new AppError('No album found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { album },
  });
});

// Create a new album
exports.createAlbum = catchAsync(async (req, res, next) => {
  const newAlbum = await Album.create(req.body);

  res.status(201).json({
    status: 'success',
    data: { album: newAlbum },
  });
});

// Update an album (e.g., add sub-albums or metadata)
exports.updateAlbum = catchAsync(async (req, res, next) => {
  const updatedAlbum = await Album.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedAlbum) {
    return next(new AppError('No album found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { album: updatedAlbum },
  });
});

// Delete an album and optionally cascade-delete sub-albums and images
exports.deleteAlbum = catchAsync(async (req, res, next) => {
  const album = await Album.findById(req.params.id);

  if (!album) {
    return next(new AppError('No album found with that ID', 404));
  }

  // Cascade delete sub-albums and images if required
  await Album.deleteMany({ _id: { $in: album.subAlbums } });
  await Image.deleteMany({ _id: { $in: album.images } });

  await Album.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

// Add images to an album
exports.addImagesToAlbum = catchAsync(async (req, res, next) => {
  const album = await Album.findById(req.params.id);

  if (!album) {
    return next(new AppError('No album found with that ID', 404));
  }

  const { imageIds } = req.body;
  if (!Array.isArray(imageIds)) {
    return next(new AppError('imageIds must be an array of image IDs', 400));
  }

  album.images.push(...imageIds);
  await album.save();

  res.status(200).json({
    status: 'success',
    data: { album },
  });
});

// Add sub-albums to an album
exports.addSubAlbums = catchAsync(async (req, res, next) => {
  const album = await Album.findById(req.params.id);

  if (!album) {
    return next(new AppError('No album found with that ID', 404));
  }

  const { subAlbumIds } = req.body;
  if (!Array.isArray(subAlbumIds)) {
    return next(new AppError('subAlbumIds must be an array of album IDs', 400));
  }

  album.subAlbums.push(...subAlbumIds);
  await album.save();

  res.status(200).json({
    status: 'success',
    data: { album },
  });
});
