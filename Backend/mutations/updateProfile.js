const User = require("../models/customer");
const Rest = require("../models/restaurant");
var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);


const updateUserProfile = async (args) => {

    console.log("the args are", args);
    const profileFields = {};
    if (args.id) profileFields._id = args.id;
    if (args.firstName) profileFields.firstName = args.firstName;
    if (args.lastName) profileFields.lastName = args.lastName;
    if (args.email) profileFields.email = args.email;
    if (args.gender) profileFields.gender = args.gender;
    if (args.dateOfBirth) profileFields.dateOfBirth = args.dateOfBirth;
    if (args.address) profileFields.address = args.address;
    if (args.contactNo) profileFields.contactNo = args.contactNo;
    if (args.nickName) profileFields.nickName = args.nickName;
    if (args.thingsiLove) profileFields.thingsiLove = args.thingsiLove;
    if (args.notYelping) profileFields.notYelping = args.notYelping;
    if (args.headline) profileFields.headline = args.headline;
    if (args.website) profileFields.website = args.website;
    if (args.yelpingSince) profileFields.yelpingSince = args.yelpingSince;

    

    let user = await User.findOne({ _id: args.id });
    if (user) {
        await User.findOneAndUpdate(
            { _id: args.id },
            { $set: profileFields },
            { new: true })
        return { status: 200, message: "USER_DETAILS_UPDATED" };
    }
    else {
        let newUser = new User(profileFields).save();
        if (newUser) {
            return { status: 200, message: "USER_DETAILS_ADDED" };
        }
        else {
            return { status: 500, message: "INTERNAL_SERVER_ERROR" };
        }
    }
};

const updateRestProfile = async (args) => {

    console.log("the args are", args);
    const profileFields = {};
    if (args.id) profileFields._id = args.id;
    if (args.name) profileFields.name = args.name;
    if (args.email) profileFields.email = args.email;
    if (args.street) profileFields.street = args.street;
    if (args.city) profileFields.city = args.city;
    if (args.zipcode) profileFields.zipcode = args.zipcode;
    if (args.cuisine) profileFields.cuisine = args.cuisine;
    if (args.timings) profileFields.timings = args.timings;
    if (args.contactNo) profileFields.contactNo = args.contactNo;
    if (args.deliveryMethod) profileFields.deliveryMethod = args.deliveryMethod;

    

    let rest = await Rest.findOne({ _id: args.id });
    if (rest) {
        await Rest.findOneAndUpdate(
            { _id: args.id },
            { $set: profileFields },
            { new: true })
        return { status: 200, message: "REST_DETAILS_UPDATED" };
    }
    else {
        let newRest = new Rest(profileFields).save();
        if (newRest) {
            return { status: 200, message: "REST_DETAILS_ADDED" };
        }
        else {
            return { status: 500, message: "INTERNAL_SERVER_ERROR" };
        }
    }
};

exports.updateUserProfile = updateUserProfile;
exports.updateRestProfile = updateRestProfile;
