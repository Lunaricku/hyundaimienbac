var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var cors = require('cors');


var ObjectID = mongoose.ObjectID;
var ISODate = mongoose.ISODate;

var app = express();

app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));

let options = {
  db: { native_parser: true },
  server: { poolSize: 5 },
  user: 'admin',
  pass: 'Ao123456'
};

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:Ao123456@ds026558.mlab.com:26558/hyundaimienbac', { useNewUrlParser: true }).then(
  () => {
    console.log("CONNECTION TO DATABASE SUCCESS!!!!!!");
  },
  err => {
    console.log(`connect failed. Error: ${err}`);
  }
);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

var index_Router = require('./routes/index.routes');
var users_Router = require('./routes/users.routes');
var admin_Router = require('./routes/admin.routes');
var category_Router = require('./routes/category.routes');
var setting_Router = require('./routes/setting.routes');
var status_Router = require('./routes/status.routes');
var car_Router = require('./routes/car.routes');
var contact_Router = require('./routes/contact.routes');
var news_Router = require('./routes/news.routes');
var review_Router = require('./routes/review.routes');


app.use('/', index_Router);
app.use('/admin', admin_Router,category_Router,setting_Router,status_Router,car_Router,contact_Router,news_Router,review_Router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
