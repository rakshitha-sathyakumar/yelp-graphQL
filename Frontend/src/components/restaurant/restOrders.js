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
import { getRestOrders } from "../queries/queries";
import { graphql } from 'react-apollo';

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
            perPage: 3,
            currentPage: 0,
            pageCount: null
        };
    }


    // componentDidMount() {
    //     console.log("Hiiiii")
    //     this.setState({restOrders: this.props.data.getRestOrders})
    //     this.setState({tempRestOrder: this.props.data.getRestOrders})
    // }


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

    // componentWillReceiveProps(nextProps){
    //     this.setState({
    //       ...this.state,
    //       restOrders : !nextProps.user ? this.state.restOrders : nextProps.user,
    //       tempRestOrder: !nextProps.user ? this.state.tempRestOrder : nextProps.user,
    //       pageCount: Math.ceil(this.state.tempRestOrder.length / this.state.perPage)  
    //     }
    //    );	
    //   }

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
      

    render () {
        console.log(this.state.tempRestOrder)
        if(!this.props.data.getRestOrders){
            return (
            <p> Please wait!! Loading</p>
            )
        } else {
        const slice = this.props.data.getRestOrders.slice(this.state.offset, this.state.offset + this.state.perPage);

        let paginationElement = (
            <ReactPaginate
              previousLabel={"← Previous"}
              nextLabel={"Next →"}
              breakLabel={<span className="gap">...</span>}
              pageCount={Math.ceil(this.props.data.getRestOrders.length / this.state.perPage) > 0 ? Math.ceil(this.props.data.getRestOrders.length / this.state.perPage) : 10}
              onPageChange={this.handlePageClick}
              forcePage={this.state.currentPage}
              containerClassName={"pagination"}
              previousLinkClassName={"previous_page"}
              nextLinkClassName={"next_page"}
              disabledClassName={"disabled"}
              activeClassName={"active"}
            />
          );

          let renderOrders;
          if(this.props.data.getRestOrders) {
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
                    <div style = {{paddingTop: "100", paddingLeft: "40%"}}>
                {paginationElement}
                </div>

                </div>
                
            </React.Fragment>
        )
    }
         
}
}
export default graphql(getRestOrders, {
    options: {
      variables: { id: localStorage.getItem("id")}
    }
  })(restOrders);