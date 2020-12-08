const Order = require("../models/orders");

const addOrder = async (args) => {
    let newOrder = new Order({
        restId: args.restId,
        id: args.id,
        restName: args.restName,
        dishName: args.dishName,
        firstName: args.firstName,
        lastName: args.lastName,
        orderType: args.orderType,
        date: args.date,
        time: args.time,
        orderStatus: "Order received",
        finalOrderStatus: "New order",
    })
    let savedOrder = await newOrder.save();
    if (savedOrder) {
        return { status: 200, message: "ORDER_ADDED" };
    } else {
        return { status: 500, message: "INTERNAL_SERVER_ERROR" };
    }
};

exports.addOrder = addOrder;