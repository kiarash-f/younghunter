const express = require('express');
const imageController = require('../controllers/imageController');
const authController = require('../controllers/authController');

const router = express.Router();

// Routes for images
router
  .route('/')
  .get(imageController.getAllImages) // Fetch all images
  .post(authController.protect, imageController.createImage); // Create a new image

router
  .route('/:id')
  .get(imageController.getImage) // Fetch a single image by ID
  .patch(authController.protect, imageController.updateImage) // Update image metadata
  .delete(authController.protect, imageController.deleteImage); // Delete an image

module.exports = router;
