const User = require("../models/customer");
const Rest = require("../models/restaurant");
const passwordHash = require('password-hash');

const userSignup = async (args) => {
    console.log(args);
    let hashedPassword = passwordHash.generate(args.password);
    console.log()
    let newUser = new User({
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email,
        password: hashedPassword
    });
    let user = await User.find({ email: args.email });
    if (user.length) {
        return { status: 400, message: "USER_EXISTS" };
    }
    let savedUser = await newUser.save();
    if (savedUser) {
        return { status: 200, message: "USER_ADDED" };
    }
    else {
        return { status: 500, message: "INTERNAL_SERVER_ERROR" };
    }
};

const restSignup = async (args) => {
    console.log("hiiii")
    let hashedPassword = passwordHash.generate(args.password);
    let newRest = new Rest({
        name: args.name,
        email: args.email,
        password: hashedPassword,
        street: args.street,
        zipcode: args.zipcode
    });

    let rest = await Rest.find({ email: args.email });
    if (rest.length) {
        return { status: 400, message: "RESTAURANT_EXISTS" };
    }
    let savedRest = await newRest.save();
    if (savedRest) {
        return { status: 200, message: "RESTAURANT_ADDED" };
    }
    else {
        return { status: 500, message: "INTERNAL_SERVER_ERROR" };
    }
};

exports.userSignup = userSignup;
exports.restSignup = restSignup;