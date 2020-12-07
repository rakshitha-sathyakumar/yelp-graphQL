import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { customerSignup } from '../../actions/signupAction'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import YelpImage from './../images/yelp_logo.jpg'
import { graphql } from 'react-apollo';
import { addUserMutation } from '../../mutations/mutations';


class CustomerSignup extends Component {
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
        let mutationResponse = await this.props.addUserMutation({
            variables: {
                firstName: this.state.first_name,
                lastName: this.state.last_name,
                email: this.state.email,
                password: this.state.password,   
            }

        });
        console.log(mutationResponse)
        let response = mutationResponse.data.addUser;
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
        let message = "";
        if (localStorage.getItem("token")) {
            redirectVar = <Redirect to="/home" />
        }
        else if (this.state.success) {
            alert("You have registered successfully");
            redirectVar = <Redirect to="/login" />
        }
        else if(this.state.message === "USER_EXISTS" && this.state.signupFlag){
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
                                        <h2 style={{color: "red"}}>Sign Up as customer for Yelp account</h2>
                                    </center>
                                        <hr/>
                                    </div>
                                    <form onSubmit={this.onSubmit}>
                                        <div class="form-group">
                                            <input type="text" class="form-control" name="first_name" onChange={this.onChange} placeholder="First name" pattern="^[A-Za-z0-9 ]+$" required />
                                        </div>
                                        <div class="form-group">
                                            <input type="text" class="form-control" name="last_name" onChange={this.onChange} placeholder="Last name" pattern="^[A-Za-z0-9 ]+$" required />
                                        </div>
                                        <div class="form-group">
                                            <input type="email" class="form-control" name="email" onChange={this.onChange} placeholder="Email Id" pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$'%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$" title="Please enter valid email address" required />
                                        </div>
                                        <div style={{ fontSize: 10, color: "red"}}> {this.state.signupFlag}</div>
                                        <div class="form-group">
                                            <input type="password" class="form-control" name="password" onChange={this.onChange} placeholder="Password" required />
                                        </div>
                                        <div style={{ color: "#ff0000" }}>{message}</div>
                                        <button style = {{width: "200px"}} type="submit" class="btn btn-danger">Signup</button><br /><br />
                                        <div><Link to='/restaurantsignup'>Signup as Restaurant Owner</Link></div><br />
                                        <div>Already have an account? <Link to='/login'>Login</Link></div>
                                    </form>
                                </div>
                            </div>
                        </div>
            </div>
        )
    }
}
// export default CustomerSignup;
export default graphql(addUserMutation, { name: "addUserMutation" })(CustomerSignup);