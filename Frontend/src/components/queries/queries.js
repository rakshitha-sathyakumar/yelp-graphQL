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

export { getUserProfile,
    getRestProfile,
    getRestMenu,
    getMenuItem
    };
