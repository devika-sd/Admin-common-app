import React, { useState, useEffect } from 'react';
import { Col, Row, Tabs, Tab, Card, Table } from 'react-bootstrap';

import DEMO from "../../store/constant";
import avatar2 from '../../assets/images/user/avatar-2.jpg';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Pagination from 'react-bootstrap/Pagination'
import * as orderactions from '../../Actions/order-action';
import Aux from "../../hoc/_Aux";

function Orders(props) {
    // this.state = { users: [], word: '', active: 1, maxpage: 1, limit: 5, pageno: [1, 2, 3], open: false }
    const [limit, setLimit] = useState(5)
    // const [maxpage, setMaxpage] = useState(1)
    const [pageno, setPageno] = useState([1, 2, 3])
    const [active, setActive] = useState(1)
    const [catogories,setCatogories] = useState('all');

    useEffect(() => {
        (async () => {
            await getOrders()

        })();
        // await props.onGetorders("page=" + active + "&limit=" + limit);

    }, [active,catogories])

    async function updatepagination(current) {
        console.log("current:****************************" + current);
        var max = 1;
        max = (props.totalorders / limit)
        console.log("*******************************Max******************" + max);
        console.log(props.totalorders);

        // setMaxpage(max)
        // console.log(maxpage);
        if (current === 'initial') {
            let temparrr = [1, 2, 3];
            // await this.setState({ pageno: temparrr, active: 1 });
            await setPageno(temparrr)
            await setActive(1)
        }
        if (current === 'final') {
            let temp = max > Math.floor(props.totalorders / limit) ? Math.floor(max) + 1 : Math.floor(max);
            // let temp = max

            let temparrr = [temp - 2, temp - 1, temp];
            // await this.setState({ pageno: temparrr, active: temp });
            await setPageno(temparrr)
            await setActive(temp)
        }
        if (pageno[2] < max) {
            if (current === "next") {
                var temparr = [...pageno];
                for (let i = 0; i < temparr.length; i++) {
                    temparr[i] = temparr[i] + 1;
                }
                let tempactive = temparr[0];
                // await this.setState({ pageno: temparr, active: tempactive });
                await setPageno(temparr)
                await setActive(tempactive)
            }
        }
        if (current === "prev") {
            if (pageno[0] !== 1) {
                var temparr = [...pageno];
                for (let i = 0; i < temparr.length; i++) {
                    temparr[i] = temparr[i] - 1;
                }
                let tempactive = temparr[0];
                // await this.setState({ pageno: temparr, active: tempactive });
                await setPageno(temparr)
                await setActive(tempactive)
            }
        }
    }

    async function changePage(pageNo) {
        await setActive(pageNo)
        console.log("****************************" + pageNo);
    }
    async function getOrders() {
        if(catogories === 'all')
        {
            await props.onGetorders("page=" + active + "&limit=" + limit);
        }
        else
        {
            await props.onGetorders("page=" + active + "&limit=" + limit+'&status='+catogories); 
        }
    }

    const handleSelect = async (e) => {
        console.log("&&&&&&&&&&&&&&&&&&&&" + e);
        if (e === 'all') {
            await setActive(1);
            await setCatogories('all');
            // await props.onGetorders("page=" + active + "&limit=" + limit);
        }
        else {
            await setActive(1);
            await setCatogories(e);
            // await props.onGetorders("status=" + e+"&page=" + active + "&limit=" + limit);
        }
    }

    let items = pageno.map((no, i) => {
        return (
            <Pagination.Item key={i} onClick={() => changePage(no)} active={no === active}>
                {no}
            </Pagination.Item>
        )
    })

    let tabContent = props.orders.map((data, i) => {
        console.log(data.paymentStatus);
        return (
            <Aux key={i}>
                {/* <td><Link to={'/operations/' + data.id}>{data.id}</Link></td> */}
                {/* <Ordermodel name={data._id} order={data}></Ordermodel> */}

                <div className="media friendlist-box align-items-center justify-content-center m-b-25">
                    <div className="photo-table">
                        <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{ width: '40px' }} src={avatar2} alt="activity-user" /></a>
                    </div>
                    <div className="media-body">
                        <Col><h6 className="m-0 d-inline">{data.email}</h6></Col>
                        <Col><span className="m-0 d-inline">{data.status}</span>
                        <Link to={{
                                    pathname: `/orderModel`,
                                    order: { user: data },
                                }}>
                            <span className="float-right d-flex  align-items-center">{data._id.slice(data._id.length - 6, data._id.length)}&nbsp;<i className="fa fa-info-circle f-22 m-r-10 text-c-green" /></span>
                        </Link>
                        </Col>
                    </div>
                </div>
            </Aux>
        )
    })


    return (
        <Aux>
            <div>
                <Col sm={6} md={12} xl={12} className='m-b-30'>
                    <Card style={{ padding: "10px" }}>
                        <Tabs defaultActiveKey="today" id="uncontrolled-tab-example" onSelect={handleSelect} activeKey={catogories}>
                            <Tab>
                                {tabContent}
                            </Tab>
                            <Tab eventKey="all" title="All">
                                {tabContent}
                            </Tab>
                            <Tab eventKey="new" title="New">
                                {tabContent}
                            </Tab>
                            <Tab eventKey="packed" title="packed">
                                {tabContent}
                            </Tab>
                            <Tab eventKey="shipped" title="shipped">
                                {tabContent}
                            </Tab>
                            <Tab eventKey="completed" title="completed">
                                {tabContent}
                            </Tab>
                            <Tab eventKey="delayed" title="delayed">
                                {tabContent}
                            </Tab>
                            <Tab eventKey="cancelled" title="cancelled">
                                {tabContent}
                            </Tab>
                        </Tabs>
                    </Card>

                </Col>
                <div>
                    <Pagination style={{ display: 'flex', width: '220px', margin: 'auto' }}>
                        <Pagination.First onClick={() => updatepagination('initial')} />
                        <Pagination.Prev onClick={() => updatepagination('prev')} />
                        {items}
                        <Pagination.Next onClick={() => updatepagination('next')} />
                        <Pagination.Last onClick={() => updatepagination('final')} />
                    </Pagination>
                </div>
            </div>
        </Aux>
    );
}

const mapStateToProps = (state) => {
    return {
        orders: state.orderReducer.orders,
        totalorders: state.orderReducer.totalorders

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetorders: (filter) => dispatch(orderactions.fetchorders(filter)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);