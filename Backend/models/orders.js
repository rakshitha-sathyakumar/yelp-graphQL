const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var orderSchema = new Schema({
    restId: { type: Schema.Types.ObjectId, ref: 'restaurant' },
    userId: { type: Schema.Types.ObjectId, ref: 'customer' },
    restName: {type: String},
    dishName: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    orderType: {type: String},
    date: {type: String},
    time: {type: String},
    orderStatus: {type: String},
    finalOrderStatus: {type: String},
    message :[{
        date: {type: String},
        time: {type: String},
        message:{type: String},
        firstName: {type: String},
        owner: {type: String}
    }]
},
{
    versionKey: false
});

const orders = mongoose.model('order', orderSchema);
module.exports = orders;