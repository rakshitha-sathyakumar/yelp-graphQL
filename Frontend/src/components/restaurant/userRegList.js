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

export class getRegUserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            regUserList: []
        };
    }

    componentDidMount() {
        console.log()
        axios.defaults.headers.common['authorization'] = localStorage.getItem(
            'token',
          );
        axios.get(`${backendServer}/yelp/regUser/${this.props.match.params.event_id}`)
        .then(res => {
            this.setState({ regUserList: res.data });
        });
    }

    render () {
        console.log(this.state.regUserList);
        let renderRegUser
        if(this.state.regUserList) {
        renderRegUser = this.state.regUserList.map(user => {
            return (
                <div>
                    <h4 > {user.firstName} {user.lastName}</h4>
                    <button type="button" class="btn btn-danger">
                    <Link to = {{pathname: `/userProfile/${user.userId}`}} style={{color: "white"}}> View profile </Link> </button>
                    <hr />
                </div>
            )
        })
    }
        return (
            <React.Fragment>
            <Navigationbar/>
                <div class='container'>
                    <center>
                        <h1 style={{margin:"10px"}}>List of registered people </h1>
                    </center>
                    <hr />
                <div class='container'> 
                    {renderRegUser}
                </div>
                </div>
            </React.Fragment>
        )
    }
         
}
export default getRegUserList;