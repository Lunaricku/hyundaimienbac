var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Admin_Schema = new Schema({
    admin_name : {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    admin_avata: {
        type: String
    },
    admin_email: {
        type: String,
        required: true
    },
    admin_avata: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Admin',Admin_Schema);