var mongoose = require('mongoose');
var Status = require('./status.model');
var Category = require('./category.model');
var Schema = mongoose.Schema;
var Car_Schema = new Schema({
    car_name:{
        type: String,
        required: true
    },
    car_model: {
        type: String,
        required: true
    },
    car_status:{
        type: Schema.Types.ObjectId,
        ref:'Status'
    },
    car_size:{
        type: String
    },
    car_images:{
        type: String,
        required: true
    },
    car_price: {
        type: String,
        required: true
    },
    car_category:{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    car_content: {
        type: String,
        required: true
    },
    car_video:{
        type: String,
        required: true
    },
    creat_car: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Car',Car_Schema);