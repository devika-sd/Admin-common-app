import React from 'react';
import {Row, Col, Card} from 'react-bootstrap';

import Aux from "../../../hoc/_Aux/index";
import LineChart from "./LineChart";
import BarDiscreteChart from "./BarDiscreteChart";
import MultiBarChart from "./MultiBarChart";
import PieBasicChart from "./PieBasicChart";
import PieDonutChart from "./PieDonutChart";

class Nvd3Chart extends React.Component {

    render() {
        return (
            <Aux>
                <Row>
                    {/* <Col md={6}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Line Chart</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <LineChart/>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Discrete Bar Chart</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <BarDiscreteChart/>
                            </Card.Body>
                        </Card>
                    </Col> */}
                    <Col md={6}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Order Status</Card.Title>
                            </Card.Header>
                            <Card.Body className="text-center">
                                <PieBasicChart/>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Book categories</Card.Title>
                            </Card.Header>
                            <Card.Body className="text-center">
                                <PieDonutChart/>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={12}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Orders management Chart</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <MultiBarChart/>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default Nvd3Chart;