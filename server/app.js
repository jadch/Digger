require('import-export');
require('./AppLogic.js');
require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const index = require('./routes/index');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Configuring database
// mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });
mongoose.connect('mongodb://localhost/digger', { useMongoClient: true });

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

if (app.get('env') === 'development') {
  app.use(cors({
    origin: 'http://localhost:8080',
  }));
}

app.use('/api', index);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
