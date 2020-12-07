import React, { Component } from 'react';
import Navigationbar from '../navigation';
import '@fortawesome/fontawesome-free/css/all.min.css';
import PropTypes from 'prop-types';
import profilepic from './../images/download.png'
import { connect } from 'react-redux';
import { getUser, updateUser } from '../../actions/userProfileAction';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Jumbotron, CardImg, Button, Modal} from 'react-bootstrap';
import YelpImage from './../images/yelp_logo.jpg'
import axios from 'axios';
import backendServer from "../../backendServer";
//import Modal from "react-modal";

class restUserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restUserProfile: [],
            showModal: false,
            message: ''
        };
        this.onChange = this.onChange.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    componentWillMount() {
        axios.get(`${backendServer}/yelp/userProfile/${this.props.match.params.user_id}`)
        .then(res => {
            console.log(res);
            this.setState({ restUserProfile: res.data });
    })
    }

    handleFollowing = (e) => {
        e.preventDefault();
        const data = {
            firstName: this.state.restUserProfile.firstName,
            lastName: this.state.restUserProfile.lastName,
            userId: this.state.restUserProfile._id,
            address: this.state.restUserProfile.address
        }
        axios.post(`${backendServer}/yelp/userProfile/updateFollowing/${localStorage.getItem("user_id")}`, data)
        .then(response => {
            if(response.status ===200) {
            alert("Following!!!");
            window.location = '/allUsers'
            }
        })
            .catch(err => {
            console.log("Error");
        });
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleOpenModal() {
        this.setState({ showModal: true });
      }

      handleCloseModal() {
        this.setState({ showModal: false });
      }

    onUpdate = (e) => {
        //prevent page from refresh
        e.preventDefault();

        let data = Object.assign({}, this.state);
        this.props.updateUser(data);
    };

    handleInputChange = (e) => {
        console.log(e.target.value)
        this.setState({
            message: e.target.value
        })
    }

    handleSendMessage = (e) => {
        e.preventDefault();
        console.log(this.state.message)
        var today = new Date();
        var current_date = ((today.getMonth()+1)+"/"+today.getDate()+"/"+today.getFullYear());
        var current_time = (today.getHours() + ":"+today.getMinutes()+":"+today.getSeconds());
        const data = {
            orderId: this.props.location.state.orderId,
            message: this.state.message,
            date: current_date,
            time: current_time,
            owner: localStorage.getItem("rest_name")
        }
        axios.post(`${backendServer}/yelp/messages/initiate`, data)
        .then(response => {
            if(response.status === 200) {
                alert("Message successfully sent")
            }
        })
    }
    
    render() {
        console.log(this.props);
        console.log(this.props.match.params.user_id);
        let renderFollow;
        if (localStorage.getItem("user") === 'True') {
            renderFollow = <div class='col-xs-4' style={{marginLeft: '1px'}}>
            <ul class='list-unstyled'>
                <li>
                <Button href='/allUsers' style = {{margin:"25px 0px", marginLeft: "475px", backgroundColor: "red", border: 'none', fontSize: "17px", color: "white", outline: 'none'}} variant='link' onClick={this.handleFollowing}> <i class="fas fa-user-plus"></i> Follow</Button>
                </li>
            </ul>
        
       </div>
        } else {
            renderFollow = <div class='col-xs-4' style={{marginLeft: '1px'}}>
            <ul class='list-unstyled'>
                <li>
                <Button  style = {{margin:"25px 0px", marginLeft: "475px", backgroundColor: "red", border: 'none', fontSize: "17px", color: "white", outline: 'none'}} variant='link' onClick={this.handleOpenModal}> <i class="fas fa-comments"></i> Message </Button>
                </li>
            </ul>
            <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title style={{fontSize: "30px"}}>Send a message to {this.state.restUserProfile.firstName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4> Order Id: {this.props.location.state.orderId}</h4>
                    <input class="form-control input-md" type='text' style={{ height: '70px'}} onChange={this.handleInputChange}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{border: "1px solid red", backgroundColor: "red", color: 'white',  width: "100px", borderRadius: '5px'}} onClick = {this.handleSendMessage}>Send</Button>
                </Modal.Footer>
            </Modal>
       </div>

    }
        var fileName = this.state.restUserProfile.fileName
        var imgSrc = `${backendServer}/yelp/upload/restaurant/${fileName}`

        return (
        <div style={{margin:"5px"}}>
            <Navigationbar />
            <div class='jumbotron'>
                    <div class='row'>
                        <div class='col-xs-3 card profilePic' style={{position:"absolute"}}>
                            <card>
                                <CardImg style={{height: "300px", width: "225px"}}variant='top' src={imgSrc} className='profileImg'/>
                            </card>
                        </div>
                        <div class='col-xs-4 profileName' style={{position: "relative", marginLeft: "250px"}}>
                            <h1>{this.state.restUserProfile.firstName} {this.state.restUserProfile.lastName}</h1>
                            <h6> "{this.state.restUserProfile.headline}" </h6>
                            <p style={{fontSize:"13px"}}>{this.state.restUserProfile.email}</p>
                            
                        </div>
                       {renderFollow}
                    </div>
            </div>
            <div class='row' style={{ marginLeft:"10px"}}>
                <div class='col-xs-3' style={{marginLeft: "250px"}}>
                    <h3 style={{color:'red'}}> Basic Information</h3>
                    <hr />
                    <h5 style={{margin:"0px"}}> Contact Information</h5>
                    <p> {this.state.restUserProfile.contactNo}</p>
                    <h5 style={{margin:"0px"}}> Gender </h5>
                    <p>{this.state.restUserProfile.gender} </p>
                    <h5 style={{margin:"0px"}}> Location</h5>
                    <p> {this.state.restUserProfile.address}</p>
                    <h5 style={{margin:"0px"}}> Birthday </h5>
                    <p> {this.state.restUserProfile.dateOfBirth}</p>
                </div>
                <div class='col-xs-12' style={{textAlign: "left", height: "100%", borderLeft: "1px solid #e6e6e6", marginLeft: "400px"}}>
                    <div style={{marginLeft: "10px"}}>
                        <h3 style={{color:'red'}}> About</h3>
                        <hr />
                        <h6 style={{margin:"0px"}}> Nickname </h6>
                        <p> {this.state.restUserProfile.nickName}</p>
                        <h6 style={{margin:"0px"}}> Yelping since </h6>
                        <p> {this.state.restUserProfile.yelpingSince}</p>
                        <h6 style={{margin:"0px"}}> When I am not yelping... </h6>
                        <p> {this.state.restUserProfile.notYelping} </p>
                        <h6 style={{margin:"0px"}}> Things I love </h6>
                        <p> {this.state.restUserProfile.thingsiLove}</p>
                        <h6 style={{margin:"0px"}}> My Blog or Website</h6>
                        <p>{this.state.restUserProfile.website}</p>
                    </div>
                </div>
            </div>
            </div>
    )}
}

// userProfile.propTypes = {
//     getUser: PropTypes.func.isRequired,
//     user: PropTypes.object.isRequired
// }

// const mapStateToProps = state => { 
//     return ({
//     user: state.userProfile.user
// })};

// export default connect(mapStateToProps, { getUser })(userProfile);

export default restUserProfile;