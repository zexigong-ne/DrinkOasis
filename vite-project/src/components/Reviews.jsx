import { useNavigate } from 'react-router-dom';
import '../assets/css/Reviews.css';

function Reviews({ reviews }) {
const navigate = useNavigate();

return (
  <div className="reviews-container">
      <div className="reviews-header">
          <h1>Bar Reviews</h1>
          <button className="add-review-btn" onClick={() => navigate("/PostReview")}>Add a Review</button>
      </div>
      {reviews.map((review, index) => (
          <div key={index}>
              <h2>{review.barName}</h2>
              <p>Location: {review.location}</p>
              <p>Review: {review.review}</p>
          </div>
    ))}
  </div>
);
}

export default Reviews;
