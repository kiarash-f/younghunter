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
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();

const corsOptions = {
  origin: 'https://younghunter-front.liara.run',
  methods: 'GET,POST,PUT,DELETE,PATCH',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true, // ✅ Allow credentials
};

app.use(cors(corsOptions));

app.options('*', cors(corsOptions));

// 🔹 Set CORS Headers for All Responses (Extra Safety)
app.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Origin',
    'https://younghunter-front.liara.run'
  );
  // res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  // res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  // res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

//1) GLOBAL MIDDLEWARES

// Set security HTTP headers
app.use(helmet());

// development logging
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

// Serving static files
// app.use(express.static('public'));
app.use("public/image", express.static("image"));

// Routes

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});
app.use('/api/v1/images', imageRouter);
app.use('/api/v1/albums', albumRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/upload', uploadRoutes);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);
module.exports = app;
