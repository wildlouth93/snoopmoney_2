import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

export default class MiniChart2 extends PureComponent {
  render() {
    return (
      <LineChart width={400} height={400} data={this.props.data}>
        <Line type="monotone" dataKey="average" stroke="#21ce99" strokeWidth={2} />
      </LineChart>
    );
  }
}