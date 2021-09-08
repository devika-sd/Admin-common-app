import React from 'react';
import NVD3Chart from 'react-nvd3';
import * as bookaction from '../../../Actions/book-action';
import { connect } from 'react-redux';


const datum = [
    {key: "One", y: 29, color: "#ff8a65"},
    {key: "Two", y: 0, color: "#f4c22b"},
    {key: "Three", y: 32, color: "#04a9f5"},
    {key: "Four", y: 196, color: "#3ebfea"},
    {key: "Five", y: 2, color: "#4F5467"},
    {key: "Six", y: 98, color: "#1de9b6"},
    {key: "Seven", y: 13, color: "#a389d4"},
    {key: "Eight", y: 5, color: "#FE8A7D"}
];

class PieDonutChart extends React.Component {
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
        // await fetch("https://firstapp-bookstore.herokuapp.com//api/v1/orders/count", {

        // })
        //     .then(res => res.json())
        //     .then(async data => {
        //         console.log(data)
        //         let value = { key: "Nine", y: 52, color: "#FE8A7D" }
        //         this.setState({ paddu: value })
        //     })
        this.props.onBookCount()
        console.log("*****PIe***")
        console.log(this.props.BookCountPie);
        this.setState({ paddu: this.props.BookCountPie })
        console.log("*****PIe***")
        console.log(this.state.paddu);

    }

    render() {
        console.log(this.props.BookCountPie[0].New);

        const datum = [
            { key: "horror", y: this.props.BookCountPie[0].horror, color: "#ff8a65" },
            { key: "comedy", y: this.props.BookCountPie[1].comedy, color: "#f4c22b" },
            { key: "adventure", y: this.props.BookCountPie[2].adventure, color: "#04a9f5" },
            { key: "fiction", y: this.props.BookCountPie[3].fiction, color: "#3ebfea" },
            { key: "ancient", y: this.props.BookCountPie[4].ancient, color: "#4F5467" },
            { key: "sciencefiction", y: this.props.BookCountPie[5].sciencefiction, color: "#1de9b6" },
            { key: "thriller", y: this.props.BookCountPie[6].thriller, color: "#C70039" },
            { key: "spritual", y: this.props.BookCountPie[7].spritual, color: "#581845" },
            { key: "classic", y: this.props.BookCountPie[8].classic, color: "#2ECC71" }

        ]

        console.log("*****PIe***")
        console.log(this.props.BookCountPie);
        return <NVD3Chart id="chart" height={300} type="pieChart" datum={datum} x="key" y="y" donut labelType='percent' />
    }
}
const mapStateToProps = (state) => {

    return {
        BookCountPie: state.bookReducer.BookCountPie
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onBookCount: () => dispatch(bookaction.fetchBookCatogryCount()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PieDonutChart);