import { useState } from 'react';
import '../assets/css/PostReview.css';

function PostReview({ addReview }) {
  const [barName, setBarName] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [review, setReview] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewData = { barName, location, address, review };
    addReview(reviewData);
  };

  return (
    <div className="post-container">
      <h1>Post a Review</h1>
      <form className="post-form" onSubmit={handleSubmit}>
        <input placeholder="Bar Name" value={barName} onChange={e => setBarName(e.target.value)} />
        <input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />
        <input placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} />
        <textarea placeholder="Review" value={review} onChange={e => setReview(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PostReview;
