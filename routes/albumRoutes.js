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

// SubAlbum Routes
router
  .route('/:albumId/sub-albums')
  .get(authController.protect, albumController.getAllSubAlbums) // Fetch all sub-albums for an album
  .post(authController.protect, albumController.createSubAlbum); // Create a new sub-album

router
  .route('/:albumId/sub-albums/:subAlbumId')
  .get(albumController.getSubAlbum) // Fetch a single sub-album
  .patch(authController.protect, albumController.updateSubAlbum) // Update a specific sub-album
  .delete(authController.protect, albumController.deleteSubAlbum); // Delete a specific sub-album

router
  .route('/:albumId/sub-albums/:subAlbumId/images')
  .patch(authController.protect, albumController.addImagesToSubAlbum); // Add images to a specific sub-album

// New Route: Delete an image from a specific sub-album
router
  .route('/:albumId/sub-albums/:subAlbumId/images/:imageId')
  .delete(authController.protect, albumController.deleteImageFromSubAlbum); // Delete an image from a specific sub-album

router
  .route('/:albumId/sub-albums/:subAlbumId/images')
  .get(albumController.getImagesFromSubAlbum); // Fetch all images from a specific sub-album

module.exports = router;
