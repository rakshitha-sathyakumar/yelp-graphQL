const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var restSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    street: {type: String, required: true},
    city: {type: String},
    zipcode: {type: String},
    cuisine: {type: String},
    timings: {type: String},
    fileName: {type: String},
    contactNo: {type: String},
    deliveryMethod: {type: String},
    menu: [{
            dishName: {type:String},
            ingredients: {type:String},
            price: {type:String},
            description: {type:String},
            category: {type:String},
            dishFileName: {type: String}
        }],
    review: [{
            firstName: {type:String},
            lastName: {type:String},
            rating: {type: Number},
            review: {type: String},
            date: {type: String}
            
        }],
},

{
    versionKey: false
});

const restaurant = mongoose.model('restaurant', restSchema);
module.exports = restaurant;