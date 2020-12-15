var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var router = express.Router();
var Category = require('../models/category.model');
var Car = require('../models/car.model');
var Status = require('../models/status.model');
var News = require('../models/news.model');
var Contact = require('../models/contact.model');
var Setting = require('../models/setting.model');
var Admin = require('../models/admin.model');
var Review = require('../models/review.model');


router.get('/', checkAdmin, function (req, res, next) {
    res.render('admin/login.ejs');
});

router.get('/quan-ly-website', function (req, res, next) {
    Category.find({}, function (err, category) {
        Car.find({}, function (err, cars) {
            Contact.find({}, function (err, contacts) {
                News.find({}, function (err, news) {
                    if (err) throw err;
                    res.render('admin/dashboard.ejs', { car: cars, cate: category, contact: contacts, news: news });
                    console.log(category);
                });
            });
        });
    });
});

router.get('/danh-sach-danh-muc', function (req, res, next) {
    Category.find({}, function (err, category) {
        if (err) throw err;
        res.render('admin/list_category.ejs', { cate: category, mess: '' });
    });
});

router.get('/danh-sach-san-pham', function (req, res, next) {
    Car.find({}, function (err, cars) {
        if (err) throw err;
        res.render('admin/list_car.ejs', { car: cars, mess: '' });
    }).populate('car_category').populate('car_status');
});

router.get('/cai-dat-chung=:id', function (req, res, next) {
    Setting.findById(req.params.id, function (err, settings) {
        res.render('admin/setting.ejs', { setting: settings, mess: '' });
    });
});

router.get('/them-moi-danh-muc', function (req, res, next) {
    res.render('admin/add_category.ejs');
});

router.get('/chinh-sua/danh-muc=:id', function (req, res, next) {
    Category.findById(req.params.id, function (err, category) {
        res.render('admin/edit_category.ejs', { cate: category });
    });
});

router.get('/them-moi-san-pham', function (req, res, next) {
    Category.find({}, function (err, category) {
        Status.find({}, function (err, status) {
            if (err) throw err;
            res.render('admin/add_car.ejs', { cate: category, status: status });
        });
    });
});

router.get('/sua-san-pham=:id', function (req, res, next) {
    Car.findById(req.params.id, function (err, cars) {
        Category.find({}, function (err, category) {
            Status.find({}, function (err, status) {
                if (err) throw err;
                res.render('admin/edit_car.ejs', { car: cars, cate: category, status: status });
            });

        });
    });
});

router.get('/them-moi-tin-tuc', function (req, res, next) {
    res.render('admin/add_news.ejs');
});

router.get('/danh-sach-tin-tuc', function (req, res, next) {
    News.find({}, function (err, news) {
        if (err) throw err;
        res.render('admin/list_news.ejs', { news: news, mess: '' });
    });
});

router.get('/chinh-sua/tin-tuc=:id', function (req, res, next) {
    News.findById(req.params.id, function (err, news) {
        res.render('admin/edit_news.ejs', { news: news });
    });
});

router.get('/danh-sach-lien-he', function (req, res, next) {
    Contact.find({}, function (err, contacts) {
        if (err) throw err;
        res.render('admin/list_contact.ejs', { contact: contacts, mess: '' });
    });
});

router.get('/thiet-lap-tai-khoan=:id', function (req, res, next) {
    Admin.findById(req.params.id, function (err, admins) {
        if (err) throw err;
        res.render('admin/my_profile.ejs', { admin: admins, mess: '' });
    });
});

function checkAdmin(req, res, next) {

    if (req.isAuthenticated()) {
        next();
    } else {
        res.render('admin/login.ejs');
    }
};

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
},
    function (username, password, done, res) {
        Admin.findOne({ username: username, password: password }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Sai tên tài khoản.' });
            }
            if (!user.password) {
                res.render('admin/login.ejs');
            }
            return done(null, user);
        });
    }
));

router.post('/',
    passport.authenticate('local', {
        successRedirect: '/admin/quan-ly-website',
        failureRedirect: '/admin',
        // failureFlash: true
    })
);

router.post('/admin', function (req, res, next) {
    var newUser = new Admin({
        admin_name: req.body.admin_name,
        username: req.body.username,
        password: req.body.password,
        admin_avata: req.body.admin_avata,
        admin_email: req.body.admin_email
    });
    newUser.save().then(function () {
        Admin.find({}).exec((err, admins) => {
            if (err) {
                console.log('Thêm mới thất bại');
            } else {
                console.log('Thêm mới thành công');
                console.log(admins);
            }
        });
    });
});

router.post('/tai-khoan/change=:id', function (req, res, next) {

    var newValue = {};
    if (req.body.password) {
        newValue.password = req.body.password;
    }
    if (req.body.admin_avata) {
        newValue.admin_avata = req.body.admin_avata;
    }
    const options = {
        new: true,
    }
    Admin.findByIdAndUpdate(req.params.id, { $set: newValue }, options, (err, update_admin) => {
        console.log(update_admin);
        Admin.find({}).exec((err, admins) => {
            if (err) {
                console.log('Thất bại');
            } else {
                console.log('Thành công');
                Admin.findById(req.params.id, function (err, admins) {
                    if (err) throw err;
                    res.render('admin/my_profile.ejs', { admin: admins, mess: 'Chỉnh sửa thành công' });
                });
            }
        });
    });
});

router.get('/nhan-xet', function (req, res, next) {
    Review.find({}, function (err, reviews) {
        if (err) throw err;
        res.render('admin/list_review.ejs', { review: reviews, mess: '' });
    });
});

router.get('/them-nhan-xet', function (req, res, next) {
    res.render('admin/add_review.ejs');
});

router.get('/chinh-sua-nhan-xet=:id', function (req, res, next) {
    Review.findById(req.params.id, function (err, reviews) {
        if (err) throw err;
        res.render('admin/edit_review.ejs', { review: reviews, mess: '' });
        console.log(reviews);
    });
});

module.exports = router;
