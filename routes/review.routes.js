var express = require('express');
var router = express.Router();
var Review = require('../models/review.model');

router.get('/nhan-xet', function (req, res, next) {
    Setting.find({}, function (err, setting) {
        if (err) throw err;
        console.log(setting);
    });
});

router.post('/them-moi-nhan-xet', function (req, res, next) {
    var new_Review = new Review({
        avata: req.body.avata,
        name: req.body.name,
        review: req.body.review,
    });

    new_Review.save().then(function () {
        Review.find({}).exec(function (err, reviews) {
            if (err) {
                console.log(err);
            } else {
                console.log(reviews);
            }
            res.render('admin/list_review.ejs', { review: reviews, mess: 'Thêm mới thành công!!' });
        });
    });
});

router.post('/sua-nhan-xet=:id', function (req, res, next) {

    var newReview = {};
    if (req.body.avata) {
        newReview.avata = req.body.avata;
    }
    if (req.body.review) {
        newReview.review = req.body.review;
    }
    if (req.body.name) {
        newReview.name = req.body.name;
    }
    const options = {
        new: true,
    }
    Review.findByIdAndUpdate(req.params.id, { $set: newReview }, options, (err, update_review) => {
        console.log(update_review);
        Review.find({}, function (err, reviews, mess) {
            if (err) throw err;
            res.render('admin/list_review.ejs', { review: reviews, mess : 'Chỉnh sửa thành công'});
        });
    });
});

router.get('/nhan-xet/xoa=:id', function (req, res, next) {
    Review.findByIdAndRemove(req.params.id).exec().then(function (reviews) {
        console.log(reviews);
        Review.find({}, function (err, reviews, mess) {
            if (err) throw err;
            res.render('admin/list_review.ejs', { review: reviews, mess : 'Xóa thành công'});
        });
    });
});

module.exports = router;
