import React, { Component } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';

import { connect } from 'react-redux';
import * as actions from '../../Actions/user-action';
import Aux from "../../hoc/_Aux";

class AddUser extends Component {
    constructor() {
        super();
        this.state = {
            name: '', email: '', password: '', phonenumber: '', housenumber:'', locality:'', city:'', country:'',  pincode:'', nameError: '', emailError: '', passwordError: '',
            phonenumberError: '', namevalid: 0, emailvalid: 0, passwordvalid: 0, phonenumbervalid: 0,
            role: '', roleError: '', rolevalid: 0, housenumbervalid : 0, localityvalid : 0, cityvalid :0, countryvalid : 0, pincodevalid : 0,
            housenoError:'', localityError:'', cityError:'', countryError:'',  pincodeError:'',stateError:'',
            state1 :["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
            "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
            "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
            "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
            "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"], select:'', selectvalid : 0
        };
    }

    name(event) {
        let value = event.target.value
        //const name = new RegExp('[a-zA-Z\s]{5,20}')
        const name = new RegExp('^[a-zA-Z\\s]{4,20}$')
        if (!name.test(value)) {
            this.setState({ nameError: "please enter a valid firstname", namevalid: 0 })
        }
        else {
            this.setState({ nameError: '', namevalid: 1 })
        }
        this.setState({ name: value })
    }

    // lastname(event) {
    //     let value = event.target.value
    //     const lastname = new RegExp('[a-zA-Z\s]{5,15}')
    //     if (!lastname.test(value)) {
    //         this.setState({ lastnameError: "please enter a valid lastname", lastnamevalid: 0 })
    //     }
    //     else {
    //         this.setState({ lastnameError: '', lastnamevalid: 1 })
    //     }
    //     this.setState({ lastname: value })
    // }

    // username(event) {
    //     let value = event.target.value
    //     const username = new RegExp('[a-zA-Z\s]{5,30}')
    //     if (!username.test(value)) {
    //         this.setState({ usernameError: "please enter a valid username", usernamevalid: 0 })
    //     }
    //     else {
    //         this.setState({ usernameError: '', usernamevalid: 1 })
    //     }
    //     this.setState({ username: value })
    // }


    emailCheck(event) {
        let value = event.target.value;
        //var mail = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$",);
        var mail = new RegExp("^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$");
        if (!mail.test(value)) {
            this.setState({ emailError: "please enter a valid mail", emailvalid: 0 })
        }
        else {
            this.setState({ emailError: '', emailvalid: 1 })
        }
        this.setState({ email: value })
    }

    passwordCheck(event) {
        let value = event.target.value;
        //var password = new RegExp("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$",);
        var password = new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{6,12}$");
        if (!password.test(value)) {
            this.setState({ passwordError: "please enter a valid password", passwordvalid: 0 })
        }
        else {
            this.setState({ passwordError: '', passwordvalid: 1 })
        }
        this.setState({ password: value })
    }

    phonenumberCheck(event) {
        let value = event.target.value;
        const phonenumber = new RegExp("^[0-9]{10}$");
        if (!phonenumber.test(value)) {
            this.setState({ phonenumberError: "please enter a valid contact number", phonenumbervalid: 0 })
        }
        else {
            this.setState({ phonenumberError: '', phonenumbervalid: 1 })
        }
        this.setState({ phonenumber: value })

    }


    roleCheck(event) {
        let value = event.target.value;
        if (value ==="") {
            console.log("*",value);
            this.setState({ roleError: ' Please Select Role', rolevalid: 0 })
        }
        else {
            this.setState({ roleError:'', rolevalid: 1 })
            console.log(".........",value);
        }
        this.setState({ role: value })
    }
    

    housenumberCheck(event){
        let value = event.target.value
        const housenumber = new RegExp("^[0-9]");
        if(housenumber.test(value)){
            this.setState({ housenumber: value, housenumbervalid: 1,housenoError:"" })
        }
        else {
            this.setState({ housenoError: 'Please provide valid number', housenumbervalid: 0 })
        }
    }

    localityCheck(event){
        let value = event.target.value
        //const locality = new RegExp('[a-zA-Z\s]')
        const locality = new RegExp('^[a-zA-Z\\s]{4,}$')
        if(locality.test(value)){
            this.setState({ locality: value, localityvalid: 1,localityError:'' })
        }
        else {
            this.setState({ localityError: 'please provide valid locality', localityvalid: 0 })
        }
    }
    
    citycheck(event){
        let value = event.target.value
        //const city = new RegExp('[a-zA-Z\s]')
        const city = new RegExp('^[a-zA-Z\\s]{3,}$')
        if(city.test(value)){
            this.setState({ city: value, cityvalid: 1,cityError:'' })
        }
        else {
            this.setState({ cityError: 'please provide valid city', cityvalid: 0 })
        }
    }

    countryCheck(event) {
        let value = event.target.value
        if (value ==="") {
            this.setState({ country: value,countryError: 'Please provide valid country', countryvalid: 0 })
        }

        else {
            this.setState({ country: value, countryvalid: 1,countryError:'' })
        }
    }
    
    stateCheck(event){
        let value = event.target.value
        if (value ==="") {
            this.setState({stateError: 'Please provide valid state', selectvalid :0 });
        }

        else {
            this.setState({selectvalid: 1,stateError:'' })
        }
        this.setState({select:value})
    }

    pincodeCheck(event){
        let value = event.target.value
        const pincode = new RegExp("^[0-9]{6}$");
        if (pincode.test(value)) {
            this.setState({ pincode: value, pincodevalid :1,pincodeError:'' })
        }
        else {
            this.setState({ pincodeError: 'Please provide valid pincode',pincode: value, pincodevalid: 1 })
        }
    }

