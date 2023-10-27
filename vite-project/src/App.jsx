import { useState } from 'react'
import './App.css'
import Home from './components/Home.jsx'
import Register from './components/Register'
import Login from './components/Login'
import Reviews from './components/Reviews'
import PostReview from './components/PostReview'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  const [reviews, setReviews] = useState([]);
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/">HomePage</Link>
            <Link to="/Reviews">Reviews</Link>
            <Link to="/Register">Sign Up</Link>
            <Link to="/Login">Login</Link>
          </li>
        </ul>
      </nav>

      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Login" element={<Login />} render={(props) => <Login {...props} />} />
      <Route path="/Reviews" element={<Reviews reviews={reviews} />} />
      <Route path="/PostReview" element={<PostReview addReview={(review) => setReviews([...reviews, review])} />} />

      </Routes>
    </BrowserRouter>
  );
}



export default App;