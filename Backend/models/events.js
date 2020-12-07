const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// restaurant = require('./restaurant');

var eventSchema = new Schema({
    restId: { type: Schema.Types.ObjectId, ref: 'restaurant' },
    eventName: {type: String, required: true},
    eventDescription: {type: String, required: true},
    eventLocation: {type: String, required: true},
    hashtags: {type: String, required: true},
    time: {type: String},
    date: {type: String},
    registration: [{
        userId: { type: Schema.Types.ObjectId, ref: 'customer' },
        firstName: {type: String},
        lastName: {type: String}
    }]
},
{
    versionKey: false
});

const event = mongoose.model('event', eventSchema);
module.exports = event;