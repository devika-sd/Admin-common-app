import React from 'react';
import NVD3Chart from 'react-nvd3';
import authHeader from '../../../services/auth-header';

function generateNumber(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min)
}


class MultiBarChart extends React.Component {
    constructor()
    {
        super();
        this.state={daywise:[],online:[],cod:[],data:[]}
    }

    componentDidMount()
    {
        fetch('http://localhost:8080/api/v1/orders/chartData', {
            headers: authHeader()
        })
            .then(res => res.json())
            .then(data => {
                this.setState({daywise:data.daywiseOrders,online:data.OnlineCount,cod:data.CodCount})
                var temp=this.getDatum(this.state.daywise,this.state.online,this.state.cod);
                this.setState({data:temp})
            })
    }
    getDatum(daywise,online,cod) {
        
        let sin = [];
        let sin2 = [];
        let sin3 = [];
    
        for (let i = 0; i < daywise.length; i++) {
            // var first,second,third;
            var onlinefound = online.findIndex(function(post, index) {
                if(post._id === daywise[i]["_id"])
                    return true;
            });
            var codfound = cod.findIndex(function(post, index) {
                if(post._id === daywise[i]["_id"])
                    return true;
            });
            var daily = daywise[i]["count"];
            var onlineValue = onlinefound!== -1 ? online[onlinefound]["count"] : 0;
            var codvalue = codfound!== -1 ? cod[codfound]["count"] :0;
            

            console.log(daily,onlineValue,codvalue)
            sin.push({
                'x': daywise[i]["_id"],
                'y': daily
            });
            sin2.push({
                'x': daywise[i]["_id"],
                'y': onlineValue
            });
            sin3.push({
                'x': daywise[i]["_id"],
                'y': codvalue
            });
        }

        console.log(sin)
        console.log(sin2)
        console.log(sin3)
        return [
            {
                values: sin3,
                key: 'Orders',
                color: '#A389D4'
            },
            {
                values: sin2,
                key: 'COD',
                color: '#04a9f5'
            },
            {
                values: sin,
                key: 'Online',
                color: '#1de9b6',
                area: true
            }
        ];
    }
    
    render() {
        // const data = this.getDatum(this.state.daywise,this.state.online,this.state.cod);
        return <NVD3Chart type="multiBarChart" datum={this.state.data} x="x" y="y" height={300} groupSpacing={0.2} />
    }
}

export default MultiBarChart;