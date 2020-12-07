import React, { Component } from 'react';
import Navigationbar from '../navigation';
import '@fortawesome/fontawesome-free/css/all.min.css';
import illusionsImage from '../images/restList.jpg';
import {Button, Card, CardGroup, Form} from 'react-bootstrap';
import axios from 'axios';
import backendServer from "../../backendServer";
import MapContainer from '../maps'
import ReactPaginate from 'react-paginate';
import './pagination.css';

const location = {
  address: '1600 Amphitheatre Parkway, Mountain View, california.',
  lat: 37.42216,
  lng: -122.08427,
}

class viewRest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restList: [],
            tempRestList: [],
            searchKeyword: null,
            searchCategory: 0,
            offset: 0,
            perPage: 2,
            currentPage: 0,
            pageCount: null
        };
        //console.log(props);
    }

componentDidMount () {
    console.log(this.props.location.state.searchKeyword)
    if (this.props.location.state && this.props.location.state.searchKeyword !== 'undefined') {
        this.setState({
            searchCategory: this.props.location.state.searchCategory,
            searchKeyword: this.props.location.state.searchKeyword,
          },
          () => {
          axios.get(`${backendServer}/restaurantSearch/${this.state.searchKeyword}/${this.state.searchCategory}`,)
            .then((response) => {
              console.log(response)
                this.setState({
                  restList: response.data, tempRestList: response.data
                });
              })
              .catch((error) => {
                console.log(error);
              });
          },
        );
    };
}

componentDidUpdate() {
    if (
      this.props.location.state &&
      this.state.searchKeyword !== this.props.location.state.searchKeyword
    ) {
      this.setState(
        {
            searchKeyword: this.props.location.state.searchKeyword,
            searchCategory: this.props.location.state.searchCategory,
        },
        () => {
          axios.get(`${backendServer}/restaurantSearch/${this.state.searchKeyword}/${this.state.searchCategory}`,)
            .then((response) =>
              this.setState({
                tempRestList: response.data
              }),
            )
            .catch((error) => {
              console.log(error);
            });
        },
      );
    }
  }

handleCheckboxChange = (e) => {
  console.log(e);
    e.preventDefault();
    this.setState({delivery_method: e.target.id})
    let delivery_method = e.target.id;
    console.log(delivery_method)
    let filteredData = this.state.restList.filter(order =>
    order.delivery_method == delivery_method
    );
    console.log(filteredData);
    this.setState({tempRestList:filteredData});
}

handleClick = (e) => {
    //prevent page from refresh
    console.log(e.target)
    e.preventDefault();
    localStorage.setItem("rest_id", e.target.id);
    localStorage.setItem("rest_name", e.target.name);
    window.location = "/restaurant_profile";
};

  handleReset = (e) => {
      e.preventDefault();
      let allOrders = this.state.restList;
      this.setState({tempRestList: allOrders})
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
      tempRestList : !nextProps.tempRestList ? this.state.tempRestList : nextProps.tempRestList,
      pageCount: Math.ceil(this.state.tempRestList.length / this.state.perPage)  
    }
   );	
  }

    render() {
      console.log(this.state.tempRestList);

        const count = this.state.tempRestList.length;
        const slice = this.state.tempRestList.slice(this.state.offset, this.state.offset + this.state.perPage);

        let paginationElement = (
          <ReactPaginate
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            breakLabel={<span className="gap">...</span>}
            pageCount={Math.ceil(this.state.tempRestList.length / this.state.perPage) > 0 ? Math.ceil(this.state.tempRestList.length / this.state.perPage) : 1}
            onPageChange={this.handlePageClick}
            forcePage={this.state.currentPage}
            containerClassName={"pagination"}
            previousLinkClassName={"previous_page"}
            nextLinkClassName={"next_page"}
            disabledClassName={"disabled"}
            activeClassName={"active"}
          />
        );

      let renderRest;
      if (this.state.tempRestList) {
      renderRest = slice.map((rest, key) => {
          var fileName = rest.fileName
          var imgSrc = `${backendServer}/yelp/upload/restaurant/${fileName}`
            return (
                <div class='col-md-6'>
                    <Card style={{margin: "10px", border:"1px solid black"}}>
                        <Card.Img id = {rest.rest_id} name={rest.name} style={{height: "150px", width: "200px"}}variant="top" src={imgSrc} onClick={this.handleClick} />
                        <Card.Body>
                        <Card.Title variant="link">  
                            <a id = {rest._id} name={rest.name} onClick={this.handleClick}>{rest.name} </a>
                        </Card.Title>
                        <Card.Text> <i class="fas fa-location-arrow"></i> {rest.street}, {rest.city}, {rest.zipcode}</Card.Text>
                        <Card.Text> <i class="fas fa-bread-slice"></i> {rest.cuisine} </Card.Text>
                        <Card.Text> <i class="fas fa-check" style={{color: "green"}}></i> {rest.deliveryMethod} </Card.Text>
                        </Card.Body>
                    </Card>
                    <br/>
                </div>
            )
        })
      }
        return (
            <React.Fragment>
            <Navigationbar />
            <div >
            <div class= "col-md-2" style={{float: "left"}}>
                       <h4 style={{ margin: "15px",color:"red"}}> Delivery Method </h4> 
                       <hr />
                       <Form onSubmit={this.handleFilter}>
                       <Form.Check
                            id = 'Yelp delivery'
                            label='Yelp delivery'
                            onChange={this.handleCheckboxChange}
                            style={{marginLeft:"10px" }}
                        />
                        <Form.Check
                            id = 'Dine In'
                            label='Dine In'
                            onChange={this.handleCheckboxChange}
                            style={{marginLeft:"10px" }}
                        />
                        <Form.Check
                            id = 'Curbside pickup'
                            label='Curbside pickup'
                            onChange={this.handleCheckboxChange}
                            style={{marginLeft:"10px" }}
                        />
                        <Button style={{marginLeft:"10px", marginTop: "10px", backgroundColor: "red", border: "1px solid red" }} type="submit" onClick={this.handleReset}> Remove filters </Button>
                        </Form>
                    </div>  
            <div class="col-md-10">
            <h2 style={{textAlign:"center", marginTop:"10px", color: "red"}}>Restaurants</h2>
            <hr />
            <CardGroup>
                {renderRest}
            </CardGroup> 
            <div style={{paddingLeft: "45%"}}>
              {paginationElement}
            </div>
            </div>
            <MapContainer restaurantlist={this.state.restList}></MapContainer> 
            </div>
            </React.Fragment>
        )}
}

export default viewRest;