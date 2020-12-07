import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { graphql } from 'react-apollo';
import { loginMutation } from '../mutations/mutations';
import { connect } from 'react-redux';
import { userLogin } from '../actions/loginAction'
import yelpLoginImage from './images/yelp_logo.jpg';
import jwt_decode from 'jwt-decode';
//const jwt_decode = require('jwt-decode');

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillMount() {
        this.setState({
            authFlag: false
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    //submit Login handler to send a request to the node backend
    onSubmit = async (e) => {
        e.preventDefault();
        let mutationResponse = await this.props.loginMutation({
            variables: {
                email: this.state.email,
                password: this.state.password
            }
        });
        console.log(mutationResponse)
        let response = mutationResponse.data.login;
        if (response) {
            if (response.status === "200") {
                this.setState({
                    success: true,
                    data: response.message,
                    authFlag: true
                });
            } else {
                this.setState({
                    message: response.message,
                    authFlag: true
                });
            }
        }
    }
    render() {
        var userLogin = 'True';
        var restLogin = 'False';
        let redirectVar = null;
        let message = ""
        if (this.state.success) {
            let token = this.state.data;
            localStorage.setItem("token", token);
            var decoded = jwt_decode(token.split(' ')[1]);
            if(decoded.firstName) {
            localStorage.setItem("id", decoded.id);
            localStorage.setItem("firstName", decoded.firstName);
            localStorage.setItem("lastName", decoded.lastName);
            localStorage.setItem("email", decoded.email);
            localStorage.setItem("user", userLogin);
            redirectVar = window.location.replace("/home")
        } else {
            localStorage.setItem("id", decoded.id);
            localStorage.setItem("name", decoded.name);
            localStorage.setItem("email", decoded.email);
            localStorage.setItem("user", restLogin);
            redirectVar = window.location.replace("/restaurant")
        }

    } else if (this.state.message === "NO_USER" && this.state.loginFlag) {
            message = "No user with this email id";
    }
        else if (this.state.message === "INCORRECT_PASSWORD" && this.state.loginFlag) {
            message = "Incorrect Password";
    }

               return (
            <div>
                {redirectVar}
                <div class='container' style={{marginTop: "30px"}}>
                    <div class='form-container'>
                    <center>
                    <img src={yelpLoginImage} style={{ height: 'fit-content' }} alt='Yelp' />
                    </center>
                        <div class='container-fluid' style={{marginTop: "30px"}}>
                            <div class='row'>
                                <div class='col-md-4 col-sm-4 col-xs-12'></div>
                                <div class='col-md-4 col-sm-4 col-xs-12'>
                                    <center>
                                        <h3 style={{color: "red", marginBottom: "20px"}}> Sign in to Yelp</h3>
                                        <div>New to Yelp? <Link to='/customerSignup'>Sign Up</Link></div>
                                        <div style={{padding: "5px"}}></div>
                                    </center>
                                        <form onSubmit={this.onSubmit}>
                                            <div class='form-group'>
                                                <input type='text' onChange={this.onChange} name='email' class='form-control' id='inputEmail' placeholder='Email ID' pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$'%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$" title="Please enter valid email address" required/>
                                            </div>
                                            <div class='form-group'>
                                                <input type='password' onChange={this.onChange} name='password' class='form-control' id='inputEmail' placeholder='password' required/>
                                            </div>
                                            <div class="checkbox">
                                                <label>
                                                    <input type='checkbox'/> Remember me
                                                </label>
                                            </div>
                                            <button type='submit' class='btn btn-danger btn-block' style={{marginTop:"10px", backgroundColor: "red"}}> Sign In </button>
                                        </form>
                                    </div>
                                    <div class='col-md-4 col-sm-4 col-xs-12'></div>
                            </div>
                        </div> 
                </div>  
            </div>
        </div>
        )
    }
}

export default graphql(loginMutation, { name: "loginMutation" })(Login);