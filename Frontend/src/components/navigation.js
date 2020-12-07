import React, { Component } from 'react';
import yelpLoginImage from './images/yelp_logo.jpg';
import {Button, Jumbotron, DropdownButton, Dropdown} from 'react-bootstrap';
//import { Redirect} from 'react-router';
import { Link, Redirect } from 'react-router-dom';

class Navigationbar extends Component {

    constructor(props) {

        super(props); 
            this.state = {
                searchKeyword: "",
                searchCategory: 0,
                searchBar: 'False'
            }
}


searchChangeHandler = (e) => {
    e.preventDefault();
    console.log(e.target.value)
    this.setState({
        searchKeyword: e.target.value
    })
}

handleClick = (e) => {
    if (localStorage.getItem("user") === 'False')
    {
        window.location = "/restaurant";
    } else {
        window.location = "/userProfile";
    }
}

handleOrder = (e) => {
    if (localStorage.getItem("user") === 'False')
    {
        window.location = '/restOrders';
    } else {
        window.location = '/user/orders'
    }
}

handleInputChange = (e) => {
    console.log(e.target.value)
    this.setState({
        searchCategory: e.target.value
    })
}

handleLogout = () => {
    window.localStorage.clear();
    window.location ='/'
  };

handleSearch = (e) => {
    e.preventDefault();
    //console.log("HIIII")
    this.setState({searchBar: 'True'})
};



render() {
    let redirectVar = null;
    if(this.state.searchBar === 'True') {
    console.log("I am here")
    redirectVar = <Redirect
          to={{
            pathname: '/list',
            state: {
            searchKeyword: this.state.searchKeyword,
            searchCategory: this.state.searchCategory,
            },
          }}></Redirect>
        }
    let navigarionbar = null
    if(localStorage.getItem("user") === "True") {
        navigarionbar = 
            <div>
            {redirectVar}
            <nav class="navbar navbar-light bg-light">
                <a class="navbar-brand" href="/home">
                    <img src = {yelpLoginImage} width="150" height="85" alt=""/>
                </a>
                <form class="form-inline mx-auto">
                    <select
                        class='custom-select input-group'
                        id='inputGroupSelect02'
                        onChange={this.handleInputChange}>
                        <option selected>Search...</option>
                        <option value='1'>Mode of delivery</option>
                        <option value='2'>Location</option>
                        <option value='3'>Cuisine</option>
                        <option value='4'>Dish Name</option>
                        <option value='5'> Restaurant name </option>
                    </select>
                    <input style={{width:"450px" }} list="searchWord" class="form-control lg-5" type="search" placeholder="Search" aria-label="Search" autoComplete='on' onChange={this.searchChangeHandler}/>
                    <button onClick={this.handleSearch} style = {{ marginLeft: "5px", width: "60px", height:"38px", borderRadius:"5px", background: "red", color: "white", border: "1px solid red", cursor: "pointer"}} type="submit"><i class="fa fa-search"></i></button>
                </form>
                <form class="form-inline ml-0">
                <Button href='/allUsers' style = {{margin:"25px 0px", marginLeft: "15px", backgroundColor: "transparent", border: 'none', fontSize: "17px", color: "red", outline: 'none'}} variant='link'> <i class="fas fa-users"></i> Users</Button>
                <Button href='/allEvents' style = {{margin:"25px 0px", backgroundColor: "transparent", border: 'none', fontSize: "17px", color: "red", outline: 'none'}} variant='link'> <i class="fas fa-calendar"></i> Events</Button> 
                <Link  to={{
                    pathname: '/list',
                    state: {
                        searchKeyword: null,
                        searchCategory: 0,
                    },
                  }}> <a style= {{margin:"25px 0px", backgroundColor: "transparent", border: 'none', fontSize: "17px", color: "red", outline: 'none'}}> <i class="fas fa-utensils"></i> Restaurant </a>
                </Link>
                <Button style = {{margin:"25px 0px", backgroundColor: "transparent", border: 'none', fontSize: "17px", color: "red", outline: 'none'}} variant='link' onClick={this.handleOrder}> <i class="fas fa-hamburger"></i> Orders </Button>
                <Dropdown>
                    <Dropdown.Toggle style={{backgroundColor: "red", border: "1px solid red"}}id="dropdown-basic"> <i class="fas fa-user"></i> </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item style={{background: "none"}}onClick={this.handleClick}>Profile overview</Dropdown.Item>
                        <Dropdown.Item onClick={this.handleLogout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                </form>
            </nav>
        </div>
    } else {
        navigarionbar = 
        <div>
        <nav class="navbar navbar-light bg-light">
            <a class="navbar-brand" href="/restaurant">
                <img src = {yelpLoginImage} width="150" height="85" alt=""/>
            </a>
            {/* <form class="form-inline mx-auto">
                <select
                    class='custom-select input-group'
                    id='inputGroupSelect02'
                    onChange={this.handleInputChange}>
                    <option selected>Search...</option>
                    <option value='1'>Mode of delivery</option>
                    <option value='2'>Location</option>
                    <option value='3'>Cuisine</option>
                    <option value='4'>Dish Name</option>
                </select>
                <input style={{width:"450px" }} list="searchWord" class="form-control lg-5" type="search" placeholder="Search" aria-label="Search" autoComplete='on' onChange={this.searchChangeHandler}/>
                <button onClick={this.handleSearch} style = {{ marginLeft: "5px", width: "60px", height:"38px", borderRadius:"5px", background: "red", color: "white", border: "1px solid red", cursor: "pointer"}} type="submit"><i class="fa fa-search"></i></button>
            </form> */}
            <form class="form-inline ml-0">
            <Button href='/events' style = {{margin:"25px 0px", marginLeft: "15px", backgroundColor: "transparent", border: 'none', fontSize: "17px", color: "red", outline: 'none'}} variant='link'> <i class="fas fa-calendar"></i> Events</Button> 
            {/* <Link  to={{
                pathname: '/list',
                state: {
                    searchKeyword: null,
                    searchCategory: 0,
                },
              }}> <a style= {{margin:"25px 0px", backgroundColor: "transparent", border: 'none', fontSize: "17px", color: "red", outline: 'none'}}> <i class="fas fa-utensils"></i> Restaurant </a>
            </Link> */}
            <Button style = {{margin:"25px 0px", backgroundColor: "transparent", border: 'none', fontSize: "17px", color: "red", outline: 'none'}} variant='link' onClick={this.handleOrder}> <i class="fas fa-hamburger"></i> Orders </Button>
            <Dropdown>
                <Dropdown.Toggle style={{backgroundColor: "red", border: "1px solid red"}}id="dropdown-basic"> <i class="fas fa-user"></i> </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item style={{background: "none"}}onClick={this.handleClick}>Profile overview</Dropdown.Item>
                    <Dropdown.Item onClick={this.handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            </form>
        </nav>
    </div>

    }
    return (
    <div>
        {navigarionbar}
    </div>
    )
};
}
export default Navigationbar;