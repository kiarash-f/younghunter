const mongoose = require('mongoose');
const slugify = require('slugify');

const albumSchema = new mongoose.Schema({
  title: {
    en: {
      type: String,
      required: [true, 'An album must have a title in English'],
      trim: true,
      maxlength: [40, 'An album title (English) must have 40 characters or less'],
      minlength: [5, 'An album title (English) must have 5 characters or more'],
    },
    fa: {
      type: String,
      required: [true, 'An album must have a title in Persian'],
      trim: true,
      maxlength: [40, 'An album title (Persian) must have 40 characters or less'],
      minlength: [5, 'An album title (Persian) must have 5 characters or more'],
    },
  },
  slug: String,
  description: {
    en: {
      type: String,
      trim: true,
    },
    fa: {
      type: String,
      trim: true,
    },
  },
  category: {
    en: {
      type: String,
      required: [true, 'An album must have a category in English'],
    },
    fa: {
      type: String,
      required: [true, 'An album must have a category in Persian'],
    },
  },
  tags: {
    en: [String],
    fa: [String],
  },
  imageCover: {
    type: String,
    required: [true, 'An album must have a cover image'],
  },
  images: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Image',
    },
  ],
  parentAlbum: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album',
  },
  subAlbums: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Album',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
    select: false,
  },
  published: {
    type: Boolean,
    default: false,
  },
  isPrivate: {
    type: Boolean,
    default: false,
  },
  views: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

// Pre-save middleware to generate slug
albumSchema.pre('save', function (next) {
  this.slug = slugify(this.title.en, { lower: true });
  next();
});


const Album = mongoose.model('Album', albumSchema);

module.exports = Album;