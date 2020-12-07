import React, { Component } from 'react';
import '../App.css';
import backGroundImage from "./images/landingPageImage.jpg"
import CustomerCarousel from "./images/yelp_logo.jpg"
import { Form, Button, Image } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


var backgroundImagePic = {
    backgroundImage: `url(${backGroundImage})`,
    width: "1450px",
    height: "820px"

}


class LandingPage extends Component {
    render() {
        return (
            <div style={backgroundImagePic}>
                <div>
                    <Button style = {{margin:"25px 0px", marginLeft: "10px", backgroundColor: "transparent", fontSize: "20px", border: 'none', color: "black"}} variant="link"> <i class="fas fa-calendar"></i> Events</Button> {' '}
                    <Button style = {{margin:"25px 0px", backgroundColor: "transparent", border: 'none', fontSize: "20px", color: "black", outline: 'none'}} variant='link'> <i class="fas fa-utensils"></i> Restaurant</Button> {' '}
                    <a href ='/login' class="btn bg-transparent float-right" style={{marginTop: "25px", marginRight: "45px", border: "1px solid black"}} role="button"> Login </a>
                    <a href ='/customerSignup' class="btn bg-transparent float-right" style={{marginTop:"25px", marginRight: "10px", border: "1px solid black"}}role="button"> Sign Up </a>
                </div>
                <div class='container'>
                    <center>
                        <Image style={{paddingTop: "100px"}} src={CustomerCarousel}/>
                        <h1> We Know Just The Place</h1>
                            {/* <Form inline>
                                <input style={{marginLeft: "200px", width: "700px", height: "40px", border: "1px solid black", borderRadius: "5px"}} type="text" placeholder="restaurants, delivery..."/>
                                <button style ={{ marginLeft: "5px",width: "60px", height:"40px", background: "red", color: "white", border: "1px solid red", borderRadius: "5px", cursor: "pointer"}} type="submit"><i class="fa fa-search"></i></button>
                            </Form> */}
                    </center>
                </div>
            </div>
        )
    }
}

export default LandingPage;