import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../assets/css/PostReview.css';

function PostReview() {
  const [barName, setBarName] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [review, setReview] = useState("");

  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewData = { barName, location, address, review };

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Review submitted:', result);
        alert("Review added successfully!");
        history.push('/Reviews');
      } else {
        const error = await response.json();
        console.error('Failed to submit review:', error.message);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
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
