import React, { Component } from 'react';
import {Dropdown} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { withRouter } from "react-router";

import ChatList from './ChatList';
import Aux from "../../../../../hoc/_Aux";
import DEMO from "../../../../../store/constant";
import currentUser from '../../../../../services/tokendecoder';

import Avatar1 from '../../../../../assets/images/user/avatar-1.jpg';
import Avatar2 from '../../../../../assets/images/user/avatar-2.jpg';
import Avatar3 from '../../../../../assets/images/user/avatar-3.jpg';

import * as useraction from '../../../../../Actions/user-action';
import * as authaction from '../../../../../Actions/auth-actions';
import * as orderaction from '../../../../../Actions/order-action';
import { connect } from 'react-redux';

class NavRight extends Component {
    state = {
        listOpen: false,
        reset:false
    };

    resetall()
    {
        console.log(this.props.history);
        this.props.history.push('/');
        localStorage.clear();
        this.props.authReset();
        this.props.userReset();
        this.props.orderReset();
    }

    render() {

        return (
            <Aux>
                <ul className="navbar-nav ml-auto">
                    <li>
                        <Dropdown alignRight={!this.props.rtlLayout} className="drp-user">
                            <Dropdown.Toggle variant={'link'} id="dropdown-basic">
                                <i className="icon feather icon-user"/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu alignRight className="profile-notification">
                                <div className="pro-head">
                                    <img src={Avatar1} className="img-radius" alt="User Profile"/>
                                    <span>John Doe</span>
                                </div>
                                <ul className="pro-body">
                                    <Link to={'/profile/'+currentUser.currentUser()}><li><a href={DEMO.BLANK_LINK} className="dropdown-item"><i className="feather icon-user"/> Profile</a></li></Link>
                                    <li><a className="dropdown-item"  onClick={()=>{this.resetall()}}><i className="feather icon-log-out"/> Logout</a></li>
                                </ul>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                </ul>
                <ChatList listOpen={this.state.listOpen} closed={() => {this.setState({listOpen: false});}} />
            </Aux>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        authReset: () => dispatch({type:authaction.RESET_AUTH}),
        userReset: () => dispatch({type:orderaction.RESET_ORDERS}),
        orderReset: ()=>dispatch({type:useraction.RESET_USER}),
    }
}

export default withRouter(connect(null, mapDispatchToProps)(NavRight));
