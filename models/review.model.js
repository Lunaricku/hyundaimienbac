var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Review_Schema = new Schema({
    avata: {
        type: String
    },
    review : {
        type: String,
        require: true
    },
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Review',Review_Schema);