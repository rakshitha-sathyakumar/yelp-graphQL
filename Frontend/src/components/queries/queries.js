import { gql } from 'apollo-boost';

const getUserProfile = gql`
query($id: String){
    userProfile(id: $id){
            firstName
            lastName
            email
            gender
            dateOfBirth
            address
            contactNo
            nickName
            thingsiLove
            notYelping
            headline
            website
            yelpingSince      
}
}
`;

const getRestProfile = gql`
query($id: String){
    getRestProfile(id: $id){
            name
            email
            street
            city
            zipcode
            cuisine
            timings
            contactNo
            deliveryMethod     
}
}
`;

const getRestMenu = gql`
query($id: String, $category: String){
    getRestMenu(id: $id, category: $category){
            id
            dishName
            ingredients
            price
            description
            category    
}
}
`;

const getMenuItem = gql`
query($restId: String, $dishId: String){
    getMenuItem(restId: $restId, dishId: $dishId){
            id
            dishName
            ingredients
            price
            description
            category    
}
}
`;

const getRestOrders = gql`
query($id: String){
    getRestOrders(id: $id){
        id
        userId
        restName
        dishName
        firstName
        lastName
        orderType
        date
        time
        orderStatus
        finalOrderStatus
}
}
`;

const getUserOrders = gql`
query($id: String){
    getUserOrders(id: $id){
        id
        restName
        dishName
        firstName
        lastName
        orderType
        date
        time
        orderStatus
        finalOrderStatus
}
}
`;

const getRestReviews = gql`
query($id: String){
    getReviews(id: $id){
        id
        firstName
        lastName
        rating
        review
        date
}
}
`;

const getSearchResult = gql`
query($keyword: String, $category: Int){
    getRestSearch(keyword: $keyword, category: $category){
            id
            name
            email
            street
            city
            zipcode
            cuisine
            timings
            contactNo
            deliveryMethod     
}
}
`;


export { getUserProfile,
    getRestProfile,
    getRestMenu,
    getMenuItem,
    getRestOrders,
    getUserOrders,
    getRestReviews,
    getSearchResult
    };
