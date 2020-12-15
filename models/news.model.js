var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var News_Schema = new Schema({
    news_images : {
        type: String,
        required: true
    },
    news_title: {
        type: String,
        required: true
    },
    news_author:{
        type: String,
        required: true
    },
    news_mota:{
        type: String,
        required: true
    },
    news_create_date: {
        type: Date,
        default: Date.now
    },
    news_content: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('News',News_Schema);