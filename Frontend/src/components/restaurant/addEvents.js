import React, { Component } from 'react';
import Navigationbar from '../navigation';
// import userProfile from './profile';
import '@fortawesome/fontawesome-free/css/all.min.css';
import PropTypes from 'prop-types';
import profilepic from './../images/download.png'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Form, Button} from 'react-bootstrap';
import axios from 'axios';
import backendServer from "../../backendServer";
import {addEvent} from '../../actions/eventAction';
import { connect } from 'react-redux';

class addEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event_name: "",
      description: "",
      time: "",
      date: "",
      location: "",
      hashtag:""
    };
    this.onChange = this.onChange.bind(this);
    this.handleRadio = this.handleRadio.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
}

handleRadio = (e) => {
  this.setState({
    category: e.target.name
  });
}

onSubmit = (e) => {
  e.preventDefault();
  const data = {
    rest_id: localStorage.getItem("rest_id"),
    event_name: this.state.event_name,
    description: this.state.description,
    time: this.state.time,
    date: this.state.date,
    location: this.state.location,
    hashtag: this.state.hashtag
  }

  this.props.addEvent(data)
  // return axios.post(`${backendServer}/yelp/addEvent`,data)
  // .then((response) => {
  //   console.log(response.status)
  //   if (response.status === 200) {
  //     alert("Event added")
  //     window.location = "/events"
  //   }
  // })
  // .catch(function(error) {
  //    alert("Error")
  // })
}
    render() {
      let redirectVar = null;
      if (this.props.event === 'EVENT_ADDED') {
        alert("The event has been added successfully");
        redirectVar = <Redirect to="/events" />
      }
      console.log(this.props)
      return (
        <React.Fragment>
          {redirectVar}
          <Navigationbar />
          <div class='container'>
            <div class='row'>
              <div class='col-md-6' style={{ marginBottom: '5%' }}>
                <h3 style={{ margin: "15px, 0px", color: 'red', float: 'left' }}>Add an event</h3>
                <br />
                <hr class='mb-3'></hr>
                <Form onSubmit={this.onSubmit}>
                <Form.Group controlId='firstName'>
                  <Form.Label style={{margin: "0px", padding: "0px"}}>
                    <strong>Name</strong>
                  </Form.Label>
                  <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted'>
                    This field is required.
                  </Form.Text>
                  <Form.Control onChange={this.onChange} name="event_name" type='text' />
                </Form.Group>
                <Form.Group controlId='lastName'>
                  <Form.Label style={{margin: "0px", padding: "0px"}}>
                    <strong>Description</strong>
                  </Form.Label>
                  <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted'>
                    This field is required.
                  </Form.Text>
                  <Form.Control onChange={this.onChange}  name="description" type='text' />
                </Form.Group>
                <Form.Group controlId='contact'>
                  <Form.Label style={{margin: "0px", padding: "0px"}}>
                    <strong>Time</strong>
                  </Form.Label>
                  <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted'>
                    This field is required.
                  </Form.Text>
                  <Form.Control onChange={this.onChange}  name="time" type='text' />
                </Form.Group>
                <Form.Group controlId='email'>
                  <Form.Label style={{margin: "0px", padding: "0px"}}>
                    <strong>Date</strong>
                  </Form.Label>
                  <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted'>
                    This field is required. Follow the format mentioned.
                  </Form.Text>
                  <Form.Control onChange={this.onChange} name="date" type='text' placeholder="mm-dd-yyyy" />
                </Form.Group>
                <Form.Group controlId='email'>
                  <Form.Label style={{margin: "0px", padding: "0px"}}>
                    <strong>Location</strong>
                  </Form.Label>
                  <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted'>
                    This field is required.
                  </Form.Text>
                  <Form.Control onChange={this.onChange} name="location" type='text' />
                </Form.Group>
                <Form.Group controlId='email'>
                  <Form.Label style={{margin: "0px", padding: "0px"}}>
                    <strong>Hashtags</strong>
                  </Form.Label>
                  <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted'>
                    This field is required.
                  </Form.Text>
                  <Form.Control onChange={this.onChange} name="hashtag" type='text' />
                </Form.Group>
                <Button variant='danger' type='submit' onClick>
                  Save Changes
                </Button>
                <a href='/restaurant' style={{ marginLeft: '15px' }}>
                  Cancel
                </a>
                </Form>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }


  addEvents.propTypes = {
    addEvent: PropTypes.func.isRequired,
    event: PropTypes.object.isRequired
  };

  const mapStateToProps = state => ({
    event: state.events.event

  });

  export default connect(mapStateToProps, { addEvent })(addEvents);

  //export default updateDishes;
  //export default addEvents;