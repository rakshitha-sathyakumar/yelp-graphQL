import React, { Component } from 'react';
import Navigationbar from '../navigation';
import '@fortawesome/fontawesome-free/css/all.min.css';
import PropTypes from 'prop-types';
import { getRest, updateRest } from '../../actions/restProfileActions';
import profilepic from './../images/download.png'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Carousel, Form, FormGroup} from 'react-bootstrap';
import rest1 from './../images/rest1.jpg'
import rest2 from './../images/rest2.jpg'
import food1 from './../images/food1.jpg'
import food2 from './../images/food2.jpg'
import axios from 'axios';
import backendServer from "../../backendServer";
import {getRestProfile} from "../queries/queries";
import { graphql } from 'react-apollo';


class RestaurantPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reviewList: []
        };
        this.onChange = this.onChange.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
    }

    createElements(n) {
        var elements = [];
        for (let i = 0; i < n; i++) {
          elements.push(
            <i className='fa fa-star' aria-hidden='true' style={{ color: 'red' }}></i>,
          );
        }
        return elements;
      }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onUpdate = (e) => {
        //prevent page from refresh
        e.preventDefault();

        let data = Object.assign({}, this.state);
        this.props.updateRest(data);
    };
    render() {
        if(!this.props.data.getRestProfile) {
            return (
                <p> Please wait!! Loading</p>
                )
        } else {
      return (

        <React.Fragment>
          <Navigationbar />
             <div className='container-fluid' >
                <Carousel>
                    <Carousel.Item style={{'height':"400px", margin:"0"}} >
                        <img style={{'height':"500px"}} className="w-100" src={rest1} />
                    </Carousel.Item>
                    <Carousel.Item style={{'height':"400px"}}>
                        <img style={{'height':"500px"}} className="w-100" src={rest2}/>
                    </Carousel.Item>
                    <Carousel.Item style={{'height':"400px"}}>
                        <img style={{'height':"500px"}} className="d-block w-100" src={food1}/>
                    </Carousel.Item>
                    <Carousel.Item style={{'height':"400px"}}>
                        <img style={{'height':"500px"}} className="d-block w-100" src={food2}/>
                    </Carousel.Item>
                </Carousel>
            </div>  
            <div class="row">
            <div class="col-md-6" style={{marginLeft: "50px", textAlign: "top"}}>
                <br />
                <h1 style={{fontWeight: "bolder", margin:"0"}}> {this.props.data.getRestProfile.name}</h1>
                <p> {this.props.data.getRestProfile.street}{','} {this.props.data.getRestProfile.city}{','} {this.props.data.getRestProfile.zipcode}</p>
                <i class='fas fa-star' style={{color: "red"}}></i>
                <i class='fas fa-star' style={{color: "red"}}></i>
                <i class='fas fa-star' style={{color: "red"}}></i>
                <i class='fas fa-star' style={{color: "red"}}></i>
                <i class='fas fa-star-half' style={{color: "red"}}></i>
                <div style={{overflow: "hidden"}}>
                    <p style={{float: "left", color: "green"}}>Open</p>
                    <p style={{float: "left", marginLeft: "10px"}}>{this.props.data.getRestProfile.timings}</p>
                </div>
                <Button href='/viewDish' style = {{backgroundColor: "red", fontSize: "20px", border: '1px solid red', color: 'white'}} variant="link" ><i class="fas fa-utensils"></i> Menu </Button> {' '}
                <Button href = '/events' style = {{marginLeft: "10px", backgroundColor: "red", fontSize: "20px", border: '1px solid red', color: 'white'}} variant="link"><i class="fas fa-calendar-week"></i>  Events </Button> {' '}
                <Button href = '/restOrders' style = {{marginLeft: "10px", backgroundColor: "red", fontSize: "20px", border: '1px solid red', color: 'white'}} variant="link"><i class="fas fa-cart-arrow-down"></i>  Orders </Button>
                <hr />
                <h5 style={{textDecoration:"underline"}}> Available Delivery Methods </h5> {'  '}
                <div>
                    <p> <i class="fas fa-check" style={{color: "green"}}></i>  {this.props.data.getRestProfile.deliveryMethod}</p>
                </div>
                <hr />
                <h4> Review Hightlights</h4>
                <hr />
                {/* {renderReview} */}
            </div>
            <div class="col-xs-8" class="float-right" style={{marginLeft:"400px", marginTop: "20px"}}>
                <p>
                <i class='fas fa-phone'></i> {this.props.data.getRestProfile.contactNo}</p>
                <hr />
                <p>
                <i class='fas fa-envelope'></i> {this.props.data.getRestProfile.email}</p>
                <hr/>
                <a href='/updateRestaurant'>
                    <span>
                        <i class='fas fa-id-card'></i></span> Update your profile 
                </a>
                <hr />
                <a href='/addDish'>
                <span>
                <i class="far fa-plus-square"></i></span> Add dishes</a>
                <hr />
                {/* <a href='/viewDish'>
                <span>
                <i class="fas fa-utensils"></i></span> Full menu</a>
                <hr /> */}
                {/* <a href='/restOrders'>
                <span>
                <i class="fas fa-cart-arrow-down"></i></span> View orders
                </a>
                <hr /> */}
            </div>
            </div>
        </React.Fragment>
      );
    }
  }
}

export default graphql(getRestProfile, {
    options: {
      variables: { id: localStorage.getItem("id") }
    }
  })(RestaurantPage);
