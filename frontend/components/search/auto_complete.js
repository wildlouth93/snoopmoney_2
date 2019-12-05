import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ACIndexItem from './auto_complete_index_item';

export default class AutoComplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVal: ''
    };
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(event) {
    this.setState({inputVal: event.currentTarget.value})
  }

  matches() {
    let matches = []; 
    if (this.state.inputVal.length === 0){
      return this.props.quotes;
    }

    this.props.quotes.forEach(quote => {
      const sub = quote.slice(0, this.state.inputVal.length);
      if (sub.toLowerCase() === this.state.inputVal.toLowerCase()) {
        matches.push(quote);
      }
    });

    if (matches.length === 0) {
      matches.push('No matches');
    }

    return matches; 
  }

  render() {
    const results = this.matches().map((result, i) => {
      if (result !== 'No matches') {
        return (
          <ACIndexItem key={i} quote={result} fetchStock={this.props.fetchStock} />
        )
      } else {
        return <div>No Matches</div>
      }
    });

    return (
      <div>
        <div className="auto">
          <input 
            className="search-input"
            onChange={this.handleInput}
            value={this.state.inputVal}
            placeholder='Search by Symbol...'
          />
          <ul className="search-results">
            <ReactCSSTransitionGroup
              transitionName="auto"
              transitionEnterTimeout={100}
              transitionLeaveTimeout={100}>
              {results}
            </ReactCSSTransitionGroup>
          </ul>
        </div>
      </div>
    );
  }
};