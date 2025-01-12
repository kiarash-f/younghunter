const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Album = require('../../models/albumModel'); // Path to your album model
const Image = require('../../models/imageModel'); // Path to your image model

dotenv.config({ path: './config.env' });

// Database connection string
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// Connecting to MongoDB
mongoose.connect(DB, {}).then(() => console.log('DB connection successful!'));

// Reading the hardcoded data from JSON files
const albums = JSON.parse(fs.readFileSync(`${__dirname}/albums.json`, 'utf-8'));
const images = JSON.parse(fs.readFileSync(`${__dirname}/images.json`, 'utf-8'));

// Function to import data into the database
const importData = async () => {
  try {
    // Insert albums into the database
    await Album.create(albums, { validateBeforeSave: false });
    console.log('Albums data successfully loaded!');

    // Insert images into the database
    await Image.create(images, { validateBeforeSave: false });
    console.log('Images data successfully loaded!');
  } catch (err) {
    console.error('Error importing data:', err);
  }
  process.exit();
};

// Function to delete all data from the database
const deleteData = async () => {
  try {
    // Delete all albums and images
    await Album.deleteMany();
    console.log('Albums data successfully deleted!');

    await Image.deleteMany();
    console.log('Images data successfully deleted!');
  } catch (err) {
    console.error('Error deleting data:', err);
  }
  process.exit();
};

// Execute import or delete based on command-line arguments
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
} else {
  console.log('Please specify "--import" or "--delete" as the argument.');
  process.exit();
}
