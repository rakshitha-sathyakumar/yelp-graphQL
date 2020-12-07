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
import ReactPaginate from 'react-paginate';
import '../restaurant/pagination.css';
import {getAlluser} from '../../actions/userProfileAction';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class getAllUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: [],
            userKeyword: '',
            offset: 0,
            perPage: 2,
            currentPage: 0,
            pageCount: null
        };
    }

    componentDidMount() {
        this.props.getAlluser();
        // axios.get(`${backendServer}/yelp/userProfile/allUsers/${localStorage.getItem("user_id")}`)
        // .then(res => {
        //     console.log(res.data)
        //     this.setState({ userList: res.data });
        // });
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
          userList : !nextProps.user ? this.state.userList : nextProps.user,
          pageCount: Math.ceil(this.state.userList.length / this.state.perPage)  
        }
       );	
      }

    handleClick = (e) => {
        if (localStorage.getItem("user") === 'False')
        {
            window.location = "/restaurant";
        } else {
            window.location = "/userProfile";
        }
    }

    handleLogout = () => {
        window.localStorage.clear();
        window.location ='/'
      };

    searchChangeHandler = (e) => {
        e.preventDefault();
        console.log(e.target.value)
        this.setState({
            userKeyword: e.target.value
        })
    }
    

    handleSearch = (e) => {
       
        console.log(this.state.keyword)
        e.preventDefault();
        axios.get(`${backendServer}/yelp/allUsers/${this.state.userKeyword}`)
        .then(response => {
            console.log(response.data);
            this.setState({userList: response.data})
        })
    }

    handleFollowUsers = (e) => {
        axios.get(`${backendServer}/yelp/userProfile/${localStorage.getItem('user_id')}`)
        .then(response => {
            console.log(response.data.following);
            this.setState({userList: response.data.following})
        } )

    } 

    render () {

        console.log(this.props);

        const count = this.state.userList.length;
        const slice = this.state.userList.slice(this.state.offset, this.state.offset + this.state.perPage);


        let paginationElement = (
            <ReactPaginate
              previousLabel={"<--"}
              nextLabel={"-->"}
              breakLabel={<span className="gap">...</span>}
              pageCount={Math.ceil(this.state.userList.length / this.state.perPage) > 0 ? Math.ceil(this.state.userList.length / this.state.perPage) : 1}
              onPageChange={this.handlePageClick}
              forcePage={this.state.currentPage}
              containerClassName={"pagination"}
              previousLinkClassName={"previous_page"}
              nextLinkClassName={"next_page"}
              disabledClassName={"disabled"}
              activeClassName={"active"}
            />
          );

        console.log(this.state.userList);
        let renderAllUsers;
        if(this.state.userList){
        renderAllUsers = this.state.userList.map(user => {
            var fileName = user.fileName
            var imgSrc = `${backendServer}/yelp/upload/restaurant/${fileName}`
            return (
                <div>
                    <Card style={{borderBottom: "none", borderLeft: "none"}}>
                    <Card.Img style={{height: "300px", width: "225px"}}variant="top" src={imgSrc} />
                        <Card.Title style={{ fontSize: "25px"}}>{user.firstName} {user.lastName} </Card.Title>
                        <Card.Text> <i class="fas fa-location-arrow"></i> {user.address}</Card.Text>
                        {/* <Card.Text style={{margin: "10px"}}> <i class="fas fa-hourglass"></i> {event.time}</Card.Text> */}
                        <div>
                        <Button style={{backgroundColor: "red", border: "1px solid red", margin: "10px"}}>
                        <Link to = {{pathname: `/userProfile/${user._id}`}} style={{color: "white"}}> View Profile </Link></Button>
                        </div>
                    </Card>
                    <br/>
                    <br/>
                </div> 
            )
        })
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
        <div class='container'>
            <center>
                <h1 style={{marginTop: "25px", color: "black"}}>Yelp users</h1> 
            </center>
                <Button href='/allUsers' style = {{margin:"25px 0px", backgroundColor: "red", border: 'none', fontSize: "17px", color: "white", outline: 'none'}} variant='link'> <i class="fas fa-users"></i> View all users</Button>
                <Button style = {{margin:"25px 0px", marginLeft: "750px", backgroundColor: "red", border: 'none', fontSize: "17px", color: "white", outline: 'none'}} variant='link' onClick={this.handleFollowUsers}> <i class="fas fa-user-plus"></i> View following users</Button>
                {renderAllUsers}
        </div>
        <div style={{paddingLeft:"600px"}}>
        {paginationElement}
            </div>
                   
            </React.Fragment>    
        )
    }
         
}

getAllUsers.propTypes = {
    getAlluser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  };

  const mapStateToProps = state => {
    return ({
    user:state.userProfile.user
  })
};
export default connect(mapStateToProps, { getAlluser })(getAllUsers);
// export default getAllUsers;