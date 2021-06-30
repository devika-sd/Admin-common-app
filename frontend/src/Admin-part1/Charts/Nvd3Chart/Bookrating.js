import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import {Row, Col, Card, Table, Tabs, Tab} from 'react-bootstrap';
class Bookrating extends Component{
  constructor(props){
    super(props);
    this.state = {
      bookData:props.bookData
    }
  }

  static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'right',
    location:'Rating'
  }

  render(){
    return (
      <div className="book">
        <Col xl={12} >
                <Card >
                        <Card.Body>
                        <Bar
                            data={this.state.bookData}
                            options={{
                                title:{
                                display:this.props.displayTitle,
                                text:'Most rating in '+this.props.location,
                                fontSize:25
                                },
                                legend:{
                                display:this.props.displayLegend,
                                position:this.props.legendPosition
                                }
                            }}
                        />
                        </Card.Body>
                </Card>
        </Col>
        {/* <Col sm={8}>
            <Card>
                    <Card.Body>
                        <Line
                        data={this.state.bookData}
                        options={{
                            title:{
                            display:this.props.displayTitle,
                            text:'Most rating in '+this.props.location,
                            fontSize:25
                            },
                            legend:{
                            display:this.props.displayLegend,
                            position:this.props.legendPosition
                            }
                        }}
                        />
                    </Card.Body>
            </Card>
        </Col>
        <Col sm={8}>
            <Card>
                <Card.Body>
                    <Pie
                    data={this.state.bookData}
                    options={{
                        title:{
                        display:this.props.displayTitle,
                        text:'Most rating in '+this.props.location,
                        fontSize:25
                        },
                        legend:{
                        display:this.props.displayLegend,
                        position:this.props.legendPosition
                        }
                    }}
                    />
                </Card.Body>
            </Card>
        </Col> */}
      </div>
    )
  }
}

export default Bookrating;