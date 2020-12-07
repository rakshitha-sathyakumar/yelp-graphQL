const User = require("../models/customer");
const Rest = require("../models/restaurant");
const Order = require("../models/orders");

const addDish = async (args) => {
    let rest = await Rest.findOne({ _id: args.id });
    if (rest) {
        await Rest.findOneAndUpdate(
            {_id: args.id},
            {$push: {menu: {dishName: args.dishName,
                ingredients: args.ingredients,
                price: args.price,
                description: args.description,
                category: args.category}}},
            { safe: true, new: true, useFindAndModify: false })
        return { status: 200, message: "RESTAURANT_MENU_UPDATED" };
    }
    else {
        return { status: 500, message: "INTERNAL_SERVER_ERROR" };
    }
};

const updateDish = async (args) => {
    console.log(args.restId)
    const profileFields = {};
    if (args.id) profileFields._id = args.id;
    if (args.dishName) profileFields.dishName = args.dishName;
    if (args.ingredients) profileFields.ingredients = args.ingredients;
    if (args.price) profileFields.price = args.price;
    if (args.description) profileFields.description = args.description;
    if (args.category) profileFields.category = args.category;
    let rest = await Rest.findOne({'_id': args.restId})
    if (rest) {
        console.log("HI")
    await Rest.findOneAndUpdate(
        {'menu._id': args.id}, 
        {$set :{'menu.$': profileFields}},
        { safe: true, new: true, useFindAndModify: false })
        return { status: 200, message: "RESTAURANT_MENU_UPDATED" };
    }
    else {
        return { status: 500, message: "INTERNAL_SERVER_ERROR" };
    }
};

const updateOrderStatus = async (args) => {
    if(args) {
    if(args.status == 'Picked up' || args.status == 'Delivered') {
        await Order.findByIdAndUpdate({_id: args.id }, 
            {$set:{orderStatus: args.status,finalOrderStatus: 'Delivered order'} })

        } else {
            await Order.findByIdAndUpdate({_id: args.id }, 
                {$set:{orderStatus: args.status} })
        }
        return { status: 200, message: "ORDER_STATUS_UPDATED" };
    } else {
        return { status: 500, message: "INTERNAL_SERVER_ERROR" };
    }
};



exports.addDish = addDish;
exports.updateDish = updateDish;
exports.updateOrderStatus = updateOrderStatus;