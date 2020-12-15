var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Contact_Schema = new Schema({
    contact_name : {
        type: String,
        required: true
    },
    contact_email: {
        type: String,
        required: true
    },
    contact_phone_number:{
        type: String,
        required: true
    },
    contact_create_date: {
        type: Date,
        default: Date.now
    },
    contact_content: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Contact',Contact_Schema);