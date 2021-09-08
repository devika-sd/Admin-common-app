import React from 'react';
import {Row, Col, Card} from 'react-bootstrap';
import Aux from "../../hoc/_Aux";
import Index from "../Charts/Nvd3Chart/index";

import authHeader from '../../services/auth-header';

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {totalCount:0,todaysOrder:0,cancelledOreder:0,totalBooks:0};
    }

    componentDidMount() {
        fetch('https://firstapp-bookstore.herokuapp.com/api/v1/orders/count', {
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
        fetch('https://firstapp-bookstore.herokuapp.com/api/v1/book', {
            headers: authHeader()
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({totalBooks:data.total});
                console.log(this.state.totalBooks);
            })
    }
    render() {
    
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
                                <h6 className='mb-4'>Total Books</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-up text-c-green f-30 m-r-5"/>{this.state.totalBooks}</h3>
                                    </div>
                                </div>
                                <div className="progress m-t-30" style={{height: '7px'}}>
                                    <div className="progress-bar progress-c-theme2" role="progressbar" style={{width: '25%'}} aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"/>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={12}>
                        <Index/>
                    </Col>
                    
                </Row>
            </Aux>
        );
    }
}

export default Dashboard;