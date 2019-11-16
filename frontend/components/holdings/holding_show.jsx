import React from 'react';
import { Link } from 'react-router-dom';

class HoldingShow extends React.Component {
  componentDidMount() {
    this.props.requestHolding(this.props.match.params.ticker)
  }

  render() {
    return (
      <div>
        <h2>{this.props.holding.company_name}</h2>
        <h3>{this.props.holding.cost_basis}</h3>
        <Link to="/holdings">Holding Index</Link>
      </div>
    )
  }
}

export default HoldingShow; 