var express = require('express');
var router = express.Router();
var Setting = require('../models/setting.model');

router.get('/san-pham', function(req,res,next){
    Setting.find({}, function(err,setting){
        if(err) throw err;
        console.log(setting);
    });
});

router.get('/chinh-sua-chung/name=:name/data=:id', function(req,res){
    Setting.findById(req.params.id).exec().then(function(setting){
        console.log(setting);
    });
});

router.post('/chinh-sua-chung', function(req,res,next){
    var new_Setting = new Setting({
        logo: req.body.logo,
        banner: req.body.banner,
        email: req.body.email,
        hotline: req.body.hotline,
        address: req.body.address,
        introduce: req.body.introduce,
        advisory: req.body.advisorym,
        company: req.body.company
    });

    new_Setting.save().then(function(){
        Setting.find({}).exec(function(err,setting){
            if(err){
                console.log(err);
            } else {
                console.log(setting);
            }
        });
    });
});

router.post('/chinh-sua-chung=:id', function (req, res, next) {

    var newSetting = {};
    if (req.body.logo) {
        newSetting.logo = req.body.logo;
    }
    if (req.body.banner) {
        newSetting.banner = req.body.banner;
    }
    if (req.body.email) {
        newSetting.email = req.body.email;
    }
    if (req.body.hotline) {
        newSetting.hotline = req.body.hotline;
    }
    if (req.body.address) {
        newSetting.address = req.body.address;
    }
    if (req.body.introduce) {
        newSetting.introduce = req.body.introduce;
    }
    if (req.body.advisory) {
        newSetting.advisory = req.body.advisory;
    }
    if (req.body.company) {
        newSetting.company = req.body.company;
    }
    const options = {
        new: true,
    }
    Setting.findByIdAndUpdate(req.params.id, { $set: newSetting }, options, (err, update_setting) => {
        console.log(update_setting);
        Setting.findById(req.params.id, function(err, settings){
            res.render('admin/setting.ejs', {setting: settings, mess: 'Chỉnh sửa thành công'});
        });
    });
});

module.exports = router;
