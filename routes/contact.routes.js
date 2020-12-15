var express = require('express');
var router = express.Router();
var Contact = require('../models/contact.model');

router.get('/lien-he', function(req,res,next){
    Contact.find({}, function(err,contacts){
        if(err) throw err;
        console.log(contacts);
    });
});

router.get('/lien-he=:id', function(res,req,next){
    Contact.findById(req.params.id).exec().then(function(contacts){
        console.log(contacts);
    });
});

router.post('/them-lien-he', function(req,res,next){
    var new_Contact = new Contact({
        contact_name: req.body.contact_name,
        contact_email: req.body.contact_email,
        contact_phone_number: req.body.contact_phone_number,
        contact_content: req.body.contact_content
    });

    new_Contact.save().then(function(){
        Contact.find({}).exec(function(err,contacts){
            if(err){
                console.log(err);
            } else {
                console.log(contacts);
            }
        });
    });
});

router.post('/chinh-sua-lien-he/lien-he=:id', function (req, res, next) {

    var newContact = {};
    if (req.body.contact_name) {
        newStatus.contact_name = req.body.contact_name;
    }
    if (req.body.contact_email) {
        newStatus.contact_email = req.body.contact_email;
    }
    if (req.body.contact_phone_number) {
        newStatus.contact_phone_number = req.body.contact_phone_number;
    }
    if (req.body.contact_content) {
        newStatus.contact_content = req.body.contact_content;
    }
    const options = {
        new: true,
    }
    Contact.findByIdAndUpdate(req.params.id, { $set: newContact }, options, (err, update_contact) => {
        console.log(update_contact);
    });
});

router.get('/lien-he/xoa=:id', function (req, res, next) {
    Contact.findByIdAndRemove(req.params.id).exec().then(function (contacts) {
        console.log(contacts);
        Contact.find({}, function (err, contacts, mess) {
            if (err) throw err;
            res.render('admin/list_contact.ejs', { contact: contacts, mess : 'Xóa thành công'});
        });
    });
});

module.exports = router;
