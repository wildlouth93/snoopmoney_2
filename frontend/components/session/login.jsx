import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  handleInput(type) {
    return (e) => {
      this.setState({ [type]: e.currentTarget.value })
    }
  }

  renderErrors() {
    return (
      <ul>
        {
          this.props.errors.map((error, i) => (
            <li key={`error-${i}`}>
              {error}
            </li>
          ))
        }
      </ul>
    )
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.login(this.state)
      .then(() => this.props.history.push('/'))
  }

  render() {
    return (
      <div className="session-form">
        <h2>Welcome to SnoopMoney</h2>
        <form>
          {this.renderErrors()}
          <label>Email:
            <input
              type="email"
              value={this.state.email}
              onChange={this.handleInput('email')}
            />
          </label>
          <label>Password:
            <input
              type="password"
              value={this.state.password}
              onChange={this.handleInput('password')}
            />
          </label>
          <br/>
          <button onClick={this.handleSubmit}>Sign In</button>
        </form>
      </div>
    )
  }
};

export default Login; 
