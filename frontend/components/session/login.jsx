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
      <ul className="errors-pop-up">
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
      <div className="log-in-form">
        <div className="log-in-pic">
          <img  src={window.images.login_image} />
        </div>
        <div className="form-component">
          <form>
            <h2>Welcome to Robinhood</h2>
            <label>Email
              <br/>
              <input
                type="email"
                value={this.state.email}
                onChange={this.handleInput('email')}
                placeholder="u28@gmail.com"
              />
            </label>
            <br/> 
            <label>Password
              <br/>
              <input
                type="password"
                value={this.state.password}
                onChange={this.handleInput('password')}
                placeholder="hunter2"
              />
            </label>
            <br/>
            <button className="btn" onClick={this.handleSubmit}>Sign In</button>
            {this.renderErrors()}
          </form>
          </div>
      </div>
    )
  }
};

export default Login; 
