import React, { Component } from 'react';
import Navigationbar from '../navigation';
import '@fortawesome/fontawesome-free/css/all.min.css';
import PropTypes from 'prop-types';
import profilepic from './../images/download.png'
import { connect } from 'react-redux';
import { getUser, updateProfilePic } from '../../actions/userProfileAction';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Jumbotron, CardImg} from 'react-bootstrap';
import YelpImage from './../images/yelp_logo.jpg'
import axios from 'axios';
import backendServer from "../../backendServer";
import {getUserProfile} from "../queries/queries";
import { graphql } from 'react-apollo';

class userProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
      if(!this.props.data.userProfile){
          return (
          <p> Please wait!! Loading</p>
          )
      } else {

    return (
        <div style={{margin:"5px"}}>
            <Navigationbar />
            <div class='jumbotron'>
                    <div class='row'>
                        <div class='col-xs-3 card profilePic' style={{position:"absolute"}}>
                            <card>
                                <CardImg style={{height: "300px", width: "225px"}}variant='top' className='profileImg'/>
                            </card>
                        </div>
                        <div class='col-xs-4 profileName' style={{position: "relative", marginLeft: "250px"}}>
                            <h1>{this.props.data.userProfile.firstName} {this.props.data.userProfile.lastName}</h1>
                            <h6> "{this.props.data.userProfile.headline}" </h6>
                            <p style={{fontSize:"13px"}}>{this.props.data.userProfile.email}</p>
                            
                        </div>
                        
                        <div class='col-xs-4' style={{marginLeft: '300px'}}>
                            <ul class='list-unstyled'>
                                <li>

                                {/* <label for='profileImage'>
                                    <a class='btn btn-secondary btn-sm btn-rounded'>
                                        <i class='fas fa-camera'></i> Add profile photo</a>
                            </label> */}
                            {/* <input type='file' name='profileImage' id='profileImage' style={{ display: 'none'}} value='' onChange = {this.onImageChange}></input>{' '}
                            <a class="link" onClick={this.handleImageUpload}> Upload</a>{' '}
                            <a class="link" onClick={this.handleUpdate}> Save </a> */}
                            
                                </li>
                                <li>
                                    <a href='/update'>
                                        <span>
                                        <i class='fas fa-id-card'></i>{' '}
                                        </span>
                                        Update your profile
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
            </div>
            <div class='row' style={{ marginLeft:"10px"}}>
                <div class='col-xs-3' style={{ marginTop: "100px"}}>
                    {/* <p style={{ marginLeft: "10px",fontWeight: "bold"}}> Rakshitha Sathyakumar's Profile</p> */}
                    <ul class="list-unstyled">
                        <li style={{margin: "10px"}}>
                            <a href="#">
                                Profile Overview
                            </a>
                        </li>
                        <hr/>
                        <li style={{margin: "10px"}}>
                            <a href="/messages">
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
                <div class='col-xs-3' style={{marginLeft: "150px"}}>
                    <h3 style={{color:'red'}}> Basic Information</h3>
                    <hr />
                    <h5 style={{margin:"0px"}}> Contact Information</h5>
                    <p> {this.props.data.userProfile.contactNo}</p>
                    <h5 style={{margin:"0px"}}> Gender </h5>
                    <p>{this.props.data.userProfile.gender} </p>
                    <h5 style={{margin:"0px"}}> Location</h5>
                    <p> {this.props.data.userProfile.address}</p>
                    <h5 style={{margin:"0px"}}> Birthday </h5>
                    <p> {this.props.data.userProfile.dateOfBirth}</p>
                </div>
                <div class='col-xs-12' style={{textAlign: "left", height: "100%", borderLeft: "1px solid #e6e6e6", marginLeft: "400px"}}>
                    <div style={{marginLeft: "10px"}}>
                        <h3 style={{color:'red'}}> About</h3>
                        <hr />
                        <h6 style={{margin:"0px"}}> Nickname </h6>
                        <p> {this.props.data.userProfile.nickName}</p>
                        <h6 style={{margin:"0px"}}> Yelping since </h6>
                        <p> {this.props.data.userProfile.yelpingSince}</p>
                        <h6 style={{margin:"0px"}}> When I am not yelping... </h6>
                        <p> {this.props.data.userProfile.notYelping} </p>
                        <h6 style={{margin:"0px"}}> Things I love </h6>
                        <p> {this.props.data.userProfile.thingsiLove}</p>
                        <h6 style={{margin:"0px"}}> My Blog or Website</h6>
                        <p>{this.props.data.userProfile.website}</p>
                    </div>
                </div>
                </div>
            </div>
    )}
     }

        }

export default graphql(getUserProfile, {
    options: {
      variables: { id: localStorage.getItem("id") }
    }
  })(userProfile);
