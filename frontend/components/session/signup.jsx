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
    this.props.createNewUser(this.state)
      .then( () => this.props.history.push('/')) 
  }

  render() { 
    return (
      <div className="sign-up-form">
        <div className="form-component">
          <h1>Make Your Money Move</h1>
          <p>SnoopMoney lets you invest in companies you love, commission-free.</p>
          <form className="form-box">
                <input 
                  placeholder="First Name"
                  type="text"
                  value={this.state.first_name}
                  onChange={this.handleInput('first_name')}
                />
            <br/>
                <input
                placeholder="Last Name"
                type="text"
                value={this.state.last_name}
                onChange={this.handleInput('last_name')}
              />
            <br/>
              <input
                placeholder="Email"
                type="email"
                value={this.state.email}
                onChange={this.handleInput('email')}
              />
            <br/>
              <input 
                placeholder="Account Balance"
                type="number" 
                step="0.01"
                value={this.state.account_balance}
                onChange={this.handleInput('account_balance')}
              />
            <br/>
              <input 
                placeholder="Password"
                type="password"
                value={this.state.password}
                onChange={this.handleInput('password')}
              />
            <br/>
            <input type="submit" className="btn" onClick={this.handleSubmit} value="Continue"/>
            {this.renderErrors()}
          </form>
        </div>
        <div className="sign-up-pic">
          <img src={window.images.signup_logo_image} />
        </div>
      </div>
    )
  }
};

export default Signup; 

// line 25 history.push -- not sure what path is -- want to redirect to homepage