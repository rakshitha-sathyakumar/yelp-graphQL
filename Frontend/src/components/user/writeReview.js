import React, { Component } from 'react';
import Navigationbar from '../navigation';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Form, Button, Carousel} from 'react-bootstrap';
import axios from 'axios';
import { Redirect } from 'react-router';
import backendServer from "../../backendServer";
import {addReviewMutation} from '../../mutations/mutations';
import { graphql, withApollo } from 'react-apollo';

class addReview extends Component {
constructor(props) {
    super(props);
    this.state = {
      review: "",
      rating: ""
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
    rating: e.target.name
  });
}


onSubmit = async (e) => {
    var today = new Date();
    var current_date = (today.getMonth()+1)+"/"+today.getDate()+"/"+today.getFullYear();
    console.log(current_date)
  e.preventDefault();
  let mutationResponse = await this.props.addReviewMutation({
  variables: {
    id: localStorage.getItem("rest_id"),
    firstName: localStorage.getItem("firstName"),
    lastName: localStorage.getItem("lastName"),
    review: this.state.review,
    date: current_date,
    rating: this.state.rating
  }
});
console.log(mutationResponse)
        let response = mutationResponse.data.addReview;
        if (response) {
            if (response.status === "200") {
                console.log(response)
                this.setState({
                    success: true,
                    signupFlag: true
              });
            } else {
                this.setState({
                    message: response.message,
                    signupFlag: true
              });
          }
    }
  }
    render() {
      let redirectVar = null;
      if(this.state.success){
      alert("Review added successfully");
      redirectVar = <Redirect to="/restaurant_profile" />
      }
      return (
        <React.Fragment>
          {redirectVar}
          <Navigationbar />
          <div class='container'>
            <div class='row'>
              <div class='col-md-6' style={{ marginBottom: '5%' }}>
                <h3 style={{ margin: "15px, 0px", color: 'red', float: 'left' }}>Add review</h3>
                <br />
                <hr class='mb-3'></hr>
                <Form onSubmit={this.onSubmit}>
                <Form.Group controlId='firstName'>
                  <Form.Label style={{margin: "0px", padding: "0px"}}>
                    <strong>Review</strong>
                  </Form.Label>
                  <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted'>
                    This field is required.
                  </Form.Text>
                  <Form.Control onChange={this.onChange} name="review" type='text' />
                </Form.Group>
                <Form.Group controlId='rating'>
                    <Form.Label style={{margin: "0px", padding: "0px"}}>
                        <strong>Rating</strong>
                    </Form.Label><br />
                    <Form.Check 
                    name="1" onChange={this.handleRadio} label="1" />
                    <Form.Check 
                    name="2" onChange={this.handleRadio} label="2" />
                    <Form.Check 
                    name="3" onChange={this.handleRadio} label="3" />
                    <Form.Check 
                    name="4" onChange={this.handleRadio} label="4" />
                    <Form.Check 
                    name="5" onChange={this.handleRadio} label="5" />
                </Form.Group>
                <Button variant='danger' type='submit'>
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

  export default graphql(addReviewMutation, {name: "addReviewMutation"}) (addReview);