const express = require('express');

const cors = require('cors');

const helmet = require('helmet');

const morgan = require('morgan');

const routes = require('./routes');

const notFoundHandler = require('./middlewares/notFound.middleware');

const errorHandler = require('./middlewares/error.middleware');

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(morgan('dev'));

app.use(
  express.json({
    limit: '10kb',
  })
);

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Car Suggestion API Running',
  });
});

app.use('/api/v1', routes);

app.use(notFoundHandler);

app.use(errorHandler);

module.exports = app;
