import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

export default class MiniChart extends PureComponent {
  
  render() {
    // let stroke = '#21ce99';
    // if (this.props.data[0].average || this.props.data[0].average < this.props.data[this.props.data.length - 1].average) {
    //   stroke = 'red';
    // } 
    return (
      <LineChart width={40} height={40} data={this.props.data}>
        {/* <YAxis type="number" domain={['dataMin', 'dataMax']} hide={true} /> */}
        <YAxis type="number" domain={[dataMin => (dataMin * 0.99), dataMax => (dataMax * 1.01)]} hide={true} />
        <Line type="monotone" dataKey="average" stroke={this.props.stroke} strokeWidth={2}  dot={false} />
      </LineChart>
    );
  }
}