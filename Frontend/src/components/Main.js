import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import Login from './Login';
import CustomerSignup from './SignUp/customerSignup';
import RestaurantSignup from './SignUp/restaurantSignup';
import Navigationbar from './navigation';
import userProfile from './user/profile';
import BasicDetails from './user/profileUpdate';
import RestaurantPage from './restaurant/restaurantLanding';
import updateRest from './restaurant/updateRestaurant';
import updateDishes from './restaurant/Menu/addDishes';
import viewDish from './restaurant/Menu/viewDishes';
import dishList from './user/viewDishList';
import viewEvents from './restaurant/eventList';
import addEvent from './restaurant/addEvents';
import HomePage from './home';
import getAppetizer from './restaurant/Menu/getAppetizer';
import getMaincourse from './restaurant/Menu/getMaincourse';
import getSalad from './restaurant/Menu/getSalad';
import getDessert from './restaurant/Menu/getDessert';
import getBeverage from './restaurant/Menu/getBeverage';
import viewRest from './restaurant/restaurantList';
import userRestpage from './user/userRestaurant';
import addReview from './user/writeReview';
import getRegUserList from './restaurant/userRegList';
import restUserProfile from './restaurant/restUserProfile';
import editDish from './restaurant/Menu/editDish';
import allEvents from './user/allEvents';
import eventDetails from './user/eventDetails';
import userOrders from './user/userOrders';
import restOrders from './restaurant/restOrders';
import getAllUsers from './user/allUsers';
import getMessages from './user/messages';


class Main extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/home" component={HomePage} />
                <Route exact path="/login" component={Login}/>
                <Route exact path="/customerSignup" component={CustomerSignup}/>
                <Route exact path="/restaurantSignup" component={RestaurantSignup}/>
                <Route exact path="/navigation" component={Navigationbar}/>
                <Route exact path="/userProfile" component={userProfile}/>
                <Route exact path="/update" component={BasicDetails}/>
                <Route exact path="/restaurant" component={RestaurantPage}/>
                <Route exact path="/updateRestaurant" component={updateRest}/>
                <Route exact path="/addDish" component={updateDishes}/>
                <Route exact path="/viewDish" component={viewDish}/>
                <Route exact path='/userMenu' component={dishList}/>
                <Route exact path="/events" component={viewEvents}/>
                <Route exact path="/addEvent" component={addEvent}/>
                <Route exact path="/menu/appetizer" component={getAppetizer}/>
                <Route exact path='/menu/maincourse' component={getMaincourse}/>
                <Route exact path='/menu/salad' component={getSalad}/>
                <Route exact path='/menu/dessert' component={getDessert}/>
                <Route exact path='/menu/beverage' component={getBeverage}/>
                <Route exact path='/list' component={viewRest}/>
                <Route exact path='/restaurant_profile' component={userRestpage}/>
                <Route exact path='/addReview' component={addReview}/>
                <Route exact path='/regUser/:event_id'  component={getRegUserList}/>
                <Route exact path='/userProfile/:user_id' component={restUserProfile}/>
                <Route exact path='/editDish/:rest_id/:dish_id' component={editDish}/>
                <Route exact path='/allEvents' component={allEvents}/>
                <Route exact path='/event/:event_id' component={eventDetails}/>
                <Route exact path='/user/orders' component={userOrders}/>
                <Route exact path='/restOrders' component={restOrders}/>
                <Route exact path='/allUsers' component={getAllUsers}/>
                <Route exact path='/messages' component={getMessages}/>



            </div>
        )
    }
}
export default Main;