import React, { Component } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';

import { connect } from 'react-redux';
import * as actions from '../../Actions/book-action';
import Aux from "../../hoc/_Aux";
import Notification from '../../Admin-part1/Notification/Notification';

class AddBook extends Component {
    constructor() {
        super();
        this.state = {
            title: '', isbn: '', category: '', authors: '', price:'', available:'', discount:'', publishDate:'', titleError: '', categoryError: '', isbnError: '',
            authorsError: '', titlevalid: 0, isbnvalid: 0, categoryvalid: 0, authorsvalid: 0,
            pricevalid: 0, priceError: '', publishDatevalid: 0, availablevalid : 0, discountvalid :0,
            categories:["horror", "comedy", "adeventure", "fiction", "ancient", "sciencefiction", "thriller", "spritual", "classic" ],
            publishDateError:'', availableError:'', discountError:'', select:'', selectvalid : 0,notify:false
        };
    }

    title(event) {
        let value = event.target.value
        const name = new RegExp('[a-zA-Z\s]{2,20}')
        if (!name.test(value)) {
            this.setState({ titleError: "please enter a valid book title", titlevalid: 0 })
        }
        else {
            this.setState({ titleError: '', titlevalid: 1 })
        }
        this.setState({ title: value })
    }

    category(event) {
        let value = event.target.value
        if (value ==="") {
            this.setState({categoryError: "please enter a valid category", categoryvalid: 0});
        }

        else {
            this.setState({ categoryError: '', categoryvalid: 1 })
        }
        this.setState({ category: value })
    }

    isbnCheck(event) {
        let value = event.target.value;
        if (value.length >13 || value.length<10) {
            this.setState({ isbnError: "isbn number should be 10 to 13 digits long", isbnvalid: 0 })
        }
        else {
            this.setState({ isbnError: '', isbnvalid: 1 })
        }
        this.setState({ isbn: value })
    }
    
    authorsCheck(event) {
        let value = event.target.value
        const name = new RegExp('[a-zA-Z\s]{4,20}')
        if (!name.test(value)) {
            this.setState({ authorsError: "please enter a valid author name", authorsvalid: 0 })
        }
        else {
            this.setState({ authorsError: '', authorsvalid: 1 })
        }
        this.setState({ authors: value })
    }

    
    priceCheck(event) {
        let value = event.target.value;
        if (value<=0) {
            this.setState({ priceError: "Price should be greater than 0", pricevalid: 0 })
        }
        else {
            this.setState({ priceError: '', pricevalid: 1 })
        }
        this.setState({ price: value })
    }

    availableCheck(event) {
        let value = event.target.value;
        if (value<0) {
            this.setState({ availableError: "Availability should be a positive number", availablevalid: 0 })
        }
        else {
            this.setState({ availableError: '', availablevalid: 1 })
        }
        this.setState({ available: value })
    }

    discountCheck(event) {
        let value = event.target.value;
        if (value.length<0 || value<0 || value>50) {
            this.setState({ discountError: "Discount should be less than 50", discountvalid: 0 })
        }
        else {
            this.setState({ discountError: '', discountvalid: 1 })
        }
        this.setState({ discount: value })
    }

    publishDateCheck(event) {
        let value = event.target.value;
        if (value<=0) {
            this.setState({ publishDateError: "Please enter a valid publish date", publishDatevalid: 0 })
        }
        else {
            this.setState({ publishDateError: '', publishDatevalid: 1 })
        }
        this.setState({ publishDate: value })
    }


    async validateBook() {
       
        let book = { title: this.state.title, category: this.state.category, isbn: this.state.isbn, authors:this.state.authors,price: this.state.price, discount: this.state.discount, publishDate: this.state.publishDate, available: this.state.available };
        console.log(book)
        await this.props.onAddBook(book);
        if(this.props.message.length>0)
        {
            await this.setState({notify:true})
            setTimeout(()=>{
                this.setState({notify:false})
            },2000)
        }
        else
        {
            this.setState({notify:false})
        }
    }


