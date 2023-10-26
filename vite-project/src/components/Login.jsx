import { Component } from 'react';
// import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

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
      <div>
        <h2>Login</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={this.state.username}
          onChange={this.handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={this.state.password}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleLogin}>Login</button>
        <p>{this.state.errorMessage}</p>
      </div>
    );
  }
}

Login.propTypes = {
    history: PropTypes.object.isRequired,
}

// export default withRouter(Login);
export default Login;
