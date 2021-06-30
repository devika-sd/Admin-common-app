import React from 'react';
import {Row, Col, Card, Table, Tabs, Tab} from 'react-bootstrap';
import Aux from "../../hoc/_Aux";
import Index from "../Charts/Nvd3Chart/index";
import Admintable from './Admintable';

// import * as actionTypes from "../../store/actions";
// import * as orderactions from '../../Actions/order-action';
// import { connect } from 'react-redux';
import authHeader from '../../services/auth-header';
import Bookratingdata from '../Charts/Nvd3Chart/Bookratingdata';

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {totalCount:0,todaysOrder:0,cancelledOreder:0};
    }

    componentDidMount() {
        fetch('http://localhost:8080/api/v1/orders/count', {
            headers: authHeader()
        })
            .then(res => res.json())
            .then(data => {
                // console.log("count data",data)
                this.setState({totalCount:data.totalorder});
                console.log(this.state.totalCount);
                this.setState({todaysOrder:data.todaysorder});
                this.setState({cancelledOreder:data.cancelledcount});
                // dispatch({ type: COUNT_ORDER, payload: data });
            })
    }
    render() {
    //    const tabContent = (
    //         <Aux>
    //                 <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                    
    //                     <div className="media-body">
    //                         <i className="icon feather icon-hash text-c-purple"/>
    //                         <h6 className="m-0 d-inline text-c-purple">&nbsp;&nbsp;&nbsp;<b>Profile Photo</b></h6>
    //                     </div>
    //                     <div className="media-body">
    //                     <i className="icon feather icon-mail  text-c-purple"/>
    //                         <h6 className="m-0 d-inline text-c-purple">&nbsp;&nbsp;&nbsp;<b>Admin Name</b></h6>
    //                     </div>
                        
    //                     <div className="media-body">
    //                     <i className="icon feather icon-calendar text-c-purple"/>
    //                         <h6 className="m-0 d-inline text-c-purple">&nbsp;&nbsp;&nbsp;<b>Date Time</b></h6>
    //                     </div>
    //                     <div className="media-body">
    //                     <i className="icon feather icon-pie-chart text-c-purple"/>
    //                         <h6 className="m-0 d-inline text-c-purple">&nbsp;&nbsp;&nbsp;<b>Status</b></h6>
    //                     </div>
    //              </div>
    //        </Aux>
    //    );

        return (
            <Aux>
                <Row>
                    <Col md={6} xl={3}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Total Orders</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-up text-c-green f-30 m-r-5"/>{this.state.totalCount}</h3>
                                    </div>
                                </div>
                                <div className="progress m-t-30" style={{height: '7px'}}>
                                    <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '25%'}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"/>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} xl={3}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Todays Orders</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-up text-c-green f-30 m-r-5"/>{this.state.todaysOrder}</h3>
                                    </div>
                                </div>
                                <div className="progress m-t-30" style={{height: '7px'}}>
                                    <div className="progress-bar progress-c-theme2" role="progressbar" style={{width: '25%'}} aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"/>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} xl={3}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Cancelled Order</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-down text-c-red f-30 m-r-5"/>{this.state.cancelledOreder}</h3>
                                    </div>
                                </div>
                                <div className="progress m-t-30" style={{height: '7px'}}>
                                    <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '25%'}} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"/>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} xl={3}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Today's Income</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-up text-c-green f-30 m-r-5"/> $249.95</h3>
                                    </div>

                                    <div className="col-3 text-right">
                                        <p className="m-b-0">50%</p>
                                    </div>
                                </div>
                                <div className="progress m-t-30" style={{height: '7px'}}>
                                    <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '25%'}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"/>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={12}>
                        <Card>
                            <Card.Body>
                                <Index/>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={12} xl={12} md={8}>
                        <Card>
                            <Card.Header>
                                <Card.Title as='h5'>Books Rating</Card.Title>
                            </Card.Header> 
                            <Card.Body>
                              <Bookratingdata />
                            </Card.Body>
                        </Card>
                    </Col>
                    {/* <Col sm={12}>
                        <Card>
                            <Card.Header>
                                <Card.Title as='h5'>Admin Table</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Admintable/>
                            </Card.Body>
                        </Card>
                    </Col> */}
                </Row>
            </Aux>
        );
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         onGetCount: () => dispatch(orderactions.getorders())
//     }
// }

// export default connect(null,mapDispatchToProps)(Dashboard);
export default Dashboard;