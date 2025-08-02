const express = require('express');
const morgan = require('morgan');
const ratelimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const path = require('path');
const cors = require('cors');
const multer = require('multer');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const imageRouter = require('./routes/imageRoutes');
const albumRouter = require('./routes/albumRoutes');
const userRouter = require('./routes/userRoutes');
// const uploadRoutes = require('./routes/uploadRoutes');

const app = express();

app.use(
  cors({
    origin: ['http://localhost:5173', 'https://younghunter.net'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// 1) GLOBAL MIDDLEWARES

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
app.set('trust proxy', 1);
const limiter = ratelimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [],
  })
);

// Serving static files (uploaded images)
app.use(
  '/public',
  express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, path, stat) => {
      res.set('Cross-Origin-Resource-Policy', 'cross-origin');
    },
  })
);

// API Routes
app.use('/api/v1/images', imageRouter);
app.use('/api/v1/albums', albumRouter);
app.use('/api/v1/users', userRouter);

// ✅ Serve React frontend (dist folder)
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

//TODO : work on serving website faster
