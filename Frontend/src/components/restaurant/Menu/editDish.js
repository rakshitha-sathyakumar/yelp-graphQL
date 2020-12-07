import React, { Component } from 'react';
import Navigationbar from '../../navigation';
// import userProfile from './profile';
import '@fortawesome/fontawesome-free/css/all.min.css';
import PropTypes from 'prop-types';
//import profilepic from '../../images/download.png'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Form, Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import backendServer from "../../../backendServer";
import { getDish, updateDish} from '../../../actions/dishAction';
import {getMenuItem} from '../../queries/queries';
import { graphql, withApollo } from 'react-apollo';
import {updateDishMutation} from '../../../mutations/mutations';
import { compose } from 'recompose'

class editDish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: [],

    };
  }

  async componentDidMount() {
    const { data } = await this.props.client.query({
      query: getMenuItem,
      variables: { restId: localStorage.getItem("id"), dishId: this.props.match.params.dish_id },
      fetchPolicy: "no-cache",
    
    });
    console.log(data)
    this.setState({menu : data.getMenuItem})
  }

  onChange= (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

handleRadio = (e) => {
  this.setState({
    category: e.target.name
  });
}

onUpdate = async (e) => {
  e.preventDefault();
  let mutationResponse = await this.props.updateDishMutation({
  variables: {
    restId: localStorage.getItem("id"),
    id: this.state.menu.id,
    dishName: this.state.dish_name,
    ingredients: this.state.ingredients,
    price: this.state.price,
    description: this.state.description,
    category: this.state.category
  }
  });
  console.log(mutationResponse)
        let response = mutationResponse.data.updateDish;
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
      if(!this.state.menu) {
        return (
          <div></div>
        )
      } else {
      let redirectVar = null;
      if(this.state.success){
      alert("Dish updated successfully");
      redirectVar = <Redirect to="/viewDish" />
      }
      return (
        <React.Fragment>
          {redirectVar}
          <Navigationbar />
          <div class='container'>
            <div class='row'>
              <div class='col-md-6' style={{ marginBottom: '5%' }}>
                <h3 style={{ margin: "15px, 0px", color: 'red', float: 'left' }}>Edit/update dish</h3>
                <br />
                <hr class='mb-3'></hr>
                <Form onSubmit={this.onUpdate}>
                <Form.Group controlId='firstName'>
                  <Form.Label style={{margin: "0px", padding: "0px"}}>
                    <strong>Name</strong>
                  </Form.Label>
                  <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted'>
                    This field is required.
                  </Form.Text>
                  <Form.Control onChange={this.onChange} name="dish_name" defaultValue={this.state.menu.dishName} type='text' />
                </Form.Group>
                <Form.Group controlId='lastName'>
                  <Form.Label style={{margin: "0px", padding: "0px"}}>
                    <strong>Main Ingredients</strong>
                  </Form.Label>
                  <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted'>
                    This field is required.
                  </Form.Text>
                  <Form.Control onChange={this.onChange}  name="ingredients" defaultValue={this.state.menu.ingredients} type='text' />
                </Form.Group>
                <Form.Group controlId='contact'>
                  <Form.Label style={{margin: "0px", padding: "0px"}}>
                    <strong>Dish Price</strong>
                  </Form.Label>
                  <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted'>
                    This field is required.
                  </Form.Text>
                  <Form.Control onChange={this.onChange}  name="price" defaultValue={this.state.menu.price} type='text' />
                </Form.Group>
                <Form.Group controlId='email'>
                  <Form.Label style={{margin: "0px", padding: "0px"}}>
                    <strong>Description</strong>
                  </Form.Label>
                  <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted'>
                    This field is required.
                  </Form.Text>
                  <Form.Control onChange={this.onChange} name="description" defaultValue={this.state.menu.description} type='text' />
                </Form.Group>
                <Form.Group controlId='category'>
                    <Form.Label style={{margin: "0px", padding: "0px"}}>
                        <strong>Category</strong>
                    </Form.Label><br />
                    <Form.Check 
                    name="Appetizer" onChange={this.handleRadio} label="Appetizer" />
                    <Form.Check 
                    name="Salads" onChange={this.handleRadio} label="Salads" />
                    <Form.Check 
                    name="Main Course" onChange={this.handleRadio} label="Main Course" />
                    <Form.Check 
                    name="Desserts" onChange={this.handleRadio} label="Desserts" />
                    <Form.Check 
                    name="Beverages" onChange={this.handleRadio} label="Beverages" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        <strong>Add Dish photo</strong>
                    </Form.Label>
                    <Form.File id="exampleFormControlFile1"/>
                </Form.Group>
                <Button variant='danger' type='submit'>
                  Update Changes
                </Button>
                <a href='/restaurant' style={{ marginLeft: '15px' }}>
                  Cancel
                </a>
                </Form>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
  }


  export default compose(withApollo,  graphql(updateDishMutation, { name: "updateDishMutation" }))(editDish)
