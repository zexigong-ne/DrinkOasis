import { useNavigate } from 'react-router-dom';

function Reviews({ reviews }) {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Bar Reviews</h1>
      <button onClick={() => navigate("/PostReview")}>Add a Review</button>
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
