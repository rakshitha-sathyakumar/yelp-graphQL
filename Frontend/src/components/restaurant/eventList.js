import React, { Component } from 'react';
import Navigationbar from '../navigation';
// import userProfile from './profile';
import '@fortawesome/fontawesome-free/css/all.min.css';
import illusionsImage from '../images/illusions.jpg';
import {Button, Card, CardGroup} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';
import backendServer from "../../backendServer";
import ReactPaginate from 'react-paginate';
import './pagination.css';
import {getRestEvents} from '../../actions/eventAction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class viewEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventList: [],
            offset: 0,
            perPage: 2,
            currentPage: 0,
            pageCount: null
        };
        this.handleOnClick = this.handleOnClick.bind(this);
    }

componentDidMount () {
    this.props.getRestEvents();
    // axios.get(`${backendServer}/yelp/viewEvents/${localStorage.getItem("rest_id")}`)
    // .then(res => {
    //     //console.log(res.data)
    //     this.setState({ eventList: res.data });
    //     //console.log(this.state.appetizerList);
    // });
}

handleOnClick = (e) => {
    console.log(e);
    localStorage.setItem("event_name", e.target.id);
    window.location()

}

handlePageClick = e => {
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
      eventList : !nextProps.event ? this.props.event : nextProps.event,
      pageCount: Math.ceil(this.state.eventList.length / this.state.perPage)  
    }
   );	
  }

    render() {

        console.log(this.props);

        const count = this.props.event.length;
        const slice = this.state.eventList.slice(this.state.offset, this.state.offset + this.state.perPage);

        let paginationElement = (
            <ReactPaginate
              previousLabel={"← Previous"}
              nextLabel={"Next →"}
              breakLabel={<span className="gap">...</span>}
              pageCount={Math.ceil(this.state.eventList.length / this.state.perPage) > 0 ? Math.ceil(this.state.eventList.length / this.state.perPage) : 1}
              onPageChange={this.handlePageClick}
              forcePage={this.state.currentPage}
              containerClassName={"pagination"}
              previousLinkClassName={"previous_page"}
              nextLinkClassName={"next_page"}
              disabledClassName={"disabled"}
              activeClassName={"active"}
            />
          );


        let renderEvents;
        if(this.state.eventList) {
        renderEvents = slice.map((event, key) => {
            return (
                    // <div class='col-md-6'>
                        <Card style={{margin: "10px", border:"1px solid black"}}>
                            {/* <Card.Img variant="top" src={illusionsImage} /> */}
                            <Card.Body>
                            <Card.Title>{event.eventName}</Card.Title>
                            <Card.Text> <i class="fas fa-hourglass-half"></i> {event.date} {event.time}</Card.Text>
                            <Card.Text> <i class="fas fa-map-marker-alt"></i> {event.eventLocation} </Card.Text>
                            <Card.Text>{event.eventDescription}</Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <Link to = {{pathname: `/regUser/${event._id}`}} style={{color: "red"}}> Registered people </Link>
                            </Card.Footer>
                        </Card>
                    //  </div>
                )
            })
        }
        return (
            <React.Fragment>
            <Navigationbar />
            <div class='panel'>
            <div class="container">
            <h5 style={{marginTop:"25px", float:"left", fontWeight:"bold"}}> Add an event </h5>
            <Button href="/addEvent" style={{marginTop:"15px", float:"right", backgroundColor:"red", border: "1px solid red"}}> Create an event </Button><br/><br/>
            <hr />
            <h2 style={{textAlign:"center", color: "red"}}>Events</h2>
            <br />
                    <CardGroup>
                            {renderEvents}
                    </CardGroup>
            </div>
            </div>
            <br />
            <br />
            <center style={{paddingLeft: "40%"}}>
                        {paginationElement}
            </center>
            </React.Fragment>
        )}
}

viewEvents.propTypes = {
    getRestEvents: PropTypes.func.isRequired,
    event: PropTypes.object.isRequired
  };

  const mapStateToProps = state => ({
    event: state.events.event

  });

  export default connect(mapStateToProps, { getRestEvents })(viewEvents);
//export default viewEvents;