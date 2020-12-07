import React, { Component } from 'react';
import Navigationbar from '../navigation';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';
import { Form, Button, Card, CardGroup, Modal} from 'react-bootstrap';
import axios from 'axios';
import backendServer from '../../backendServer';
import ReactPaginate from 'react-paginate';
import '../restaurant/pagination.css';
import {getUserOrder, sendMessage} from '../../actions/orderAction';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { getMainCourse } from './getMaincourse';

export class userOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userOrders: [],
            tempUserOrders: [], 
            showModal: false,
            orderId: '',
            chatData: [],
            message: ''
        };
    }


    componentDidMount() {
        this.props.getUserOrder();
    }

    componentWillReceiveProps(nextProps){
        this.setState({
          ...this.state,
          userOrders : !nextProps.user ? this.state.userOrders : nextProps.user,
          tempUserOrders: !nextProps.user ? this.state.tempUserOrders : nextProps.user,  
        }
       );	
      }

    handleOpenModal = (e) => {
        const filteredData = this.state.userOrders.filter(each => each._id === e.target.value)
        this.setState({ showModal: true, chatData: filteredData[0].message, orderId: e.target.value});
        
      }

      handleCloseModal = () => {
        this.setState({ showModal: false });
      }

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
            orderId: this.state.orderId,
            message: this.state.message,
            firstName: localStorage.getItem("first_name"),
            date: current_date,
            time: current_time,
            owner: localStorage.getItem("first_name")
        }
        console.log(data);
        this.props.sendMessage(data)
    }
    

    render () {
        let renderChat;
        if(this.state.chatData.length >= 1) {
            renderChat = this.state.chatData.map(chat => {
                if(chat.firstName) {
                return (
                    <div>
                        <div>
                            <p style={{marginBottom:"0px", float:"right"}}> {chat.message} </p>
                            <br />
                            <p class="text-muted" style={{marginBottom:"0px", float:"right", fontSize: "12px"}}> {chat.owner} </p>
                            <br />
                            <p class="text-muted" style={{marginTop: "0px", float:"right", fontSize: "12px"}}> {chat.date} {chat.time} </p>
                            <br />
                            </div>
                            <br />
                            <br />
                    </div>
                )
                } else {
                    return (
                        <div>
                            <p style={{marginBottom:"0px"}}> {chat.message} </p>
                            <p class="text-muted" style={{marginBottom:"0px", fontSize: "12px"}}> {chat.owner} </p>
                            <p class="text-muted" style={{fontSize: "12px"}}> {chat.date} {chat.time} </p>
                            <br />
                        </div>
                    )
                }
            })
        }

        let renderOrders;
        if(this.state.tempUserOrders) {
            renderOrders = this.state.tempUserOrders.map(order => {
                console.log(order.message)
                if(order.message.length >= 1) {
                    let length = order.message.length
                return (
                    <div>
                        <div class='col-md-8' style={{border: '1px solid lightGrey', padding: "10px"}}>
                        <div>
                        <h5 style={{float: "left"}}> <b>Order Id</b>: {order._id} </h5>
                        <h5 style={{float: "right"}}> <b>Restaurant Name </b>: {order.restName} </h5>
                        </div>
                        <br />
                        <br />
                        <h6> <b>Dish name </b>: {order.dishName} </h6>
                        <h6> <b> Recent message </b>: {order.message[length - 1].message} </h6>
                        </div>
                        <br />
                        <Button value={order._id} style={{backgroundColor: "red", color: "white", border: "1px solid red"}} onClick={this.handleOpenModal}> Chat </Button>
                        <hr />
                        <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title style={{fontSize: "30px"}}> Your conversation </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {renderChat}
                            <input class="form-control input-md" type='text' style={{ height: '70px'}} onChange={this.handleInputChange} placeholder="Reply here"/>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button style={{border: "1px solid red", backgroundColor: "red", color: 'white',  width: "100px", borderRadius: '5px'}} onClick = {this.handleSendMessage}>Reply</Button>
                            </Modal.Footer>
                        </Modal>
                        <br/>
                        <br/>
                    </div>
                )
            }
        })
    }
        
        return (
            <React.Fragment>
                <Navigationbar/>
                <div class="container">
                <div >
                    <h1 style={{margin: "10px", color:"red"}}> All messages </h1>
                    <br />
                    {renderOrders} 
                </div>         
                </div>
                
            </React.Fragment>
        )
    }
         
}
// export default userOrders;
userOrders.propTypes = {
    getUserOrder: PropTypes.func.isRequired,
    sendMessage: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    status: PropTypes.object.isRequired
}

const mapStateToProps = state => { 
    return ({
    user: state.orders.user,
    status: state.orders.status
})};

export default connect(mapStateToProps, { getUserOrder, sendMessage })(userOrders);




