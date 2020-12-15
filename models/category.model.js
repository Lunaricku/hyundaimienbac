var mongoose = require('mongoose');
var Car = require('./car.model');
var Schema = mongoose.Schema;
var Category_Schema = new Schema({
    category_name: {
        type: String,
        required: true
    },
    category_trademark:{
        type: String,
        required: true
    },
    list_car: [{
        type: Schema.Types.ObjectId,
        ref: 'Car'
    }],
    category_logo:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Category', Category_Schema);