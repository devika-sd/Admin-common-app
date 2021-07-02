import React from 'react';
import NVD3Chart from 'react-nvd3';
import { connect } from 'react-redux';
import * as orderactions from '../../../Actions/order-action'


class PieBasicChart extends React.Component {
    constructor() {
        super()
        this.state = {
            // datum: [
            //     { key: "One", y: 29, color: "#ff8a65" },
            //     { key: "Two", y: 0, color: "#f4c22b" },
            //     { key: "Three", y: 32, color: "#04a9f5" }

            // ],
            paddu: []
        }
    }
    componentDidMount() {
        // await fetch("http://localhost:8080/api/v1/orders/count", {

        // })
        //     .then(res => res.json())
        //     .then(async data => {
        //         console.log(data)
        //         let value = { key: "Nine", y: 52, color: "#FE8A7D" }
        //         this.setState({ paddu: value })
        //     })
        this.props.onStatusCOunt()
        console.log("*****PIe***")
        console.log(this.props.orderStatusCount);
        this.setState({ paddu: this.props.orderStatusCount })
        console.log("*****PIe***")
        console.log(this.state.paddu);

    }

    render() {
        console.log(this.props.orderStatusCount[0].New);
        const datum = [
            { key: "New", y: this.props.orderStatusCount[0].New, color: "#ff8a65" },
            { key: "Packed", y: this.props.orderStatusCount[1].Packed, color: "#f4c22b" },
            { key: "Shipped", y: this.props.orderStatusCount[2].Shipped, color: "#04a9f5" },
            { key: "Completed", y: this.props.orderStatusCount[3].Completed, color: "#C70039" },
            { key: "Cancelled", y: this.props.orderStatusCount[4].Cancelled, color: "#4F5467" },
            { key: "Delayed", y: this.props.orderStatusCount[5].Delayed, color: "#1de9b6" }

        ]

        console.log("*****PIe***")
        console.log(this.props.orderStatusCount);

        return <NVD3Chart id="chart" height={300} type="pieChart" datum={datum} x="key" y="y" labelType='percent' />
    }
}

const mapStateToProps = (state) => {

    return {
        orderStatusCount: state.orderReducer.orderStatusCount
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onStatusCOunt: () => dispatch(orderactions.fetchOrderStatusCount()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PieBasicChart);
