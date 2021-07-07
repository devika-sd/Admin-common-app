import { Row, Col, Card, Form, Button, Table,Image } from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import avatar2 from '../../assets/images/user/avatar-2.jpg';

import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { connect } from 'react-redux';
import * as useractions from '../../Actions/user-action';


function ProfilePage(props) {
    let { id } = useParams();
    const [address, setAddress] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [phone, setContact] = useState('');
    const [photo, setPhoto] = useState('')
    const [enable, setEnable] = useState(true)
    const [passwordEnable, setPasswordEnable] = useState(false)

    // const [addressError, setAddressError] = useState(true)
    const [nameError, setNameError] = useState(true)
    const [emailError, setEmailError] = useState(true)
    const [passwordError, setPasswordError] = useState(true)
    const [cpasswordError, setCPasswordError] = useState(true)
    const [contactError, setContactError] = useState(true)
    console.log(id)
    const [srcp,setSrcp] = useState("")

    useEffect(() => {
        (async () => {
            await props.onGetUsers("_id=" + id);
            console.log(props.users[0].name)
            setName(props.users[0].name)
            setEmail(props.users[0].email)
            setOldPassword(props.users[0].password)
            setContact(props.users[0].phone)
            console.log(props.users[0].photo)
            if(props.users[0].photo)
            {
                setSrcp('http://localhost:8080/dp/' + props.users[0].photo)
            }
            else
            {
                setSrcp(avatar2)
            }
            setPhoto(props.users[0].photo)
            var addresses = props.users[0].addresses;
            setAddress(addresses)
            console.log("*****************Address:", address);
            // setRole(data.data[0].role)
            if (props.users[0].isAdmin) setPasswordEnable(true)
            else setPasswordEnable(false)
        })();
        console.log(passwordEnable);
    }, [props.users[0].email, id])

    console.log(srcp)

    const onNameChange = (event) => {
        var nameValue = (event.target.value)
        //const expression = new RegExp('[a-zA-Z]{4,}');
        // console.log(nameValue);
        const expression = new RegExp('^[a-zA-Z\\s]{4,20}$')
        if (!(expression.test(nameValue))) {
            setName(nameValue)
            setNameError(false)
        }
        else {
            setName(nameValue)
            setNameError(true)
        }
    }
    const onEmailChange = (event) => {
        var emailValue = (event.target.value);
        //const expression = new RegExp('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$');
        // console.log(nameValue);
        const expression  = new RegExp("^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$");
        if (!(expression.test(emailValue))) {
            setEmail(emailValue)
            setEmailError(false)
        }
        else {
            setEmail(emailValue)
            setEmailError(true)
        }
    }
    const onPasswordChange = (event) => {
        var contactValue = (event.target.value);
        //const expression = new RegExp('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$');
        const expression= new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{6,12}$");
        console.log(expression.test(contactValue));
        if (!(expression.test(contactValue))) {
            setPassword(contactValue)
            setPasswordError(false)
        }
        else {
            setPassword(contactValue)
            setPasswordError(true)
        }
    }

    const onCPasswordChange = (event) => {
        var contactValue = (event.target.value);
        //const expression = new RegExp('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$');
        const expression= new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{6,12}$");
        console.log(expression.test(contactValue));
        if (!(expression.test(contactValue))) {
            setCPassword(contactValue)
            setCPasswordError(false)
        }
        else {
            setCPassword(contactValue)
            setCPasswordError(true)
        }
    }

    const onContactChange = (event) => {
        var contactValue = (event.target.value);
        const expression = new RegExp('^[0-9]{10}$');
        // console.log(nameValue);
        if (!(expression.test(contactValue))) {
            setContact(contactValue)
            setContactError(false)
        }
        else {
            setContact(contactValue)
            setContactError(true)
        }
    }

    const Update = async (event) => {
        if (password.localeCompare(cpassword) === 0) {

            let roleData = { name, email, password, address, phone }
            console.log(roleData);
            props.onUpdate(id, roleData)
            setEnable(true)

        }
        else {
            setCPasswordError(false)
        }
        // FetchCalls.registerUser(roleData)
        // event.preventDefault()
    }

    const Edit = (event) => {
        console.log('Edit')
        setEnable(false)
        // FetchCalls.registerUser(roleData)
        // event.preventDefault()
    }
    if (props.users.length !== 0) {
        var addresslist = props.users[0].addresses.map((address, i) => {
            var newAdd = address.houseNumber + " ," + address.locality + " ," + address.city + " ," + address.state + " ," + address.country + " ," + address.pinCode;
            return <Form.Group as={Row} className="mb-3" >
                <Form.Label style={{
                    // border: '1px solid lightgrey',
                    padding: '10px 15px',
                    textTransform: 'capitalize',
                    fontSize: '15px'
                    // borderRadius: '5px',
                    // outline: 'none'

                }} column sm={3}>Address {props.users[0].addresses.length > 1 ? i + 1 : null}</Form.Label>

                <Col sm={9}>
                    <Form.Control readOnly plaintext style={{
                        border: '1px solid lightgrey',
                        padding: '10px 15px',
                        textTransform: 'capitalize',
                        borderRadius: '5px',
                        outline: 'none'
                    }} as="textarea" value={newAdd} placeholder="Enter Name" />
                </Col>
            </Form.Group>
        })
    }
    return (
        <Aux>

            <Row>
                <Col md={4} xl={4}>
                    <Card className='card-event'>
                        <Card.Body>
                            <Form.Group as={Row} className="mb-3" style={{ width: '100%' }} >

                                <div style={{ margin: 'auto' }} className="media friendlist-box align-items-center justify-content-center m-b-20">
                                    <div className="m-r-10 photo-table" style={{ width: "100%" }}>
                                        <img className="rounded-circle" style={{ width: '200px', height: "220px", margin: 'auto' }} src={srcp} alt="activity-user" />
                                    </div>
                                </div>

                            </Form.Group>

                        </Card.Body>
                    </Card>

                </Col>
                <Col md={8} xl={8}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">User Details
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                {enable &&
                                    <Form>
                                        <Form.Group as={Row} className="mb-3" >
                                            <Form.Label style={{
                                                // border: '1px solid lightgrey',
                                                padding: '10px 15px',
                                                textTransform: 'capitalize',
                                                fontSize: '15px'
                                                // borderRadius: '5px',
                                                // outline: 'none'

                                            }} column sm={3}>Name</Form.Label>
                                            <Col sm={9}>
                                                <Form.Control readOnly plaintext style={{
                                                    border: '1px solid lightgrey',
                                                    padding: '10px 15px',
                                                    textTransform: 'capitalize',
                                                    borderRadius: '5px',
                                                    outline: 'none'
                                                }} type="text" value={name} onChange={onNameChange} placeholder="Enter Name" />
                                            </Col>

                                        </Form.Group>

                                        <Form.Group as={Row} className="mb-3" >
                                            <Form.Label style={{
                                                // border: '1px solid lightgrey',
                                                padding: '10px 15px',
                                                textTransform: 'capitalize',
                                                fontSize: '15px'
                                                // borderRadius: '5px',
                                                // outline: 'none'

                                            }} column sm={3}>Email</Form.Label>
                                            <Col sm={9}>

                                                <Form.Control readOnly plaintext style={{
                                                    border: '1px solid lightgrey',
                                                    padding: '10px 15px',
                                                    borderRadius: '5px',
                                                    outline: 'none'
                                                }} type="email" value={email} onChange={onEmailChange} placeholder="Enter Email" />
                                            </Col>

                                        </Form.Group>

                                        <Form.Group as={Row} className="mb-3" >
                                            <Form.Label style={{
                                                // border: '1px solid lightgrey',
                                                padding: '10px 15px',
                                                textTransform: 'capitalize',
                                                fontSize: '15px'
                                                // borderRadius: '5px',
                                                // outline: 'none'

                                            }} column sm={3}>Contact No.</Form.Label>
                                            <Col sm={9}>
                                                <Form.Control readOnly plaintext style={{
                                                    border: '1px solid lightgrey',
                                                    padding: '10px 15px',
                                                    borderRadius: '5px',
                                                    outline: 'none'
                                                }} type="text" value={phone} onChange={onContactChange} placeholder="Enter Contact Number" />
                                            </Col>

                                        </Form.Group>
                                        {addresslist}
                                        <Form.Group as={Row} sm={12} style={{ marginTop: '50px', width: "100%", textAlign: 'center' }}>
                                            <div style={{ width: "100%" }}>
                                                <Button style={{ margin: '3px', width: '100px', display: 'inline-block', height: "40px", textAlign: 'center' }} variant="primary" block onClick={Edit} variant="primary" >EDIT</Button>
                                                <Button style={{ margin: '3px', width: '100px', display: 'inline-block', height: "40px", textAlign: 'center' }} variant="primary" disabled block onClick={Update} variant="success">UPDATE</Button>
                                            </div>
                                        </Form.Group>
                                    </Form>
                                }

                                {/* Enabled */}
                                {!enable && <Form>
                                    <Form.Group as={Row} className="mb-3" >
                                        <Form.Label style={{
                                            // border: '1px solid lightgrey',
                                            padding: '10px 15px',
                                            textTransform: 'capitalize',
                                            fontSize: '15px'
                                            // borderRadius: '5px',
                                            // outline: 'none'

                                        }} column sm={3}>Name</Form.Label>
                                        <Col sm={9}>
                                            <Form.Control type="text" value={name} onChange={onNameChange} placeholder="Enter Name" />
                                        </Col>
                                        <Col sm={3}></Col>
                                        <Col sm={9}>
                                            {!nameError && <Form.Text className="text-danger">
                                                Please Enter Valid Name (paddu)
                                            </Form.Text>}
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3" >
                                        <Form.Label style={{
                                            // border: '1px solid lightgrey',
                                            padding: '10px 15px',
                                            textTransform: 'capitalize',
                                            fontSize: '15px'
                                            // borderRadius: '5px',
                                            // outline: 'none'

                                        }} column sm={3}>Email</Form.Label>
                                        <Col sm={9}>

                                            <Form.Control type="email" value={email} onChange={onEmailChange} placeholder="Enter Email" />
                                        </Col>
                                        <Col sm={3}></Col>
                                        <Col sm={9}>
                                            {!emailError && <Form.Text className="text-danger">
                                                Please Enter Valid Email (paddu@gmail.com)
                                            </Form.Text>}
                                        </Col>
                                    </Form.Group>
                                    {passwordEnable &&
                                        <Form.Group as={Row} className="mb-3" >
                                            <Form.Label style={{
                                                // border: '1px solid lightgrey',
                                                padding: '10px 15px',
                                                textTransform: 'capitalize',
                                                fontSize: '15px'
                                                // borderRadius: '5px',
                                                // outline: 'none'

                                            }} column sm={3}>Password</Form.Label>
                                            <Col sm={9}>
                                                <Form.Control type="text" value={password} onChange={onPasswordChange} placeholder="New Password" />
                                            </Col>
                                            <Col sm={3}></Col>
                                            <Col sm={9}>
                                                {!passwordError && <Form.Text className="text-danger">
                                                    Please Enter Valid Password (Paddu@0y)
                                                </Form.Text>}
                                            </Col>
                                        </Form.Group>

                                    }
                                    {passwordEnable &&
                                        <Form.Group as={Row} className="mb-3" >
                                            <Form.Label style={{
                                                // border: '1px solid lightgrey',
                                                padding: '10px 15px',
                                                textTransform: 'capitalize',
                                                fontSize: '15px'
                                                // borderRadius: '5px',
                                                // outline: 'none'

                                            }} column sm={3}>Confirm Password</Form.Label>
                                            <Col sm={9}>
                                                <Form.Control type="text" value={cpassword} onChange={onCPasswordChange} placeholder="Confirm Password" />
                                            </Col>
                                            <Col sm={3}></Col>
                                            <Col sm={9}>
                                                {!cpasswordError && <Form.Text className="text-danger">
                                                    Please Enter Valid Password (paddu@0y)
                                                </Form.Text>}
                                            </Col>
                                        </Form.Group>

                                    }

                                    <Form.Group as={Row} className="mb-3" >
                                        <Form.Label style={{
                                            // border: '1px solid lightgrey',
                                            padding: '10px 15px',
                                            textTransform: 'capitalize',
                                            fontSize: '15px'
                                            // borderRadius: '5px',
                                            // outline: 'none'

                                        }} column sm={3}>Contact No.</Form.Label>
                                        <Col sm={9}>
                                            <Form.Control type="text" value={phone} onChange={onContactChange} placeholder="Enter Contact Number" />
                                        </Col>
                                        <Form.Text sm={3}></Form.Text>
                                        <Col sm={3}></Col>
                                        <Col sm={9}>
                                            {!contactError && <Form.Text className="text-danger" sm={9}>
                                                Please Enter Valid Contact number (9284556633)
                                            </Form.Text>}
                                        </Col>
                                    </Form.Group>
                                    {addresslist}
                                    <Form.Group as={Row} sm={12} style={{ marginTop: '50px', width: "100%", textAlign: 'center' }}>
                                        <div style={{ width: "100%" }}>
                                            <Button style={{ margin: '3px', width: '100px', display: 'inline-block', style: 'inline-block', height: "40px", textAlign: 'center' }} disabled variant="primary" block onClick={Edit} variant="primary" >EDIT</Button>
                                            <Button style={{ margin: '3px', width: '100px', display: 'inline-block', style: 'inline-block', height: "40px", textAlign: 'center' }} variant="primary" block onClick={Update} variant="success">UPDATE</Button>
                                        </div>
                                    </Form.Group>

                                </Form>
                                }
                            </Card.Text>

                        </Card.Body>
                    </Card>

                </Col>
            </Row>
        </Aux>
    );
}

const mapStateToProps = (state) => {
    return {
        users: state.userReducer.users,
        authenticated: state.authReducer.authenticated,
        currentuser: state.userReducer.currentUser,
        message: state.userReducer.message
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onUpdate: (id, roledata) => dispatch(useractions.updateusers(id, roledata)),
        onGetUsers: (id) => dispatch(useractions.fetchusers(id))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
