const express = require('express');
const albumController = require('../controllers/albumController');
const authController = require('../controllers/authController');

const router = express.Router();

// Routes for albums
router
  .route('/')
  .get(albumController.getAllAlbums) // Fetch all albums
  .post(authController.protect, albumController.createAlbum); // Create a new album

router
  .route('/:id')
  .get(albumController.getAlbum) // Fetch a single album with sub-albums and images
  .patch(authController.protect, albumController.updateAlbum) // Update album metadata
  .delete(authController.protect, albumController.deleteAlbum); // Delete an album

router
  .route('/:id/images')
  .patch(authController.protect, albumController.addImagesToAlbum); // Add images to an album

router
  .route('/:id/sub-albums')
  .patch(authController.protect, albumController.addSubAlbums); // Add sub-albums to an album

module.exports = router;
