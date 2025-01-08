const Gallery = require('../models/gallerymodel');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllImages = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.getImage = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        image,
      },
    });
  } catch (err) {
    console.log(req.params.id);
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.createImage = async (req, res) => {
  //   console.log(req.body);
  try {
    const newImage = await Gallery.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        image: newImage,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.updateImage = async (req, res) => {
  try {
    const image = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        image,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.deleteImage = async(req, res) => {

  try{
    await Gallery.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  }catch(err){
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
