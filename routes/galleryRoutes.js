const express = require('express');
const galleryController = require('../controllers/galleryController');

const router = express.Router();

router
  .route('/')
  .get(galleryController.getAllImages)
  .post(galleryController.createImage);

router
  .route('/:id')
  .get(galleryController.getImage)
  .patch(galleryController.updateImage)
  .delete(galleryController.deleteImage);

module.exports = router;
