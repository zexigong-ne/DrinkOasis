import { useState } from 'react';
import '../assets/css/Register.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { username, email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      console.log('Registration successful', formData);
    } else {
      console.log('Passwords do not match');
    }
  };

  return (
    <div className="wrapper">
      <h2 className="form-register-heading">Registration</h2>
      <form className="form-register" onSubmit={handleSubmit}>
        <div>
          <div className="label-container">
            <label>Username:</label>
          </div>
          <input
            type="text"
            className="form-control"
            name="username"
            value={username}
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="label-container">
            <label>Email:</label>
          </div>
          <input type="email" className="form-control" name="email" value={email} onChange={handleChange} />
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
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="label-container">
            <label>Confirm Password:</label>
          </div>
          <input
            type="password"
            className="form-control"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
          />
        </div>
        <button className="btn btn-lg btn-primary btn-block btn-submit" type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
