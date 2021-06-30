import React, {Component} from 'react';
import {Row, Col,Tabs, Tab} from 'react-bootstrap';

//import DEMO from "../../store/constant";

import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../assets/images/user/avatar-3.jpg';

import Aux from "../../hoc/_Aux";

class Admintable extends Component {
    render() {
      
        const tabContent = (
            <Aux>
                <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                    
                     <div className="media-body">
                     <i className="icon feather icon-users text-c-purple"/>
                        <h5 className="m-0 d-inline text-c-purple">&nbsp;&nbsp;&nbsp;<b>Profile Photo</b></h5>
                   
                    </div>
                    <div className="media-body">
                    <i className="icon feather icon-user  text-c-purple"/>
                        <h5 className="m-0 d-inline text-c-purple">&nbsp;&nbsp;&nbsp;<b>Admin Name</b></h5>
                   
                    </div>
                   
                    <div className="media-body">
                    <i className="icon feather icon-calendar text-c-purple"/>
                        <h5 className="m-0 d-inline text-c-purple">&nbsp;&nbsp;&nbsp;<b>Date Time</b></h5>
                   
                    </div>
                    <div className="media-body">
                    <i className="icon feather icon-pie-chart text-c-purple"/>
                        <h5 className="m-0 d-inline text-c-purple">&nbsp;&nbsp;&nbsp;<b>Status</b></h5>
                   
                    </div>
                    
                    
                </div>
                <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                   <div className="media-body"> 
                        <img className="rounded-circle" style={{width: '40px'}} src={avatar1} alt="activity-user"/>
                    </div>

                   <div className="media-body">
                        <h6 className="m-0 d-inline">Aman</h6>
                   
                    </div>
                    
                    <div className="media-body">
                        <h6 className="m-0 d-inline">27/09/21 4.15</h6>
                   
                    </div>
                    <div className="media-body">
                        <h6 className="m-0 d-inline">Online</h6>
                   
                    </div>
                </div>
                <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                   
                    <div className="media-body"> 
                        <img className="rounded-circle" style={{width: '40px'}} src={avatar2} alt="activity-user"/>
                    </div>
                   <div className="media-body">
                        <h6 className="m-0 d-inline">Devika</h6>
                   
                    </div>
                    
                    <div className="media-body">
                        <h6 className="m-0 d-inline">15/05/21 2.15</h6>
                   
                    </div>
                    <div className="media-body">
                        <h6 className="m-0 d-inline">Offline</h6>
                   
                    </div>
                </div>
                <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                    
                    <div className="media-body"> 
                        <img className="rounded-circle" style={{width: '40px'}} src={avatar3} alt="activity-user"/>
                    </div>
                   
                   <div className="media-body">
                        <h6 className="m-0 d-inline">dhivya</h6>
                   
                    </div>
                    
                    <div className="media-body">
                        <h6 className="m-0 d-inline">30/05/21 6.45</h6>
                   
                    </div>
                    <div className="media-body">
                        <h6 className="m-0 d-inline">Online</h6>
                   
                    </div>
                </div>
                <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                    
                    <div className="media-body"> 
                        <img className="rounded-circle" style={{width: '40px'}} src={avatar1} alt="activity-user"/>
                    </div>
                   <div className="media-body">
                        <h6 className="m-0 d-inline">abi</h6>
                   
                    </div>
                    
                    <div className="media-body">
                        <h6 className="m-0 d-inline">23/01/21 7.48</h6>
                   
                    </div>
                    <div className="media-body">
                        <h6 className="m-0 d-inline">Online</h6>
                   
                    </div>
                </div>
                <div className="media friendlist-box align-items-center justify-content-center">
                    
                    <div className="media-body"> 
                        <img className="rounded-circle" style={{width: '40px'}} src={avatar2} alt="activity-user"/>
                    </div>
                   <div className="media-body">
                        <h6 className="m-0 d-inline">dhiva</h6>
                   
                    </div>
                    
                    <div className="media-body">
                        <h6 className="m-0 d-inline">01/06/21 2.15</h6>
                   
                    </div>
                    <div className="media-body">
                        <h6 className="m-0 d-inline">Offline</h6>
                   
                    </div>
                </div>
            </Aux>
        );

        return (
            <Aux>
                    <Row>
                    <Col md={12} xl={12} className='m-b-30'>
                            <Tabs defaultActiveKey="All" id="uncontrolled-tab-example">
                                <Tab eventKey="All">
                                    {tabContent}
                                </Tab>
                            </Tabs>
                        </Col>
                </Row>
 
            </Aux>
        );
    }
}

export default Admintable;