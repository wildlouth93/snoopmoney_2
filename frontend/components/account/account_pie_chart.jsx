import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Sector, Cell,
} from 'recharts';


const COLORS = ['#00C49F', '#18563e'];

// 


export default class AccountPieChart extends PureComponent {
  // static jsfiddleUrl = 'https://jsfiddle.net/alidingling/3Leoa7f4/';
  // constructor(props) {
  //   super(props)
  // };

  render() {
    // debugger; 

    const data = [
      { name: 'Group A', value: 400 },
      { name: 'Group B', value: 300 },
      { name: 'Group C', value: 300 },
      { name: 'Group D', value: 200 },
    ];

    return (
      <PieChart width={400} height={200} onMouseEnter={this.onPieEnter}>
        <Pie
          data={this.props.data}
          cx={150}
          cy={70}
          innerRadius={55}
          outerRadius={75}
          fill="#8884d8"
          paddingAngle={5}
          dataKey={this.props.dataKey}
        >
          {
            this.props.data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
        {/* <Pie
          data={this.props.data}
          cx={420}
          cy={200}
          startAngle={180}
          endAngle={0}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey={this.props.dataKey}
        >
          {
            this.props.data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie> */}
      </PieChart>
    );
  }
}