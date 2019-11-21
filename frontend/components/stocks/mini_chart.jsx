import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

export default class MiniChart extends PureComponent {
  render() {
    return (
      <LineChart width={50} height={50} data={this.props.data}>
        <Line type="monotone" dataKey="average" stroke="#21ce99" strokeWidth={2}  dot={false} />
      </LineChart>
    );
  }
}