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
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRestOrders } from "../queries/queries";
import { graphql } from 'react-apollo';
import {updateOrderStatusMutation} from '../../mutations/mutations';
import { compose } from 'recompose'

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

    onUpdate = async (e) => {
        e.preventDefault();
        let mutationResponse = await this.props.updateOrderStatusMutation({
        variables: {
            id: this.state.order_id,
            status: this.state.orderStatus,
        }
        });
        console.log(mutationResponse)
        let response = mutationResponse.data.updateOrderStatus;
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

      handleReset = (e) => {
        console.log("handle reset")
          e.preventDefault();
          let allOrders = this.state.restOrders;
          console.log(allOrders)
          this.setState({tempRestOrder: allOrders})
      }
      

    render () {
        if(!this.props.data.getRestOrders){
            return (
            <p> Please wait!! Loading</p>
            )
        } else {
            let redirectVar = null;
            if(this.state.success){
            alert("Order status updated");
            redirectVar = <Redirect to="/restOrders" />
            }
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
                button1 = <Form.Check id = {order.id} name={order.dishName} label='Pickup ready' 
                            value='Pickup ready' onChange={this.handleCheckboxChange} style={{marginLeft:"10px", color: 'red' }}/>
                button2 = <Form.Check id = {order.id} name={order.dishName} label='Picked up' 
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
                                id = {order.id}
                                name={order.dishName}
                                label='Order received'
                                value='Order received'
                                onChange={this.handleCheckboxChange}
                                style={{marginLeft:"10px", color: 'red' }}
                            />
                            <Form.Check
                                id = {order.id}
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
                {redirectVar}
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
                    <div style = {{paddingTop: "100%", paddingLeft: "40%"}}>
                {paginationElement}
                </div>

                </div>
                
            </React.Fragment>
        )
    }
         
}
}

  export default compose(
    graphql(getRestOrders, {
      options: () => {
        return {
          variables: { id: localStorage.getItem('id') },
          fetchPolicy: 'network-only',
        };
      },
    }),
    graphql(updateOrderStatusMutation, { name: 'updateOrderStatusMutation' }),
  )(restOrders);