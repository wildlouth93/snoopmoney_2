import React from 'react';
import { Link } from 'react-router-dom';

export default class ACIndexItem extends React.Component {
  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   this.props.fetchStock(this.props.quote);
  // }

  render() {
    if (true) {
      return (
        <Link className="search-index-item" to={`/stocks/${this.props.quote}`}>
          <div className="search-detail">
            <p>{this.props.quote}</p>
            {/* <h4>{stock.company_name}</h4> */}
          </div>
        </Link>
      )
    } else {
      return <div></div>
    }
  }
}