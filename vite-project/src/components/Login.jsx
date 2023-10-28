import { Component } from 'react';
import PropTypes from 'prop-types';
import '../assets/css/Register.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      errorMessage: '',
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleLogin = () => {
    const { username, password } = this.state;
    const { history } = this.props;

    if (username === 'yourUsername' && password === 'yourPassword') {
        history.push('/');
      console.log('Login successful');
    } else {
      this.setState({ errorMessage: 'Invalid username or password' });
    }
  };

  render() {
    return (
      <div className="wrapper">
      <h2 className="form-register-heading">Login</h2>
      <form className="form-register">
      <div>
          <div className="label-container">
            <label>Username:</label>
          </div>
          <input
          type="text"
          className="form-control"
          name="username"
          placeholder="Username"
          value={this.state.username}
          onChange={this.handleInputChange}
        />
        </div>
        
        <div>
          <div className="label-container">
            <label>Password:</label>
          </div>
          <input
          type="password"
          className="form-control"
          name="password"
          placeholder="Password"
          value={this.state.password}
          onChange={this.handleInputChange}
        />
        </div>
        
        <button className="btn btn-lg btn-primary btn-block btn-submit" onClick={this.handleLogin}>Login</button>
        <p>{this.state.errorMessage}</p>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
    history: PropTypes.object.isRequired,
}

export default Login;
