const mongoose = require('mongoose');
const slugify = require('slugify');

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A gallery must have a title'],
    unique: true,
    trim: true,
    maxlength: [
      40,
      'A gallery title must have less or equal then 40 characters',
    ],
    minlength: [
      5,
      'A gallery title must have more or equal then 10 characters',
    ],
    // validate: [validator.isAlpha, 'Tour name must only contain characters']
  },
  slug: String,
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'A gallery must have a cover image'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});
gallerySchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

const Gallery = mongoose.model('Gallery', gallerySchema);

module.exports = Gallery;
