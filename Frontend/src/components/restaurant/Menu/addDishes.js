import React, { Component } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Form, Button} from 'react-bootstrap';
import axios from 'axios';
import backendServer from "../../../backendServer";
import {addDish} from '../../../actions/dishAction';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navigationbar from '../../navigation';
import { graphql } from 'react-apollo';
import {addDishMutation} from '../../../mutations/mutations';

class updateDishes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dish_name: "",
      ingredients: "",
      price: "",
      fileText: "",
      description: "",
      category: "", 
    };
  }

  onChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
}

handleRadio = (e) => {
  this.setState({
    category: e.target.name
  });
}

onImageChange = (e) => {
  if(e.target.files && e.target.files[0]) {
    this.setState({
      file: e.target.files[0],
      fileText: e.target.files[0].name,
    });
  }
}

handleImageUpload = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append('image', this.state.file);
  const uploadConfig = {
    headers: {
      'content-type': 'multipart/form-data',
    }
  };
  axios.post(`${backendServer}/yelp/upload/item`, formData, uploadConfig)
  .then(response => {
      alert("Image uploaded successfully!");
      this.setState({
          user_image: response.data
        });
      })
      .catch(err => {
      console.log("Error");
  });
}

onSubmit = async (e) => {
  e.preventDefault();
  let mutationResponse = await this.props.addDishMutation({
  variables: {
    id: localStorage.getItem("id"),
    dishName: this.state.dish_name,
    ingredients: this.state.ingredients,
    price: this.state.price,
    description: this.state.description,
    category: this.state.category,
  }
});
console.log(mutationResponse)
        let response = mutationResponse.data.addDish;
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
      if(this.state.success){
      alert("Dish added successfully");
      redirectVar = <Redirect to="/restaurant" />
      }
      return (
        <React.Fragment>
          {redirectVar}
          <Navigationbar />
          <div class='container'>
            <div class='row'>
              <div class='col-md-6' style={{ marginBottom: '5%' }}>
                <h3 style={{ margin: "15px, 0px", color: 'red', float: 'left' }}>Add dishes</h3>
                <br />
                <hr class='mb-3'></hr>
                <Form onSubmit={this.onSubmit}>
                <Form.Group controlId='firstName'>
                  <Form.Label style={{margin: "0px", padding: "0px"}}>
                    <strong>Name</strong>
                  </Form.Label>
                  <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted'>
                    This field is required.
                  </Form.Text>
                  <Form.Control onChange={this.onChange} name="dish_name" type='text' />
                </Form.Group>
                <Form.Group controlId='lastName'>
                  <Form.Label style={{margin: "0px", padding: "0px"}}>
                    <strong>Main Ingredients</strong>
                  </Form.Label>
                  <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted'>
                    This field is required.
                  </Form.Text>
                  <Form.Control onChange={this.onChange}  name="ingredients" type='text' />
                </Form.Group>
                <Form.Group controlId='contact'>
                  <Form.Label style={{margin: "0px", padding: "0px"}}>
                    <strong>Dish Price</strong>
                  </Form.Label>
                  <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted'>
                    This field is required.
                  </Form.Text>
                  <Form.Control onChange={this.onChange}  name="price" type='text' />
                </Form.Group>
                <Form.Group controlId='email'>
                  <Form.Label style={{margin: "0px", padding: "0px"}}>
                    <strong>Description</strong>
                  </Form.Label>
                  <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted'>
                    This field is required.
                  </Form.Text>
                  <Form.Control onChange={this.onChange} name="description" type='text' />
                </Form.Group>
                <Form.Group controlId='gender'>
                    <Form.Label style={{margin: "0px", padding: "0px"}}>
                        <strong>Category</strong>
                    </Form.Label><br />
                    <Form.Check 
                    name="Appetizer" onChange={this.handleRadio} label="Appetizer" />
                    <Form.Check 
                    name="Salads" onChange={this.handleRadio} label="Salads" />
                    <Form.Check 
                    name="Main course" onChange={this.handleRadio} label="Main Course" />
                    <Form.Check 
                    name="Dessert" onChange={this.handleRadio} label="Desserts" />
                    <Form.Check 
                    name="Beverage" onChange={this.handleRadio} label="Beverages" />
                </Form.Group>
                <form >
                  <div class="custom-file">
                    <input type="file" name="image" accept="image/*" onChange={this.onImageChange} required/>
                  </div>
                  <br />
                 <Button type="submit" variant="primary" onClick={this.handleImageUpload}>Upload</Button>
                </form> <br />
                <Button variant='danger' type='submit'>
                  Save Changes
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

export default graphql(addDishMutation, { name: "addDishMutation" })(updateDishes);

  //export default updateDishes;