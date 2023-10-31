import { useState } from 'react'
import './App.css'
import Home from './components/Home.jsx'
import Register from './components/Register'
import Login from './components/Login'
import Diary from './components/Diary'
import PostDiary from './components/PostDiary'
import Reviews from './components/Reviews'
import PostReview from './components/PostReview'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import logoImage from './assets/img/logoImage.png';

function App() {
  const [reviews, setReviews] = useState([]);
  const [diaries, setDiaries] = useState([]);

  return (
    <BrowserRouter>
      <nav>
      <img className="logo" src={logoImage} alt="Logo" />

        <ul>
          <li>
            <Link to="/">HomePage</Link>
            <Link to="/Reviews">Reviews</Link>
            <Link to="/Diary">Diaries</Link>
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
      <Route path="/Diary" element={<Diary diaries={diaries}/>} />
      <Route
          path="/PostDiary"
          element={<PostDiary addDiary={(diary) => setDiaries([...diaries, diary])} />}
        />
      </Routes>
    </BrowserRouter>
  );
}



export default App;