    render() {
        var check = true;
        if ((this.state.titlevalid === 1) && (this.state.categoryvalid === 1) && (this.state.isbnvalid === 1) && (this.state.authorsvalid === 1) && (this.state.pricevalid === 1) && (this.state.discountvalid === 1) && (this.state.publishDatevalid === 1) && (this.state.availablevalid === 1)) {
            check = false;
        }

        
        return (
            <Aux>
                {/* {this.props.message.includes('duplicate key') ? <Notification open={true} variant='error' msg='Book with same title is already available'/> : null}
        
                 {this.props.message.includes('Book is not added') ? <Notification open={true} variant='error' msg={this.props.message}/> : null}
                 {this.props.message.includes('Book is added successfully') ? <Notification open={true} variant="success" msg={this.props.message}/> : null}
              */}
                 <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Add Book</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col md={6}>
                                        <Form autoComplete>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Title</Form.Label>
                                                <Form.Control onChange={this.title.bind(this)} type="text" placeholder="Enter Title" />
                                                <p className="help-block text-danger">{this.state.titleError}</p>
                                            </Form.Group>

                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>ISBN</Form.Label>
                                                <Form.Control onChange={this.isbnCheck.bind(this)} type="number" placeholder="Enter ISBN" />
                                                <p className="help-block text-danger">{this.state.isbnError}</p>
                                            </Form.Group>

                                            <Form.Group controlId="formBasicPassword">
                                                <Form.Label>Price</Form.Label>
                                                <Form.Control  onChange={this.priceCheck.bind(this)} type="number" placeholder="Enter Price" />
                                                <p className="help-block text-danger">{this.state.priceError}</p>
                                            </Form.Group>                                
                                            <Form.Group controlId="formBasicPassword">
                                                <Form.Label>Publish Date</Form.Label>
                                                <Form.Control onChange={this.publishDateCheck.bind(this)} type="date" placeholder="Enter Publish Date" />
                                                <p className="help-block text-danger">{this.state.publishDateError}</p>
                                            </Form.Group>

                                        </Form>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="exampleForm.ControlInput1">
                                            <Form.Label>Category</Form.Label>
                                            {/* <Form.Control type="text" onChange={this.category.bind(this)} placeholder="Enter Category" /> */}
                                            <Form.Control onChange={this.category.bind(this)} as="select">
                                                    <option value="">Select Category</option>
                                                    {this.state.categories.map(data =>(
                                                        <option title={data}>{data}</option>
                                                    ))}
                                                </Form.Control>
                                            <p className="help-block text-danger">{this.state.categoryError}</p>
                                        </Form.Group>

                                        <Form.Group controlId="exampleForm.ControlInput1">
                                            <Form.Label>Author Name</Form.Label>
                                            <Form.Control type="text" onChange={this.authorsCheck.bind(this)} placeholder="Enter Author Name" />
                                            <p className="help-block text-danger">{this.state.authorsError}</p>
                                        </Form.Group>
                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Label>Discount</Form.Label>
                                            <Form.Control  type="number" onChange={this.discountCheck.bind(this)} placeholder="Enter Discount" />
                                            <p className="help-block text-danger">{this.state.discountError}</p>
                                        </Form.Group>
                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Label>Available Stock</Form.Label>
                                            <Form.Control type="number" onChange={this.availableCheck.bind(this)} placeholder="Enter Available Stock" />
                                            <p className="help-block text-danger">{this.state.availableError}</p>
                                        </Form.Group>
                                        
                                    </Col>
                                    <Col>
                                    <Button disabled={check} style={{width:"90px"}} onClick={this.validateBook.bind(this)} variant="primary">
                                                Add 
                                    </Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.bookReducer.message
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddBook: (book) => dispatch(actions.addbook(book))
    }
}

// export default AddWorkout;
export default connect(mapStateToProps, mapDispatchToProps)(AddBook);