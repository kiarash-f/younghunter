const mongoose = require('mongoose');
const slugify = require('slugify');

const imageSchema = new mongoose.Schema({
  title: {
    en: { type: String, trim: true },
    fa: { type: String, trim: true },
  },
  url: { type: String, required: true },
  width: Number,
  height: Number,
  size: Number, // in KB
  location: {
    name: {
      en: { type: String, trim: true }, // Location name in English
      fa: { type: String, trim: true }, // Location name in Persian
    },
  },
  dateTaken: {
    type: Date,
    // required: [true, 'The photo must have a date taken'],
  },
  // position: { type: String, required: true },
  isFeaturedCarousel: { type: Boolean, required: true, default: false },
});

// Pre-save middleware to generate slug
imageSchema.pre('save', function (next) {
  if (this.location && this.location.name && this.location.name.en) {
    this.slug = slugify(this.location.name.en, { lower: true });
  } else {
    // If location or location.name.en is not provided, handle accordingly (maybe assign default or skip slug generation)
    this.slug = slugify(this.url, { lower: true }); // You can choose a fallback method here
  }
  next();
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
