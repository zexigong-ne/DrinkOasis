// import { useState } from 'react'
import './App.css'
import Home from './components/Home.jsx';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/">HomePage</Link>
          </li>
        </ul>
      </nav>

      <Routes>
      <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}



export default App;