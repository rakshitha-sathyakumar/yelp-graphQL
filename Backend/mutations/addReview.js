const User = require("../models/customer");
const Rest = require("../models/restaurant");
var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const addReview = async (args) => {
    console.log(args);
    let rest = await Rest.findOne({ _id: args.id });
    if (rest) {
        await Rest.findOneAndUpdate(
            {_id: args.id},
            {$push: {review: {firstName: args.firstName,
                lastName: args.lastName,
                review: args.review,
                date: args.date,
                rating: args.rating}}},
            { safe: true, new: true, useFindAndModify: false })
        return { status: 200, message: "REVIEW_ADDED" };
    }
    else {
        return { status: 500, message: "INTERNAL_SERVER_ERROR" };
    }
};


exports.addReview = addReview;