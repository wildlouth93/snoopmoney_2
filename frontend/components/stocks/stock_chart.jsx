import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';



export default class StockChart extends PureComponent {

  render() {
    let stroke = '#21ce99';
    // if (this.props.data[0] < this.props.data[this.props.data.length-1]) {
    //   stroke = 'red';
    // } 

    return (
      <LineChart
        width={500}
        height={300}
        data={this.props.data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >

        <XAxis dataKey="label" hide={true} />
        {/* <YAxis type="number" domain={['dataMin', 'dataMax']} hide={true} /> */}
        <YAxis type="number" domain={[dataMin => (dataMin * 0.999), dataMax => (dataMax * 1.001)]} hide={true} />
        <Tooltip />
        {/* <Legend /> */}
        <Line name={this.props.name} type="monotone" dataKey={this.props.dataKey} stroke={this.props.stroke} dot={false} strokeWidth={2} />
      </LineChart>
    );
  }
};

