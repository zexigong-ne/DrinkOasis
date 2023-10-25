// import { useState } from 'react'
import './App.css'
import Home from './components/Home.jsx';
import Register from './components/Register'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/">HomePage</Link>
            <Link to="/Register">Sign Up</Link>
          </li>
        </ul>
      </nav>

      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}



export default App;