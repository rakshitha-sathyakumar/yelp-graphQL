import React, { Component } from 'react';
import Navigationbar from '../navigation';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Redirect } from 'react-router';
import { Form, Button} from 'react-bootstrap';
import { graphql } from 'react-apollo';
import {getRestProfile} from "../queries/queries";
import {updateRestMutation} from '../../mutations/mutations';
import { compose } from 'recompose'

class updateRestaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileText: ''
    };
  }

handleUpdate = async (e) => {
  e.preventDefault();
  let mutationResponse = await this.props.updateRestMutation({
  variables: {
    id: localStorage.getItem("id"),
    name: e.target.name.value,
    street: e.target.street.value,
    city: e.target.city.value,
    zipcode: e.target.zipcode.value,
    email: e.target.email.value,
    contactNo: e.target.contact_info.value,
    timings: e.target.timings.value,
    cuisine: e.target.cuisine.value,
    deliveryMethod: e.target.delivery.value,
  }
});
console.log(mutationResponse)
        let response = mutationResponse.data.updateRestProfile;
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
      if(!this.props.data.getRestProfile) {
        return (
          <div></div>
        )
      } else {
      var email = (this.props.data.getRestProfile.email)
      console.log(this.props.status)
      let redirectVar = null;
      if(this.state.success){
      alert("Profile updated successfully");
      redirectVar = <Redirect to="/restaurant" />
      }
      return (
        <div>
        <React.Fragment>
          {redirectVar}
          <Navigationbar />
          <div class='container'>
            <div class='row'>
              <div class='col-md-6' style={{ marginBottom: '5%' }}>
                <br />
                <h3 style={{ margin: "15px, 0px", color: 'red', float: 'left' }}>Restaurant Profile</h3>
                <br />
                <hr class='mb-3'></hr>
                <Form onSubmit ={this.handleUpdate}>
                <Form.Group controlId='name'>
                  <Form.Label style={{margin: "0px", padding: "0px"}}>
                    <strong >Name</strong>
                  </Form.Label>
                  <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted'>
                    This field is required.
                  </Form.Text>
                  <Form.Control name="name" onChange={this.onChange} defaultValue={this.props.data.getRestProfile.name} type='text' />
                </Form.Group>
                <Form.Group controlId='street'>
                  <Form.Label style={{margin: "0px", padding: "0px"}}>
                    <strong>Street</strong>
                  </Form.Label>
                  <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted'>
                    This field is required.
                  </Form.Text>
                  <Form.Control name="street" onChange={this.onChange} defaultValue={this.props.data.getRestProfile.street} type='text' />
                </Form.Group>
                <Form.Group controlId='city'>
                  <Form.Label style={{margin: "0px", padding: "0px"}}>
                    <strong>City</strong>
                  </Form.Label>
                  <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted'>
                    This field is required.
                  </Form.Text>
                  <Form.Control name="city" onChange={this.onChange} defaultValue={this.props.data.getRestProfile.city} type='text' />
                </Form.Group>
                <Form.Group controlId='zipcode'>
                  <Form.Label style={{margin: "0px", padding: "0px"}}>
                    <strong>Zipcode</strong>
                  </Form.Label>
                  <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted'>
                    This field is required.
                  </Form.Text>
                  <Form.Control name="zipcode" onChange={this.onChange} defaultValue={this.props.data.getRestProfile.zipcode} type='text' />
                </Form.Group>
                <Form.Group controlId='contact'>
                  <Form.Label style={{margin: "0px", padding: "0px"}}>
                    <strong>Contact number</strong>
                  </Form.Label>
                  <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted'>
                    This field is required.
                  </Form.Text>
                  <Form.Control name="contact_info" onChange={this.onChange} defaultValue={this.props.data.getRestProfile.contactNo} type='text' />
                </Form.Group>
                <Form.Group controlId='email'>
                  <Form.Label style={{margin: "0px", padding: "0px"}}>
                    <strong>Email ID</strong>
                  </Form.Label>
                  <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted'>
                    This field is required.
                  </Form.Text>
                  <Form.Control name="email" onChange={this.onChange} defaultValue={this.props.data.getRestProfile.email} type='text' />
                </Form.Group>
                <Form.Group controlId='nickName'>
                  <Form.Label style={{margin: "0px", padding: "0px"}}>
                    <strong>Timings</strong>
                  </Form.Label>
                  <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted'>
                  This field is required.
                  </Form.Text>
                  <Form.Control name="timings" onChange={this.onChange} defaultValue={this.props.data.getRestProfile.timings}type='text' />
                </Form.Group>
                <Form.Group controlId='cuisine'>
                  <Form.Label style={{margin: "0px", padding: "0px"}}>
                    <strong>Cuisine</strong>
                  </Form.Label>
                  <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted'>
                  This field is required.
                  </Form.Text>
                  <Form.Control name="cuisine" onChange={this.onChange} defaultValue={this.props.data.getRestProfile.cuisine}type='text' />
                </Form.Group>
                <Form.Group controlId='delivery'>
                  <Form.Label style={{margin: "0px", padding: "0px"}}>
                    <strong>Delivery method</strong>
                  </Form.Label>
                  <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted'>
                  This field is required.
                  </Form.Text>
                  <Form.Control name="delivery" onChange={this.onChange} defaultValue={this.props.data.getRestProfile.deliveryMethod}type='text' />
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        <strong>Add a photo</strong>
                    </Form.Label>
                    <div class="custom-file">
                    <input type="file" name="image" accept="image/*" onChange={this.onImageChange}/>
                  </div>
                </Form.Group>
                <Button style={{backgroundColor: "red", border: "1px solid red"}} onClick={this.handleImageUpload}>
                  Upload
                </Button>
                <br />
                <br />
                <Button style={{backgroundColor: "red", border: "1px solid red"}} type='submit'>
                 Save changes
                </Button>
                <a href='/restaurant' style={{ marginLeft: '15px' }}>
                  Cancel
                </a>
                </Form>
              </div>
            </div>
          </div>
        </React.Fragment>
        </div>
      );
    }
  }
}

  export default compose(
    graphql(getRestProfile, {
      options: () => {
        return {
          variables: { id: localStorage.getItem('id') },
          fetchPolicy: 'network-only',
        };
      },
    }),
    graphql(updateRestMutation, { name: 'updateRestMutation' }),
  )(updateRestaurant);