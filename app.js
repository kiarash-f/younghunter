const express = require('express');
const morgan = require('morgan');

const galleryRouter = require('./routes/galleryRoutes');

const app = express();

// Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());

// Routes
app.use('/api/v1/gallery', galleryRouter);

module.exports = app;
