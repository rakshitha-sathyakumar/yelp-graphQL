import React, { Component } from 'react';
import Navigationbar from '../../navigation';
import '@fortawesome/fontawesome-free/css/all.min.css';
import appetizerImage from '../../images/appetizer.jpg';
import saladImage from '../../images/salad.jpg';
import maincourseImage from '../../images/mainCourse.jpg';
import dessertImage from '../../images/desserts.jpg';
import beveragesImage from '../../images/beverages.jpg';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Form, Button, Card, CardGroup} from 'react-bootstrap';
import axios from 'axios';

class viewDish extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appetizer: "Appetizer",
            salad: "Salads",
            maincourse: "Main course",
            desser: "Dessert",
            beverages: "Beverages"
        };
    }

    render() {
        return (
            <div>
                <React.Fragment>
                    <Navigationbar />
                    <div class="container">
                        <center>
                        <h1 style={{margin:"25px", fontWeigth:"bold"}}> Menu Card </h1>
                        </center>
                        <CardGroup>
                        <Card>
                            <Card.Img variant="top" src={appetizerImage} />
                            <Card.Body>
                            <Card.Title>Appetizer</Card.Title>
                            <Card.Text>
                                Appetiser or starter is a small dish served before a meal in European cuisine
                            </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                            <a href ="/menu/appetizer" >Full menu</a>
                            </Card.Footer>
                        </Card>
                        <Card>
                            <Card.Img variant="top" src={saladImage} style={{height: "395px"}} />
                            <Card.Body>
                            <Card.Title>Salads</Card.Title>
                            <Card.Text>
                                A salad is a dish consisting of pieces of food in a mixture, with at least one raw ingredient.
                            </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                            <a href ="/menu/salad">Full menu</a>
                            </Card.Footer>
                        </Card>
                        </CardGroup>
                        <CardGroup>
                        <Card>
                            <Card.Img variant="top" src={maincourseImage} />
                            <Card.Body>
                            <Card.Title>Main Course</Card.Title>
                            <Card.Text>
                                The main course is the featured or primary dish in a meal consisting of several courses.
                            </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                            <a href ="/menu/maincourse" >Full menu</a>
                            </Card.Footer>
                        </Card>
                        <Card>
                            <Card.Img src={dessertImage} style={{height: "415px"}} />
                            <Card.Body>
                            <Card.Title>Desserts</Card.Title>
                            <Card.Text>
                                Dessert is a course that concludes a meal. The course usually consists of sweet foods.
                            </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                            <a href ="/menu/dessert">Full menu</a>
                            </Card.Footer>
                        </Card>
                        </CardGroup>
                        <Card style={{marginLeft: "300px", marginRight: "300px"}}>
                            <Card.Img variant="top" src={beveragesImage} />
                            <Card.Body>
                            <Card.Title>Beverages</Card.Title>
                            <Card.Text>
                                Beverage is a drink, especially one other than water.
                            </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                            <a href ="/menu/beverage">Full menu</a>
                            </Card.Footer>
                        </Card>
                    </div>
                </React.Fragment>
    </div>
    )}
}

export default viewDish;