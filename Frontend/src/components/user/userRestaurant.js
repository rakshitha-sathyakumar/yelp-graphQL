import React, { Component } from 'react';
import Navigationbar from '../navigation';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Card, Form, Button, Carousel} from 'react-bootstrap';
import rest1 from './../images/rest1.jpg'
import rest2 from './../images/rest2.jpg'
import food1 from './../images/food1.jpg'
import food2 from './../images/food2.jpg'
import axios from 'axios';
import backendServer from "../../backendServer";


class userRestpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restProfile:[],
            reviewList: []
        };
        // this.onUpdate = this.onUpdate.bind(this);
        // this.onClick = this.onClick.bind(this);
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

    componentDidMount() {
        console.log(localStorage.getItem("rest_name"));
        axios.get(`${backendServer}/yelp/restProfile/${localStorage.getItem("rest_id")}`)
        .then(res => {
            console.log(res);
            this.setState({ restProfile: res.data });
        axios.get(`${backendServer}/yelp/addReview/${localStorage.getItem("rest_id")}`)
        .then(res =>{
        console.log(res);
    })
        
    })
}
    
    render() {
        //this.setState({reviewList: this.state.resProfile.review});
        //console.log(this.state.reviewList);
        let renderReview;
        if (this.state.restProfile.review) {
        renderReview = this.state.restProfile.review.map(review => {
            return (
                <div class='col-md-10'>
                        <h3 style={{margin: "5px"}}>{review.firstName} {review.lastName} </h3>
                        <h6 style={{margin: "5px"}}> {this.createElements(review.rating)}   {review.date}</h6>
                        <p style={{margin: "5px"}}>"{review.review}"</p>

                    <br/>
                    <hr />
                </div>
            )
        })
    }
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
                <h1 style={{fontWeight: "bolder", margin:"0"}}> {this.state.restProfile.name}</h1>
                <p> {this.state.restProfile.address}</p>
                <i class='fas fa-star' style={{color: "red"}}></i>
                <i class='fas fa-star' style={{color: "red"}}></i>
                <i class='fas fa-star' style={{color: "red"}}></i>
                <i class='fas fa-star' style={{color: "red"}}></i>
                <i class='fas fa-star-half' style={{color: "red"}}></i>
                <div style={{overflow: "hidden"}}>
                    <p style={{float: "left", color: "green"}}>Open</p>
                    <p style={{float: "left", marginLeft: "10px"}}>{this.state.restProfile.timings}</p>
                </div>
                <div class="inline-block">
                <Button href = '/addReview' style = {{backgroundColor: "red", fontSize: "20px", border: '1px solid red', color: "white"}} variant="link"> <i class='fas fa-star'></i> Write a review</Button> {' '}
                <Button href = '/userProfile' style = {{backgroundColor: "transparent", fontSize: "20px", border: '1px solid black', color: 'black'}} variant="link"><i class='fas fa-camera'></i> Add a photo</Button> {' '}
                <Button href = '/allEvents' style = {{backgroundColor: "transparent", fontSize: "20px", border: '1px solid black', color: 'black'}} variant="link"><i class="fas fa-calendar-week"></i>  Events</Button>
                </div>
                <hr />
                <h5 style={{textDecoration: "underline"}}> Available delivery method </h5> {'  '}
                <div>
                    <p style={{float: "left"}}> <i class="fas fa-check" style={{color: "green"}}></i> {this.state.restProfile.deliveryMethod}</p>
                </div>
                <br/>
                <hr />
                <h4> Review Hightlights</h4>
                <hr />
                <br />
                    {renderReview}
            </div>
            <div class="col-xs-8" class="float-right" style={{marginLeft:"300px", marginTop: "20px"}}>
                <p>
                <i class='fas fa-phone'></i> {this.state.restProfile.contactNo}</p>
                <hr />
                <p>
                <i class='fas fa-envelope'></i> {this.state.restProfile.email}</p>
                <hr/>
                <a href='/userMenu'>
                <span>
                <i class="fas fa-utensils"></i></span> Full menu</a>
                <hr />
            </div>
            </div>
        </React.Fragment>
      );
    }
}

export default userRestpage;