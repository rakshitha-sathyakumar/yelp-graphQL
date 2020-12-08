import { gql } from 'apollo-boost';
const addUserMutation = gql`
    mutation addUser($firstName: String, $lastName: String, $email: String, $password: String){
        addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password){
            message
            status
        }
    }
`;

const addRestMutation = gql`
    mutation addRest($name: String, $email: String, $password: String, $street: String, $zipcode: String){
        addRest(name: $name, email: $email, password: $password, street: $street, zipcode: $zipcode){
            message
            status
        }
    }
`;
const loginMutation = gql`
    mutation login($email: String, $password: String){
        login(email: $email, password: $password){
            message
            status
        }
    }
`;

const updateUserMutation = gql`
mutation updateUserProfile ($id: String, $firstName: String, $lastName: String, $email: String, $gender: String, $dateOfBirth: String, $address: String, $contactNo: String, $nickName: String, $thingsiLove: String, $notYelping: String, $headline: String, $website: String, $yelpingSince: String ){
    updateUserProfile(id: $id, firstName: $firstName, lastName: $lastName, email: $email, gender: $gender, dateOfBirth: $dateOfBirth, address: $address, contactNo: $contactNo, nickName: $nickName, thingsiLove: $thingsiLove, notYelping: $notYelping, headline: $headline, website: $website, yelpingSince: $yelpingSince)
{
    message
    status
}
}
`;

const updateRestMutation = gql`
mutation updateRestProfile ($id: String, $name: String, $email: String, $street: String, $city: String, $zipcode: String, $cuisine: String, $timings: String, $contactNo: String, $deliveryMethod: String ){
    updateRestProfile(id: $id, name: $name, email: $email, street: $street, city: $city, zipcode: $zipcode, cuisine: $cuisine, timings: $timings, contactNo: $contactNo, deliveryMethod: $deliveryMethod)
{
    message
    status
}
}
`;

const addDishMutation= gql`
mutation addDish ($id: String, $dishName: String, $ingredients: String, $price: String, $description: String, $category: String ){
    addDish(id: $id, dishName: $dishName, ingredients: $ingredients, price: $price, description: $description, category: $category)
{
    message
    status
}
}
`;

const updateDishMutation= gql`
mutation updateDish ($restId: String, $id: String, $dishName: String, $ingredients: String, $price: String, $description: String, $category: String ){
    updateDish(restId: $restId, id: $id, dishName: $dishName, ingredients: $ingredients, price: $price, description: $description, category: $category)
{
    message
    status
}
}
`;

const updateOrderStatusMutation= gql`
mutation updateOrderStatus ($id: String, $status: String ){
    updateOrderStatus(id: $id, status: $status)
{
    message
    status
}
}
`;

const addReviewMutation= gql`
mutation addReview ($id: String, $firstName: String, $lastName: String, $review: String, $date: String, $rating: String){
    addReview(id: $id, firstName: $firstName, lastName: $lastName, review: $review, date: $date, rating: $rating)
{
    message
    status
}
}
`;

const addOrderMutation= gql`
mutation addOrder ($restId: String, $id: String, $restName: String, $dishName: String, $firstName: String, $lastName: String, $orderType: String, $date: String, $time: String, $orderStatus: String, $finalOrderStatus: String){
    addOrder(restId: $restId, id: $id, restName: $restName, dishName: $dishName, firstName: $firstName, lastName: $lastName, orderType: $orderType, date: $date, time: $time, orderStatus: $orderStatus, finalOrderStatus: $finalOrderStatus)
{
    message
    status
}
}
`;

export {addUserMutation,
    addRestMutation,
    loginMutation,
    updateUserMutation,
    updateRestMutation,
    addDishMutation,
    updateDishMutation,
    updateOrderStatusMutation,
    addReviewMutation,
    addOrderMutation
};
