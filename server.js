const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});
dotenv.config({ path: './config.env' });
const app = require('./app');

app.use(
  cors({
    origin: 'http://your-frontend-domain.com', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
  })
);

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {}).then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
