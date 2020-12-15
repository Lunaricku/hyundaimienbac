var express = require('express');
var router = express.Router();
var Category = require('../models/category.model');

router.get('/san-pham', function(req,res,next){
    Category.find({}, function(err,category){
        if(err) throw err;
        console.log(category);
    });
});

router.get('/thong-tin-danh-muc/:id', function(res,req,next){
    Category.findById(req.params.id).exec().then(function(category){
        console.log(category);
    });
});

router.post('/them-danh-muc', function(req,res,next){
    var new_Category = new Category({
        category_name: req.body.category_name,
        category_trademark: req.body.category_trademark,
        category_logo: req.body.category_logo
    });

    new_Category.save().then(function(){
        Category.find({}).exec(function(err,category){
            if(err){
                console.log(err);
            } else {
                console.log(category);
            }
            Category.find({}, function (err, category, mess) {
                if (err) throw err;
                res.render('admin/list_category.ejs', { cate: category, mess : 'Thêm thành công'});
            });
        });
    });
});

router.post('/chinh-sua-danh-muc/danh-muc=:id', function (req, res, next) {

    var newCategory = {};
    if (req.body.category_name) {
        newCategory.category_name = req.body.category_name;
    }
    if (req.body.category_trademark) {
        newCategory.category_trademark = req.body.category_trademark;
    }
    if (req.body.category_logo) {
        newCategory.category_logo = req.body.category_logo;
    }
    const options = {
        new: true,
    }
    Category.findByIdAndUpdate(req.params.id, { $set: newCategory }, options, (err, update_category) => {
        console.log(update_category);
        Category.find({}, function (err, category, mess) {
            if (err) throw err;
            res.render('admin/list_category.ejs', { cate: category, mess : 'Chỉnh sửa thành công'});
        });
    });
});

router.get('/danh-muc/xoa=:id', function (req, res, next) {
    Category.findByIdAndRemove(req.params.id).exec().then(function (category) {
        console.log(category);
        Category.find({}, function (err, category, mess) {
            if (err) throw err;
            res.render('admin/list_category.ejs', { cate: category, mess : 'Xóa thành công'});
        });
    });
});

module.exports = router;
