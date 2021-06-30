import React, { Component } from 'react';
import Bookrating from './Bookrating';

class Bookratingdata extends Component {
  constructor(){
    super();
    this.state = {
      bookData:{}
    }
  }

  componentWillMount(){
   // this.getchartData(); // this should be this.getChartData();
    this.getbookData();
  }

  getbookData(){
    // Ajax calls here
    this.setState({
      bookData:{
        labels: ['Action and Adventure', 'Classics', 'Fantasy', 'Historical Fiction', 'Horror', 'Literary Fiction'],
        datasets:[
          {
            label:'Rating',
            data:[
              5.4,
              2,
              3,
              4.5,
              1,
              0.5
            ],
            backgroundColor:[
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)'
            ]
          }
        ]
      }
    });
  }

  render() {
    return (
      <div className="bookratingdata">
        <div className="bookratingdata-header">
        </div>
        <Bookrating bookData={this.state.bookData}  legendPosition="bottom"/>
      </div>
    );
  }
}

export default Bookratingdata;