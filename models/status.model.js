var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Status_Schema = new Schema({
    status: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Status',Status_Schema);