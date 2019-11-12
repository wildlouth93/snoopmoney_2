import React from 'react';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      first_name: '',
      last_name: '',
      account_balance: '',
      password: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(type) {
    return (e) => {
      this.setState({ [type]: e.currentTarget.value })
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createNewUser(this.state)
      .then( () => this.props.history.push('/')) 
  }

  render() {
    return (
      <div className="session-form">
        <h2>Sign Up</h2>
        <form>
          <label>Email:
            <input 
              type="email" 
              value={this.state.email}
              onChange={this.handleInput('email')}
              />
          </label>
          <br/>
          <label>First Name: 
              <input 
                type="text"
                value={this.state.first_name}
                onChange={this.handleInput('first_name')}
              />
          </label>
          <br/>
          <label>Last Name:
              <input
              type="text"
              value={this.state.last_name}
              onChange={this.handleInput('last_name')}
            />
          </label>
          <br/>
          <label>Account Balance: 
            <input 
              type="number" 
              step="0.01"
              value={this.state.account_balance}
              onChange={this.handleInput('account_balance')}
            />
          </label>
          <br/>
          <label>Password: 
            <input 
              type="password"
              value={this.state.password}
              onChange={this.handleInput('password')}
            />
          </label>
          <br/>
          <button onClick={this.handleSubmit}>Signup</button>
        </form>
      </div>
    )
  }
};

export default Signup; 

// line 25 history.push -- not sure what path is -- want to redirect to homepage