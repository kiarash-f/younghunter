const Album = require('../models/albumModel');
const Image = require('../models/imageModel'); // Assuming images are stored in a separate collection
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');
const upload = require('./uploadController');

// Get all albums
exports.getAllAlbums = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    Album.find().populate('subAlbums.images'),
    req.query
  )
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
    .populate({
      path: 'subAlbums',
      populate: {
        path: 'images', // This will populate the images field inside each subAlbum
        select: 'imageCover title',
      },
    })
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
exports.createAlbum = [
  upload.single('imageCover'),
  catchAsync(async (req, res, next) => {
    const { title, category, tags, imageCover } = req.body;

    const imageCoverPath = `${req.protocol}://${req.get('host')}/public/image/${
      req.file.filename
    }`;
    const newAlbum = await Album.create({
      ...req.body,
      imageCover: imageCoverPath,
    });

    res.status(201).json({
      status: 'success',
      data: { album: newAlbum },
    });
  }),
];
// Update an album (e.g., add sub-albums or metadata)
exports.updateAlbum = [
  upload.single('image'),
  catchAsync(async (req, res, next) => {
    const updatedData = { ...req.body };

    if (req.file) {
      const imagePath = `${req.protocol}://${req.get('host')}/public/image/${
        req.file.filename
      }`;
      updatedData.imageCover = imagePath;
    }

    const updatedAlbum = await Album.findByIdAndUpdate(
      req.params.id,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedAlbum) {
      return next(new AppError('No album found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: { album: updatedAlbum },
    });
  }),
];
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
exports.createSubAlbum = [
  upload.single('imageCover'),
  catchAsync(async (req, res, next) => {
    const album = await Album.findById(req.params.albumId);

    if (!album) {
      return next(new AppError('No album found with that ID', 404));
    }

    const subAlbumData = req.body;
    const { ...imageCover } = subAlbumData;
    const imageCoverPath = `${req.protocol}://${req.get('host')}/public/image/${
      req.file.filename
    }`;

    album.subAlbums.push({
      ...subAlbumData,
      imageCover: imageCoverPath,
    });
    await album.save();

    res.status(201).json({
      status: 'success',
      data: { album },
    });
  }),
];
exports.deleteSubAlbum = catchAsync(async (req, res, next) => {
  const album = await Album.findById(req.params.albumId);

  if (!album) {
    return next(new AppError('No album found with that ID', 404));
  }

  const subAlbumId = req.params.subAlbumId;
  const subAlbumIndex = album.subAlbums.findIndex(
    (sub) => sub._id.toString() === subAlbumId
  );

  if (subAlbumIndex === -1) {
    return next(new AppError('No sub-album found with that ID', 404));
  }

  album.subAlbums.splice(subAlbumIndex, 1); // Remove subalbum
  await album.save();

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
exports.getSubAlbum = catchAsync(async (req, res, next) => {
  const album = await Album.findById(req.params.albumId).populate(
    'subAlbums.images'
  );

  if (!album) {
    return next(new AppError('No album found with that ID', 404));
  }

  const subAlbum = album.subAlbums.id(req.params.subAlbumId);

  if (!subAlbum) {
    return next(new AppError('No sub-album found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { subAlbum },
  });
});
exports.getAllSubAlbums = catchAsync(async (req, res, next) => {
  const album = await Album.findById(req.params.albumId);

  if (!album) {
    return next(new AppError('No album found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    results: album.subAlbums.length,
    data: { subAlbums: album.subAlbums },
  });
});
exports.updateSubAlbum = catchAsync(async (req, res, next) => {
  const album = await Album.findById(req.params.albumId);

  if (!album) {
    return next(new AppError('No album found with that ID', 404));
  }

  const subAlbum = album.subAlbums.id(req.params.subAlbumId);

  if (!subAlbum) {
    return next(new AppError('No sub-album found with that ID', 404));
  }

  Object.assign(subAlbum, req.body); // Merge updated fields
  await album.save();

  res.status(200).json({
    status: 'success',
    data: { subAlbum },
  });
});
exports.addImagesToSubAlbum = catchAsync(async (req, res, next) => {
  const album = await Album.findById(req.params.albumId);

  if (!album) {
    return next(new AppError('No album found with that ID', 404));
  }

  const subAlbum = album.subAlbums.id(req.params.subAlbumId);

  if (!subAlbum) {
    return next(new AppError('No sub-album found with that ID', 404));
  }

  const { imageIds } = req.body;
  if (!Array.isArray(imageIds)) {
    return next(new AppError('imageIds must be an array of image IDs', 400));
  }

  subAlbum.images = subAlbum.images || []; // Ensure the `images` array exists
  subAlbum.images.push(...imageIds);
  await album.save();

  res.status(200).json({
    status: 'success',
    data: { subAlbum },
  });
});
exports.deleteImageFromSubAlbum = catchAsync(async (req, res, next) => {
  const album = await Album.findById(req.params.albumId);

  if (!album) {
    return next(new AppError('No album found with that ID', 404));
  }

  const subAlbum = album.subAlbums.id(req.params.subAlbumId);

  if (!subAlbum) {
    return next(new AppError('No sub-album found with that ID', 404));
  }

  const { imageId } = req.params;

  const imageIndex = subAlbum.images.findIndex(
    (img) => img.toString() === imageId
  );

  if (imageIndex === -1) {
    return next(
      new AppError('No image found with that ID in the sub-album', 404)
    );
  }

  // Remove the image from the images array
  subAlbum.images.splice(imageIndex, 1);
  await album.save();

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
exports.getImagesFromSubAlbum = catchAsync(async (req, res, next) => {
  const { subAlbumId } = req.params;

  // Fetch the sub-album by ID and populate the images
  const subAlbum = await Album.findById(subAlbumId).populate('images');

  if (!subAlbum) {
    return res.status(404).json({
      status: 'fail',
      message: 'Sub-album not found',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      images: subAlbum.images,
    },
  });
});
