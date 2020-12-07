import React, { Component } from 'react';
import Navigationbar from '../navigation';
// import userProfile from './profile';
import '@fortawesome/fontawesome-free/css/all.min.css';
// import backgroundImage from '../images/menuCard.jpg';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Form, Button, Card, CardGroup} from 'react-bootstrap';
import axios from 'axios';
import backendServer from "../../backendServer";

export class eventDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventDetails: []
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            event_id: this.state.eventDetails._id,
            firstName: localStorage.getItem("first_name"),
            lastName: localStorage.getItem("last_name"),
            userId: localStorage.getItem("user_id")
        }
        axios.defaults.headers.common['authorization'] = localStorage.getItem(
            'token',
          );
        return axios.post(`${backendServer}/yelp/addEvent/update`,data)

        .then((response) => {
            if (response.status === 200) {
                alert("Registered successfully")
                window.location = '/allEvents'
            }
        })
        .catch(function(error) {
            alert("Error")
        })
    }

    componentDidMount() {
        axios.get(`${backendServer}/yelp/viewEvents/eventDetails/${this.props.match.params.event_id}`)
        .then(res => {
            this.setState({ eventDetails: res.data });
            console.log(this.state.eventDetails._id);
        });
    }

    render () {
        console.log(this.state.eventDetails)
        return (
            <React.Fragment>
                <Navigationbar/>
                <div class="container">
                    <div class="container">
                        <center>
                        <h1 style={{margin: "10px"}}> {this.state.eventDetails.eventName} </h1>
                        <hr />
                        <h6 style={{margin: "10px"}}> <i class="fas fa-calendar-day"></i> {this.state.eventDetails.date}</h6>
                        <h6> <i class="fas fa-hourglass"></i> {this.state.eventDetails.time} </h6>
                        <h6> <i class="fas fa-map-pin"></i> {this.state.eventDetails.eventLocation} </h6>
                        <p> {this.state.eventDetails.eventDescription}</p>
                        <p> {this.state.eventDetails.hashtags}</p>
                        <Button style={{backgroundColor:"red", border: "1px solid red"}}onClick = {this.handleSubmit} > Register </Button>
                        </center>
                    </div>
                </div>
            </React.Fragment>
            
        )
    }
         
}
export default eventDetails;