    async validateUser() {
       
        let user = { name: this.state.name, email: this.state.email, password: this.state.password, phone: this.state.phonenumber,isAdmin: this.state.role,addresses:[{houseNumber:this.state.housenumber,city:this.state.city,locality:this.state.locality,country:this.state.country,state:this.state.select,pinCode:this.state.pincode}] };
        console.log(user)
        await this.props.onAddUser(user);
        this.myFormRef.reset();
        
    }


    render() {
        var check = true;
        if ((this.state.emailvalid === 1) && (this.state.passwordvalid === 1) && (this.state.namevalid === 1) && (this.state.phonenumbervalid === 1) && (this.state.rolevalid === 1) && (this.state.housenoError === '') && (this.state.localityError === '') && (this.state.cityError === '') && (this.state.countryError === '') && (this.state.stateError === '') && (this.state.pincodeError === '')) {
            check = false;
        }

        
        return (
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Add User</Card.Title>
                            </Card.Header>
                            <Card.Body>
                            <Form ref={(el) => this.myFormRef = el}>
                                <Row>
                                    <Col md={6}>
                                        
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control onChange={this.name.bind(this)} type="text" placeholder="Enter Name" />
                                                <p className="help-block text-danger">{this.state.nameError}</p>
                                            </Form.Group>

                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Email address</Form.Label>
                                                <Form.Control onChange={this.emailCheck.bind(this)} type="email" placeholder="Enter email" />
                                                <p className="help-block text-danger">{this.state.emailError}</p>
                                            </Form.Group>

                                            <Form.Group controlId="formBasicPassword">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control onChange={this.passwordCheck.bind(this)} type="text" placeholder="Password" />
                                                <p className="help-block text-danger">{this.state.passwordError}</p>
                                            </Form.Group>
                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                <Form.Label>Role</Form.Label>
                                                <Form.Control onChange={this.roleCheck.bind(this)} as="select">
                                                                                                           
                                                        <option value="">Select Role</option>
                                                        <option value={true}>Admin</option>
                                                        <option value={false}>User</option>                                                     
                                                </Form.Control>
                                                <p className="help-block text-danger">{this.state.roleError}</p>                                       </Form.Group>


                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="exampleForm.ControlInput1">
                                            <Form.Label>Contact Number</Form.Label>
                                            <Form.Control type="number" onChange={this.phonenumberCheck.bind(this)} placeholder="Enter contact number" />
                                            <p className="help-block text-danger">{this.state.phonenumberError}</p>
                                        </Form.Group>


                                        <Form.Label>Address</Form.Label>

                                        <Form.Row>

                                            <Form.Group as={Col} controlId="formGridHouseNumber">
                                                <Form.Control type="number" onChange={this.housenumberCheck.bind(this)} className="form-control" id="exampleInputUsername1" placeholder="HouseNumber" />
                                                {this.state.housenoError ? <p className="help-block text-danger">{this.state.housenoError}</p> : null}

                                            </Form.Group>

                                            <Form.Group as={Col} controlId="formGridLocality">
                                                <Form.Control type="text" onChange={this.localityCheck.bind(this)} className="form-control" placeholder="Locality" />
                                                {this.state.localityError ? <p className="help-block text-danger">{this.state.localityError}</p> : null}
                                            </Form.Group>

                                        </Form.Row>

                                        {(this.state.housenoError ==='' && this.state.localityError === '') ? <Form.Label style={{marginTop:"15px"}} ></Form.Label> : null}

                                        <Form.Row>

                                            <Form.Group as={Col} controlId="formGridCity">
                                                <Form.Control type="text" onChange={this.citycheck.bind(this)} className="form-control" id="exampleInputUsername1" placeholder="City" />
                                                {this.state.cityError ? <p className="help-block text-danger">{this.state.cityError}</p> : null } 
                                            </Form.Group>

                                            <Form.Group as={Col} controlId="exampleForm.ControlSelect1">
                                                <Form.Control onChange={this.stateCheck.bind(this)} as="select">
                                                    <option value="">Select State</option>
                                                    {this.state.state1.map(data =>(
                                                        <option title={data}>{data}</option>
                                                    ))}
                                                </Form.Control>
                                                {this.state.stateError ? <p className="help-block text-danger">{this.state.stateError}</p> : null }

                                            </Form.Group>

                                        </Form.Row>
                                        {(this.state.cityError ==='' && this.state.stateError === '') ? <Form.Label style={{marginTop:"15px"}} ></Form.Label> : null }
                                        <Form.Row>
                                            <Form.Group as={Col} onChange={this.countryCheck.bind(this)} controlId="exampleForm.ControlSelect1">
                                                <Form.Control as="select">
                                                    <option value="">Select Country</option>
                                                    <option value="India">India</option>
                                                </Form.Control>
                                                <p className="help-block text-danger">{this.state.countryError}</p>

                                            </Form.Group>

                                            <Form.Group as={Col} controlId="formGridZip">
                                                <Form.Control type="number" onChange= {this.pincodeCheck.bind(this)} className="form-control" id="exampleInputUsername1" placeholder="PinCode" />
                                                <p className="help-block text-danger">{this.state.pincodeError}</p>

                                            </Form.Group>
                                            
                                        </Form.Row>
                                        
                                    </Col>
                                    <Col>
                                    <Button disabled={check} style={{width:"90px"}} onClick={this.validateUser.bind(this)} variant="primary">
                                                Add
                                    </Button>
                                    
                                    </Col>
                                    
                                </Row>
                                </Form>
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
        message: state.userReducer.message
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddUser: (user) => dispatch(actions.addusers(user))
    }
}

// export default AddWorkout;
export default connect(mapStateToProps, mapDispatchToProps)(AddUser);