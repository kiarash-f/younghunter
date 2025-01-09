const express = require('express');
const galleryController = require('../controllers/galleryController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(galleryController.getAllImages)
  .post(authController.protect,galleryController.createImage);

router
  .route('/:id')
  .get(galleryController.getImage)
  .patch(authController.protect,galleryController.updateImage)
  .delete(authController.protect,galleryController.deleteImage);

module.exports = router;
