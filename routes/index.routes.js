var express = require('express');
var router = express.Router();
var Category = require('../models/category.model');
var Car = require('../models/car.model');
var Status = require('../models/status.model');
var News = require('../models/news.model');
var Setting = require('../models/setting.model');
var Review = require('../models/review.model');

/* GET home page. */
router.get('/', function (req, res, next) {
  Setting.find({}, function (err, settings) {
    Car.find({}, function (err, cars) {
      Review.find({}, function(err, reviews){
        if(err) throw err;
        res.render('pages/index.ejs', { car: cars, setting: settings, review: reviews });
      });
    }).populate('car_category').populate('car_status').limit(9);
  }).limit(1);
});

router.get('/gioi-thieu', function(req,res,next){
  Setting.find({}, function(err, settings){
    if (err) throw err;
    res.render('pages/about.ejs', { setting: settings});
    console.log(settings);
  });
});

router.get('/tu-van-mua-xe', function(req,res,next){
  Setting.find({}, function(err, settings){
    if (err) throw err;
    res.render('pages/advisory.ejs', { setting: settings});
    console.log(settings);
  });
});

router.get('/cua-hang/danh-muc=:id', function (req, res, next) {
  Setting.find({}, function (err, settings) {
    Category.find({}, function (err, category) {
      Car.find({ "car_category": { $in: [req.params.id] } }, function (err, cars) {
        if (err) throw err;
        res.render(`pages/shop.ejs`, { car: cars, cate: category, setting: settings });
      }).populate('car_category').populate('car_status');
    }).limit();
  });
});

router.get('/cua-hang/danh-muc', function (req, res, next) {
  Setting.find({}, function (err, settings) {
    Category.find({}, function (err, category) {
      Car.find({}, function (err, cars) {
        if (err) throw err;
        console.log(cars);
        res.render('pages/shop.ejs', { car: cars, cate: category, setting: settings });
      }).populate('car_category').populate('car_status');
    });
  });
});

router.get('/san-pham/name=:name=:id', function (req, res, next) {
  Setting.find({}, function (err, settings) {
    Car.findById(req.params.id).populate('car_category').populate('car_status').exec().then(function (car) {
      res.render('pages/car.ejs', { car: car, setting: settings });
      console.log(car);
    });
  });
});

router.get('/tin-tuc', function (req, res, next) {
  Setting.find({}, function (err, settings) {
    News.find({}, function (err, news) {
      if (err) throw err;
      res.render('pages/news.ejs', { news: news, setting: settings });
    });
  });
});

router.get('/tin-tuc/:id', function (req, res, next) {
  Setting.find({}, function (err, settings) {
    News.findById(req.params.id).exec().then(function (news) {
      res.render('pages/news_detail.ejs', { news: news, setting: settings });
      console.log(news);
    });
  });
});

router.get('/lien-he', function (req, res, next) {
  Setting.find({}, function (err, settings) {
    res.render('pages/contact.ejs',{setting: settings});
  })
});



module.exports = router;
