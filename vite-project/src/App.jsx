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

  const sampleReviews = [
    {
      barName: "The Drunken Ship",
      location: "Rome, Italy",
      review: "Great place to hang out with friends and enjoy a pint. Loved the ambiance and the music. A bit crowded, but that's to be expected!"
    },
    {
      barName: "Skyline Bar",
      location: "Riga, Latvia",
      review: "The view from this bar is amazing, especially during sunset. Drinks are a bit pricey, but it's worth it for the experience."
    },
    {
      barName: "Hemingway Bar",
      location: "Prague, Czech Republic",
      review: "A cozy place with a classic feel. Great selection of cocktails, and the bartenders are very knowledgeable."
    },
    {
      barName: "The Broken Shaker",
      location: "Miami, USA",
      review: "Trendy spot with a vibrant crowd. The outdoor setting is perfect for Miami nights. Don't miss their signature cocktails!"
    }
  ];

  const [reviews, setReviews] = useState(sampleReviews);
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