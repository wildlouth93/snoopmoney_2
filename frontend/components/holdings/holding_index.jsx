import React from 'react';
import HoldingIndexItem from './holding_index_item';
import { Link } from 'react-router-dom';
import holdingsReducer from '../../reducers/holdings';

class HoldingIndex extends React.Component {
  componentDidMount(){
    this.props.requestHoldings();
  }

  render() {
    const { holdings, deleteHolding, updateHolding } = this.props; 
    return (
      <div>
        <ul>
          {
            holdings.map(holding => (
              <HoldingIndexItem 
                holding={holding}
                deleteHolding={deleteHolding}
                updateHolding={updateHolding}
                key={holding.ticker}
              />
            ))
          }
        </ul>
        <Link to="/">Home</Link>
      </div>
    )
  }
}

export default HoldingIndex; 