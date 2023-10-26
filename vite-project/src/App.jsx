// import { useState } from 'react'
import './App.css'
import Home from './components/Home.jsx'
import Register from './components/Register'
import Login from './components/Login'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/">HomePage</Link>
            <Link to="/Register">Sign Up</Link>
            <Link to="/Login">Login</Link>
          </li>
        </ul>
      </nav>

      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Login" element={<Login />} render={(props) => <Login {...props} />} />
      </Routes>
    </BrowserRouter>
  );
}



export default App;