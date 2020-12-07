import React, { Component } from 'react';
import Navigationbar from '../navigation';
// import userProfile from './profile';
import '@fortawesome/fontawesome-free/css/all.min.css';
import yelpLoginImage from '../images/yelp_logo.jpg';
// import backgroundImage from '../images/menuCard.jpg';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Form, Button, Card, CardGroup, Dropdown} from 'react-bootstrap';
import axios from 'axios';
import backendServer from "../../backendServer";
import {getAllevents, getUserReglist} from '../../actions/eventAction';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class getAllEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventList: [],
            tempEventList: [],
            userRegList: [],
            searchEventList: [],
            searchList: 'False'
        };
    }

    componentDidMount() {
        this.props.getAllevents();
        // axios.get(`${backendServer}/yelp/viewEvents`)
        // .then(res => {
        //     this.setState({ eventList: res.data, tempEventList: res.data });
        // });

        this.props.getUserReglist();
        // axios.get(`${backendServer}/yelp/viewEvents/user/${localStorage.getItem("user_id")}`)
        // .then(res => {
        //     this.setState({ userRegList: res.data });
        // });
    }

    componentWillReceiveProps(nextProps){
        this.setState({
          ...this.state,
          eventList : !nextProps.event ? this.state.eventList : nextProps.event,
          tempEventList: !nextProps.event ? this.state.tempEventList : nextProps.event,
          userRegList: !nextProps.user ? this.state.userRegList : nextProps.user
          //pageCount: Math.ceil(this.state.tempRestOrder.length / this.state.perPage)  
        }
       );	
      }

    handleOrder = (e) => {
        if (localStorage.getItem("user") === 'False')
        {
            window.location = '/restOrders';
        } else {
            window.location = '/user/orders'
        }
    }

    searchChangeHandler = (e) => {
        e.preventDefault();
        console.log(e.target.value)
        this.setState({
            keyword: e.target.value
        })
    }

    sortByDateAsc = () => {
        let sorted = this.state.eventList.sort((a, b) => {
            return Date.parse(a.date) - Date.parse(b.date);
          });
          this.setState({ eventList: sorted });
      }

      sortByDateDsc = () => {
        let sorted = this.state.eventList.sort((a, b) => {
            return Date.parse(b.date) - Date.parse(a.date);
          });
          this.setState({ eventList: sorted });
      }

      handleLogout = () => {
        window.localStorage.clear();
        window.location ='/'
      };
    

    handleSearch = (e) => {
        console.log(this.state.keyword)
        e.preventDefault();
        axios.get(`${backendServer}/restaurantSearch/${this.state.keyword}`)
        .then(response => {
            this.setState({searchEventList: response.data})
        })
        this.setState({searchList: "True"})
    }
    handleClick = (e) => {
        if (localStorage.getItem("user") === 'False')
        {
            window.location = "/restaurant";
        } else {
            window.location = "/userProfile";
        }
    }

    render () {
        let renderEvents;
        if(this.state.eventList) {
        renderEvents = this.state.eventList.map(event => {
            return (
                <div>
                    <Card style={{borderBottom: "none", borderLeft: "none"}}>
                        <Card.Title style={{margin: "10px", fontSize: "25px"}}>{event.eventName} </Card.Title>
                        <Card.Text style={{margin: "10px"}}> <i class="fas fa-calendar-day"></i> {event.date}</Card.Text>
                        <Card.Text style={{margin: "10px"}}> <i class="fas fa-hourglass"></i> {event.time}</Card.Text>
                        <div>
                        <Button style={{backgroundColor: "red", border: "1px solid red", margin: "10px"}}>
                        <Link to = {{pathname: `/event/${event._id}`}} style={{color: "white"}}> View details </Link></Button>
                        </div>
                    </Card>
                    <br/>
                    <br/>
                </div> 
            )
        })
        }
        let renderRegEvents = this.state.userRegList.map(reg => {
            return (
                <div>
                    <h4> {reg.eventName} </h4><br/>
                    <h6> <i class="fas fa-hourglass"></i> {reg.time} </h6>
                    <h6>  <i class="fas fa-calendar-day"></i> {reg.date} </h6>
                    <h6> <i class="fas fa-map-pin"> </i> {reg.eventLocation} </h6>
                    <hr />
                </div>
            )
        })

        let renderSearchList = this.state.searchEventList.map(search => {
            return (
                <div>
                    <Card style={{borderBottom: "none", borderLeft: "none"}}>
                        <Card.Title style={{margin: "10px", fontSize: "25px"}}>{search.eventName} </Card.Title>
                        <Card.Text style={{margin: "10px"}}> <i class="fas fa-calendar-day"></i> {search.date}</Card.Text>
                        <Card.Text style={{margin: "10px"}}> <i class="fas fa-hourglass"></i> {search.time}</Card.Text>
                        <div>
                        <Button style={{backgroundColor: "red", border: "1px solid red", margin: "10px"}}>
                        <Link to = {{pathname: `/event/${search._id}`}} style={{color: "white"}}> View details </Link></Button>
                        </div>
                    </Card>
                    <br/>
                    <br/>
                </div> 
            )
        })
        let render;
        if (this.state.searchList === 'True') {
            render = 
            <div class="container">
                <center>
                    <h1 style={{margin: "10px", color:"red"}}> List of Events </h1>
                </center>
                {renderSearchList}
            </div>
        } else {
            if(localStorage.getItem("user") === 'False') {
          render = 
          <div class="container">
            <center>
                <h1 style={{margin: "10px", color:"red"}}> List of Events </h1>
                <Button style = {{margin:"25px 0px", backgroundColor: "transparent", border: 'none', fontSize: "20px", color: "red", outline: 'none'}} variant='link' onClick={this.handleOrder}> Ascending </Button>
                <Button style = {{margin:"25px 0px", marginLeft: "10px", backgroundColor: "transparent", border: 'none', fontSize: "20px", color: "red", outline: 'none'}} variant='link' onClick={this.handleOrder}> Descending </Button>
            </center>

            {renderEvents}
        </div>
        } else {
            render = 
            <div>
                <div class="container">
                    <h2 style={{color:"red"}}> Upcoming events </h2>
                    <hr />
                    {renderRegEvents}
                </div>
                <hr />
                <div class="container">
                <center>
                    <h1 style={{margin: "10px", color:"red"}}> List of Events </h1>
                    <Button style = {{margin:"25px 0px", backgroundColor: "red", border: 'none', fontSize: "20px", color: "white", outline: 'none'}} variant='link' onClick={this.sortByDateAsc}> Ascending </Button>
                    <Button style = {{margin:"25px 10px", backgroundColor: "red", border: 'none', fontSize: "20px", color: "white", outline: 'none'}} variant='link' onClick={this.sortByDateDsc}> Descending </Button>
                </center>
                    {renderEvents}
                </div>
            </div>
            }
        }
        return (
            <React.Fragment>
                <div>
            <nav class="navbar navbar-light bg-light">
                <a class="navbar-brand" href="/home">
                    <img src = {yelpLoginImage} width="150" height="85" alt=""/>
                </a>
                <form class="form-inline mx-auto">
                    <input style={{width:"450px" }} list="searchWord" class="form-control lg-5" type="search" placeholder="Search" aria-label="Search" autoComplete='on' onChange={this.searchChangeHandler}/>
                    <button onClick={this.handleSearch} style = {{ marginLeft: "5px", width: "60px", height:"38px", borderRadius:"5px", background: "red", color: "white", border: "1px solid red", cursor: "pointer"}} type="submit"><i class="fa fa-search"></i></button>
                </form>
                <form class="form-inline ml-0">
                <Button href='/allUsers' style = {{margin:"25px 0px", backgroundColor: "transparent", border: 'none', fontSize: "17px", color: "red", outline: 'none'}} variant='link'> <i class="fas fa-users"></i> Users</Button>
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
                {render}   
            </React.Fragment>    
        )
    }
         
}

getAllEvents.propTypes = {
    getAllevents: PropTypes.func.isRequired,
    getUserReglist: PropTypes.func.isRequired,
    event: PropTypes.object.isRequired, 
    user: PropTypes.object.isRequired
  };

  const mapStateToProps = state => {
    return ({
    event: state.events.event,
    user:state.events.user

  })
};
export default connect(mapStateToProps, { getAllevents, getUserReglist })(getAllEvents);
//export default getAllEvents;