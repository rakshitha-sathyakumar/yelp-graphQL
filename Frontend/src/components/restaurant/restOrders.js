import React, { Component } from 'react';
import Navigationbar from '../navigation';
// import userProfile from './profile';
import '@fortawesome/fontawesome-free/css/all.min.css';
// import backgroundImage from '../images/menuCard.jpg';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Form, Button, Card, CardGroup, Modal} from 'react-bootstrap';
import axios from 'axios';
import backendServer from '../../backendServer';
import ReactPaginate from 'react-paginate';
import './pagination.css';
import { getRestOrder, updateOrderStatus, sendMessage } from '../../actions/orderAction'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class restOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restOrders: [],
            tempRestOrder: [],
            showModal: false,
            orderId: '',
            chatData: [],
            message: '',
            offset: 0,
            perPage: 1,
            currentPage: 0,
            pageCount: null
        };
    }


    componentDidMount() {
        this.props.getRestOrder();
        console.log(this.props);
    }


    handleCheckboxChange = (e) => {
        e.preventDefault();
        this.setState({
            orderStatus: e.target.value
        })
        this.setState ({
            order_id: e.target.id
        })
    }


    handleFilter = (e) => {
        e.preventDefault();
        let orders = e.target.id;
        let filteredData = this.state.restOrders.filter(order =>
            order.finalOrderStatus == orders
        );
        console.log(filteredData);
        this.setState({tempRestOrder:filteredData});
    }

    handlePageClick = e => {
        alert("inside handle");
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }
        );
    };

    componentWillReceiveProps(nextProps){
        this.setState({
          ...this.state,
          restOrders : !nextProps.user ? this.state.restOrders : nextProps.user,
          tempRestOrder: !nextProps.user ? this.state.tempRestOrder : nextProps.user,
          pageCount: Math.ceil(this.state.tempRestOrder.length / this.state.perPage)  
        }
       );	
      }

      handleOpenModal = (e) => {
        const filteredData = this.state.restOrders.filter(each => each._id === e.target.value)
        this.setState({ showModal: true, chatData: filteredData[0].message, orderId: e.target.value});
        
      }

      handleCloseModal = () => {
        this.setState({ showModal: false });
      }


    onUpdate = (e) => {
        e.preventDefault();
        const data = {
            order_id: this.state.order_id,
            order_status: this.state.orderStatus,
        }
        console.log(data);
        this.props.updateOrderStatus(data);
      }

      handleReset = (e) => {
        console.log("handle reset")
          e.preventDefault();
          let allOrders = this.state.restOrders;
          console.log(allOrders)
          this.setState({tempRestOrder: allOrders})
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
            date: current_date,
            time: current_time,
            owner: localStorage.getItem("rest_name")
        }
        console.log(data);
        this.props.sendMessage(data);
        // axios.post(`${backendServer}/yelp/messages/initiate`, data)
        // .then(response => {
        //     if(response.status === 200) {
        //         alert("Reply successfully sent")
        //     }
        // })
    }

      

    render () {
        console.log(this.props);
        console.log(this.state.tempRestOrder);

        const count = this.state.tempRestOrder.length;
        const slice = this.state.tempRestOrder.slice(this.state.offset, this.state.offset + this.state.perPage);

        let paginationElement = (
            <ReactPaginate
              previousLabel={"← Previous"}
              nextLabel={"Next →"}
              breakLabel={<span className="gap">...</span>}
              pageCount={Math.ceil(this.state.tempRestOrder.length / this.state.perPage) > 0 ? Math.ceil(this.state.tempRestOrder.length / this.state.perPage) : 10}
              onPageChange={this.handlePageClick}
              forcePage={this.state.currentPage}
              containerClassName={"pagination"}
              previousLinkClassName={"previous_page"}
              nextLinkClassName={"next_page"}
              disabledClassName={"disabled"}
              activeClassName={"active"}
            />
          );

          let renderChat;
        if(this.state.chatData.length >= 1) {
            renderChat = this.state.chatData.map(chat => {
                if(chat.firstName) {
                return (
                    <div>
                        <p style={{marginBottom:"0px", float:"right"}}> {chat.message} </p>
                        <br />
                        <p class="text-muted" style={{marginBottom:"0px", float:"right"}}> {chat.owner} </p>
                        <br />
                        <p class="text-muted" style={{float:"right"}}> {chat.date} {chat.time} </p>
                        <br />
                        <br />
                        <br />
                    </div>
                )
                } else {
                    return (
                        <div>
                            <p style={{marginBottom:"0px"}}> {chat.message} </p>
                            <p class="text-muted" style ={{marginBottom:"0px"}}> {chat.owner} </p>
                            <p class="text-muted"> {chat.date} {chat.time} </p>
                            <br />
                        </div>
                    )
                }
            })
        }

          let renderOrders;
          if(this.state.tempRestOrder) {
            renderOrders = slice.map((order,key) => {
            let button1;
            let button2;
            let chatButton;
            if(order.orderType === 'pickup'){
                button1 = <Form.Check id = {order._id} name={order.dishName} label='Pickup ready' 
                            value='Pickup ready' onChange={this.handleCheckboxChange} style={{marginLeft:"10px", color: 'red' }}/>
                button2 = <Form.Check id = {order._id} name={order.dishName} label='Picked up' 
                    value='Picked up' onChange={this.handleCheckboxChange} style={{marginLeft:"10px", color: 'red' }}/>
            } else {
                button1 = <Form.Check id = {order._id} name={order.dishName} label='On the way' 
                            value='On the way' onChange={this.handleCheckboxChange} style={{marginLeft:"10px", color: 'red' }}/>
                button2 = <Form.Check id = {order._id} name={order.dishName} label='Delivered' 
                    value='Delivered' onChange={this.handleCheckboxChange} style={{marginLeft:"10px", color: 'red' }}/>
            }
            if(order.message.length >= 1) {
                chatButton = <Button value={order._id} style={{ marginLeft:"10px", marginTop: "10px", backgroundColor: "red", border: "1px solid red"}} onClick={this.handleOpenModal}> Chat </Button>
            }
            return (
                <div>
                    <Card style={{border: "none"}}>
                        <Card.Title style={{marginLeft:"10px", fontSize: "25px"}}>{order.dishName} </Card.Title>
                        <Card.Text><span style={{fontWeight: "bold", marginLeft:"10px"}}> Customer: </span>
                            <Link to = {{pathname: `/userProfile/${order.userId}`, state:{orderId: order._id}}}> {order.firstName} {order.lastName} </Link> </Card.Text>
                        {/* <Card.Text> <span style={{fontWeight: "bold", marginLeft:"10px"}}>Restuarant:</span> {order.rest_name}</Card.Text> */}
                        <Card.Text> <span style={{fontWeight: "bold", marginLeft:"10px"}}>Order type:</span> {order.orderType}</Card.Text>
                        <Card.Text> <span style={{fontWeight: "bold", marginLeft:"10px"}}>Order Status:</span> {order.orderStatus}</Card.Text>
                        <Card.Text> <span style={{fontWeight: "bold", marginLeft:"10px"}}>Orders:</span> {order.finalOrderStatus} </Card.Text>
                        <hr />
                        <Form onSubmit={this.onUpdate}>
                            <Form.Check
                                id = {order._id}
                                name={order.dishName}
                                label='Order received'
                                value='Order received'
                                onChange={this.handleCheckboxChange}
                                style={{marginLeft:"10px", color: 'red' }}
                            />
                            <Form.Check
                                id = {order._id}
                                name={order.dishName}
                                label='Preparing'
                                value='Preparing'
                                onChange={this.handleCheckboxChange}
                                style={{marginLeft:"10px", color: 'red' }}
                            />
                            {button1}
                            {button2}
                            
                            <div>
                                <Button style={{ marginLeft:"10px", marginTop: "10px", backgroundColor: "red", border: "1px solid red"}} type="submit"> 
                                    Update order status </Button>
                                    {chatButton}
                                    <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
                                        <Modal.Header closeButton>
                                            <Modal.Title style={{fontSize: "30px"}}> Your conversation </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            {renderChat}
                                            <input class="form-control input-md" type='text' style={{ height: '70px'}} onChange={this.handleInputChange}/>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button style={{border: "1px solid red", backgroundColor: "red", color: 'white',  width: "100px", borderRadius: '5px'}} onClick = {this.handleSendMessage}>Reply</Button>
                                        </Modal.Footer>
                                    </Modal>
                            </div>
                        </Form>
                    </Card>
                    <hr />
                    <br/>
                    <br/>
                </div>
            )
        })
    }
        return (
            <React.Fragment>
                <Navigationbar/>
                <div class="container">
                    <div style={{float: "left"}}>
                    <h1 style={{marginLeft: "10px", color:"red"}}> Your orders </h1>
                    <hr />
                        {renderOrders}
                    </div>
                    <div style={{float: "right"}}>
                       <h4 style={{margin: "10px", color:"red"}}> Filter </h4> 
                       <hr />
                       <Form>
                       <Form.Check
                            id = 'New order'
                            label='New Order'
                            onChange={this.handleFilter
                            }
                            style={{marginLeft:"10px" }}
                        />
                        <Form.Check
                            id = 'Delivered order'
                            label='Delivered Order'
                            onChange={this.handleFilter}
                            style={{marginLeft:"10px" }}
                        />
                        <Form.Check
                            id = 'Cancelled order'
                            label='Cancelled Order'
                            onChange={this.handleFilter}
                            style={{marginLeft:"10px" }}
                        />
                        <Button style={{marginLeft:"10px", marginTop: "10px", backgroundColor: "red", border: "1px solid red" }} type="submit" onClick={this.handleReset}> Remove filter </Button>
                        </Form>
                    </div>
                    <div style = {{paddingTop: "500px", paddingLeft: "40%"}}>
                {paginationElement}
                </div>

                </div>
                
            </React.Fragment>
        )
    }
         
}

restOrders.propTypes = {
    getRestOrder: PropTypes.func.isRequired,
    updateOrderStatus: PropTypes.func.isRequired,
    sendMessage: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    status: PropTypes.object.isRequired
}

const mapStateToProps = state => { 
    return ({
    user: state.orders.user,
    status: state.orders.status
})};

export default connect(mapStateToProps, { getRestOrder, updateOrderStatus, sendMessage })(restOrders);