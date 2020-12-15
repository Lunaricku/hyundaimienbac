var express = require('express');
var router = express.Router();
var News = require('../models/news.model');

router.get('/tin-tuc', function(req,res,next){
    News.find({}, function(err,news){
        if(err) throw err;
        console.log(news);
    });
});

router.get('/tin-tuc=:id', function(res,req,next){
    News.findById(req.params.id).exec().then(function(news){
        console.log(news);
    });
});

router.post('/them-tin-tuc', function(req,res,next){
    var new_News = new News({
        news_images: req.body.news_images,
        news_title: req.body.news_title,
        news_author: req.body.news_author,
        news_content: req.body.news_content,
        news_mota: req.body.news_mota
    });

    new_News.save().then(function(){
        News.find({}).exec(function(err,news){
            if(err){
                console.log(err);
            } else {
                console.log(news);
            }
            News.find({}, function (err, news, mess) {
                if (err) throw err;
                res.render('admin/list_news.ejs', { news: news, mess : 'Thêm thành công'});
            });
        });
    });
});

router.post('/chinh-sua-tin-tuc/tin-tuc=:id', function (req, res, next) {

    var newNews = {};
    if (req.body.news_images) {
        newNews.news_images = req.body.news_images;
    }
    if (req.body.news_title) {
        newNews.news_title = req.body.news_title;
    }
    if (req.body.news_author) {
        newNews.news_author = req.body.news_author;
    }
    if (req.body.news_content) {
        newNews.news_content = req.body.news_content;
    }
    if (req.body.news_mota) {
        newNews.news_mota = req.body.news_mota;
    }
    const options = {
        new: true,
    }
    News.findByIdAndUpdate(req.params.id, { $set: newNews }, options, (err, update_news) => {
        console.log(update_news);
        News.find({}, function (err, news, mess) {
            if (err) throw err;
            res.render('admin/list_news.ejs', { news: news, mess : 'Chỉnh sửa thành công'});
        });
    });
});

router.get('/tin-tuc/xoa=:id', function (req, res, next) {
    News.findByIdAndRemove(req.params.id).exec().then(function (news) {
        console.log(news);
        News.find({}, function (err, news, mess) {
            if (err) throw err;
            res.render('admin/list_news.ejs', { news: news, mess : 'Xóa thành công'});
        });
    });
});

module.exports = router;
