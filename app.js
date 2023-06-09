const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const usersRouter = require('./routes/users');
const movieRouter = require('./routes/movie');
const bookingRouter = require('./routes/booking');
const copyRouter = require('./routes/copy');
const genresRouter = require('./routes/genres');
const actorsRouter = require('./routes/actors');
const directorsRouter = require('./routes/directors');
const membersRouter = require('./routes/members');
const adressRouter = require('./routes/adress');


const uri = "mongodb://localhost:27017/video-club-app";
mongoose.connect(uri);

const db = mongoose.connection;

const app = express();

db.on('open', ()=> {
  console.log("Conection ok");
})
db.on('error', ()=> {
  console.log("Connection not ok");
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/movie', movieRouter);
app.use('/booking',bookingRouter);
app.use('/copy',copyRouter);
app.use('/genres',genresRouter);
app.use('/actors',actorsRouter);
app.use('/directors',directorsRouter);
app.use('/members',membersRouter);
app.use('/adress',adressRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
