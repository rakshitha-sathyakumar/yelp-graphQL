import React, { Component } from 'react';
import Navigationbar from '../navigation';
// import userProfile from './profile';
import '@fortawesome/fontawesome-free/css/all.min.css';
// import backgroundImage from '../images/menuCard.jpg';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Form, Button, Card, CardGroup} from 'react-bootstrap';
import axios from 'axios';
import backendServer from "../../backendServer";
import { connect } from 'react-redux';
import { getAllMenuUser } from '../../actions/menuAction';
import { addOrder } from '../../actions/orderAction';
import ReactPaginate from 'react-paginate';
import {getUserMenu} from '../queries/queries';
import {addOrderMutation} from '../../mutations/mutations';
import { graphql, withApollo } from 'react-apollo';
import '../restaurant/pagination.css';
import PropTypes from 'prop-types';
import { compose } from 'recompose'

export class getDish extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuList: [],
            offset: 0,
            perPage: 3,
            currentPage: 0,
            pageCount: null
        };
        //this.changeHandler = this.changeHandler.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }

    async componentDidMount() {
        {
            const { data } = await this.props.client.query({
              query: getUserMenu,
              variables: { id: localStorage.getItem("rest_id")},
              fetchPolicy: "no-cache",
            });
            console.log(data)
            this.setState({menuList: data.getUserMenuList})
    }
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
    //     console.log(nextProps)
    //     this.setState({
    //       ...this.state,
    //       menuList : !nextProps.user ? this.state.menuList : nextProps.user,
    //       pageCount: Math.ceil(this.state.menuList.length / this.state.perPage)  
    //     }
    //    );	
    //   }


    handleCheckboxChange = (e) => {
        this.setState({
            orderType: e.target.value
        })
        this.setState({
            dishName: e.target.name
        })
        this.setState({
          dish_id: e.target.id
      })
    }

    onOrder = async (e) => {
        e.preventDefault();
        
        var today = new Date();
        var current_date = (today.getMonth()+1)+"/"+today.getDate()+"/"+today.getFullYear();
        var current_time = (today.getHours() + ":"+today.getMinutes()+":"+today.getSeconds());
        let mutationResponse = await this.props.addOrderMutation({
        variables: {
            id: localStorage.getItem("id"),
            restId: localStorage.getItem("rest_id"),
            restName: localStorage.getItem("rest_name"),
            dishName: this.state.dishName,
            orderType: this.state.orderType,
            firstName: localStorage.getItem("firstName"),
            lastName: localStorage.getItem("lastName"),
            date: current_date,
            time: current_time
        }
        });
        console.log(mutationResponse)
        let response = mutationResponse.data.addOrder;
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
    
    render () {
        if(this.state.success){
            alert("Order has been placed successfully");
        }
        console.log(this.state.menuList);

        const count = this.state.menuList.length;
        const slice = this.state.menuList.slice(this.state.offset, this.state.offset + this.state.perPage);
        

        let paginationElement = (
            <ReactPaginate
              previousLabel={"← Previous"}
              nextLabel={"Next →"}
              breakLabel={<span className="gap">...</span>}
              pageCount={Math.ceil(this.state.menuList.length / this.state.perPage) > 0 ? Math.ceil(this.state.menuList.length / this.state.perPage) : 10}
              onPageChange={this.handlePageClick}
              forcePage={this.state.currentPage}
              containerClassName={"pagination"}
              previousLinkClassName={"previous_page"}
              nextLinkClassName={"next_page"}
              disabledClassName={"disabled"}
              activeClassName={"active"}
            />
          );

        let renderMenu;
        if(this.state.menuList) {
        renderMenu = slice.map(menu => {
            return (
                <div class="container">
                    <Card style={{marginLeft: "25px", border: "none"}}>
                        <Card.Title style={{fontSize: "25px", fontWeight: "bold", marginLeft:"10px"}}>{menu.dishName} </Card.Title>
                        <hr />
                        <Card.Text style={{marginLeft:"10px"}}> <span style={{fontWeight: "bold"}}>Category:</span> {menu.category} </Card.Text>
                        <Card.Text style={{marginLeft:"10px"}}><span style={{fontWeight: "bold"}}>Ingredients:</span> {menu.ingredients}</Card.Text>
                        <Card.Text style={{marginLeft:"10px"}}> <span style={{fontWeight: "bold"}}>Description:</span> {menu.description}</Card.Text>
                        <Card.Text style={{marginLeft:"10px"}}> ${menu.price}</Card.Text>
                        <Form onSubmit={this.onOrder}>
                        <div>
                        <Form.Check
                            id = {menu.dish_id}
                            name={menu.dishName}
                            label='Delivery'
                            value='delivery'
                            onChange={this.handleCheckboxChange}
                            style={{marginLeft:"10px", color: 'red' }}
                        />
                        <Form.Check
                            id = {menu.dish_id}
                            name={menu.dishName}
                            label='Pickup'
                            value='pickup'
                            onChange={this.handleCheckboxChange}
                            style={{ marginLeft:"10px", color: 'red' }}
                        />
                        <Button type='submit' style={{ marginLeft:"10px", marginTop: "10px", backgroundColor: "red", border: "1px solid red"}}> Order now</Button>
                        </div>
                        </Form>
                        </Card>
                    <br/>
                    <hr />
                </div>
            )
        })
        }
        return (
            <React.Fragment>
            <Navigationbar/>
            <div class="container">
                <center>
                <h1 style={{margin: "10px", color: "red"}}> Full menu </h1>
                </center>
                    {renderMenu}
                <div>
                    {paginationElement}
                </div>
            </div>
        </React.Fragment>
        )
    }
         
}

export default compose(withApollo,  graphql(addOrderMutation, { name: "addOrderMutation" }))(getDish);