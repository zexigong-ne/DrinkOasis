import { useNavigate } from 'react-router-dom';
import '../assets/css/Reviews.css';

function Reviews({ reviews }) {
const navigate = useNavigate();

return (
  <div className="main">
      <div className="title">
          <h1>Bar Reviews</h1>
          <div className="post-btn">
                <button className="add-review-btn" onClick={() => navigate("/PostReview")}>Add a Review</button>
          </div>
      </div>
      {reviews.map((review, index) => (
          <div key={index} className="review">
              <h2>{review.barName}</h2>
              <p>Location: {review.location}</p>
              <p>Review: {review.review}</p>
          </div>
    ))}
  </div>
);
}

export default Reviews;
