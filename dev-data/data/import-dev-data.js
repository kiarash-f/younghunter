const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Gallery = require('../../models/gallerymodel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {}).then(() => console.log('DB connection successful!'));

const gallery = JSON.parse(
  fs.readFileSync(`${__dirname}/gallery.json`, 'utf-8')
);

const importData = async () => {
  try {
    await Gallery.create(gallery, { validateBeforeSave: false });
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
const deleteData = async () => {
  try {
    await Gallery.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
