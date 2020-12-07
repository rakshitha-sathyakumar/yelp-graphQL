import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { restaurantSignup } from '../../actions/signupAction'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import YelpImage from './../images/yelp_logo.jpg'
import { graphql } from 'react-apollo';
import { addRestMutation } from '../../mutations/mutations';

class RestaurantSignup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',    
            signupFlag: false,
            success: false 
        };
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    onSubmit = async (e) => {
        e.preventDefault();
        console.log("Hiii")
        let mutationResponse = await this.props.addRestMutation({
            variables: {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,   
                street: this.state.street,
                zipcode: this.state.zipcode,
            }

        });
        console.log(mutationResponse)
        let response = mutationResponse.data.addRest;
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
        }    }

    render() {
        //redirect based on successful signup
        let redirectVar = null;
        let message = "";
        if (localStorage.getItem("token")) {
            redirectVar = <Redirect to="/home" />
        }
        else if (this.state.success) {
            alert("You have registered successfully");
            redirectVar = <Redirect to="/login" />
        }
        else if(this.state.message === "RESTAURANT_EXISTS" && this.state.signupFlag){
            message = "Email id is already registered"
        }
        return (
            <div>
                {redirectVar}
                        <div>
                        <center>
                            <img src={YelpImage} style={{ height: 'fit-content' }} alt='yelp' />
                        </center>
                        </div>
                        <div class="container">
                            <div class="login-form">
                                <div class="main-div">
                                    <div class="panel">
                                    <center>
                                        <h2 style={{color: "red"}}>Sign Up as restauranteur for Yelp account</h2>
                                    </center>
                                        <hr/>
                                    </div>
                                    <form onSubmit={this.onSubmit}>
                                        <div class="form-group">
                                            <input type="text" class="form-control" name="name" onChange={this.onChange} placeholder="Name" pattern="^[A-Za-z0-9 ]+$" required />
                                        </div>
                                        <div class="form-group">
                                            <input type="email" class="form-control" name="email" onChange={this.onChange} placeholder="Email Id" pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$'%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$" title="Please enter valid email address" required />
                                        </div>
                                        <div class="form-group">
                                            <input type="password" class="form-control" name="password" onChange={this.onChange} placeholder="Password" required />
                                        </div>
                                        <div class="form-group">
                                            <input type="text" class="form-control" name="street" onChange={this.onChange} placeholder="Street" required />
                                        </div>
                                        <div class="d-inline-flex form-group">
                                            <input style={{width: "300px"}}type="text" class="form-control" name="zipcode" onChange={this.onChange} placeholder="zipcode" required />
                                        </div>
                                        <div style={{ color: "#ff0000" }}>{message}</div>
                                        <button style ={{width: "200px"}}type="submit" class="btn btn-danger">Sign Up</button><br /><br />
                                        <div>Already have an account? <Link to='/login'>Login</Link></div>
                                    </form>
                                </div>
                            </div>
                        </div>
            </div>
        )
    }
}




export default graphql(addRestMutation, { name: "addRestMutation" })(RestaurantSignup);
// export default RestaurantSignup;