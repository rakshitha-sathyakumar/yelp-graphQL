const customer = require("../models/customer");
const restaurant = require("../models/restaurant");
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');

const login = async (args) => {
    let user = await customer.findOne({ email: args.email });

    if (user) {
    if (user.length === 0) {
        return { status: 401, message: "NO_USER" };
    }
    // if (passwordHash.verify(args.password, user.password)) 
    if(user.password){
        const payload = { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email};
        var token = jwt.sign(payload, secret, {
            expiresIn: 1008000
        });
        token = 'JWT ' + token;
        return { status: 200, message: token };
    }
    else {
        return { status: 401, message: "INCORRECT_PASSWORD" };
    }
} else if(!user) {
    
        let rest = await restaurant.findOne({ email: args.email });
        if(rest){
        if (rest.length === 0) {
            return { status: 401, message: "NO_USER" };
        }
        // if (passwordHash.verify(args.password, user.password)) 
        if(rest.password){
            const payload = { id: rest._id, name: rest.name, email: rest.email};
            var token = jwt.sign(payload, secret, {
            expiresIn: 1008000
        });
            token = 'JWT ' + token;
            return { status: 200, message: token };
        } else {
            return { status: 401, message: "INCORRECT_PASSWORD" };
        }
    }

}
}

exports.login = login;
