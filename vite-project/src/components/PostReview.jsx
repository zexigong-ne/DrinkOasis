import { useState } from 'react';

function PostReview({ addReview }) {
  const [barName, setBarName] = useState("");
  const [location, setLocation] = useState("");
  const [review, setReview] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addReview({ barName, location, review });
  };

  return (
    <div>
      <h1>Post a Review</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Bar Name" value={barName} onChange={e => setBarName(e.target.value)} />
        <input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />
        <textarea placeholder="Review" value={review} onChange={e => setReview(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PostReview;
