// import { Component } from 'react';
// import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/Register.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('/userApi/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (data.success) {
          navigate('/Reviews');
          console.log('Login successful');
        } else {
          setErrorMessage('Invalid username or password');
        }
      }
      console.log('Login unsuccessful');
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('Internal Server Error');
    }
  };

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
          value={username}
          onChange={handleInputChange}
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
          value={password}
          onChange={handleInputChange}
        />
        </div>
        
        <button className="btn btn-lg btn-primary btn-block btn-submit" onClick={handleLogin}>Login</button>
        <p>{errorMessage}</p>
        </form>
      </div>
    );
  }


export default Login;
