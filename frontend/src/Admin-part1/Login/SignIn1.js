import React from 'react';
import { connect } from 'react-redux';
import '../../assets/scss/style.scss';
import Aux from "../../hoc/_Aux";
import Breadcrumb from "../../App/layout/AdminLayout/Breadcrumb";
import Alert from 'react-bootstrap/Alert'

import * as useractions from '../../Actions/user-action';
import * as authactions from '../../Actions/auth-actions';

class SignUp1 extends React.Component {
    constructor() {
        super();
        this.state = { email: '', password: '', emailError: '', passwordError: '', emailvalid: 0, passwordvalid: 0,timeout:true };
    }

    emailCheck(event) {
        let value = event.target.value;
        console.log(value);
        var mail = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$",);
        if (!mail.test(value)) {
            this.setState({ emailError: "please enter valid mail", emailvalid: 0 })
        }
        else {
            this.setState({ emailError: '', emailvalid: 1 })
        }
        this.setState({ email: value })
    }
    passwordCheck(event) {
        let value = event.target.value;
        var password = new RegExp("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$",);
        if (!password.test(value)) {
            this.setState({ passwordError: "please enter a valid password", passwordvalid: 0 })
        
        }
        else {
            this.setState({ passwordError: '', passwordvalid: 1 })
        }
        this.setState({ password: value })
    }
    async login() {
        await this.props.onAuthLogin({ email: this.state.email, password: this.state.password });
        await this.props.onUserLogin({ email: this.state.email, password: this.state.password });
        console.log(this.props.authenticated);
        if (this.props.authenticated) {
            this.props.history.push('/dashboard');
        }
        else {
            this.setState({timeout:true})
            setTimeout(()=>{
                this.setState({timeout:false})
            },2000)
        }
        
    }

    render() {
        var check = true;
        if ((this.state.emailvalid === 1) && (this.state.passwordvalid === 1)) {
            check = false;
        }
        return (
            <Aux>
                <Breadcrumb />
                <div className="auth-wrapper">
                    <div className="auth-content">
                        <div className="auth-bg">
                            <span className="r" />
                            <span className="r s" />
                            <span className="r s" />
                            <span className="r" />
                        </div>
                        <div className="card">
                            <div className="card-body text-center">
                                <div className="mb-4">
                                    <i className="feather icon-unlock auth-icon" />
                                </div>
                                <h3 className="mb-5">Login</h3>
                                {this.props.message && this.state.timeout && <Alert variant='dark' style={{borderRadius: '5px'}}>
                                    {this.props.message}
                                </Alert>}
                                <div className="input-group mb-1">
                                    <input type="email" className="form-control" onChange={this.emailCheck.bind(this)} placeholder="Email" />
                                </div>
                                <div className="input-group mb-1">
                                    <p style={{ fontSize: "12px" }} className="help-block text-danger">{this.state.emailError}</p>
                                </div>
                                <div className="input-group mb-1">
                                    <input type="password" className="form-control" onChange={this.passwordCheck.bind(this)} placeholder="password" />

                                </div>
                                <div className="input-group mb-3">
                                    <p style={{ fontSize: "12px" }} className="help-block text-danger" >{this.state.passwordError}</p>
                                </div>
                                {/* <div className="form-group text-left">
                                    <div className="checkbox checkbox-fill d-inline">
                                        <input type="checkbox" name="checkbox-fill-1" id="checkbox-fill-a1" />
                                            <label htmlFor="checkbox-fill-a1" className="cr"> Save credentials</label>
                                    </div>
                                </div> */}
                                <button className="btn btn-primary shadow-2 mb-4" onClick={this.login.bind(this)} disabled={check}>Login</button>
                                {/* <p className="mb-2 text-muted">Forgot password? <NavLink to="/auth/reset-password-1">Reset</NavLink></p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        userReducer: state.userReducer.currentUser,
        authenticated: state.authReducer.authenticated,
        message: state.userReducer.message
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onUserLogin: (user) => dispatch(useractions.loginusers(user)),
        onAuthLogin: (user) => dispatch(authactions.userLogin(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp1);
