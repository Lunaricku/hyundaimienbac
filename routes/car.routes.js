var express = require('express');
var router = express.Router();
var Car = require('../models/car.model');

router.get('/san-pham', function(req,res,next){
    Car.find({}, function(err,cars){
        if(err) throw err;
        console.log(cars);
    });
});

router.get('/thong-tin-san-pham/:id', function(res,req,next){
    Car.findById(req.params.id).exec().then(function(cars){
        console.log(cars);
    });
});

router.post('/them-san-pham', function(req,res,next){
    var new_Car = new Car({
        car_name: req.body.car_name,
        car_model: req.body.car_model,
        car_status: req.body.car_status,
        car_size: req.body.car_size,
        car_images: req.body.car_images,
        car_price: req.body.car_price,
        car_category: req.body.car_category,
        car_content: req.body.car_content,
        car_video: req.body.car_video
    });

    new_Car.save().then(function(){
        Car.find({}).exec(function(err,cars){
            if(err){
                console.log(err);
            } else {
                console.log(cars);
            }
            Car.find({}, function (err, cars) {
                if (err) throw err;
                res.render('admin/list_car.ejs', { car: cars, mess : 'Thêm thành công'});
            }).populate('car_category').populate('car_status');
        });
    });
});

router.post('/chinh-sua-san-pham/san-pham=:id', function (req, res, next) {

    var new_Car = {};
    if (req.body.car_name) {
        new_Car.car_name = req.body.car_name;
    }
    if (req.body.car_model) {
        new_Car.car_model = req.body.car_model;
    }
    if (req.body.car_status) {
        new_Car.car_status = req.body.car_status;
    }
    if (req.body.car_size) {
        new_Car.car_size = req.body.car_size;
    }
    if (req.body.car_images) {
        new_Car.car_images = req.body.car_images;
    }
    if (req.body.car_price) {
        new_Car.car_price = req.body.car_price;
    }
    if (req.body.car_category) {
        new_Car.car_category = req.body.car_category;
    }
    if (req.body.car_content) {
        new_Car.car_content = req.body.car_content;
    }
    if (req.body.car_video) {
        new_Car.car_video = req.body.car_video;
    }
    const options = {
        new: true,
    }
    Car.findByIdAndUpdate(req.params.id, { $set: new_Car }, options, (err, update_car) => {
        console.log(update_car);
        Car.find({}, function (err, cars) {
            if (err) throw err;
            res.render('admin/list_car.ejs', { car: cars, mess : 'Chỉnh sửa thành công'});
        }).populate('car_category').populate('car_status');
    });
});

router.get('/san-pham/xoa=:id', function (req, res, next) {
    Car.findByIdAndRemove(req.params.id).exec().then(function (cars) {
        console.log(cars);
        Car.find({}, function (err, cars) {
            if (err) throw err;
            res.render('admin/list_car.ejs', { car: cars, mess : 'Xóa thành công'});
        }).populate('car_category').populate('car_status');
    });
}); 

module.exports = router;
