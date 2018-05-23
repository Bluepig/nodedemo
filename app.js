var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var ajaxRouter = require('./routes/ajax');
//add mongoose connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodekb');

// check for db errors
var db = mongoose.connection;

db.once('open', function() {
  // we're connected!
  console.log("connected to mongodb");
});

db.on('error', console.error.bind(console, 'connection error:'));

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/',express.static(path.join(__dirname, 'public')));
app.use('/node_modules',express.static(path.join(__dirname, 'node_modules')));
app.use('/css',express.static(path.join(__dirname, 'public/stylesheets')));
app.use('/js',express.static(path.join(__dirname, 'public/javascripts')));

app.use('/', indexRouter);
app.use('/ajax', ajaxRouter);
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
