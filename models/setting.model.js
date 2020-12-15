var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Setting_Schema = new Schema({
    logo: {
        type: String,
        required: true
    },
    banner: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    hotline: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    introduce: {
        type: String,
        required: true
    },
    advisory: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Setting', Setting_Schema);