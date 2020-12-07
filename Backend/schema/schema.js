const graphql = require('graphql');
const user = require("../models/customer");
const rest = require("../models/restaurant");
const order = require("../models/orders");
const { login } = require('../mutations/login');
const { userSignup, restSignup } = require('../mutations/signup');
const { updateUserProfile } = require('../mutations/updateProfile');
const { updateRestProfile } = require('../mutations/updateProfile');
const { addDish, updateDish } = require('../mutations/updateDish');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;


const StatusType = new GraphQLObjectType({
    name: 'Status',
    fields: () => ({
        status: { type: GraphQLString },
        message: { type: GraphQLString }
    })
});

const userProfileType = new GraphQLObjectType({
    name: 'userProfile',
    fields: () => ({
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        gender: { type: GraphQLString },
        dateOfBirth: { type: GraphQLString },
        address: { type: GraphQLString },
        contactNo: { type: GraphQLString },
        nickName: { type: GraphQLString },
        thingsiLove: { type: GraphQLString },
        notYelping: { type: GraphQLString },
        headline: { type: GraphQLString },
        website: { type: GraphQLString },
        yelpingSince: { type: GraphQLString },
    })
});

const restProfileType = new GraphQLObjectType({
    name: 'restProfile',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        street: { type: GraphQLString },
        city: { type: GraphQLString },
        zipcode: { type: GraphQLString },
        cuisine: { type: GraphQLString },
        timings: { type: GraphQLString },
        contactNo: { type: GraphQLString },
        deliveryMethod: { type: GraphQLString },
    })
});

const restMenuType = new GraphQLObjectType({
    name: 'restMenu',
    fields: () => ({
        id: { type: GraphQLID },
        dishName: { type: GraphQLString },
        ingredients: { type: GraphQLString },
        price: { type: GraphQLString },
        description: { type: GraphQLString },
        category: {type: GraphQLString}
    })
});

const orderType = new GraphQLObjectType({
    name: 'orders',
    fields: () => ({
        id: { type: GraphQLID },
        restName: { type: GraphQLString },
        dishName: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        orderType: { type: GraphQLString },
        date: { type: GraphQLString },
        time: { type: GraphQLString },
        orderStatus: {type: GraphQLString},
        finalOrderStatus: {type: GraphQLString},
    })
});




const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        userProfile: {
            type: userProfileType,
            args: { id: { type: GraphQLString } },
            async resolve(parent, args) {
                let userProfile = await user.findById({ "_id": args.id });
                return userProfile;
            }
        },
        getRestProfile: {
            type: restProfileType,
            args: { id: { type: GraphQLString } },
            async resolve(parent, args) {
                let restProfile = await rest.findById({ "_id": args.id });
                return restProfile;
            }
        },
        getRestMenu: {
            type: new GraphQLList(restMenuType),
            args: { id: { type: GraphQLString }, category: { type: GraphQLString } },
            async resolve(parent, args) {
                let restMenu = await rest.findById({ "_id": args.id })
                const finalResult = restMenu.menu.filter(each => each.category === args.category)
                console.log(finalResult)
                return finalResult;
            }
        },
        getMenuItem: {
            type:  restMenuType,
            args: {restId: {type: GraphQLString}, dishId: { type: GraphQLString } },
            async resolve(parent, args) {
            let menuItem =  await rest.findOne(
                {_id: args.restId},
                { menu: { $elemMatch: { _id: args.dishId } } })  
            console.log(menuItem.menu[0]);
            return menuItem.menu[0];
            }
        },
        getRestOrders: {
            type:  new GraphQLList(orderType),
            args: {id: {type: GraphQLString}},
            async resolve(parent, args) {
            let restOrders =  await order.find({restId: args.id } )
            console.log(restOrders)
            return restOrders;
            }
        },


    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: StatusType,
            args: {
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            async resolve(parent, args) {
                let result = await userSignup(args);
                console.log(result);
                return result;
            }
        },
        addRest: {
            type: StatusType,
            args: {
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                street: { type: GraphQLString },
                zipcode: { type: GraphQLString },
            },
            async resolve(parent, args) {
                let result = await restSignup(args);
                console.log(result);
                return result;
            }
        },
        login: {
            type: StatusType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            async resolve(parent, args) {
                let result = await login(args);
                return result;
            }
        },
        updateUserProfile: {
            type: StatusType,
            args: {
                id: { type: GraphQLString },
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                email: { type: GraphQLString },
                gender: { type: GraphQLString },
                dateOfBirth: { type: GraphQLString },
                address: { type: GraphQLString },
                contactNo: { type: GraphQLString },
                nickName: { type: GraphQLString },
                thingsiLove: { type: GraphQLString },
                notYelping: { type: GraphQLString },
                headline: { type: GraphQLString },
                website: { type: GraphQLString },
                yelpingSince: { type: GraphQLString },
            },
            async resolve(parent, args) {
                return updateUserProfile(args);
            }
        },
        updateRestProfile: {
            type: StatusType,
            args: {
                id: { type: GraphQLString },
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                street: { type: GraphQLString },
                city: { type: GraphQLString },
                zipcode: { type: GraphQLString },
                cuisine: { type: GraphQLString },
                timings: { type: GraphQLString },
                contactNo: { type: GraphQLString },
                deliveryMethod: { type: GraphQLString },
            },
            async resolve(parent, args) {
                return updateRestProfile(args);
            }
        },
        addDish: {
            type: StatusType,
            args: {
                id: { type: GraphQLString },
                dishName: { type: GraphQLString },
                ingredients: { type: GraphQLString },
                price: { type: GraphQLString },
                description: { type: GraphQLString },
                category: { type: GraphQLString },
            },
            async resolve(parent, args) {
                let result = await addDish(args);
                console.log(result);
                return result;
            }
        },
        updateDish: {
            type: StatusType,
            args: {
                restId : { type: GraphQLString },
                id: { type: GraphQLString },
                dishName: { type: GraphQLString },
                ingredients: { type: GraphQLString },
                price: { type: GraphQLString },
                description: { type: GraphQLString },
                category: { type: GraphQLString },
            },
            async resolve(parent, args) {
                console.log(args)
                let result = await updateDish(args);
                return result;
            }
        },
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});