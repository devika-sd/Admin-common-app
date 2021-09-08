import React, { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Form, Button, Row, Col } from 'react-bootstrap'
import { Table } from 'react-bootstrap'
import { useParams } from "react-router-dom"
import { connect } from 'react-redux';
import * as orderactions from '../../Actions/order-action';
import { useHistory } from "react-router";


function getModalStyle() {
    return {
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
    };
}
const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: '1000px',
        padding: theme.spacing(2, 4, 3)
    },
}));



function Ordermodel(props) {
    console.log(props.location.order);
    var [order,setOrder] = useState(props.location.order.user);
    const history = useHistory();
    const classes = useStyles();
    var [modalStyle] = useState(getModalStyle);
    var [open, setOpen] = useState(true);
    let { orderid } = useParams();
    const [email, setemail] = useState(order.email);
    var paytype = order.paymentStatus ? "Online" : "COD"
    const [paymentType, setPayment] = useState(paytype);
    let newdate = new Date(order.orderDate);
    const [dateTime, setDateTime] = useState(newdate.toLocaleString());
    var addresses = order.address.houseNumber + "," + order.address.locality + "," + order.address.city + "," + order.address.state + ',' + order.address.country + ',' + order.address.pinCode;
    const [address, setAddress] = useState(addresses);
    const [phonenumber, setContact] = useState(order.phonenumber);
    const [amount, setAmount] = useState(order.amount);
    const [bookname, setBookname] = useState('');
    const [status, setStatus] = useState(order.status);

    const [enable, setEnable] = useState(true)


    const handleopen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
        history.push('/orderlist');

    }

    const checkClose = () => {
        handleClose();
    }

    const Update = async (e) => {
        let roleData = { status: status }
        console.log(roleData)
        setEnable(true)
        await props.updateorderbyid(order._id, roleData)
        await props.onGetorders("");
    }
    const Edit = (event) => {
        console.log('Edit')
        setEnable(false)
    }
    const cancel = (event) =>{
        console.log('cancel')
        setEnable(true)
        handleClose();
    }

    const onChangeRadio = (e) => {
        console.log(e.target.value);
        setStatus(e.target.value);
    }

    var booklist = order.books.map((book, i) => {
        return (
            <tr key={i}>
                <td> {book.quantity} </td>
                <td> {book.isbn} </td>
            </tr>
        )
    })


    return (
        <div>

            <Modal
                open={open}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div style={modalStyle} className={classes.paper+' ordermodel'}>
                    <Card className="border border-muted" style={{
                        padding: '10px 15px',
                        margin: '15px auto',
                        boxSizing: 'border-box',
                        border: 'none',
                        width: '90%',
                        fontFamily: 'monospace',
                        display: 'block'
                    }}>

                        <Card.Header>
                            <i className="fa fa-times" style={{ float: 'right', fontSize: '20px' }} onClick={checkClose}></i>
                            <Card.Title as="h5">
                                <h4>Order List</h4>
                            </Card.Title>
                            {/* <hr></hr> */}
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>

                                {/* Disabled */}
                                {enable &&
                                    <Row>
                                        <Col md={6}>
                                            <Form>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Email</Form.Label>
                                                    <Form.Control type="text" value={email} placeholder="Enter Email" />
                                                </Form.Group>

                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Payment Type</Form.Label>
                                                    <Form.Control type="text" value={paymentType} placeholder="Enter Payment type" />
                                                </Form.Group>

                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Status</Form.Label>
                                                    <Form.Control type="text" value={status} placeholder="Enter Status" />
                                                </Form.Group>


                                            </Form>
                                        </Col>

                                        <Col md={6}>

                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Date Time</Form.Label>
                                                <Form.Control type="text" value={dateTime} placeholder="Enter Date and time" />
                                            </Form.Group>

                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Amount</Form.Label>
                                                <Form.Control type="text" value={amount} placeholder="Enter Address" />
                                            </Form.Group>

                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Address</Form.Label>
                                                <Form.Control as="textarea" value={address} placeholder="Enter Address" />
                                            </Form.Group>

                                        </Col>
                                        
                                        <Table striped bordered hover style={{ width:"100%",margin:'10px' }}>
                                            <thead>
                                                <tr>
                                                    <th>Quantity</th>
                                                    <th>ISBN</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {booklist}
                                            </tbody>
                                        </Table>
                                        <Button style={{ width: "90px", margin: 'auto' }} onClick={Edit} variant="primary">EDIT</Button>
                                    </Row>
                                }

                                {!enable &&
                                    <Row>
                                        <Col md={4}>
                                            <Form>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Status</Form.Label>
                                                </Form.Group>
                                            </Form>
                                        </Col>

                                        <Col md={3} key='status' onChange={onChangeRadio}>

                                            <Form.Check
                                                type='radio'
                                                id='status'
                                                name="group1"
                                                label='New'
                                                value='new'
                                            />
                                            <Form.Check
                                                type='radio'
                                                id='status'
                                                name="group1"
                                                label='Packed'
                                                value='packed'
                                            />
                                            <Form.Check
                                                type='radio'
                                                id='status'
                                                name="group1"
                                                label='Shipped'
                                                value='shipped'
                                            />
                                        </Col>
                                        <Col md={2} key='status' onChange={onChangeRadio}>

                                            <Form.Check
                                                type='radio'
                                                id='status'
                                                name="group1"
                                                label='Completed'
                                                value='completed'
                                            />
                                            <Form.Check
                                                type='radio'
                                                id='status'
                                                name="group1"
                                                label='Delayed'
                                                value='delayed'
                                            />
                                            <Form.Check
                                                type='radio'
                                                id='status'
                                                name="group1"
                                                label='Cancelled'
                                                value='cancelled'
                                            />
                                        </Col>
                                        <Col sm={12} md={12} style={{width:'100%',textAlign:'center'}}>
                                            <div style={{marginTop:'50px'}}>
                                            <Button style={{ width: "fit-content", marginTop: '50px', margin:'10px' }} onClick={cancel} variant="primary">CANCEL</Button>
                                            <Button style={{ width: "fit-content", marginTop: '50px', margin:'10px'  }} onClick={Update} variant="primary">UPDATE</Button>

                                            </div>
                                        </Col>
                                    </Row>
                                }


                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </Modal>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        message: state.orderReducer.message
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        updateorderbyid: (id, orderdata) => dispatch(orderactions.updateorders(id, orderdata)),
        onGetorders: (filter) => dispatch(orderactions.fetchorders(filter))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ordermodel);