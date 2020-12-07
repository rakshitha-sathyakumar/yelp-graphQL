import React, { Component } from 'react';
import Navigationbar from '../navigation';
import userProfile from './profile';
import '@fortawesome/fontawesome-free/css/all.min.css';
import PropTypes from 'prop-types';
import { getUser, updateUser } from '../../actions/userProfileAction';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import {Form, Button} from 'react-bootstrap';
import {getUserProfile} from "../queries/queries";
import { graphql } from 'react-apollo';
import {updateUserMutation} from "../../mutations/mutations";
import { compose } from 'recompose'
import axios from 'axios';

class BasicDetails extends Component {
  constructor(props) {
    super(props);
    this.state= {};
  }

handleUpdate = async (e) => {
  //prevent page from refresh
  e.preventDefault();
  let mutationResponse = await this.props.updateUserMutation({
   variables: {
            id: localStorage.getItem("id"),
            firstName: e.target.first_name.value,
            lastName:  e.target.last_name.value,
            contactNo:  e.target.contactNo.value,
            email:  e.target.email.value,
            gender: e.target.gender.value,
            dateOfBirth: e.target.dateofbirth.value,
            nickName: e.target.nickname.value,
            address: e.target.address.value,
            thingsiLove: e.target.thingsilove.value,
            notYelping: e.target.notyelping.value,
            headline: e.target.headline.value,
            website: e.target.website.value,
            yelpingSince: e.target.yelpingsince.value
        }
});
console.log(mutationResponse)
        let response = mutationResponse.data.updateUserProfile;
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
      if(!this.props.data.userProfile) {
        return (
          <div></div>
        )
      } else {
      var email = (this.props.data.userProfile.email)
      console.log(this.props.status)
      let redirectVar = null;
      if(this.state.success){
      alert("Profile updated successfully");
      redirectVar = <Redirect to="/userProfile" />
      }

      return (
        <div>
          {redirectVar}
        <React.Fragment>
          <Navigationbar />
        <div class="row">
          <div class='col-xs-3' style={{ marginLeft: "20px"}}>
                    <p style={{ marginLeft: "10px", marginTop: "10px", fontWeight: "bold"}}> Rakshitha's Profile</p>
                    <hr />
                    <ul class="list-unstyled">
                        <li style={{margin: "10px"}}>
                            <a href="/userProfile">
                                Profile Overview
                            </a>
                        </li>
                        <hr/>
                        <li style={{margin: "10px"}}>
                            <a href="#">
                                Messages
                            </a>
                        </li>
                        <hr/>
                        <li style={{margin: "10px"}}>
                            <a href="#">
                                Settings
                            </a>
                        </li>
                    </ul>
            </div>
          <div class='container'>
            <div class='row'>
              <div class='col-md-6' style={{ marginBottom: '5%' }}>
                <h3 style={{ margin: "15px, 0px", color: 'red', float: 'left' }}>Profile</h3>
                <br />
                <hr class='mb-3'></hr>
                <Form onSubmit ={this.handleUpdate}>
                  <Form.Group controlId='firstName'>
                    <Form.Label style={{margin: "0px", padding: "0px"}}>
                      <strong >First Name</strong>
                    </Form.Label>
                    <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted'>
                      This field is required.
                    </Form.Text>
                    <Form.Control name="first_name" onChange={this.onChange} type='text' defaultValue={this.props.data.userProfile.firstName} />
                  </Form.Group>
                  <Form.Group controlId='lastName'>
                    <Form.Label style={{margin: "0px", padding: "0px"}}>
                      <strong>Last Name</strong>
                    </Form.Label>
                    <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted'>
                      This field is required.
                    </Form.Text>
                    <Form.Control name="last_name" onChange={this.onChange} type='text' defaultValue={this.props.data.userProfile.lastName}/>
                  </Form.Group>
                  <Form.Group controlId='email'>
                    <Form.Label style={{margin: "0px", padding: "0px"}}>
                      <strong>Email ID</strong>
                    </Form.Label>
                    <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted'>
                      This field is required.
                    </Form.Text>
                    <Form.Control name="email" onChange={this.onChange} type='text' defaultValue={this.props.data.userProfile.email}/>
                  </Form.Group>
                  <Form.Group controlId='gender'>
                      <Form.Label style={{margin: "0px", padding: "0px"}}>
                          <strong>Gender</strong>
                      </Form.Label>
                      <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted'>
                      This field is required.
                    </Form.Text>
                    <Form.Control name='gender' onChange={this.onChange} type='text' defaultValue={this.props.data.userProfile.gender} />
                  </Form.Group>
                  <Form.Group controlId='contact'>
                    <Form.Label style={{margin: "0px", padding: "0px"}}>
                      <strong>Contact number</strong>
                    </Form.Label>
                    <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted'>
                      This field is required.
                    </Form.Text>
                    <Form.Control name="contactNo" onChange={this.onChange} type='text' defaultValue={this.props.data.userProfile.contactNo}/>
                  </Form.Group>
                  <Form.Group controlId='dob'>
                    <Form.Label style={{margin: "0px", padding: "0px"}}>
                      <strong>Birthday</strong>
                    </Form.Label>
                    <Form.Control
                      type='text'
                      name='dateofbirth'
                      placeholder='23 September 2001'
                      onChange={this.onChange}
                      defaultValue={this.props.data.userProfile.dateOfBirth}
                    />
                  </Form.Group>
                  <Form.Group controlId='address'>
                    <Form.Label style={{margin: "0px", padding: "0px"}}>
                      <strong>Address</strong>
                    </Form.Label>
                    <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted'>
                      This field is required.
                    </Form.Text>
                    <Form.Control name="address" onChange={this.onChange} type='text' defaultValue={this.props.data.userProfile.address}/>
                  </Form.Group>
                  <Form.Group controlId='nickName'>
                    <Form.Label style={{margin: "0px", padding: "0px"}}>
                      <strong>Nick Name</strong>
                    </Form.Label>
                    <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted'>
                      The Boss, Calamity Jane, The Prolific Reviewer
                    </Form.Text>
                    <Form.Control name="nickname" onChange={this.onChange} type='text' defaultValue={this.props.data.userProfile.nickName} />
                  </Form.Group>
                  <Form.Group controlId='yelpingsince'>
                    <Form.Label style={{margin: "0px", padding: "0px"}}>
                      <strong>Yelping since</strong>
                    </Form.Label>
                    <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted'>
                      May 2017
                    </Form.Text>
                    <Form.Control name="yelpingsince" onChange={this.onChange} type='text' defaultValue={this.props.data.userProfile.yelpingSince}/>
                  </Form.Group>
                  <Form.Group controlId='yelpingSince'>
                    <Form.Label style={{margin: "0px", padding: "0px"}}>
                      <strong>Things I love...</strong>
                    </Form.Label>
                    <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted'>
                    Comma separated phrases (e.g. sushi, Radiohead, puppies)
                    </Form.Text>
                    <Form.Control name="thingsilove" onChange={this.onChange} type='text' defaultValue={this.props.data.userProfile.thingsiLove} />
                  </Form.Group>
                  <Form.Group controlId='notYelping'>
                    <Form.Label style={{margin: "0px", padding: "0px"}}>
                      <strong>When I am not yelping...</strong>
                    </Form.Label>
                    <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted'>
                    I’m missing out, I’m working at the art gallery, I’m probably at the movies
                    </Form.Text>
                    <Form.Control name="notyelping" onChange={this.onChange} type='text' defaultValue={this.props.data.userProfile.notYelping} />
                  </Form.Group>
                  <Form.Group controlId='headline'>
                    <Form.Label style={{margin: "0px", padding: "0px"}}>
                      <strong>Your Headline</strong>
                    </Form.Label>
                    <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted'>
                      Taco Tuesday Aficionado, The Globetrotting Reviewer
                    </Form.Text>
                    <Form.Control name="heading" onChange={this.onChange} type='text' defaultValue={this.props.data.userProfile.headline} />
                  </Form.Group>
                  <Form.Group controlId='blob'>
                    <Form.Label style={{margin: "0px", padding: "0px"}}>
                      <strong> My blob or Website</strong>
                    </Form.Label>
                    <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted'>
                    www.example.com/myawesomeblog
                    </Form.Text>
                    <Form.Control name="website" onChange={this.onChange} type='text'  defaultValue={this.props.data.userProfile.website}/>
                  </Form.Group>
                  <Button variant='danger' type='submit'>
                    Save Changes
                  </Button>
                  <a href='/userProfile' style={{ marginLeft: '15px' }}>
                    Cancel
                  </a>
                </Form>
              </div>
            </div>
          </div>
          </div>
        </React.Fragment>
        </div>
      );
    }
  }
  }

  export default compose(
    graphql(getUserProfile, {
      options: () => {
        return {
          variables: { id: localStorage.getItem('id') },
          fetchPolicy: 'network-only',
        };
      },
    }),
    graphql(updateUserMutation, { name: 'updateUserMutation' }),
  )(BasicDetails);