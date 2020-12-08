import React, { Component } from 'react';
import Navigationbar from '../navigation';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';
import { Form, Button, Card, CardGroup} from 'react-bootstrap';
import axios from 'axios';
import backendServer from '../../backendServer';
import ReactPaginate from 'react-paginate';
import '../restaurant/pagination.css';
import { getUserOrder, cancelOrder } from '../../actions/orderAction';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {getUserOrders} from '../queries/queries';
import { graphql, withApollo } from 'react-apollo';

export class userOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userOrders: [],
            tempUserOrders: [],
            offset: 0,
            perPage: 2,
            currentPage: 0,
            pageCount: null
        };
    }

    async componentDidMount() {
        const { data } = await this.props.client.query({
          query: getUserOrders,
          variables: { id: localStorage.getItem("id")},
          fetchPolicy: "no-cache",
        
        });
        console.log(data)
        this.setState({userOrders : data.getUserOrders})
        this.setState({tempUserOrders : data.getUserOrders})
      }

    handleCheckboxChange = (e) => {
        e.preventDefault();
        let order_status = e.target.id;
        let filteredData = this.state.userOrders.filter(order =>
            order.order_status == order_status
        );
        console.log(filteredData);
        this.setState({tempUserOrders:filteredData});
    }

    handleCancel = (e) => {
        e.preventDefault();
       const data = {
           order_id: e.target.id,
           order_status: e.target.name
       }
       this.props.cancelOrder(data);
    //    return axios.post(`${backendServer}/yelp/order/update`,data)
    //     .then((response) => {
    //         console.log(response.status)
    //       if (response.status === 200) {
    //         alert("Order cancelled")
    //        window.location = `/user/orders`
    //       }
    //     })
    //     .catch(function(error) {
    //        alert("Error")
    //     })
    }

      handleReset = (e) => {
          e.preventDefault();
          let allOrders = this.state.userOrders;
          this.setState({tempUserOrders: allOrders})
      }

      handlePageClick = e => {
        // alert("inside handle");
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
    //       userOrders : !nextProps.user ? this.state.userOrders : nextProps.user,
    //       tempUserOrders: !nextProps.user ? this.state.tempUserOrders : nextProps.user,
    //       pageCount: Math.ceil(this.state.tempUserOrders.length / this.state.perPage)  
    //     }
    //    );	
    //   }

    render () {
        console.log(this.state.tempUserOrders)
        //const count = this.state.tempUserOrders.length;
        const slice = this.state.tempUserOrders.slice(this.state.offset, this.state.offset + this.state.perPage);

        let paginationElement = (
            <ReactPaginate
              previousLabel={"← Previous"}
              nextLabel={"Next →"}
              breakLabel={<span className="gap">...</span>}
              pageCount={Math.ceil(this.state.tempUserOrders.length / this.state.perPage) > 0 ? Math.ceil(this.state.tempUserOrders.length / this.state.perPage) : 1}
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
          if(this.state.tempUserOrders) {
        // console.log(this.state.yourOrders);
        renderOrders = slice.map(order => {
            return (
                <div>
                    <Card style={{border: "none"}}>
                        <Card.Title style={{marginLeft:"10px", fontSize: "25px"}}>{order.dishName} </Card.Title>
                        <Card.Text> <span style={{fontWeight: "bold", marginLeft:"10px"}}>Restuarant:</span> {order.restName}</Card.Text>
                        <Card.Text> <span style={{fontWeight: "bold", marginLeft:"10px"}}>Order type:</span> {order.orderType}</Card.Text>
                        <Card.Text> <span style={{fontWeight: "bold", marginLeft:"10px"}}> Order date </span> {order.date}</Card.Text>
                        <Card.Text> <span style={{fontWeight: "bold", marginLeft:"10px"}}> Order time </span> {order.time}</Card.Text>
                        <Card.Text> <span style={{fontWeight: "bold", marginLeft:"10px"}}>Order status:</span> {order.orderStatus} </Card.Text>
                        <Button style={{backgroundColor: "red", border:"1px solid red", marginLeft:"10px"}} id={order._id} name=' Cancelled' onClick={this.handleCancel}> Cancel Order </Button>
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
                    <center>
                    <h1 style={{margin: "10px", color:"red"}}> Your orders </h1>
                    </center>
                    <hr />
                    {renderOrders}
                </div>
                    <div style={{float: "right"}}>
                       <h4 style={{margin: "10px", color:"red"}}> Filter </h4> 
                       <hr />
                       <Form onSubmit={this.handleFilter}>
                       <Form.Check
                            id = ' Order received'
                            label='Order received'
                            onChange={this.handleCheckboxChange}
                            style={{marginLeft:"10px" }}
                        />
                        <Form.Check
                            id = ' Preparing'
                            label='Preparing'
                            onChange={this.handleCheckboxChange}
                            style={{marginLeft:"10px" }}
                        />
                        <Form.Check
                            id = ' Pickup ready'
                            label='Pickup ready'
                            onChange={this.handleCheckboxChange}
                            style={{marginLeft:"10px" }}
                        />
                        <Form.Check
                            id = ' On the way'
                            label='On the way'
                            onChange={this.handleCheckboxChange}
                            style={{marginLeft:"10px" }}
                        />
                        <Form.Check
                            id = ' Picked up'
                            label='Picked up'
                            onChange={this.handleCheckboxChange}
                            style={{marginLeft:"10px" }}
                        />
                        <Form.Check
                            id = " Delivered"
                            label='Delivered'
                            onChange={this.handleCheckboxChange}
                            style={{marginLeft:"10px" }}
                        />
                        <Button style={{marginLeft:"10px", marginTop: "10px", backgroundColor: "red", border: "1px solid red" }} type="submit" onClick={this.handleReset}> Remove filters </Button>
                        </Form>
                    </div>
                    <div style={{paddingTop:'750px', paddingLeft: "400px"}}>
                        {paginationElement}
                    </div>
                       
                </div>
                
            </React.Fragment>
        )
    }
}      

export default withApollo(userOrders)