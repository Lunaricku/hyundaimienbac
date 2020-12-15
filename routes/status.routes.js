var express = require('express');
var router = express.Router();
var Status = require('../models/status.model');

router.get('/trang-thai', function(req,res,next){
    Status.find({}, function(err,status){
        if(err) throw err;
        console.log(status);
    });
});

router.get('/trang-thai=:id', function(res,req,next){
    Status.findById(req.params.id).exec().then(function(status){
        console.log(status);
    });
});

router.post('/them-trang-thai', function(req,res,next){
    var new_Status = new Status({
        status: req.body.status
    });

    new_Status.save().then(function(){
        Status.find({}).exec(function(err,status){
            if(err){
                console.log(err);
            } else {
                console.log(status);
            }
        });
    });
});

router.post('/chinh-sua-trang-thai/trang-thai=:id', function (req, res, next) {

    var newStatus = {};
    if (req.body.status) {
        newStatus.status = req.body.status;
    }
    const options = {
        new: true,
    }
    Status.findByIdAndUpdate(req.params.id, { $set: newStatus }, options, (err, update_status) => {
        console.log(update_status);
    });
});

router.get('/trang-thai/xoa=:id', function (req, res, next) {
    Status.findByIdAndRemove(req.params.id).exec().then(function (status) {
        console.log(status);
    });
});

module.exports = router;
