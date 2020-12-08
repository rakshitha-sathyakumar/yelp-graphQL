import React, { Component } from 'react';
import '../App.css';
import backGroundImage from "./images/landingPageImage.jpg"
import CustomerCarousel from "./images/yelp_logo.jpg"
import { Form, FormControl, Button, Image, Dropdown, ButtonGroup } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {Link} from 'react-router-dom';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


var backgroundImagePic = {
    backgroundImage: `url(${backGroundImage})`,
    width: "1450px",
    height: "820px"

}

class HomePage extends Component {

    handleOrder = (e) => {
        if (localStorage.getItem("user_id") === null)
        {
            window.location = '/restOrders';
        } else {
            window.location = '/user/orders'
        }
    }


handleLogout = () => {
    window.localStorage.clear();
    window.location ='/'
  };

  
    render() {
        return (
            <div style={backgroundImagePic}>
                <div>
                    <form class="form-inline ml-0">
                        <Button href='/allEvents' style = {{margin:"25px 0px", marginLeft: "15px", backgroundColor: "transparent", border: 'none', fontSize: "20px", color: "red", outline: 'none'}} variant='link'> <i class="fas fa-calendar"></i> Events</Button> {' '}
                        <Link  to={{
                            pathname: '/list',
                            state: {
                                        searchKeyword: null,
                                        searchCategory: 0,
                                },
                            }}> <a style= {{paddingTop: "40px", marginLeft: "15px", backgroundColor: "transparent", border: 'none', fontSize: "20px", color: "red", outline: 'none', position: "center"}}> <i class="fas fa-utensils"></i> Restaurant </a>
                        </Link>
                        <Button href='/user/orders' style = {{margin:"25px 0px", backgroundColor: "transparent", border: 'none', fontSize: "20px", color: "red", outline: 'none'}} variant='link' onClick={this.handleOrder}> <i class="fas fa-hamburger"></i> Orders </Button>
                        <Button href='/allUsers' style = {{margin:"25px 0px", backgroundColor: "transparent", border: 'none', fontSize: "20px", color: "red", outline: 'none'}} variant='link'> <i class="fas fa-users"></i> Users</Button>
                        <Dropdown style={{marginLeft:"900px", marginTop: "20px"}}>
                            <Dropdown.Toggle style={{backgroundColor: "red", border: "1px solid red"}}id="dropdown-basic"> <i class="fas fa-user"></i> </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="/userProfile">Profile overview</Dropdown.Item>
                                <Dropdown.Item onClick={this.handleLogout}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </form>
                </div>
                <div class='container'>
                    <center>
                        <Image style={{paddingTop: "100px"}} src={CustomerCarousel}/>
                        <h1> We Know Just The Place</h1>
                            {/* <Form inline>
                                <input style={{marginLeft: "200px", width: "700px", height: "40px", border: "1px solid black", borderRadius: "5px"}} type="text" placeholder="restaurants, delivery..."/>
                                <button style ={{marginLeft: "5px", width: "60px", height:"40px", background: "red", color: "white", border: "1px solid red", cursor: "pointer", borderRadius: "5px"}} type="submit"><i class="fa fa-search"></i></button>
                            </Form> */}
                    </center>
                </div>
            </div>
        )
    }
}

export default HomePage;